import {
  debounce
} from "./chunk-AF2UB4B7.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/internal/context/form-field-context.js
var import_react = __toESM(require_react());
var FormFieldContext = (0, import_react.createContext)({});
function applyDefault(fields, defaults, keys) {
  const result = {};
  keys.forEach((key) => {
    result[key] = fields[key] === void 0 ? defaults[key] : fields[key];
  });
  return result;
}
function useFormFieldContext(props) {
  const context = (0, import_react.useContext)(FormFieldContext);
  return applyDefault(props, context, ["invalid", "warning", "controlId", "ariaLabelledby", "ariaDescribedby"]);
}

// node_modules/@cloudscape-design/components/internal/hooks/use-debounce-callback/index.js
var import_react2 = __toESM(require_react());
function useDebounceCallback(callback, delay) {
  const callbackRef = (0, import_react2.useRef)();
  callbackRef.current = callback;
  return (0, import_react2.useCallback)(debounce((...args) => {
    if (callbackRef.current) {
      callbackRef.current(...args);
    }
  }, delay), []);
}

export {
  FormFieldContext,
  useFormFieldContext,
  useDebounceCallback
};
//# sourceMappingURL=chunk-5JE6SL2T.js.map
