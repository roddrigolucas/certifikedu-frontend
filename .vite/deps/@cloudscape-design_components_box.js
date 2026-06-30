"use client";
import {
  InternalBox
} from "./chunk-QRZONLZG.js";
import "./chunk-UPYVBQFI.js";
import {
  applyDisplayName,
  useBaseComponent
} from "./chunk-EFQZML4R.js";
import "./chunk-5BBL4WRE.js";
import "./chunk-LAJ4J425.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/box/index.js
var import_react = __toESM(require_react());
function Box({ variant = "div", margin = {}, padding = {}, ...props }) {
  const baseComponentProps = useBaseComponent("Box", {
    props: {
      color: props.color,
      display: props.display,
      float: props.float,
      fontSize: props.fontSize,
      fontWeight: props.fontWeight,
      textAlign: props.textAlign,
      variant
    }
  });
  return import_react.default.createElement(InternalBox, { variant, margin, padding, ...props, ...baseComponentProps });
}
applyDisplayName(Box, "Box");
export {
  Box as default
};
//# sourceMappingURL=@cloudscape-design_components_box.js.map
