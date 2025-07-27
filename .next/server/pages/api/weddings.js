"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/weddings";
exports.ids = ["pages/api/weddings"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// 📁 lib/prisma.ts\n// lib/prisma.ts\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1CQUFtQjtBQUNuQixnQkFBZ0I7QUFDNkI7QUFFN0MsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsR0FBRTtBQUVsRSxJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teXdlZGRpbmctbmV4dGpzLXRhaWx3aW5kLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIPCfk4EgbGliL3ByaXNtYS50c1xuLy8gbGliL3ByaXNtYS50c1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCJcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWFcblxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./pages/api/weddings/index.ts":
/*!*************************************!*\
  !*** ./pages/api/weddings/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n// pages/api/weddings/index.ts\n\nasync function handler(req, res) {\n    try {\n        const weddings = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.wedding.findMany({\n            include: {\n                userAccesses: {\n                    include: {\n                        user: true\n                    }\n                }\n            }\n        });\n        res.status(200).json(weddings); // ← doit renvoyer un tableau\n    } catch (err) {\n        console.error(err);\n        res.status(500).json({\n            error: \"Erreur serveur\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvd2VkZGluZ3MvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4QkFBOEI7QUFFZTtBQUU5QixlQUFlQyxRQUFRQyxHQUFHLEVBQUVDLEdBQUc7SUFDNUMsSUFBSTtRQUNGLE1BQU1DLFdBQVcsTUFBTUosK0NBQU1BLENBQUNLLE9BQU8sQ0FBQ0MsUUFBUSxDQUFDO1lBQzdDQyxTQUFTO2dCQUNQQyxjQUFjO29CQUNaRCxTQUFTO3dCQUFFRSxNQUFNO29CQUFLO2dCQUN4QjtZQUNGO1FBQ0Y7UUFFQU4sSUFBSU8sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ1AsV0FBVyw2QkFBNkI7SUFDL0QsRUFBRSxPQUFPUSxLQUFLO1FBQ1pDLFFBQVFDLEtBQUssQ0FBQ0Y7UUFDZFQsSUFBSU8sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFRyxPQUFPO1FBQWlCO0lBQ2pEO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teXdlZGRpbmctbmV4dGpzLXRhaWx3aW5kLy4vcGFnZXMvYXBpL3dlZGRpbmdzL2luZGV4LnRzP2ExYjgiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvYXBpL3dlZGRpbmdzL2luZGV4LnRzXHJcblxyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiLi4vLi4vLi4vbGliL3ByaXNtYVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB3ZWRkaW5ncyA9IGF3YWl0IHByaXNtYS53ZWRkaW5nLmZpbmRNYW55KHtcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIHVzZXJBY2Nlc3Nlczoge1xyXG4gICAgICAgICAgaW5jbHVkZTogeyB1c2VyOiB0cnVlIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHdlZGRpbmdzKTsgLy8g4oaQIGRvaXQgcmVudm95ZXIgdW4gdGFibGVhdVxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogXCJFcnJldXIgc2VydmV1clwiIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsicHJpc21hIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIndlZGRpbmdzIiwid2VkZGluZyIsImZpbmRNYW55IiwiaW5jbHVkZSIsInVzZXJBY2Nlc3NlcyIsInVzZXIiLCJzdGF0dXMiLCJqc29uIiwiZXJyIiwiY29uc29sZSIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/weddings/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/weddings/index.ts"));
module.exports = __webpack_exports__;

})();