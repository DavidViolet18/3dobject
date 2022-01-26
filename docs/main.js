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
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ "Yzuk");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babylonjs_loaders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs-loaders */ "sjRU");
/* harmony import */ var babylonjs_loaders__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_loaders__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



const _c0 = ["canvas"];
class AppComponent {
    constructor(_ngZone) {
        this._ngZone = _ngZone;
    }
    ngAfterViewInit() {
        const engine = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Engine"](this._canvas.nativeElement, true);
        const scene = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Scene"](engine);
        scene.clearColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](0, 0, 0, 0);
        const camera = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["ArcRotateCamera"]("camera", -Math.PI / 2, Math.PI / 2.5, 20, new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0), scene);
        camera.attachControl(this._canvas.nativeElement, false);
        const light = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["PointLight"]("light", new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 40, 40), scene);
        //const light = new Babylon.SpotLight("lightspot", new Babylon.Vector3(0,20,-10), new Babylon.Vector3(0,0,0), 1.2, 24, scene);
        // Environment Texture
        //var hdrTexture = new Babylon.HDRCubeTexture("/assets/room.hdr", scene, 512);
        var hdrTexture = babylonjs__WEBPACK_IMPORTED_MODULE_0__["CubeTexture"].CreateFromPrefilteredData("/assets/environment.dds", scene);
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
        var glass = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["PBRMaterial"]("glass", scene);
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
        glass.albedoColor = new BABYLON.Color3(1, 1, 1);
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["SceneLoader"].Append("/assets/", "pommadier.gltf", scene, (scene) => {
            let pommadier = scene.getMeshByName("pommadier");
            let couvercle = scene.getMeshByName("couvercle");
            let etiquette = scene.getMeshByName("etiquette");
            const shadowGen = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["ShadowGenerator"](512, light);
            shadowGen.getShadowMap().renderList.push(pommadier);
            //shadowGen.useBlurExponentialShadowMap = true;
            shadowGen.useCloseExponentialShadowMap = true;
            //shadowGen.blurScale = 2;
            let etiquetteMat = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("etiquette", scene);
            etiquetteMat.diffuseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](1, 1, 1);
            etiquette.material = etiquetteMat;
            pommadier.material = glass;
            let couvercleMaterial = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("couvercle", scene);
            couvercleMaterial.diffuseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](.1, .1, .1);
            couvercleMaterial.ambientColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](.3, .3, .3);
            couvercle.material = couvercleMaterial;
        });
        this._ngZone.runOutsideAngular(() => {
            engine.runRenderLoop(() => scene.render());
        });
    }
    ngOnInit() {
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx._canvas = _t.first);
    } }, decls: 2, vars: 0, consts: [["width", "256", "height", "256"], ["canvas", ""]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "canvas", 0, 1);
    } }, styles: ["canvas[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFTLFdBQUE7RUFBYSxZQUFBO0FBR3RCIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImNhbnZhcyB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IH0iXX0= */"] });


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
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();


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