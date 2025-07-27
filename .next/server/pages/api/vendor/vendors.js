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
exports.id = "pages/api/vendor/vendors";
exports.ids = ["pages/api/vendor/vendors"];
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

/***/ "(api)/./pages/api/vendor/vendors.ts":
/*!*************************************!*\
  !*** ./pages/api/vendor/vendors.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(api)/./lib/prisma.ts\");\n\nasync function handler(req, res) {\n    if (req.method !== \"GET\") {\n        return res.status(405).json({\n            success: false,\n            message: \"M\\xe9thode non autoris\\xe9e\"\n        });\n    }\n    const { type } = req.query;\n    try {\n        const vendors = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.vendor.findMany({\n            where: {\n                validated: true,\n                ...type && type !== \"all\" ? {\n                    type: String(type)\n                } : {}\n            },\n            orderBy: {\n                name: \"asc\"\n            },\n            select: {\n                id: true,\n                name: true,\n                city: true,\n                type: true,\n                description: true,\n                price: true,\n                imageUrl: true\n            }\n        });\n        return res.status(200).json({\n            success: true,\n            count: vendors.length,\n            vendors\n        });\n    } catch (error) {\n        console.error(\"Erreur lors de la r\\xe9cup\\xe9ration des prestataires :\", error);\n        return res.status(500).json({\n            success: false,\n            message: \"Erreur serveur\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdmVuZG9yL3ZlbmRvcnMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDcUM7QUFFdEIsZUFBZUMsUUFBUUMsR0FBbUIsRUFBRUMsR0FBb0I7SUFDN0UsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLE9BQU87UUFDeEIsT0FBT0QsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFQyxTQUFTO1lBQU9DLFNBQVM7UUFBd0I7SUFDakY7SUFFQSxNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHUCxJQUFJUSxLQUFLO0lBRTFCLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1YLCtDQUFNQSxDQUFDWSxNQUFNLENBQUNDLFFBQVEsQ0FBQztZQUMzQ0MsT0FBTztnQkFDTEMsV0FBVztnQkFDWCxHQUFJTixRQUFRQSxTQUFTLFFBQVE7b0JBQUVBLE1BQU1PLE9BQU9QO2dCQUFNLElBQUksQ0FBQyxDQUFDO1lBQzFEO1lBQ0FRLFNBQVM7Z0JBQUVDLE1BQU07WUFBTTtZQUN2QkMsUUFBUTtnQkFDTkMsSUFBSTtnQkFDSkYsTUFBTTtnQkFDTkcsTUFBTTtnQkFDTlosTUFBTTtnQkFDTmEsYUFBYTtnQkFDYkMsT0FBTztnQkFDUEMsVUFBVTtZQUNaO1FBQ0Y7UUFFQSxPQUFPckIsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUMxQkMsU0FBUztZQUNUa0IsT0FBT2QsUUFBUWUsTUFBTTtZQUNyQmY7UUFDRjtJQUNGLEVBQUUsT0FBT2dCLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLDJEQUFxREE7UUFDbkUsT0FBT3hCLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsU0FBUztZQUFPQyxTQUFTO1FBQWlCO0lBQzFFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teXdlZGRpbmctbmV4dGpzLXRhaWx3aW5kLy4vcGFnZXMvYXBpL3ZlbmRvci92ZW5kb3JzLnRzP2UwZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnO1xyXG5pbXBvcnQge3ByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSB7XHJcbiAgaWYgKHJlcS5tZXRob2QgIT09ICdHRVQnKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ03DqXRob2RlIG5vbiBhdXRvcmlzw6llJyB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgdHlwZSB9ID0gcmVxLnF1ZXJ5O1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgdmVuZG9ycyA9IGF3YWl0IHByaXNtYS52ZW5kb3IuZmluZE1hbnkoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIHZhbGlkYXRlZDogdHJ1ZSxcclxuICAgICAgICAuLi4odHlwZSAmJiB0eXBlICE9PSAnYWxsJyA/IHsgdHlwZTogU3RyaW5nKHR5cGUpIH0gOiB7fSlcclxuICAgICAgfSxcclxuICAgICAgb3JkZXJCeTogeyBuYW1lOiAnYXNjJyB9LFxyXG4gICAgICBzZWxlY3Q6IHtcclxuICAgICAgICBpZDogdHJ1ZSxcclxuICAgICAgICBuYW1lOiB0cnVlLFxyXG4gICAgICAgIGNpdHk6IHRydWUsXHJcbiAgICAgICAgdHlwZTogdHJ1ZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogdHJ1ZSxcclxuICAgICAgICBwcmljZTogdHJ1ZSxcclxuICAgICAgICBpbWFnZVVybDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBjb3VudDogdmVuZG9ycy5sZW5ndGgsXHJcbiAgICAgIHZlbmRvcnNcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZGVzIHByZXN0YXRhaXJlcyA6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnRXJyZXVyIHNlcnZldXInIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsicHJpc21hIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInN0YXR1cyIsImpzb24iLCJzdWNjZXNzIiwibWVzc2FnZSIsInR5cGUiLCJxdWVyeSIsInZlbmRvcnMiLCJ2ZW5kb3IiLCJmaW5kTWFueSIsIndoZXJlIiwidmFsaWRhdGVkIiwiU3RyaW5nIiwib3JkZXJCeSIsIm5hbWUiLCJzZWxlY3QiLCJpZCIsImNpdHkiLCJkZXNjcmlwdGlvbiIsInByaWNlIiwiaW1hZ2VVcmwiLCJjb3VudCIsImxlbmd0aCIsImVycm9yIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/vendor/vendors.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/vendor/vendors.ts"));
module.exports = __webpack_exports__;

})();