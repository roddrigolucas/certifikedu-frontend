import {
  warnOnce
} from "./chunk-5BBL4WRE.js";

// node_modules/@cloudscape-design/components/internal/is-development.js
var isDevelopment = true;

// node_modules/@cloudscape-design/components/internal/hooks/check-controlled/index.js
function checkControlled(componentName, propertyName, propertyValue, handlerName, handlerValue) {
  if (propertyValue !== void 0 && handlerValue === void 0 && isDevelopment) {
    warnOnce(componentName, `You provided \`${propertyName}\` prop without an \`${handlerName}\` handler. This will render a read-only component. If the component should be mutable, set an \`${handlerName}\` handler.`);
  }
}

export {
  isDevelopment,
  checkControlled
};
//# sourceMappingURL=chunk-ZFEHNID6.js.map
