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
exports.id = "pages/api/auth/login";
exports.ids = ["pages/api/auth/login"];
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

/***/ "(api)/./pages/api/auth/login.ts":
/*!*********************************!*\
  !*** ./pages/api/auth/login.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n// ✅ Fichier : pages/api/auth/login.ts\n\nasync function handler(req, res) {\n    if (req.method !== \"POST\") return res.status(405).end();\n    const { email, password } = req.body;\n    if (!email || !password) return res.status(400).json({\n        message: \"Email et mot de passe requis\"\n    });\n    const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.user.findUnique({\n        where: {\n            email\n        }\n    });\n    if (!user || user.password !== password) return res.status(401).json({\n        message: \"Identifiants incorrects\"\n    });\n    res.status(200).json({\n        id: user.id,\n        name: user.name,\n        email,\n        role: user.role\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9sb2dpbi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNDQUFzQztBQUNPO0FBRTlCLGVBQWVDLFFBQVFDLEdBQUcsRUFBRUMsR0FBRztJQUM1QyxJQUFJRCxJQUFJRSxNQUFNLEtBQUssUUFBUSxPQUFPRCxJQUFJRSxNQUFNLENBQUMsS0FBS0MsR0FBRztJQUVyRCxNQUFNLEVBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFFLEdBQUdOLElBQUlPLElBQUk7SUFDcEMsSUFBSSxDQUFDRixTQUFTLENBQUNDLFVBQ2IsT0FBT0wsSUFBSUUsTUFBTSxDQUFDLEtBQUtLLElBQUksQ0FBQztRQUFFQyxTQUFTO0lBQStCO0lBRXhFLE1BQU1DLE9BQU8sTUFBTVosK0NBQU1BLENBQUNZLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1FBQUVDLE9BQU87WUFBRVA7UUFBTTtJQUFFO0lBRTdELElBQUksQ0FBQ0ssUUFBUUEsS0FBS0osUUFBUSxLQUFLQSxVQUM3QixPQUFPTCxJQUFJRSxNQUFNLENBQUMsS0FBS0ssSUFBSSxDQUFDO1FBQUVDLFNBQVM7SUFBMEI7SUFFbkVSLElBQUlFLE1BQU0sQ0FBQyxLQUFLSyxJQUFJLENBQUM7UUFBRUssSUFBSUgsS0FBS0csRUFBRTtRQUFFQyxNQUFNSixLQUFLSSxJQUFJO1FBQUVUO1FBQU9VLE1BQU1MLEtBQUtLLElBQUk7SUFBQztBQUM5RSIsInNvdXJjZXMiOlsid2VicGFjazovL215d2VkZGluZy1uZXh0anMtdGFpbHdpbmQvLi9wYWdlcy9hcGkvYXV0aC9sb2dpbi50cz83NDRkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIOKchSBGaWNoaWVyIDogcGFnZXMvYXBpL2F1dGgvbG9naW4udHNcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIi4uLy4uLy4uL2xpYi9wcmlzbWFcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICBpZiAocmVxLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHJldHVybiByZXMuc3RhdHVzKDQwNSkuZW5kKCk7XHJcblxyXG4gIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcclxuICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZClcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiRW1haWwgZXQgbW90IGRlIHBhc3NlIHJlcXVpc1wiIH0pO1xyXG5cclxuICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGVtYWlsIH0gfSk7XHJcblxyXG4gIGlmICghdXNlciB8fCB1c2VyLnBhc3N3b3JkICE9PSBwYXNzd29yZClcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6IFwiSWRlbnRpZmlhbnRzIGluY29ycmVjdHNcIiB9KTtcclxuXHJcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBpZDogdXNlci5pZCwgbmFtZTogdXNlci5uYW1lLCBlbWFpbCwgcm9sZTogdXNlci5yb2xlIH0pO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJwcmlzbWEiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwiZW5kIiwiZW1haWwiLCJwYXNzd29yZCIsImJvZHkiLCJqc29uIiwibWVzc2FnZSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpZCIsIm5hbWUiLCJyb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/login.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/login.ts"));
module.exports = __webpack_exports__;

})();