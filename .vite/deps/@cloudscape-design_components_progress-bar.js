"use client";
import {
  StatusIndicator
} from "./chunk-UUT4C247.js";
import {
  joinStrings
} from "./chunk-ICFQLI2S.js";
import {
  InternalButton,
  custom_css_properties_default,
  fireNonCancelableEvent,
  internal_default
} from "./chunk-AF2UB4B7.js";
import "./chunk-M6E2PW6E.js";
import "./chunk-DLEXJQLO.js";
import {
  InternalBox
} from "./chunk-QRZONLZG.js";
import "./chunk-UPYVBQFI.js";
import {
  SYSTEM,
  applyDisplayName,
  clsx_m_default,
  getBaseProps,
  useBaseComponent
} from "./chunk-EFQZML4R.js";
import "./chunk-636W5DY3.js";
import "./chunk-Q5GZAUWR.js";
import "./chunk-CDGJA232.js";
import {
  useUniqueId,
  warnOnce
} from "./chunk-5BBL4WRE.js";
import "./chunk-LAJ4J425.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/progress-bar/index.js
var import_react3 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/hooks/use-throttle-callback/index.js
var import_react = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/utils/throttle.js
function throttle(func, delay, { trailing = true } = {}) {
  let pending = null;
  let lastInvokeTime = null;
  let timerId = null;
  function pendingFunc() {
    if (pending === null || lastInvokeTime === null) {
      return;
    }
    const invokeTime = Date.now();
    const shouldInvoke = invokeTime - lastInvokeTime >= delay;
    if (shouldInvoke) {
      func.apply(pending.this, pending.args);
      lastInvokeTime = invokeTime;
      pending = null;
      timerId = null;
    } else if (trailing) {
      startTimer();
    }
  }
  function startTimer() {
    if (timerId) {
      cancelAnimationFrame(timerId);
    }
    timerId = requestAnimationFrame(pendingFunc);
  }
  function throttled(...args) {
    if (lastInvokeTime === null) {
      lastInvokeTime = Date.now();
      func.apply(this, args);
    } else {
      pending = { this: this, args };
      startTimer();
    }
  }
  throttled.cancel = () => {
    if (timerId) {
      cancelAnimationFrame(timerId);
    }
    pending = null;
    lastInvokeTime = null;
    timerId = null;
  };
  return throttled;
}

// node_modules/@cloudscape-design/components/internal/hooks/use-throttle-callback/index.js
function useThrottleCallback(func, delay, deps) {
  return (0, import_react.useMemo)(() => throttle(func, delay), deps);
}

// node_modules/@cloudscape-design/components/progress-bar/internal.js
var import_react2 = __toESM(require_react());

// node_modules/@cloudscape-design/components/progress-bar/styles.js
function getProgressStyles(style) {
  if (SYSTEM !== "core" || !(style === null || style === void 0 ? void 0 : style.progressBar)) {
    return void 0;
  }
  return {
    [custom_css_properties_default.progressBarBackgroundColor]: style.progressBar.backgroundColor,
    [custom_css_properties_default.progressBarBorderRadius]: style.progressBar.borderRadius,
    [custom_css_properties_default.progressBarHeight]: style.progressBar.height
  };
}
function getProgressValueStyles(style) {
  if (SYSTEM !== "core" || !(style === null || style === void 0 ? void 0 : style.progressValue)) {
    return void 0;
  }
  return {
    [custom_css_properties_default.progressValueBackgroundColor]: style.progressValue.backgroundColor
  };
}
function getProgressPercentageStyles(style) {
  if (SYSTEM !== "core" || !(style === null || style === void 0 ? void 0 : style.progressPercentage)) {
    return void 0;
  }
  return {
    color: style.progressPercentage.color,
    fontSize: style.progressPercentage.fontSize,
    fontWeight: style.progressPercentage.fontWeight
  };
}

// node_modules/@cloudscape-design/components/progress-bar/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/progress-bar/styles.scoped.css";
var styles_css_default = {
  "progress": "awsui_progress_11huc_1kxvi_189",
  "result-state": "awsui_result-state_11huc_1kxvi_203",
  "awsui-motion-fade-in": "awsui_awsui-motion-fade-in_11huc_1kxvi_1",
  "root": "awsui_root_11huc_1kxvi_225",
  "with-result-button": "awsui_with-result-button_11huc_1kxvi_257",
  "result-text": "awsui_result-text_11huc_1kxvi_261",
  "result-container-error": "awsui_result-container-error_11huc_1kxvi_265",
  "result-container-success": "awsui_result-container-success_11huc_1kxvi_265",
  "result-button": "awsui_result-button_11huc_1kxvi_269",
  "word-wrap": "awsui_word-wrap_11huc_1kxvi_275",
  "label-flash": "awsui_label-flash_11huc_1kxvi_280",
  "label-key-value": "awsui_label-key-value_11huc_1kxvi_284",
  "flash": "awsui_flash_11huc_1kxvi_292",
  "progress-container": "awsui_progress-container_11huc_1kxvi_296",
  "percentage-container": "awsui_percentage-container_11huc_1kxvi_303",
  "percentage": "awsui_percentage_11huc_1kxvi_303",
  "complete": "awsui_complete_11huc_1kxvi_349",
  "additional-info": "awsui_additional-info_11huc_1kxvi_363"
};

// node_modules/@cloudscape-design/components/progress-bar/internal.js
var MAX_VALUE = 100;
var clamp = (value, lowerLimit, upperLimit) => {
  return Math.max(Math.min(value, upperLimit), lowerLimit);
};
var Progress = ({ value, isInFlash, ariaLabel, ariaLabelledby, ariaDescribedby, style }) => {
  const roundedValue = Math.round(value);
  const progressValue = clamp(roundedValue, 0, MAX_VALUE);
  const progressBarStyles = getProgressStyles(style);
  const progressValueStyles = getProgressValueStyles(style);
  const progressPercentageStyles = getProgressPercentageStyles(style);
  return import_react2.default.createElement(
    "div",
    { className: styles_css_default["progress-container"] },
    import_react2.default.createElement("progress", { className: clsx_m_default(styles_css_default.progress, progressValue >= MAX_VALUE && styles_css_default.complete), max: MAX_VALUE, value: progressValue, "aria-label": ariaLabel, "aria-labelledby": !ariaLabel ? ariaLabelledby : void 0, "aria-describedby": ariaDescribedby, style: {
      ...progressBarStyles || {},
      ...progressValueStyles || {}
    } }),
    import_react2.default.createElement(
      "span",
      { "aria-hidden": "true", className: styles_css_default["percentage-container"] },
      import_react2.default.createElement(InternalBox, { className: styles_css_default.percentage, variant: "small", color: isInFlash ? "inherit" : void 0, nativeAttributes: progressPercentageStyles ? { style: progressPercentageStyles } : void 0 }, `${progressValue}%`)
    )
  );
};
var SmallText = ({ color, children, className, id }) => {
  return import_react2.default.createElement(InternalBox, { className: clsx_m_default(styles_css_default["word-wrap"], className), variant: "small", display: "block", color, id }, children);
};
var ResultButton = ({ onClick, children }) => {
  return import_react2.default.createElement(
    "div",
    { className: styles_css_default["result-button"] },
    import_react2.default.createElement(InternalButton, { formAction: "none", onClick }, children)
  );
};
var ResultState = ({ isInFlash, resultText, resultButtonText, status, onClick }) => {
  const hasResultButton = !!resultButtonText;
  if (isInFlash) {
    return import_react2.default.createElement(
      "div",
      { className: styles_css_default[`result-container-${status}`] },
      import_react2.default.createElement("span", { className: styles_css_default["result-text"] }, resultText)
    );
  }
  return import_react2.default.createElement(
    "div",
    { className: styles_css_default[`result-container-${status}`] },
    import_react2.default.createElement(
      "span",
      { className: clsx_m_default(hasResultButton && styles_css_default["with-result-button"]) },
      import_react2.default.createElement(
        StatusIndicator,
        { type: status === "success" ? "success" : "error" },
        import_react2.default.createElement("span", { className: styles_css_default["result-text"] }, resultText)
      )
    ),
    hasResultButton && import_react2.default.createElement(ResultButton, { onClick }, resultButtonText)
  );
};

// node_modules/@cloudscape-design/components/progress-bar/index.js
var ASSERTION_FREQUENCY = 5e3;
function ProgressBar({ value = 0, status = "in-progress", variant = "standalone", resultButtonText, label, ariaLabel, ariaLabelledby, ariaDescribedby, description, additionalInfo, resultText, onResultButtonClick, style, ...rest }) {
  const { __internalRootRef } = useBaseComponent("ProgressBar", {
    props: { variant }
  });
  const baseProps = getBaseProps(rest);
  const generatedName = useUniqueId("awsui-progress-bar-");
  const labelId = `${generatedName}-label`;
  const isInFlash = variant === "flash";
  const isInProgressState = status === "in-progress";
  const descriptionId = useUniqueId("progressbar-description-");
  const additionalInfoId = useUniqueId("progressbar-additional-info-");
  const [announcedValue, setAnnouncedValue] = (0, import_react3.useState)("");
  const throttledAssertion = useThrottleCallback((value2) => {
    setAnnouncedValue(`${value2}%`);
  }, ASSERTION_FREQUENCY, []);
  (0, import_react3.useEffect)(() => {
    throttledAssertion(value);
  }, [throttledAssertion, value]);
  if (isInFlash && resultButtonText) {
    warnOnce("ProgressBar", 'The `resultButtonText` is ignored if you set `variant="flash"`, and the result button is not displayed. Use the `buttonText` property and the `onButtonClick` event listener of the flashbar item in which the progress bar component is embedded.');
  }
  return import_react3.default.createElement(
    "div",
    { ...baseProps, className: clsx_m_default(baseProps.className, styles_css_default.root, variant && styles_css_default[variant]), ref: __internalRootRef },
    import_react3.default.createElement(
      "div",
      { className: isInFlash ? styles_css_default["flash-container"] : void 0 },
      import_react3.default.createElement("div", { className: clsx_m_default(styles_css_default["word-wrap"], styles_css_default[`label-${variant}`]), id: labelId }, label),
      description && import_react3.default.createElement(SmallText, { color: isInFlash ? "inherit" : void 0, id: descriptionId }, description),
      import_react3.default.createElement("div", null, isInProgressState ? import_react3.default.createElement(
        import_react3.default.Fragment,
        null,
        import_react3.default.createElement(Progress, { value, ariaLabel, ariaLabelledby: joinStrings(labelId, ariaLabelledby), ariaDescribedby: joinStrings(description ? descriptionId : void 0, additionalInfo ? additionalInfoId : void 0, ariaDescribedby), isInFlash, style }),
        import_react3.default.createElement(
          internal_default,
          { hidden: true, tagName: "span", delay: 0 },
          label,
          label ? ": " : null,
          announcedValue
        )
      ) : import_react3.default.createElement(
        internal_default,
        { hidden: false, tagName: "span", delay: 0 },
        import_react3.default.createElement(ResultState, { resultText, isInFlash, resultButtonText, status, onClick: () => {
          fireNonCancelableEvent(onResultButtonClick);
        } })
      ))
    ),
    additionalInfo && import_react3.default.createElement(SmallText, { className: styles_css_default["additional-info"], color: isInFlash ? "inherit" : void 0, id: additionalInfoId }, additionalInfo)
  );
}
applyDisplayName(ProgressBar, "ProgressBar");
export {
  ProgressBar as default
};
//# sourceMappingURL=@cloudscape-design_components_progress-bar.js.map
