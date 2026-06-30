"use client";
import {
  InternalHeader
} from "./chunk-IUYXTT3A.js";
import "./chunk-A6RJQIQJ.js";
import "./chunk-OEIH233U.js";
import "./chunk-ONPXF3KM.js";
import "./chunk-V6HLTBDJ.js";
import "./chunk-7ITRMATN.js";
import "./chunk-J5AO3UDI.js";
import "./chunk-M6E2PW6E.js";
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

// node_modules/@cloudscape-design/components/header/index.js
var import_react = __toESM(require_react());
function Header({ variant = "h2", ...props }) {
  const baseComponentProps = useBaseComponent("Header", {
    props: { headingTagOverride: props.headingTagOverride, variant }
  });
  const tabIndex = variant === "h1" ? -1 : void 0;
  return import_react.default.createElement(InternalHeader, { __headingTagTabIndex: tabIndex, variant, ...props, ...baseComponentProps });
}
applyDisplayName(Header, "Header");
export {
  Header as default
};
//# sourceMappingURL=@cloudscape-design_components_header.js.map
