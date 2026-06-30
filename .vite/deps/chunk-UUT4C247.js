import {
  InternalSpinner,
  internal_default2 as internal_default
} from "./chunk-AF2UB4B7.js";
import {
  with_native_attributes_default
} from "./chunk-UPYVBQFI.js";
import {
  clsx_m_default,
  getBaseProps
} from "./chunk-EFQZML4R.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/status-indicator/internal.js
var import_react = __toESM(require_react());

// node_modules/@cloudscape-design/components/status-indicator/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/status-indicator/styles.scoped.css";
var styles_css_default = {
  "icon-shake": "awsui_icon-shake_1cbgc_15y7y_153",
  "awsui-motion-shake-horizontally": "awsui_awsui-motion-shake-horizontally_1cbgc_15y7y_1",
  "container-fade-in": "awsui_container-fade-in_1cbgc_15y7y_181",
  "awsui-motion-fade-in-0": "awsui_awsui-motion-fade-in-0_1cbgc_15y7y_1",
  "root": "awsui_root_1cbgc_15y7y_203",
  "status-error": "awsui_status-error_1cbgc_15y7y_212",
  "status-warning": "awsui_status-warning_1cbgc_15y7y_215",
  "status-success": "awsui_status-success_1cbgc_15y7y_218",
  "status-info": "awsui_status-info_1cbgc_15y7y_221",
  "status-stopped": "awsui_status-stopped_1cbgc_15y7y_224",
  "status-pending": "awsui_status-pending_1cbgc_15y7y_227",
  "status-in-progress": "awsui_status-in-progress_1cbgc_15y7y_230",
  "status-loading": "awsui_status-loading_1cbgc_15y7y_233",
  "status-not-started": "awsui_status-not-started_1cbgc_15y7y_236",
  "color-override-red": "awsui_color-override-red_1cbgc_15y7y_239",
  "color-override-grey": "awsui_color-override-grey_1cbgc_15y7y_242",
  "color-override-blue": "awsui_color-override-blue_1cbgc_15y7y_245",
  "color-override-green": "awsui_color-override-green_1cbgc_15y7y_248",
  "color-override-yellow": "awsui_color-override-yellow_1cbgc_15y7y_251",
  "container": "awsui_container_1cbgc_15y7y_181",
  "display-inline": "awsui_display-inline_1cbgc_15y7y_289",
  "icon": "awsui_icon_1cbgc_15y7y_153",
  "display-inline-block": "awsui_display-inline-block_1cbgc_15y7y_297",
  "overflow-ellipsis": "awsui_overflow-ellipsis_1cbgc_15y7y_306"
};

// node_modules/@cloudscape-design/components/status-indicator/internal.js
var typeToIcon = (size) => ({
  error: import_react.default.createElement(internal_default, { name: "status-negative", size }),
  warning: import_react.default.createElement(internal_default, { name: "status-warning", size }),
  success: import_react.default.createElement(internal_default, { name: "status-positive", size }),
  info: import_react.default.createElement(internal_default, { name: "status-info", size }),
  stopped: import_react.default.createElement(internal_default, { name: "status-stopped", size }),
  pending: import_react.default.createElement(internal_default, { name: "status-pending", size }),
  "in-progress": import_react.default.createElement(internal_default, { name: "status-in-progress", size }),
  loading: import_react.default.createElement(InternalSpinner, null),
  "not-started": import_react.default.createElement(internal_default, { name: "status-not-started", size })
});
function InternalStatusIcon({ type, iconAriaLabel, animate, display, size = "normal" }) {
  return import_react.default.createElement(
    "span",
    { className: clsx_m_default(styles_css_default.icon, animate && styles_css_default["icon-shake"]), "aria-label": iconAriaLabel, role: iconAriaLabel ? "img" : void 0 },
    typeToIcon(size)[type],
    display === "inline" && import_react.default.createElement(import_react.default.Fragment, null, " ")
  );
}
function StatusIndicator({ type, children, iconAriaLabel, colorOverride, wrapText = true, nativeAttributes, __animate = false, __internalRootRef, __size = "normal", __display = "inline-block", ...rest }) {
  const baseProps = getBaseProps(rest);
  return import_react.default.createElement(
    with_native_attributes_default,
    { ...baseProps, tag: "span", componentName: "StatusIndicator", nativeAttributes, className: clsx_m_default(styles_css_default.root, styles_css_default[`status-${type}`], {
      [styles_css_default[`color-override-${colorOverride}`]]: colorOverride
    }, baseProps.className), ref: __internalRootRef },
    import_react.default.createElement(
      "span",
      { className: clsx_m_default(styles_css_default.container, styles_css_default[`display-${__display}`], wrapText === false && styles_css_default["overflow-ellipsis"], __animate && styles_css_default["container-fade-in"]) },
      import_react.default.createElement(InternalStatusIcon, { type, iconAriaLabel, animate: __animate, display: __display, size: __size }),
      import_react.default.createElement("span", null, children)
    )
  );
}

export {
  StatusIndicator
};
//# sourceMappingURL=chunk-UUT4C247.js.map
