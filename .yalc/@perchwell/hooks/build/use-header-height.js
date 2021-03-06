"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOBILE_HEADER_ID = exports.STICKY_HEADER_ID = exports.EXPANDED_HEADER_ID = exports["default"] = void 0;

var _react = require("react");

var _useCurrentBreakpoint = _interopRequireDefault(require("./use-current-breakpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EXPANDED_HEADER_ID = 'expandedHeader';
exports.EXPANDED_HEADER_ID = EXPANDED_HEADER_ID;
var STICKY_HEADER_ID = 'stickyHeader';
exports.STICKY_HEADER_ID = STICKY_HEADER_ID;
var MOBILE_HEADER_ID = 'mobileHeader';
exports.MOBILE_HEADER_ID = MOBILE_HEADER_ID;
var mapTypeToId = {
  sticky: STICKY_HEADER_ID,
  expanded: EXPANDED_HEADER_ID,
  mobile: MOBILE_HEADER_ID
};

function useHeaderHeight() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'expanded';

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];

  var currentBreakpoint = (0, _useCurrentBreakpoint["default"])();
  (0, _react.useEffect)(function () {
    var header = document.getElementById(mapTypeToId[type]);

    if (header) {
      setHeight(header.offsetHeight);
      return;
    }

    var mobileHeader = document.getElementById(mapTypeToId['mobile']);

    if (mobileHeader) {
      setHeight(mobileHeader.offsetHeight);
      return;
    }
  }, [type, currentBreakpoint]);
  return height;
}

var _default = useHeaderHeight;
exports["default"] = _default;