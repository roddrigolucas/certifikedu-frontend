import {
  checkbox_icon_default
} from "./chunk-J6UKYNCZ.js";
import {
  getMatchingBreakpoint
} from "./chunk-J5AO3UDI.js";
import {
  useFormFieldContext
} from "./chunk-5JE6SL2T.js";
import {
  custom_css_properties_default,
  fireNonCancelableEvent,
  useContainerQuery,
  useForwardFocus
} from "./chunk-AF2UB4B7.js";
import {
  copyAnalyticsMetadataAttribute,
  getAnalyticsLabelAttribute,
  getAnalyticsMetadataAttribute
} from "./chunk-M6E2PW6E.js";
import {
  with_native_attributes_default
} from "./chunk-UPYVBQFI.js";
import {
  SYSTEM,
  clsx_m_default,
  getBaseProps
} from "./chunk-EFQZML4R.js";
import {
  useMergeRefs,
  useSingleTabStopNavigation,
  useUniqueId
} from "./chunk-5BBL4WRE.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/internal/components/structured-item/index.js
var import_react = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/structured-item/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/structured-item/styles.scoped.css";
var styles_css_default = {
  "root": "awsui_root_1ifko_y7ixg_145",
  "disable-paddings": "awsui_disable-paddings_1ifko_y7ixg_184",
  "main": "awsui_main_1ifko_y7ixg_188",
  "content-wrap": "awsui_content-wrap_1ifko_y7ixg_195",
  "wrap-actions": "awsui_wrap-actions_1ifko_y7ixg_205",
  "content": "awsui_content_1ifko_y7ixg_195",
  "actions": "awsui_actions_1ifko_y7ixg_214"
};

// node_modules/@cloudscape-design/components/internal/components/structured-item/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/structured-item/test-classes/styles.scoped.css";
var styles_css_default2 = {
  "content": "awsui_content_x6dl3_7yzrg_5",
  "icon": "awsui_icon_x6dl3_7yzrg_6",
  "actions": "awsui_actions_x6dl3_7yzrg_7",
  "secondary": "awsui_secondary_x6dl3_7yzrg_8"
};

// node_modules/@cloudscape-design/components/internal/components/structured-item/index.js
function InternalStructuredItem({ content, icon, actions, secondaryContent, disablePaddings, wrapActions = true, className }) {
  return import_react.default.createElement(
    "div",
    { className: clsx_m_default(styles_css_default.root, styles_css_default2.root, disablePaddings && styles_css_default["disable-paddings"], className) },
    icon && import_react.default.createElement("div", { className: clsx_m_default(styles_css_default.icon, styles_css_default2.icon) }, icon),
    import_react.default.createElement(
      "div",
      { className: clsx_m_default(styles_css_default.main) },
      import_react.default.createElement(
        "div",
        { className: clsx_m_default(styles_css_default["content-wrap"], wrapActions && styles_css_default["wrap-actions"]) },
        import_react.default.createElement("div", { className: clsx_m_default(styles_css_default.content, styles_css_default2.content) }, content),
        actions && import_react.default.createElement("div", { className: clsx_m_default(styles_css_default.actions, styles_css_default2.actions) }, actions)
      ),
      secondaryContent && import_react.default.createElement("div", { className: clsx_m_default(styles_css_default.secondary, styles_css_default2.secondary) }, secondaryContent)
    )
  );
}

// node_modules/@cloudscape-design/components/checkbox/internal.js
var import_react3 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/abstract-switch/index.js
var import_react2 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/abstract-switch/analytics-metadata/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/abstract-switch/analytics-metadata/styles.scoped.css";
var styles_css_default3 = {
  "label": "awsui_label_13tpe_9w8pd_5",
  "native-input": "awsui_native-input_13tpe_9w8pd_6"
};

// node_modules/@cloudscape-design/components/internal/components/abstract-switch/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/abstract-switch/styles.scoped.css";
var styles_css_default4 = {
  "content": "awsui_content_1wepg_fp1bh_145",
  "description": "awsui_description_1wepg_fp1bh_146",
  "label": "awsui_label_1wepg_fp1bh_147",
  "outline": "awsui_outline_1wepg_fp1bh_155",
  "show-outline": "awsui_show-outline_1wepg_fp1bh_158",
  "native-input": "awsui_native-input_1wepg_fp1bh_162",
  "wrapper": "awsui_wrapper_1wepg_fp1bh_166",
  "label-wrapper": "awsui_label-wrapper_1wepg_fp1bh_172",
  "empty-content": "awsui_empty-content_1wepg_fp1bh_183",
  "description-bottom-padding": "awsui_description-bottom-padding_1wepg_fp1bh_193",
  "label-disabled": "awsui_label-disabled_1wepg_fp1bh_201",
  "description-disabled": "awsui_description-disabled_1wepg_fp1bh_202",
  "control": "awsui_control_1wepg_fp1bh_206"
};

// node_modules/@cloudscape-design/components/internal/components/abstract-switch/index.js
function joinString(values) {
  return values.filter((value) => !!value).join(" ");
}
function AbstractSwitch({ controlId, controlClassName, outlineClassName, showOutline, disabled, readOnly, nativeControl, styledControl, label, description, descriptionBottomPadding, ariaLabel, ariaLabelledby, ariaDescribedby, ariaControls, onClick, style, __internalRootRef, ...rest }) {
  var _a, _b, _c, _d, _e, _f;
  const uniqueId = useUniqueId();
  const id = controlId || uniqueId;
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const ariaLabelledByIds = [];
  if (label && !ariaLabel) {
    ariaLabelledByIds.push(labelId);
  }
  if (ariaLabelledby) {
    ariaLabelledByIds.push(ariaLabelledby);
  }
  const ariaDescriptions = [];
  if (ariaDescribedby) {
    ariaDescriptions.push(ariaDescribedby);
  }
  if (description) {
    ariaDescriptions.push(descriptionId);
  }
  return import_react2.default.createElement(
    "span",
    { ...rest, className: clsx_m_default(styles_css_default4.wrapper, rest.className), ref: __internalRootRef, ...getAnalyticsLabelAttribute(label ? `.${styles_css_default3.label}` : `.${styles_css_default3["native-input"]}`) },
    import_react2.default.createElement(
      "span",
      { className: styles_css_default4["label-wrapper"], "aria-disabled": disabled ? "true" : void 0, onClick: disabled || readOnly ? void 0 : onClick, ...getAnalyticsMetadataAttribute(disabled || readOnly ? {} : {
        action: "select",
        detail: {
          label: label ? `.${styles_css_default3.label}` : `.${styles_css_default3["native-input"]}`
        }
      }) },
      import_react2.default.createElement(
        "span",
        { className: clsx_m_default(styles_css_default4.control, controlClassName), style: {
          background: (_a = style === null || style === void 0 ? void 0 : style.control) === null || _a === void 0 ? void 0 : _a.background,
          ...(style === null || style === void 0 ? void 0 : style.focusRing) && {
            [custom_css_properties_default.styleFocusRingBorderColor]: (_b = style.focusRing) === null || _b === void 0 ? void 0 : _b.borderColor,
            [custom_css_properties_default.styleFocusRingBorderRadius]: (_c = style.focusRing) === null || _c === void 0 ? void 0 : _c.borderRadius,
            [custom_css_properties_default.styleFocusRingBorderWidth]: (_d = style.focusRing) === null || _d === void 0 ? void 0 : _d.borderWidth
          }
        } },
        styledControl,
        nativeControl({
          id,
          disabled,
          className: clsx_m_default(styles_css_default4["native-input"], styles_css_default3["native-input"]),
          "aria-describedby": ariaDescriptions.length ? joinString(ariaDescriptions) : void 0,
          "aria-labelledby": ariaLabelledByIds.length ? joinString(ariaLabelledByIds) : void 0,
          "aria-label": ariaLabel,
          "aria-controls": ariaControls
        }),
        import_react2.default.createElement("span", { className: clsx_m_default(styles_css_default4.outline, outlineClassName, showOutline && styles_css_default4["show-outline"]) })
      ),
      import_react2.default.createElement(
        "span",
        { className: clsx_m_default(styles_css_default4.content, !label && !description && styles_css_default4["empty-content"]) },
        label && import_react2.default.createElement("span", { id: labelId, className: clsx_m_default(styles_css_default4.label, styles_css_default3.label, { [styles_css_default4["label-disabled"]]: disabled }), style: { color: (_e = style === null || style === void 0 ? void 0 : style.label) === null || _e === void 0 ? void 0 : _e.color } }, label),
        description && import_react2.default.createElement("span", { id: descriptionId, className: clsx_m_default(styles_css_default4.description, {
          [styles_css_default4["description-disabled"]]: disabled,
          [styles_css_default4["description-bottom-padding"]]: descriptionBottomPadding
        }), style: { color: (_f = style === null || style === void 0 ? void 0 : style.description) === null || _f === void 0 ? void 0 : _f.color } }, description)
      )
    )
  );
}

// node_modules/@cloudscape-design/components/internal/utils/style.js
function getComputedAbstractSwitchState(checked, disabled, readOnly, indeterminate, defaultValue = "default") {
  let computedState;
  if (disabled) {
    computedState = "disabled";
  } else if (readOnly) {
    computedState = "readOnly";
  } else if (indeterminate) {
    computedState = "indeterminate";
  } else if (checked) {
    computedState = "checked";
  } else {
    computedState = defaultValue;
  }
  return computedState;
}

// node_modules/@cloudscape-design/components/checkbox/style.js
function getAbstractSwitchStyles(style, checked, disabled, readOnly, indeterminate) {
  var _a, _b, _c, _d, _e, _f, _g;
  let properties = {};
  if (SYSTEM === "core" && ((style === null || style === void 0 ? void 0 : style.label) || (style === null || style === void 0 ? void 0 : style.input))) {
    const computedState = getComputedAbstractSwitchState(checked, disabled, readOnly, indeterminate);
    properties = {
      label: {
        color: ((_a = style === null || style === void 0 ? void 0 : style.label) === null || _a === void 0 ? void 0 : _a.color) && style.label.color[computedState]
      },
      focusRing: {
        borderColor: (_c = (_b = style === null || style === void 0 ? void 0 : style.input) === null || _b === void 0 ? void 0 : _b.focusRing) === null || _c === void 0 ? void 0 : _c.borderColor,
        borderRadius: (_e = (_d = style === null || style === void 0 ? void 0 : style.input) === null || _d === void 0 ? void 0 : _d.focusRing) === null || _e === void 0 ? void 0 : _e.borderRadius,
        borderWidth: (_g = (_f = style === null || style === void 0 ? void 0 : style.input) === null || _f === void 0 ? void 0 : _f.focusRing) === null || _g === void 0 ? void 0 : _g.borderWidth
      }
    };
  }
  return properties;
}
function getCheckboxIconStyles(style, checked, disabled, readOnly, indeterminate) {
  var _a, _b, _c, _d;
  let properties = {};
  if (SYSTEM === "core" && (style === null || style === void 0 ? void 0 : style.input)) {
    const computedState = getComputedAbstractSwitchState(checked, disabled, readOnly, indeterminate);
    properties = {
      box: {
        fill: ((_a = style.input) === null || _a === void 0 ? void 0 : _a.fill) && style.input.fill[computedState],
        stroke: ((_b = style.input) === null || _b === void 0 ? void 0 : _b.stroke) && style.input.stroke[computedState]
      },
      line: {
        stroke: ((_d = (_c = style.input) === null || _c === void 0 ? void 0 : _c.check) === null || _d === void 0 ? void 0 : _d.stroke) && style.input.check.stroke[computedState]
      }
    };
  }
  return properties;
}

// node_modules/@cloudscape-design/components/checkbox/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/checkbox/styles.scoped.css";
var styles_css_default5 = {
  "root": "awsui_root_k2y2q_5mu89_145",
  "checkbox-control": "awsui_checkbox-control_k2y2q_5mu89_178",
  "outline": "awsui_outline_k2y2q_5mu89_186"
};

// node_modules/@cloudscape-design/components/checkbox/internal.js
var InternalCheckbox = import_react3.default.forwardRef(({ controlId, name, checked, disabled, readOnly, ariaRequired, indeterminate, children, description, ariaLabel, onFocus, onBlur, onChange, tabIndex: explicitTabIndex, showOutline, ariaControls, style, nativeInputAttributes, __internalRootRef, __injectAnalyticsComponentMetadata = false, ...rest }, ref) => {
  const { ariaDescribedby, ariaLabelledby } = useFormFieldContext(rest);
  const baseProps = getBaseProps(rest);
  const checkboxRef = (0, import_react3.useRef)(null);
  useForwardFocus(ref, checkboxRef);
  (0, import_react3.useEffect)(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = Boolean(indeterminate);
    }
  });
  const { tabIndex } = useSingleTabStopNavigation(checkboxRef, { tabIndex: explicitTabIndex });
  const analyticsMetadata = {};
  const analyticsComponentMetadata = {
    name: "awsui.Checkbox",
    label: { root: "self" },
    properties: {
      checked: `${!!checked}`
    }
  };
  if (__injectAnalyticsComponentMetadata) {
    analyticsMetadata.component = analyticsComponentMetadata;
  }
  if (!disabled && !readOnly) {
    analyticsMetadata.action = !checked ? "select" : "deselect";
  }
  return import_react3.default.createElement(AbstractSwitch, { ...baseProps, className: clsx_m_default(styles_css_default5.root, baseProps.className), controlClassName: styles_css_default5["checkbox-control"], outlineClassName: styles_css_default5.outline, controlId, disabled, readOnly, label: children, description, descriptionBottomPadding: true, ariaLabel, ariaLabelledby, ariaDescribedby, ariaControls, showOutline, nativeControl: (nativeControlProps) => import_react3.default.createElement(with_native_attributes_default, {
    ...nativeControlProps,
    tag: "input",
    componentName: "Checkbox",
    nativeAttributes: nativeInputAttributes,
    ref: checkboxRef,
    type: "checkbox",
    checked,
    name,
    "aria-required": ariaRequired ? "true" : void 0,
    "aria-disabled": readOnly && !disabled ? "true" : void 0,
    tabIndex,
    onFocus: () => fireNonCancelableEvent(onFocus),
    onBlur: () => fireNonCancelableEvent(onBlur),
    // empty handler to suppress React controllability warning
    onChange: () => {
    }
  }), onClick: () => {
    var _a;
    (_a = checkboxRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    fireNonCancelableEvent(
      onChange,
      // for deterministic transitions "indeterminate" -> "checked" -> "unchecked"
      indeterminate ? { checked: true, indeterminate: false } : { checked: !checked, indeterminate: false }
    );
  }, styledControl: import_react3.default.createElement(checkbox_icon_default, { checked, indeterminate, disabled, readOnly, style: getCheckboxIconStyles(style, checked, disabled, readOnly, indeterminate) }), style: getAbstractSwitchStyles(style, checked, disabled, readOnly, indeterminate), __internalRootRef, ...getAnalyticsMetadataAttribute(analyticsMetadata) });
});
var internal_default = InternalCheckbox;

// node_modules/@cloudscape-design/components/internal/components/radio-button/index.js
var import_react4 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/radio-button/style.js
function getOuterCircleStyle(style, checked, disabled, readOnly) {
  var _a, _b;
  let properties;
  if (SYSTEM === "core" && (style === null || style === void 0 ? void 0 : style.input)) {
    const computedState = getComputedAbstractSwitchState(checked, disabled, readOnly, void 0);
    properties = {
      fill: ((_a = style.input) === null || _a === void 0 ? void 0 : _a.fill) && style.input.fill[computedState],
      stroke: ((_b = style.input) === null || _b === void 0 ? void 0 : _b.stroke) && style.input.stroke[computedState]
    };
  }
  return properties;
}
function getInnerCircleStyle(style, checked, disabled, readOnly) {
  var _a, _b, _c;
  let properties;
  if (SYSTEM === "core" && (style === null || style === void 0 ? void 0 : style.input)) {
    const computedState = getComputedAbstractSwitchState(checked, disabled, readOnly, void 0);
    properties = {
      fill: ((_b = (_a = style.input) === null || _a === void 0 ? void 0 : _a.circle) === null || _b === void 0 ? void 0 : _b.fill) && style.input.circle.fill[computedState],
      stroke: ((_c = style.input) === null || _c === void 0 ? void 0 : _c.fill) && style.input.fill[computedState]
    };
  }
  return properties;
}
function getAbstractSwitchStyles2(style, checked, disabled, readOnly) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  let properties = {};
  if (SYSTEM === "core" && ((style === null || style === void 0 ? void 0 : style.label) || (style === null || style === void 0 ? void 0 : style.description) || (style === null || style === void 0 ? void 0 : style.input))) {
    const computedState = getComputedAbstractSwitchState(checked, disabled, readOnly, void 0);
    properties = {
      label: {
        color: ((_a = style === null || style === void 0 ? void 0 : style.label) === null || _a === void 0 ? void 0 : _a.color) && style.label.color[computedState]
      },
      description: {
        color: ((_b = style === null || style === void 0 ? void 0 : style.description) === null || _b === void 0 ? void 0 : _b.color) && style.description.color[computedState]
      },
      focusRing: {
        borderColor: (_d = (_c = style === null || style === void 0 ? void 0 : style.input) === null || _c === void 0 ? void 0 : _c.focusRing) === null || _d === void 0 ? void 0 : _d.borderColor,
        borderRadius: (_f = (_e = style === null || style === void 0 ? void 0 : style.input) === null || _e === void 0 ? void 0 : _e.focusRing) === null || _f === void 0 ? void 0 : _f.borderRadius,
        borderWidth: (_h = (_g = style === null || style === void 0 ? void 0 : style.input) === null || _g === void 0 ? void 0 : _g.focusRing) === null || _h === void 0 ? void 0 : _h.borderWidth
      }
    };
  }
  return properties;
}

// node_modules/@cloudscape-design/components/internal/components/radio-button/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/radio-button/styles.scoped.css";
var styles_css_default6 = {
  "radio-control": "awsui_radio-control_1v1hk_ykhrv_145",
  "outline": "awsui_outline_1v1hk_ykhrv_153",
  "styled-circle-border": "awsui_styled-circle-border_1v1hk_ykhrv_176",
  "styled-circle-disabled": "awsui_styled-circle-disabled_1v1hk_ykhrv_180",
  "styled-circle-readonly": "awsui_styled-circle-readonly_1v1hk_ykhrv_180",
  "styled-circle-fill": "awsui_styled-circle-fill_1v1hk_ykhrv_185",
  "styled-circle-checked": "awsui_styled-circle-checked_1v1hk_ykhrv_201"
};

// node_modules/@cloudscape-design/components/internal/components/radio-button/test-classes/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/radio-button/test-classes/styles.scoped.css";
var styles_css_default7 = {
  "root": "awsui_root_15oj2_1q93l_5"
};

// node_modules/@cloudscape-design/components/internal/components/radio-button/index.js
var radio_button_default = import_react4.default.forwardRef(function RadioButton({ name, children, value, checked, description, disabled, controlId, readOnly, className, style, nativeInputAttributes, onSelect, __skipNativeAttributesWarnings, ...rest }, ref) {
  const radioButtonRef = (0, import_react4.useRef)(null);
  const mergedRefs = useMergeRefs(radioButtonRef, ref);
  const { tabIndex } = useSingleTabStopNavigation(radioButtonRef);
  const baseProps = getBaseProps(rest);
  return import_react4.default.createElement(AbstractSwitch, { ...baseProps, className: clsx_m_default(styles_css_default7.root, className), controlClassName: styles_css_default6["radio-control"], outlineClassName: styles_css_default6.outline, label: children, description, disabled, readOnly, controlId, style: getAbstractSwitchStyles2(style, checked, disabled, readOnly), __internalRootRef: rest.__internalRootRef, ...copyAnalyticsMetadataAttribute(rest), nativeControl: (nativeControlProps) => import_react4.default.createElement(with_native_attributes_default, {
    ...nativeControlProps,
    tag: "input",
    componentName: "RadioButton",
    nativeAttributes: nativeInputAttributes,
    skipWarnings: __skipNativeAttributesWarnings,
    tabIndex,
    type: "radio",
    ref: mergedRefs,
    name,
    value,
    checked,
    "aria-disabled": readOnly && !disabled ? "true" : void 0,
    // empty handler to suppress React controllability warning
    onChange: () => {
    }
  }), onClick: () => {
    var _a;
    (_a = radioButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    if (!checked) {
      fireNonCancelableEvent(onSelect);
    }
  }, styledControl: import_react4.default.createElement(
    "svg",
    { viewBox: "0 0 100 100", focusable: "false", "aria-hidden": "true" },
    import_react4.default.createElement("circle", { className: clsx_m_default(styles_css_default6["styled-circle-border"], {
      [styles_css_default6["styled-circle-disabled"]]: disabled,
      [styles_css_default6["styled-circle-readonly"]]: readOnly
    }), strokeWidth: 6.25, cx: 50, cy: 50, r: 46, style: getOuterCircleStyle(style, checked, disabled, readOnly) }),
    import_react4.default.createElement("circle", { className: clsx_m_default(styles_css_default6["styled-circle-fill"], {
      [styles_css_default6["styled-circle-disabled"]]: disabled,
      [styles_css_default6["styled-circle-checked"]]: checked,
      [styles_css_default6["styled-circle-readonly"]]: readOnly
    }), strokeWidth: 30, cx: 50, cy: 50, r: 35, style: getInnerCircleStyle(style, checked, disabled, readOnly) })
  ) });
});

// node_modules/@cloudscape-design/components/internal/hooks/container-queries/use-container-breakpoints.js
function useContainerBreakpoints(triggers) {
  const triggersDep = triggers === null || triggers === void 0 ? void 0 : triggers.join();
  return useContainerQuery((rect) => getMatchingBreakpoint(rect.contentBoxWidth, triggers), [triggersDep]);
}

export {
  InternalStructuredItem,
  AbstractSwitch,
  getComputedAbstractSwitchState,
  internal_default,
  radio_button_default,
  useContainerBreakpoints
};
//# sourceMappingURL=chunk-O3V62YPV.js.map
