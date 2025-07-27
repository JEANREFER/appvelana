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
exports.id = "pages/api/weddings/[id]/budget";
exports.ids = ["pages/api/weddings/[id]/budget"];
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

/***/ "(api)/./pages/api/weddings/[id]/budget/index.ts":
/*!*************************************************!*\
  !*** ./pages/api/weddings/[id]/budget/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(api)/./lib/prisma.ts\");\n// 📁 pages/api/weddings/[id]/budget/index.ts\n\nasync function handler(req, res) {\n    const { id } = req.query;\n    const weddingId = parseInt(id);\n    if (isNaN(weddingId)) return res.status(400).json({\n        message: \"ID invalide\"\n    });\n    if (req.method === \"GET\") {\n        const entries = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.budgetEntry.findMany({\n            where: {\n                weddingId\n            },\n            orderBy: {\n                id: \"asc\"\n            }\n        });\n        return res.status(200).json(entries);\n    }\n    if (req.method === \"POST\") {\n        const { description, amount, type } = req.body;\n        if (!description || !amount || !type) {\n            return res.status(400).json({\n                message: \"Champs manquants.\"\n            });\n        }\n        const newEntry = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.budgetEntry.create({\n            data: {\n                description,\n                amount: parseFloat(amount),\n                type,\n                weddingId\n            }\n        });\n        return res.status(200).json(newEntry);\n    }\n    return res.status(405).json({\n        message: \"M\\xe9thode non autoris\\xe9e\"\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvd2VkZGluZ3MvW2lkXS9idWRnZXQvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2Q0FBNkM7QUFDUDtBQUV2QixlQUFlQyxRQUFRQyxHQUFHLEVBQUVDLEdBQUc7SUFDNUMsTUFBTSxFQUFFQyxFQUFFLEVBQUUsR0FBR0YsSUFBSUcsS0FBSztJQUN4QixNQUFNQyxZQUFZQyxTQUFTSDtJQUUzQixJQUFJSSxNQUFNRixZQUFZLE9BQU9ILElBQUlNLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7UUFBRUMsU0FBUztJQUFjO0lBRTNFLElBQUlULElBQUlVLE1BQU0sS0FBSyxPQUFPO1FBQ3hCLE1BQU1DLFVBQVUsTUFBTWIsK0NBQU1BLENBQUNjLFdBQVcsQ0FBQ0MsUUFBUSxDQUFDO1lBQ2hEQyxPQUFPO2dCQUFFVjtZQUFVO1lBQ25CVyxTQUFTO2dCQUFFYixJQUFJO1lBQU07UUFDdkI7UUFDQSxPQUFPRCxJQUFJTSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDRztJQUM5QjtJQUVBLElBQUlYLElBQUlVLE1BQU0sS0FBSyxRQUFRO1FBQ3pCLE1BQU0sRUFBRU0sV0FBVyxFQUFFQyxNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHbEIsSUFBSW1CLElBQUk7UUFDOUMsSUFBSSxDQUFDSCxlQUFlLENBQUNDLFVBQVUsQ0FBQ0MsTUFBTTtZQUNwQyxPQUFPakIsSUFBSU0sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFvQjtRQUM3RDtRQUVBLE1BQU1XLFdBQVcsTUFBTXRCLCtDQUFNQSxDQUFDYyxXQUFXLENBQUNTLE1BQU0sQ0FBQztZQUMvQ0MsTUFBTTtnQkFDSk47Z0JBQ0FDLFFBQVFNLFdBQVdOO2dCQUNuQkM7Z0JBQ0FkO1lBQ0Y7UUFDRjtRQUNBLE9BQU9ILElBQUlNLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNZO0lBQzlCO0lBRUEsT0FBT25CLElBQUlNLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7UUFBRUMsU0FBUztJQUF3QjtBQUNqRSIsInNvdXJjZXMiOlsid2VicGFjazovL215d2VkZGluZy1uZXh0anMtdGFpbHdpbmQvLi9wYWdlcy9hcGkvd2VkZGluZ3MvW2lkXS9idWRnZXQvaW5kZXgudHM/YmUzMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyDwn5OBIHBhZ2VzL2FwaS93ZWRkaW5ncy9baWRdL2J1ZGdldC9pbmRleC50c1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIGNvbnN0IHsgaWQgfSA9IHJlcS5xdWVyeTtcbiAgY29uc3Qgd2VkZGluZ0lkID0gcGFyc2VJbnQoaWQpO1xuXG4gIGlmIChpc05hTih3ZWRkaW5nSWQpKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIklEIGludmFsaWRlXCIgfSk7XG5cbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgcHJpc21hLmJ1ZGdldEVudHJ5LmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7IHdlZGRpbmdJZCB9LFxuICAgICAgb3JkZXJCeTogeyBpZDogXCJhc2NcIiB9LFxuICAgIH0pO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihlbnRyaWVzKTtcbiAgfVxuXG4gIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgIGNvbnN0IHsgZGVzY3JpcHRpb24sIGFtb3VudCwgdHlwZSB9ID0gcmVxLmJvZHk7XG4gICAgaWYgKCFkZXNjcmlwdGlvbiB8fCAhYW1vdW50IHx8ICF0eXBlKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIkNoYW1wcyBtYW5xdWFudHMuXCIgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV3RW50cnkgPSBhd2FpdCBwcmlzbWEuYnVkZ2V0RW50cnkuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGFtb3VudDogcGFyc2VGbG9hdChhbW91bnQpLFxuICAgICAgICB0eXBlLFxuICAgICAgICB3ZWRkaW5nSWQsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihuZXdFbnRyeSk7XG4gIH1cblxuICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBtZXNzYWdlOiBcIk3DqXRob2RlIG5vbiBhdXRvcmlzw6llXCIgfSk7XG59XG4iXSwibmFtZXMiOlsicHJpc21hIiwiaGFuZGxlciIsInJlcSIsInJlcyIsImlkIiwicXVlcnkiLCJ3ZWRkaW5nSWQiLCJwYXJzZUludCIsImlzTmFOIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJtZXRob2QiLCJlbnRyaWVzIiwiYnVkZ2V0RW50cnkiLCJmaW5kTWFueSIsIndoZXJlIiwib3JkZXJCeSIsImRlc2NyaXB0aW9uIiwiYW1vdW50IiwidHlwZSIsImJvZHkiLCJuZXdFbnRyeSIsImNyZWF0ZSIsImRhdGEiLCJwYXJzZUZsb2F0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/weddings/[id]/budget/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/weddings/[id]/budget/index.ts"));
module.exports = __webpack_exports__;

})();