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
exports.id = "pages/api/weddings/[id]/tasks";
exports.ids = ["pages/api/weddings/[id]/tasks"];
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

/***/ "(api)/./pages/api/weddings/[id]/tasks/index.ts":
/*!************************************************!*\
  !*** ./pages/api/weddings/[id]/tasks/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n\nasync function handler(req, res) {\n    const { id } = req.query;\n    if (req.method === \"POST\") {\n        const { type, description, due_date, status } = req.body;\n        if (!type || !status) {\n            return res.status(400).json({\n                message: \"Le type et le statut sont obligatoires.\"\n            });\n        }\n        try {\n            const task = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.task.create({\n                data: {\n                    title: type,\n                    type,\n                    description,\n                    due_date: due_date ? new Date(due_date) : null,\n                    status,\n                    weddingId: parseInt(id),\n                    completed: status === \"Fait\"\n                }\n            });\n            return res.status(201).json(task);\n        } catch (error) {\n            console.error(\"Erreur cr\\xe9ation t\\xe2che :\", error);\n            return res.status(500).json({\n                message: \"Erreur serveur lors de la cr\\xe9ation de la t\\xe2che.\"\n            });\n        }\n    }\n    if (req.method === \"GET\") {\n        const tasks = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.task.findMany({\n            where: {\n                weddingId: parseInt(id)\n            },\n            orderBy: {\n                due_date: \"asc\"\n            }\n        });\n        return res.status(200).json(tasks);\n    }\n    return res.status(405).json({\n        message: \"M\\xe9thode non autoris\\xe9e.\"\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvd2VkZGluZ3MvW2lkXS90YXNrcy9pbmRleC50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFtRDtBQUVwQyxlQUFlQyxRQUFRQyxHQUFHLEVBQUVDLEdBQUc7SUFDNUMsTUFBTSxFQUFFQyxFQUFFLEVBQUUsR0FBR0YsSUFBSUcsS0FBSztJQUV4QixJQUFJSCxJQUFJSSxNQUFNLEtBQUssUUFBUTtRQUN6QixNQUFNLEVBQUVDLElBQUksRUFBRUMsV0FBVyxFQUFFQyxRQUFRLEVBQUVDLE1BQU0sRUFBRSxHQUFHUixJQUFJUyxJQUFJO1FBRXhELElBQUksQ0FBQ0osUUFBUSxDQUFDRyxRQUFRO1lBQ3BCLE9BQU9QLElBQUlPLE1BQU0sQ0FBQyxLQUFLRSxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBMEM7UUFDbkY7UUFFQSxJQUFJO1lBQ0YsTUFBTUMsT0FBTyxNQUFNZCwrQ0FBTUEsQ0FBQ2MsSUFBSSxDQUFDQyxNQUFNLENBQUM7Z0JBQ3BDQyxNQUFNO29CQUNKQyxPQUFPVjtvQkFDUEE7b0JBQ0FDO29CQUNBQyxVQUFVQSxXQUFXLElBQUlTLEtBQUtULFlBQVk7b0JBQzFDQztvQkFDQVMsV0FBV0MsU0FBU2hCO29CQUNwQmlCLFdBQVdYLFdBQVc7Z0JBQ3hCO1lBQ0Y7WUFFQSxPQUFPUCxJQUFJTyxNQUFNLENBQUMsS0FBS0UsSUFBSSxDQUFDRTtRQUM5QixFQUFFLE9BQU9RLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLGlDQUEyQkE7WUFDekMsT0FBT25CLElBQUlPLE1BQU0sQ0FBQyxLQUFLRSxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBa0Q7UUFDM0Y7SUFDRjtJQUVBLElBQUlYLElBQUlJLE1BQU0sS0FBSyxPQUFPO1FBQ3hCLE1BQU1rQixRQUFRLE1BQU14QiwrQ0FBTUEsQ0FBQ2MsSUFBSSxDQUFDVyxRQUFRLENBQUM7WUFDdkNDLE9BQU87Z0JBQUVQLFdBQVdDLFNBQVNoQjtZQUFJO1lBQ2pDdUIsU0FBUztnQkFBRWxCLFVBQVU7WUFBTTtRQUM3QjtRQUNBLE9BQU9OLElBQUlPLE1BQU0sQ0FBQyxLQUFLRSxJQUFJLENBQUNZO0lBQzlCO0lBRUEsT0FBT3JCLElBQUlPLE1BQU0sQ0FBQyxLQUFLRSxJQUFJLENBQUM7UUFBRUMsU0FBUztJQUF5QjtBQUNsRSIsInNvdXJjZXMiOlsid2VicGFjazovL215d2VkZGluZy1uZXh0anMtdGFpbHdpbmQvLi9wYWdlcy9hcGkvd2VkZGluZ3MvW2lkXS90YXNrcy9pbmRleC50cz80YWJhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByaXNtYSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9saWIvcHJpc21hXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgY29uc3QgeyBpZCB9ID0gcmVxLnF1ZXJ5O1xuXG4gIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgIGNvbnN0IHsgdHlwZSwgZGVzY3JpcHRpb24sIGR1ZV9kYXRlLCBzdGF0dXMgfSA9IHJlcS5ib2R5O1xuXG4gICAgaWYgKCF0eXBlIHx8ICFzdGF0dXMpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiTGUgdHlwZSBldCBsZSBzdGF0dXQgc29udCBvYmxpZ2F0b2lyZXMuXCIgfSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRhc2sgPSBhd2FpdCBwcmlzbWEudGFzay5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGl0bGU6IHR5cGUsXG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBkdWVfZGF0ZTogZHVlX2RhdGUgPyBuZXcgRGF0ZShkdWVfZGF0ZSkgOiBudWxsLFxuICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICB3ZWRkaW5nSWQ6IHBhcnNlSW50KGlkKSxcbiAgICAgICAgICBjb21wbGV0ZWQ6IHN0YXR1cyA9PT0gXCJGYWl0XCJcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuanNvbih0YXNrKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBjcsOpYXRpb24gdMOiY2hlIDpcIiwgZXJyb3IpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJFcnJldXIgc2VydmV1ciBsb3JzIGRlIGxhIGNyw6lhdGlvbiBkZSBsYSB0w6JjaGUuXCIgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICBjb25zdCB0YXNrcyA9IGF3YWl0IHByaXNtYS50YXNrLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7IHdlZGRpbmdJZDogcGFyc2VJbnQoaWQpIH0sXG4gICAgICBvcmRlckJ5OiB7IGR1ZV9kYXRlOiBcImFzY1wiIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24odGFza3MpO1xuICB9XG5cbiAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5qc29uKHsgbWVzc2FnZTogXCJNw6l0aG9kZSBub24gYXV0b3Jpc8OpZS5cIiB9KTtcbn1cbiJdLCJuYW1lcyI6WyJwcmlzbWEiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiaWQiLCJxdWVyeSIsIm1ldGhvZCIsInR5cGUiLCJkZXNjcmlwdGlvbiIsImR1ZV9kYXRlIiwic3RhdHVzIiwiYm9keSIsImpzb24iLCJtZXNzYWdlIiwidGFzayIsImNyZWF0ZSIsImRhdGEiLCJ0aXRsZSIsIkRhdGUiLCJ3ZWRkaW5nSWQiLCJwYXJzZUludCIsImNvbXBsZXRlZCIsImVycm9yIiwiY29uc29sZSIsInRhc2tzIiwiZmluZE1hbnkiLCJ3aGVyZSIsIm9yZGVyQnkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/weddings/[id]/tasks/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/weddings/[id]/tasks/index.ts"));
module.exports = __webpack_exports__;

})();