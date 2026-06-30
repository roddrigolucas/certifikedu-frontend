import {
  with_native_attributes_default
} from "./chunk-UPYVBQFI.js";
import {
  clsx_m_default,
  getBaseProps
} from "./chunk-EFQZML4R.js";
import {
  useMergeRefs,
  warnOnce
} from "./chunk-5BBL4WRE.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __commonJS,
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/@cloudscape-design/components/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_SERVER_CONTEXT_TYPE:
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment2(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        function isSuspenseList(object) {
          return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.SuspenseList = SuspenseList;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment2;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isSuspenseList = isSuspenseList;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/@cloudscape-design/components/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/@cloudscape-design/components/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/@cloudscape-design/components/space-between/internal.js
var import_react4 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/utils/flatten-children.js
var import_react3 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/vendor/react-keyed-flatten-children/index.js
var import_react = __toESM(require_react());
var import_react_is = __toESM(require_react_is());
function isFragmentWithChildren(node) {
  return (0, import_react_is.isFragment)(node);
}
function flattenChildren(children, depth = 0, keys = [], componentName) {
  return import_react.Children.toArray(children).reduce((acc, node, nodeIndex) => {
    if (isFragmentWithChildren(node)) {
      warnOnce(componentName, "React.Fragment children are flattened in React 18 but not in React 19+. Use arrays instead of fragments for consistent behavior.");
      acc.push(...flattenChildren(node.props.children, depth + 1, keys.concat(node.key || nodeIndex), componentName));
    } else if ((0, import_react.isValidElement)(node)) {
      acc.push((0, import_react.cloneElement)(node, {
        key: keys.concat(String(node.key)).join(".")
      }));
    } else if (typeof node === "string" || typeof node === "number") {
      acc.push(node);
    }
    return acc;
  }, []);
}

// node_modules/@cloudscape-design/components/internal/utils/react-version.js
var import_react2 = __toESM(require_react());
function getReactMajorVersion() {
  var _a;
  const versionString = (_a = import_react2.default.version) === null || _a === void 0 ? void 0 : _a.split(".")[0];
  return versionString ? parseInt(versionString, 10) : NaN;
}

// node_modules/@cloudscape-design/components/internal/utils/flatten-children.js
function flattenChildren2(children, componentName) {
  const majorVersion = getReactMajorVersion();
  if (!Number.isNaN(majorVersion) && majorVersion < 19) {
    return flattenChildren(children, 0, [], componentName);
  }
  return import_react3.default.Children.toArray(children);
}

// node_modules/@cloudscape-design/components/space-between/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/space-between/styles.scoped.css";
var styles_css_default = {
  "root": "awsui_root_18582_1jqoe_145",
  "child": "awsui_child_18582_1jqoe_149",
  "horizontal": "awsui_horizontal_18582_1jqoe_160",
  "horizontal-xxxs": "awsui_horizontal-xxxs_18582_1jqoe_164",
  "horizontal-xxs": "awsui_horizontal-xxs_18582_1jqoe_167",
  "horizontal-xs": "awsui_horizontal-xs_18582_1jqoe_170",
  "horizontal-s": "awsui_horizontal-s_18582_1jqoe_173",
  "horizontal-m": "awsui_horizontal-m_18582_1jqoe_176",
  "horizontal-l": "awsui_horizontal-l_18582_1jqoe_179",
  "horizontal-xl": "awsui_horizontal-xl_18582_1jqoe_182",
  "horizontal-xxl": "awsui_horizontal-xxl_18582_1jqoe_185",
  "vertical": "awsui_vertical_18582_1jqoe_192",
  "vertical-xxxs": "awsui_vertical-xxxs_18582_1jqoe_195",
  "vertical-xxs": "awsui_vertical-xxs_18582_1jqoe_198",
  "vertical-xs": "awsui_vertical-xs_18582_1jqoe_201",
  "vertical-s": "awsui_vertical-s_18582_1jqoe_204",
  "vertical-m": "awsui_vertical-m_18582_1jqoe_207",
  "vertical-l": "awsui_vertical-l_18582_1jqoe_210",
  "vertical-xl": "awsui_vertical-xl_18582_1jqoe_213",
  "vertical-xxl": "awsui_vertical-xxl_18582_1jqoe_216",
  "align-center": "awsui_align-center_18582_1jqoe_220",
  "align-start": "awsui_align-start_18582_1jqoe_224",
  "align-end": "awsui_align-end_18582_1jqoe_228"
};

// node_modules/@cloudscape-design/components/space-between/internal.js
var InternalSpaceBetween = (0, import_react4.forwardRef)(({ direction = "vertical", size, children, alignItems, nativeAttributes, __internalRootRef, ...props }, ref) => {
  const mergedRef = useMergeRefs(ref, __internalRootRef);
  const baseProps = getBaseProps(props);
  const flattenedChildren = flattenChildren2(children, "SpaceBetween");
  return import_react4.default.createElement(with_native_attributes_default, { ...baseProps, tag: "div", componentName: "SpaceBetween", nativeAttributes, className: clsx_m_default(baseProps.className, styles_css_default.root, styles_css_default[direction], styles_css_default[`${direction}-${size}`], alignItems && styles_css_default[`align-${alignItems}`]), ref: mergedRef }, flattenedChildren.map((child) => {
    const key = child && typeof child === "object" ? child.key : void 0;
    return import_react4.default.createElement("div", { key: key ? String(key) : void 0, className: styles_css_default.child }, child);
  }));
});
var internal_default = InternalSpaceBetween;

export {
  flattenChildren2 as flattenChildren,
  internal_default
};
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (**
   * @license React
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-NTNXT65H.js.map
