import {
  clsx_m_default
} from "./chunk-EFQZML4R.js";
import {
  warnOnce
} from "./chunk-5BBL4WRE.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/internal/utils/with-native-attributes.js
var import_react = __toESM(require_react());
function processAttributes(rest, nativeAttributes, componentName, skipWarnings) {
  return Object.entries(nativeAttributes || {}).reduce((acc, [key, value]) => {
    if (key === "className") {
      acc[key] = clsx_m_default(rest.className, value);
    } else if (key === "style") {
      acc[key] = { ...rest.style, ...value };
    } else if (key.match(/^on[A-Z]/) && typeof value === "function" && key in rest) {
      acc[key] = (event) => {
        value(event);
        if (!event.defaultPrevented) {
          rest[key](event);
        }
      };
    } else {
      if (key in rest && (!skipWarnings || skipWarnings !== true && !skipWarnings.includes(key))) {
        warnOnce(componentName, `Overriding native attribute [${key}] which has a Cloudscape-provided value`);
      }
      acc[key] = value;
    }
    return acc;
  }, { ...rest });
}
var with_native_attributes_default = import_react.default.forwardRef(({ tag, nativeAttributes, children, skipWarnings, componentName, ...rest }, ref) => {
  const Tag = tag;
  const processedAttributes = processAttributes(rest, nativeAttributes, componentName, skipWarnings);
  return import_react.default.createElement(Tag, { ...processedAttributes, ref }, children);
});

export {
  processAttributes,
  with_native_attributes_default
};
//# sourceMappingURL=chunk-UPYVBQFI.js.map
