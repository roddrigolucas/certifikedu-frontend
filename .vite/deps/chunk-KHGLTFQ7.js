import {
  TokenInlineContext,
  defaultValue as defaultValue2
} from "./chunk-WJTR4N7X.js";
import {
  InfoLinkLabelContext
} from "./chunk-ONPXF3KM.js";
import {
  CollectionLabelContext
} from "./chunk-7ITRMATN.js";
import {
  FormFieldContext
} from "./chunk-5JE6SL2T.js";
import {
  ButtonContext,
  LinkDefaultVariantContext,
  defaultValue
} from "./chunk-AF2UB4B7.js";
import {
  SingleTabStopNavigationReset
} from "./chunk-5BBL4WRE.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/internal/context/reset-contexts-for-modal.js
var import_react = __toESM(require_react());
var ResetContextsForModal = ({ children }) => import_react.default.createElement(
  ButtonContext.Provider,
  { value: { onClick: () => {
  } } },
  import_react.default.createElement(
    CollectionLabelContext.Provider,
    { value: { assignId: () => {
    } } },
    import_react.default.createElement(
      FormFieldContext.Provider,
      { value: {} },
      import_react.default.createElement(
        InfoLinkLabelContext.Provider,
        { value: "" },
        import_react.default.createElement(
          LinkDefaultVariantContext.Provider,
          { value: defaultValue },
          import_react.default.createElement(
            TokenInlineContext.Provider,
            { value: defaultValue2 },
            import_react.default.createElement(SingleTabStopNavigationReset, null, children)
          )
        )
      )
    )
  )
);
var reset_contexts_for_modal_default = ResetContextsForModal;

export {
  reset_contexts_for_modal_default
};
//# sourceMappingURL=chunk-KHGLTFQ7.js.map
