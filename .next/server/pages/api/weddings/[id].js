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
exports.id = "pages/api/weddings/[id]";
exports.ids = ["pages/api/weddings/[id]"];
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

/***/ "(api)/./pages/api/weddings/[id]/index.ts":
/*!******************************************!*\
  !*** ./pages/api/weddings/[id]/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(api)/./lib/prisma.ts\");\n // adapte le chemin selon ton projet\nasync function handler(req, res) {\n    const { id } = req.query;\n    if (req.method !== \"GET\") {\n        return res.status(405).json({\n            error: \"M\\xe9thode non autoris\\xe9e\"\n        });\n    }\n    try {\n        const wedding = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.wedding.findUnique({\n            where: {\n                id: parseInt(id, 10)\n            }\n        });\n        if (!wedding) {\n            return res.status(404).json({\n                error: \"Mariage non trouv\\xe9\"\n            });\n        }\n        res.status(200).json(wedding);\n    } catch (error) {\n        console.error(\"Erreur API:\", error);\n        res.status(500).json({\n            error: \"Erreur serveur\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvd2VkZGluZ3MvW2lkXS9pbmRleC50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUNzQyxDQUFDLG9DQUFvQztBQUU1RCxlQUFlQyxRQUFRQyxHQUFtQixFQUFFQyxHQUFvQjtJQUM3RSxNQUFNLEVBQUVDLEVBQUUsRUFBRSxHQUFHRixJQUFJRyxLQUFLO0lBRXhCLElBQUlILElBQUlJLE1BQU0sS0FBSyxPQUFPO1FBQ3hCLE9BQU9ILElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QjtJQUMvRDtJQUVBLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1WLCtDQUFNQSxDQUFDVSxPQUFPLENBQUNDLFVBQVUsQ0FBQztZQUM5Q0MsT0FBTztnQkFBRVIsSUFBSVMsU0FBU1QsSUFBYztZQUFJO1FBQzFDO1FBRUEsSUFBSSxDQUFDTSxTQUFTO1lBQ1osT0FBT1AsSUFBSUksTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFxQjtRQUM1RDtRQUVBTixJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDRTtJQUN2QixFQUFFLE9BQU9ELE9BQU87UUFDZEssUUFBUUwsS0FBSyxDQUFDLGVBQWVBO1FBQzdCTixJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBaUI7SUFDakQ7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL215d2VkZGluZy1uZXh0anMtdGFpbHdpbmQvLi9wYWdlcy9hcGkvd2VkZGluZ3MvW2lkXS9pbmRleC50cz84NzBmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiOyAvLyBhZGFwdGUgbGUgY2hlbWluIHNlbG9uIHRvbiBwcm9qZXRcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkge1xuICBjb25zdCB7IGlkIH0gPSByZXEucXVlcnk7XG5cbiAgaWYgKHJlcS5tZXRob2QgIT09IFwiR0VUXCIpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogXCJNw6l0aG9kZSBub24gYXV0b3Jpc8OpZVwiIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB3ZWRkaW5nID0gYXdhaXQgcHJpc21hLndlZGRpbmcuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcGFyc2VJbnQoaWQgYXMgc3RyaW5nLCAxMCkgfSxcbiAgICB9KTtcblxuICAgIGlmICghd2VkZGluZykge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6IFwiTWFyaWFnZSBub24gdHJvdXbDqVwiIH0pO1xuICAgIH1cblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHdlZGRpbmcpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgQVBJOlwiLCBlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogXCJFcnJldXIgc2VydmV1clwiIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsicHJpc21hIiwiaGFuZGxlciIsInJlcSIsInJlcyIsImlkIiwicXVlcnkiLCJtZXRob2QiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJ3ZWRkaW5nIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwicGFyc2VJbnQiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/weddings/[id]/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/weddings/[id]/index.ts"));
module.exports = __webpack_exports__;

})();