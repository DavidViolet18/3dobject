(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /workspaces/3dobject/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babylonjs/core */ "v5Mq");
/* harmony import */ var _babylonjs_loaders_glTF__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babylonjs/loaders/glTF */ "dSwm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ "FKr1");










const _c0 = ["canvas"];
//import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";
class AppComponent {
    constructor(_ngZone) {
        this._ngZone = _ngZone;
        this.pommadierType = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]("verre");
        this.pommadierColor = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]("white");
        this.couvercleColor = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]("black");
    }
    ngAfterViewInit() {
        this.InitScene(() => {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([
                this.pommadierColor.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(this.pommadierColor.value)),
                this.pommadierType.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(this.pommadierType.value))
            ]).subscribe(() => this.updatePommadierMaterial());
            Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([
                this.couvercleColor.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(this.couvercleColor.value))
            ]).subscribe(() => this.updateCouvercleMaterial());
        });
    }
    InitScene(callback) {
        // engine
        this._engine = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Engine"](this._canvas.nativeElement, true);
        // scene
        this._scene = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Scene"](this._engine);
        this._scene.clearColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color4"](0, 0, 0, 0);
        //this._scene.debugLayer.show({  })
        // camera
        const camera = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["ArcRotateCamera"]("camera", -Math.PI / 2, Math.PI / 2.5, 15, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0, 0, 0), this._scene);
        camera.attachControl(this._canvas.nativeElement, false);
        // light
        const light = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["PointLight"]("light", new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0, 40, 40), this._scene);
        const light1 = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["PointLight"]("light", new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Vector3"](40, 40, -40), this._scene);
        const light2 = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["PointLight"]("light", new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Vector3"](-40, 40, -40), this._scene);
        // environment texture
        //var hdrTexture = new HDRCubeTexture("/assets/room.hdr", scene, 512);
        this._hdrTexture = _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["CubeTexture"].CreateFromPrefilteredData("assets/environment.dds", this._scene);
        // objects
        _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["SceneLoader"].Append("assets/", "pommadier.gltf", this._scene, (scene) => {
            let pommadier = scene.getMeshByName("pommadier");
            let couvercle = scene.getMeshByName("couvercle");
            let etiquette = scene.getMeshByName("etiquette");
            this.initCouvercle(couvercle);
            this.initEtiquette(etiquette);
            this.initPommadier(pommadier);
            callback();
        });
        // loop
        this._ngZone.runOutsideAngular(() => {
            this._engine.runRenderLoop(() => this._scene.render());
        });
    }
    initPommadier(mesh) {
        var glass = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["PBRMaterial"]("pommadier", this._scene);
        mesh.material = glass;
    }
    initEtiquette(mesh) {
        let etiquetteMat = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["StandardMaterial"]("etiquette", this._scene);
        etiquetteMat.diffuseColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](1, 1, 1);
        etiquetteMat.emissiveColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.5, .5, .5);
        mesh.material = etiquetteMat;
    }
    initCouvercle(mesh) {
        let couvercleMaterial = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["StandardMaterial"]("couvercle", this._scene);
        mesh.material = couvercleMaterial;
    }
    updatePommadierMaterial() {
        let type = this.pommadierType.value;
        let color = this.pommadierColor.value;
        let mat = this._scene.getMaterialByName("pommadier");
        if (!mat)
            return;
        if (type == "verre") {
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
            mat.reflectivityColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.2, .2, .2);
        }
        else {
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
            mat.reflectivityColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.2, .2, .2);
        }
        if (color == "white") {
            mat.albedoColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](1, 1, 1);
        }
        else if (color == "black") {
            mat.albedoColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.1, .1, .1);
        }
        else if (color == "red") {
            mat.albedoColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.95, .2, .2);
        }
        else if (color == "green") {
            mat.albedoColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.2, .95, .2);
        }
        else if (color == "blue") {
            mat.albedoColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.2, .2, .95);
        }
    }
    updateCouvercleMaterial() {
        let color = this.couvercleColor.value;
        let mat = this._scene.getMaterialByName("couvercle");
        if (!mat)
            return;
        mat.specularPower = 50;
        if (color == "white") {
            mat.diffuseColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](1, 1, 1);
        }
        else if (color == "black") {
            mat.diffuseColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.1, .1, .1);
        }
        else if (color == "red") {
            mat.diffuseColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.95, .2, .2);
        }
        else if (color == "green") {
            mat.diffuseColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.2, .95, .2);
        }
        else if (color == "blue") {
            mat.diffuseColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Color3"](.2, .2, .95);
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["NgZone"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx._canvas = _t.first);
    } }, decls: 45, vars: 3, consts: [["width", "256", "height", "256"], ["canvas", ""], [3, "formControl"], ["value", "verre"], ["value", "plastic"], ["value", "red"], ["value", "green"], ["value", "blue"], ["value", "black"], ["value", "white"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "canvas", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "section");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "legend");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Pommadier");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "mat-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "Verre");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "mat-option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "Plastique");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16, "Couleur");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "mat-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "mat-option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "Rouge");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "Vert");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, "Bleu");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "mat-option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](25, "Noir");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "mat-option", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, "Blanc");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "section");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "legend");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, "Couvercle");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33, "Couleur");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "mat-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](35, "mat-option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36, "Rouge");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](38, "Vert");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](39, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](40, "Bleu");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](41, "mat-option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](42, "Noir");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](43, "mat-option", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](44, "Blanc");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx.pommadierType);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx.pommadierColor);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx.couvercleColor);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_7__["MatSelect"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlDirective"], _angular_material_core__WEBPACK_IMPORTED_MODULE_8__["MatOption"]], styles: ["canvas[_ngcontent-%COMP%] {\n  width: 100vw;\n  height: 75vh;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7RUFDQSxZQUFBO0FBQ0oiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiY2FudmFzIHsgXG4gICAgd2lkdGg6IDEwMHZ3OyBcbiAgICBoZWlnaHQ6IDc1dmg7IFxufSJdfQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "omvX");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map