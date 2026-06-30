"use client";
import {
  internal_default
} from "./chunk-TXOTYGJJ.js";
import "./chunk-A6RJQIQJ.js";
import "./chunk-OEIH233U.js";
import "./chunk-XKJOMHSK.js";
import "./chunk-5JE6SL2T.js";
import "./chunk-ICFQLI2S.js";
import "./chunk-AF2UB4B7.js";
import {
  getAnalyticsMetadataAttribute
} from "./chunk-M6E2PW6E.js";
import "./chunk-DLEXJQLO.js";
import "./chunk-UPYVBQFI.js";
import {
  applyDisplayName,
  useBaseComponent
} from "./chunk-EFQZML4R.js";
import "./chunk-636W5DY3.js";
import "./chunk-Q5GZAUWR.js";
import "./chunk-CDGJA232.js";
import "./chunk-5BBL4WRE.js";
import "./chunk-LAJ4J425.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/text-filter/index.js
var import_react = __toESM(require_react());
var TextFilter = import_react.default.forwardRef((props, ref) => {
  const baseComponentProps = useBaseComponent("TextFilter", {
    props: { disabled: props.disabled, disableBrowserAutocorrect: props.disableBrowserAutocorrect }
  });
  const componentAnalyticsMetadata = {
    name: "awsui.TextFilter",
    label: "input",
    properties: {
      disabled: `${!!props.disabled}`,
      filteringText: props.filteringText || ""
    }
  };
  return import_react.default.createElement(internal_default, { ...props, ...baseComponentProps, ref, ...getAnalyticsMetadataAttribute({ component: componentAnalyticsMetadata }) });
});
applyDisplayName(TextFilter, "TextFilter");
var text_filter_default = TextFilter;
export {
  text_filter_default as default
};
//# sourceMappingURL=@cloudscape-design_components_text-filter.js.map
