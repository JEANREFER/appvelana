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
exports.id = "pages/api/organizer/tasks";
exports.ids = ["pages/api/organizer/tasks"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// 📁 lib/prisma.ts\n// lib/prisma.ts\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1CQUFtQjtBQUNuQixnQkFBZ0I7QUFDNkI7QUFFN0MsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsR0FBRTtBQUVsRSxJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teXdlZGRpbmctbmV4dGpzLXRhaWx3aW5kLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIPCfk4EgbGliL3ByaXNtYS50c1xuLy8gbGliL3ByaXNtYS50c1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCJcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWFcblxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./pages/api/organizer/tasks.ts":
/*!**************************************!*\
  !*** ./pages/api/organizer/tasks.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(api)/./lib/prisma.ts\");\n// pages/api/organizer/weddings.ts\n\n\nasync function handler(req, res) {\n    const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({\n        req\n    });\n    if (!session || session.user.role !== \"organisateur\") {\n        return res.status(401).json({\n            error: \"Non autoris\\xe9\"\n        });\n    }\n    const weddings = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.wedding.findMany({\n        where: {\n            created_by: parseInt(session.user.id)\n        },\n        orderBy: {\n            wedding_date: \"asc\"\n        }\n    });\n    res.status(200).json(weddings);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvb3JnYW5pemVyL3Rhc2tzLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQyxrQ0FBa0M7QUFFUztBQUNQO0FBRXRCLGVBQWVFLFFBQVFDLEdBQW1CLEVBQUVDLEdBQW9CO0lBQzdFLE1BQU1DLFVBQVUsTUFBTUwsMkRBQVVBLENBQUM7UUFBRUc7SUFBSTtJQUV2QyxJQUFJLENBQUNFLFdBQVdBLFFBQVFDLElBQUksQ0FBQ0MsSUFBSSxLQUFLLGdCQUFnQjtRQUNwRCxPQUFPSCxJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZTtJQUN0RDtJQUVBLE1BQU1DLFdBQVcsTUFBTVYsK0NBQU1BLENBQUNXLE9BQU8sQ0FBQ0MsUUFBUSxDQUFDO1FBQzlDQyxPQUFPO1lBQUVDLFlBQVlDLFNBQVNYLFFBQVFDLElBQUksQ0FBQ1csRUFBRTtRQUFZO1FBQ3hEQyxTQUFTO1lBQUVDLGNBQWM7UUFBTTtJQUNqQztJQUVBZixJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDRTtBQUN2QiIsInNvdXJjZXMiOlsid2VicGFjazovL215d2VkZGluZy1uZXh0anMtdGFpbHdpbmQvLi9wYWdlcy9hcGkvb3JnYW5pemVyL3Rhc2tzLnRzPzFmN2YiXSwic291cmNlc0NvbnRlbnQiOlsiXHQvLyBwYWdlcy9hcGkvb3JnYW5pemVyL3dlZGRpbmdzLnRzXG5pbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCdcbmltcG9ydCB7IGdldFNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgvcmVhY3QnXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICdAL2xpYi9wcmlzbWEnXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxOiBOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oeyByZXEgfSlcblxuICBpZiAoIXNlc3Npb24gfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09ICdvcmdhbmlzYXRldXInKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgZXJyb3I6ICdOb24gYXV0b3Jpc8OpJyB9KVxuICB9XG5cbiAgY29uc3Qgd2VkZGluZ3MgPSBhd2FpdCBwcmlzbWEud2VkZGluZy5maW5kTWFueSh7XG4gICB3aGVyZTogeyBjcmVhdGVkX2J5OiBwYXJzZUludChzZXNzaW9uLnVzZXIuaWQgYXMgc3RyaW5nKSB9LFxuICAgIG9yZGVyQnk6IHsgd2VkZGluZ19kYXRlOiAnYXNjJyB9LFxuICB9KVxuXG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHdlZGRpbmdzKVxufVxuIl0sIm5hbWVzIjpbImdldFNlc3Npb24iLCJwcmlzbWEiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwic2Vzc2lvbiIsInVzZXIiLCJyb2xlIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwid2VkZGluZ3MiLCJ3ZWRkaW5nIiwiZmluZE1hbnkiLCJ3aGVyZSIsImNyZWF0ZWRfYnkiLCJwYXJzZUludCIsImlkIiwib3JkZXJCeSIsIndlZGRpbmdfZGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/organizer/tasks.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/organizer/tasks.ts"));
module.exports = __webpack_exports__;

})();