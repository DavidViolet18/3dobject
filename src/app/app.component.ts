import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import * as Babylon from "babylonjs"
import "babylonjs-loaders";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  constructor(
    private readonly _ngZone: NgZone
  ){}
  
  @ViewChild("canvas", { static: true }) private _canvas: ElementRef<HTMLCanvasElement>

  ngAfterViewInit(): void {


    const engine = new Babylon.Engine(this._canvas.nativeElement, true);
    const scene = new Babylon.Scene(engine);
    scene.clearColor = new Babylon.Color4(0,0,0,0);

    const camera = new Babylon.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 20, new Babylon.Vector3(0,0,0), scene);
    camera.attachControl(this._canvas.nativeElement, false);

    const light = new Babylon.PointLight("light", new Babylon.Vector3(0,40,40), scene);
    //const light = new Babylon.SpotLight("lightspot", new Babylon.Vector3(0,20,-10), new Babylon.Vector3(0,0,0), 1.2, 24, scene);

    // Environment Texture
    //var hdrTexture = new Babylon.HDRCubeTexture("/assets/room.hdr", scene, 512);
    var hdrTexture = Babylon.CubeTexture.CreateFromPrefilteredData("/assets/environment.dds", scene);

    // Skybox
    /*var hdrSkybox = Babylon.MeshBuilder.CreateBox("hdrskybox", { size: 1000 }, scene);
    let hdrSkyboxMat = new Babylon.PBRMaterial("skybox", scene);
    hdrSkyboxMat.backFaceCulling = false;
    hdrSkyboxMat.reflectionTexture = hdrTexture.clone();
    hdrSkyboxMat.reflectionTexture.coordinatesMode = Babylon.Texture.SKYBOX_MODE;
    hdrSkyboxMat.microSurface = 1.0;
	  hdrSkyboxMat.cameraExposure = 0.66;
	  hdrSkyboxMat.cameraContrast = 1.66;
    hdrSkyboxMat.disableLighting = true;
    hdrSkybox.material = hdrSkyboxMat;
    hdrSkybox.infiniteDistance = true;*/

    var glass = new Babylon.PBRMaterial("glass", scene);
    glass.reflectionTexture = hdrTexture;
    glass.metallic = 0.1;
    glass.roughness = 0.0;
    //glass.refractionTexture = hdrTexture;
    //glass.linkRefractionWithTransparency = true;
    //glass.indexOfRefraction = 0.52;
    //glass.alpha = 0;
    glass.directIntensity = 0.0;
    glass.environmentIntensity = 0.8;
    glass.cameraExposure = 0.66;
    glass.cameraContrast = 1.66;
    glass.microSurface = 1;
    glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new BABYLON.Color3(1,1,1);


    Babylon.SceneLoader.Append("/assets/", "pommadier.gltf", scene, (scene) => {
      let pommadier = scene.getMeshByName("pommadier");
      let couvercle = scene.getMeshByName("couvercle");
      let etiquette = scene.getMeshByName("etiquette");


      const shadowGen = new Babylon.ShadowGenerator(512, light);
      shadowGen.getShadowMap().renderList.push(pommadier);
      //shadowGen.useBlurExponentialShadowMap = true;
      shadowGen.useCloseExponentialShadowMap = true;
      //shadowGen.blurScale = 2;



      let etiquetteMat = new Babylon.StandardMaterial("etiquette", scene);
      etiquetteMat.diffuseColor = new Babylon.Color3(1,1,1);
      etiquette.material = etiquetteMat;

      pommadier.material = glass;

      let couvercleMaterial = new Babylon.StandardMaterial("couvercle", scene);
      couvercleMaterial.diffuseColor = new Babylon.Color3(.1,.1,.1);
      couvercleMaterial.ambientColor =  new Babylon.Color3(.3,.3,.3);
      couvercle.material = couvercleMaterial;
      
    });

    this._ngZone.runOutsideAngular(() => {
      engine.runRenderLoop(() => scene.render())
    })
  }

  ngOnInit(): void {
    
  }

}
