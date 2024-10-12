/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n \r\n\r\n function gameboard() {\r\n    const rowlength = 10;\r\n    const columnlength = 10;\r\n    let board = []\r\n    for (let r = 0; r < rowlength; r++){\r\n        let row = [];\r\n        for (let c = 0; c < columnlength; c++){\r\n            row.push(0)\r\n       }\r\n       board.push(row);\r\n    }\r\n    console.log(board);\r\n    //empty spaces will be 0, ships will be ones, and hit spots will be 2\r\n\r\n\r\n    const createShips = () => {\r\n        const carrier = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(5);\r\n        const battleship = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(4);\r\n        const cruiser = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(3);\r\n        const submarine = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(3);\r\n        const destroyer = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(2);\r\n        \r\n        for(let i = 0; i < carrier.length; i++){\r\n            board[1][i + 1] = carrier;\r\n        }\r\n        \r\n    }\r\n\r\n    const receiveAttack = () => {\r\n        \r\n    }\r\n }\r\n\r\n gameboard();\r\n\r\n //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2FtZWJvYXJkLmpzIiwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixlQUFlO0FBQ25DO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0NBQUk7QUFDaEMsK0JBQStCLHdDQUFJO0FBQ25DLDRCQUE0Qix3Q0FBSTtBQUNoQyw4QkFBOEIsd0NBQUk7QUFDbEMsOEJBQThCLHdDQUFJO0FBQ2xDO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9nYW1lYm9hcmQuanM/ZmMzZSJdLCJzb3VyY2VzQ29udGVudCI6WyIgaW1wb3J0IHtTaGlwfSBmcm9tIFwiLi9zaGlwc1wiO1xyXG5cclxuIGZ1bmN0aW9uIGdhbWVib2FyZCgpIHtcclxuICAgIGNvbnN0IHJvd2xlbmd0aCA9IDEwO1xyXG4gICAgY29uc3QgY29sdW1ubGVuZ3RoID0gMTA7XHJcbiAgICBsZXQgYm9hcmQgPSBbXVxyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCByb3dsZW5ndGg7IHIrKyl7XHJcbiAgICAgICAgbGV0IHJvdyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY29sdW1ubGVuZ3RoOyBjKyspe1xyXG4gICAgICAgICAgICByb3cucHVzaCgwKVxyXG4gICAgICAgfVxyXG4gICAgICAgYm9hcmQucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYm9hcmQpO1xyXG4gICAgLy9lbXB0eSBzcGFjZXMgd2lsbCBiZSAwLCBzaGlwcyB3aWxsIGJlIG9uZXMsIGFuZCBoaXQgc3BvdHMgd2lsbCBiZSAyXHJcblxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZVNoaXBzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcclxuICAgICAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XHJcbiAgICAgICAgY29uc3QgY3J1aXNlciA9IG5ldyBTaGlwKDMpO1xyXG4gICAgICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMpO1xyXG4gICAgICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjYXJyaWVyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgYm9hcmRbMV1baSArIDFdID0gY2FycmllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICgpID0+IHtcclxuICAgICAgICBcclxuICAgIH1cclxuIH1cclxuXHJcbiBnYW1lYm9hcmQoKTtcclxuXHJcbiAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/gameboard.js\n");

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\r\n    constructor(length){\r\n        this.length = length;\r\n    }\r\n\r\n    hit(){\r\n\r\n    }\r\n\r\n    isSunk(){\r\n\r\n    }\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2hpcHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3NoaXBzLmpzPzVkNWUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNoaXAge1xyXG4gICAgY29uc3RydWN0b3IobGVuZ3RoKXtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBoaXQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaXNTdW5rKCl7XHJcblxyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/ships.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/gameboard.js");
/******/ 	
/******/ })()
;