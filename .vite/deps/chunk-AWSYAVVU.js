import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var import_react = __toESM(require_react(), 1);
var $9f79659886946c16$export$e5c5a5f917a5871c = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? import_react.useLayoutEffect : () => {
};

// node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var import_react2 = __toESM(require_react(), 1);
function $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback) {
  const callbackRef = (0, import_react2.useRef)(callback);
  (0, import_react2.useEffect)(() => {
    callbackRef.current = callback;
  });
  return (0, import_react2.useMemo)(
    () => (...args) => {
      var _callbackRef$current;
      return (_callbackRef$current = callbackRef.current) === null || _callbackRef$current === void 0 ? void 0 : _callbackRef$current.call(callbackRef, ...args);
    },
    []
  );
}

export {
  $9f79659886946c16$export$e5c5a5f917a5871c,
  $b1b2314f5f9a1d84$export$25bec8c6f54ee79a
};
//# sourceMappingURL=chunk-AWSYAVVU.js.map
