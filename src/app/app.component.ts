import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith } from "rxjs/operators"
import { AbstractMesh, ArcRotateCamera, Color3, Color4, CubeTexture, Engine, PBRMaterial, PointLight, Scene, SceneLoader, StandardMaterial, Vector3 } from "@babylonjs/core"
import "@babylonjs/loaders/glTF"
//import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  private _engine: Engine
  private _scene: Scene
  private _hdrTexture: CubeTexture

  pommadierType = new FormControl("verre");
  pommadierColor = new FormControl("white");
  couvercleColor = new FormControl("black");


  constructor(
    private readonly _ngZone: NgZone
  ){}
  
  @ViewChild("canvas", { static: true }) private _canvas: ElementRef<HTMLCanvasElement>

  ngAfterViewInit(): void {
    this.InitScene(() => {
      combineLatest([
        this.pommadierColor.valueChanges.pipe(startWith(this.pommadierColor.value)),
        this.pommadierType.valueChanges.pipe(startWith(this.pommadierType.value))
      ]).subscribe(() => this.updatePommadierMaterial());
      combineLatest([
        this.couvercleColor.valueChanges.pipe(startWith(this.couvercleColor.value))
      ]).subscribe(() => this.updateCouvercleMaterial());
    });
  }

  private InitScene(callback: () => void)
  {
    // engine
    this._engine = new Engine(this._canvas.nativeElement, true);

    // scene
    this._scene = new Scene(this._engine);
    this._scene.clearColor = new Color4(0,0,0,0);
    //this._scene.debugLayer.show({  })

    // camera
    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0,0,0), this._scene);
    camera.attachControl(this._canvas.nativeElement, false);

    // light
    const light = new PointLight("light", new Vector3(0,40,40), this._scene);
    const light1 = new PointLight("light", new Vector3(40,40,-40), this._scene);
    const light2 = new PointLight("light", new Vector3(-40,40,-40), this._scene);

    // environment texture
    //var hdrTexture = new HDRCubeTexture("/assets/room.hdr", scene, 512);
    this._hdrTexture = CubeTexture.CreateFromPrefilteredData("assets/environment.dds", this._scene);

    // objects
    SceneLoader.Append("assets/", "pommadier.gltf", this._scene, (scene) => {
      let pommadier = scene.getMeshByName("pommadier");
      let couvercle = scene.getMeshByName("couvercle");
      let etiquette = scene.getMeshByName("etiquette");

      this.initCouvercle(couvercle);
      this.initEtiquette(etiquette);
      this.initPommadier(pommadier);

      callback();
    })

    // loop
    this._ngZone.runOutsideAngular(() => {
      this._engine.runRenderLoop(() => this._scene.render())
    })
  }

  private initPommadier(mesh: AbstractMesh)
  {
    var glass = new PBRMaterial("pommadier", this._scene);
    mesh.material = glass;
  }

  private initEtiquette(mesh: AbstractMesh)
  {
    let etiquetteMat = new StandardMaterial("etiquette", this._scene);
    etiquetteMat.diffuseColor = new Color3(1,1,1);
    etiquetteMat.emissiveColor = new Color3(.5,.5,.5);
    mesh.material = etiquetteMat;
  }

  private initCouvercle(mesh: AbstractMesh)
  {
    let couvercleMaterial = new StandardMaterial("couvercle", this._scene);
    mesh.material = couvercleMaterial;
  }

  private updatePommadierMaterial()
  {
    let type : "verre" | "plastic" = this.pommadierType.value;
    let color: string = this.pommadierColor.value;

    let mat = this._scene.getMaterialByName("pommadier") as PBRMaterial;
    if(!mat) return;

    if(type == "verre")
    {
      mat.reflectionTexture = this._hdrTexture;
      mat.metallic = 0.1;
      mat.roughness = 0;
      mat.refractionTexture = this._hdrTexture;
      mat.linkRefractionWithTransparency = true;
      mat.indexOfRefraction = 0.52;
      mat.alpha = 0;
      mat.directIntensity = 0;
      mat.environmentIntensity = 0.8;
      mat.cameraExposure = 0.66;
      mat.cameraContrast = 1.66;
      mat.microSurface = 1;
      mat.reflectivityColor = new Color3(.2,.2,.2);
    } else {
      mat.reflectionTexture = this._hdrTexture;
      mat.metallic = 0.25;
      mat.roughness = 0.25;
      mat.refractionTexture = null;
      mat.linkRefractionWithTransparency = false;
      mat.indexOfRefraction = 0.52;
      mat.alpha = 1;
      mat.directIntensity = 0;
      mat.environmentIntensity = 0.8;
      mat.cameraExposure = 0.66;
      mat.cameraContrast = 1.66;
      mat.microSurface = 1;
      mat.reflectivityColor = new Color3(.2,.2,.2);
    }

    if(color == "white"){
      mat.albedoColor = new Color3(1,1,1);
    } else if(color == "black") {
      mat.albedoColor = new Color3(.1,.1,.1);
    } else if(color == "red") {
      mat.albedoColor = new Color3(.95,.2,.2);
    } else if(color == "green") {
      mat.albedoColor = new Color3(.2,.95,.2);
    } else if(color == "blue") {
      mat.albedoColor = new Color3(.2,.2,.95);
    }
  }

  private updateCouvercleMaterial()
  {
    let color: string = this.couvercleColor.value;
    let mat = this._scene.getMaterialByName("couvercle") as StandardMaterial;
    if(!mat) return;
    mat.specularPower = 50;
    if(color == "white"){
      mat.diffuseColor = new Color3(1,1,1);
    } else if(color == "black") {
      mat.diffuseColor = new Color3(.1,.1,.1);
    } else if(color == "red") {
      mat.diffuseColor = new Color3(.95,.2,.2);
    } else if(color == "green") {
      mat.diffuseColor = new Color3(.2,.95,.2);
    } else if(color == "blue") {
      mat.diffuseColor = new Color3(.2,.2,.95);
    }
  }

}
