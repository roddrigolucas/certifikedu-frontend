"use client";
import {
  internal_default
} from "./chunk-NTNXT65H.js";
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

// node_modules/@cloudscape-design/components/space-between/index.js
var import_react = __toESM(require_react());
function SpaceBetween({ direction = "vertical", ...props }) {
  const baseComponentProps = useBaseComponent("SpaceBetween", {
    props: { alignItems: props.alignItems, direction, size: props.size }
  });
  return import_react.default.createElement(internal_default, { direction, ...props, ...baseComponentProps });
}
applyDisplayName(SpaceBetween, "SpaceBetween");
export {
  SpaceBetween as default
};
//# sourceMappingURL=@cloudscape-design_components_space-between.js.map
