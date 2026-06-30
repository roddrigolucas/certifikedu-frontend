"use client";
import {
  checkOptionValueField,
  dropdown_footer_default,
  filter_default,
  getDropdownMinWidth,
  internal_default,
  plain_list_default,
  prepareOptions,
  styles_css_default,
  trigger_default,
  useAnnouncement,
  useDropdownStatus,
  useLoadItems,
  useNativeSearch,
  useSelect,
  virtual_list_default
} from "./chunk-QI6CUVIL.js";
import {
  checkControlled
} from "./chunk-ZFEHNID6.js";
import "./chunk-Y6WKMOSF.js";
import "./chunk-WJTR4N7X.js";
import "./chunk-XKJOMHSK.js";
import "./chunk-ONPXF3KM.js";
import "./chunk-J6UKYNCZ.js";
import {
  getBreakpointValue
} from "./chunk-J5AO3UDI.js";
import {
  useFormFieldContext
} from "./chunk-5JE6SL2T.js";
import "./chunk-UUT4C247.js";
import {
  joinStrings
} from "./chunk-ICFQLI2S.js";
import {
  fireNonCancelableEvent,
  useInternalI18n
} from "./chunk-AF2UB4B7.js";
import {
  getAnalyticsMetadataAttribute
} from "./chunk-M6E2PW6E.js";
import "./chunk-DLEXJQLO.js";
import "./chunk-UPYVBQFI.js";
import {
  applyDisplayName,
  clsx_m_default,
  getBaseProps,
  useBaseComponent
} from "./chunk-EFQZML4R.js";
import "./chunk-636W5DY3.js";
import "./chunk-Q5GZAUWR.js";
import "./chunk-CDGJA232.js";
import {
  useMergeRefs,
  useResizeObserver,
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

// node_modules/@cloudscape-design/components/select/index.js
var import_react2 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/utils/external-props.js
var getExternalProps = (props) => {
  const externalPropNames = Object.keys(props).filter((propName) => propName.indexOf("__") !== 0);
  return externalPropNames.reduce((acc, propName) => {
    acc[propName] = props[propName];
    return acc;
  }, {});
};

// node_modules/@cloudscape-design/components/select/internal.js
var import_react = __toESM(require_react());

// node_modules/@cloudscape-design/components/select/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/select/styles.scoped.css";
var styles_css_default2 = {
  "root": "awsui_root_r2vco_v2s6g_145"
};

// node_modules/@cloudscape-design/components/select/internal.js
var InternalSelect = import_react.default.forwardRef(({ options, filteringType = "none", filteringPlaceholder, filteringAriaLabel, filteringClearAriaLabel, filteringResultsText, inlineLabelText, ariaRequired, placeholder, disabled, readOnly, ariaLabel, statusType = "finished", empty, loadingText, finishedText, errorText, noMatch, triggerVariant = "label", renderHighlightedAriaLive, selectedOption, onBlur, onFocus, onLoadItems, onChange, virtualScroll, expandToViewport, autoFocus, __inFilteringToken, __internalRootRef, renderOption, ...restProps }, externalRef) => {
  var _a;
  const baseProps = getBaseProps(restProps);
  const formFieldContext = useFormFieldContext(restProps);
  const i18n = useInternalI18n("select");
  const errorIconAriaLabel = i18n("errorIconAriaLabel", restProps.errorIconAriaLabel);
  const selectedAriaLabel = i18n("selectedAriaLabel", restProps.selectedAriaLabel);
  const recoveryText = i18n("recoveryText", restProps.recoveryText);
  if (restProps.recoveryText && !onLoadItems) {
    warnOnce("Select", "`onLoadItems` must be provided for `recoveryText` to be displayed.");
  }
  const { handleLoadMore, handleRecoveryClick, fireLoadItems } = useLoadItems({
    onLoadItems,
    options,
    statusType
  });
  checkControlled("Select", "selectedOption", selectedOption, "onChange", onChange);
  checkOptionValueField("Select", "options", options);
  const [filteringValue, setFilteringValue] = (0, import_react.useState)("");
  const { filteredOptions, parentMap, totalCount, matchesCount } = prepareOptions(options, filteringType, filteringValue);
  const rootRef = (0, import_react.useRef)(null);
  const triggerRef = (0, import_react.useRef)(null);
  const [triggerWidth, setTriggerWidth] = (0, import_react.useState)(null);
  useResizeObserver(() => triggerRef.current, (entry) => entry.borderBoxWidth > 0 && setTriggerWidth(entry.borderBoxWidth));
  const selfControlId = useUniqueId("trigger");
  const controlId = (_a = formFieldContext.controlId) !== null && _a !== void 0 ? _a : selfControlId;
  const scrollToIndex = (0, import_react.useRef)(null);
  const { isOpen, highlightType, highlightedOption, highlightedIndex, getTriggerProps, getDropdownProps, getFilterProps, getMenuProps, getOptionProps, highlightOption, selectOption, announceSelected, focusActiveRef } = useSelect({
    selectedOptions: selectedOption ? [selectedOption] : [],
    updateSelectedOption: (option) => fireNonCancelableEvent(onChange, { selectedOption: option }),
    options: filteredOptions,
    filteringType,
    onBlur,
    onFocus,
    externalRef,
    fireLoadItems,
    setFilteringValue,
    statusType
  });
  const handleNativeSearch = useNativeSearch({
    isEnabled: filteringType === "none" && !readOnly,
    options: filteredOptions,
    highlightOption: !isOpen ? selectOption : highlightOption,
    highlightedOption: !isOpen ? selectedOption : highlightedOption === null || highlightedOption === void 0 ? void 0 : highlightedOption.option
  });
  const selectAriaLabelId = useUniqueId("select-arialabel-");
  const footerId = useUniqueId("footer");
  (0, import_react.useEffect)(() => {
    var _a2;
    (_a2 = scrollToIndex.current) === null || _a2 === void 0 ? void 0 : _a2.call(scrollToIndex, highlightedIndex);
  }, [highlightedIndex]);
  const filter = import_react.default.createElement(filter_default, { clearAriaLabel: filteringClearAriaLabel, filteringType, placeholder: filteringPlaceholder, ariaLabel: filteringAriaLabel, ariaRequired, value: filteringValue, ...getFilterProps() });
  const trigger = import_react.default.createElement(trigger_default, { renderOption, ref: triggerRef, placeholder, disabled, readOnly, triggerVariant, triggerProps: getTriggerProps(disabled, autoFocus), selectedOption, isOpen, inFilteringToken: __inFilteringToken, inlineLabelText, ...formFieldContext, controlId, ariaLabelledby: joinStrings(formFieldContext.ariaLabelledby, selectAriaLabelId) });
  const isEmpty = !options || options.length === 0;
  const isNoMatch = filteredOptions && filteredOptions.length === 0;
  const isFiltered = filteringType !== "none" && filteringValue.length > 0 && filteredOptions && filteredOptions.length > 0;
  const filteredText = isFiltered ? filteringResultsText === null || filteringResultsText === void 0 ? void 0 : filteringResultsText(matchesCount, totalCount) : void 0;
  const dropdownStatus = useDropdownStatus({
    statusType,
    empty,
    loadingText,
    finishedText,
    errorText,
    recoveryText,
    isEmpty,
    isNoMatch,
    noMatch,
    filteringResultsText: filteredText,
    errorIconAriaLabel,
    onRecoveryClick: () => {
      handleRecoveryClick();
      focusActiveRef();
    },
    hasRecoveryCallback: !!onLoadItems
  });
  const menuProps = {
    ...getMenuProps(),
    onLoadMore: handleLoadMore,
    ariaLabelledby: joinStrings(selectAriaLabelId, controlId),
    ariaDescribedby: dropdownStatus.content ? footerId : void 0,
    ariaRequired
  };
  const announcement = useAnnouncement({
    announceSelected,
    highlightedOption,
    getParent: (option) => {
      var _a2;
      return (_a2 = parentMap.get(option)) === null || _a2 === void 0 ? void 0 : _a2.option;
    },
    selectedAriaLabel,
    renderHighlightedAriaLive
  });
  const ListComponent = virtualScroll ? virtual_list_default : plain_list_default;
  const handleMouseDown = (event) => {
    const target = event.target;
    if (target !== document.activeElement) {
      event.preventDefault();
    }
  };
  const mergedRef = useMergeRefs(rootRef, __internalRootRef);
  const dropdownProps = getDropdownProps();
  const hasOptions = (0, import_react.useRef)(options.length > 0);
  hasOptions.current = hasOptions.current || options.length > 0;
  return import_react.default.createElement(
    "div",
    { ...baseProps, ref: mergedRef, className: clsx_m_default(styles_css_default2.root, baseProps.className), onKeyDown: handleNativeSearch },
    import_react.default.createElement(internal_default, {
      ...dropdownProps,
      ariaLabelledby: dropdownProps.ariaRole ? joinStrings(selectAriaLabelId, controlId) : void 0,
      ariaDescribedby: dropdownProps.ariaRole ? dropdownStatus.content ? footerId : void 0 : void 0,
      open: isOpen,
      stretchTriggerHeight: !!__inFilteringToken,
      minWidth: getDropdownMinWidth({ expandToViewport, triggerWidth }),
      maxWidth: getBreakpointValue("xxs"),
      trigger,
      header: filter,
      onMouseDown: handleMouseDown,
      footer: dropdownStatus.isSticky ? import_react.default.createElement(dropdown_footer_default, { content: isOpen ? dropdownStatus.content : null, id: footerId }) : null,
      expandToViewport,
      // Forces dropdown position recalculation when new options are loaded
      contentKey: hasOptions.current.toString(),
      content: import_react.default.createElement(ListComponent, { listBottom: !dropdownStatus.isSticky ? import_react.default.createElement(dropdown_footer_default, { content: isOpen ? dropdownStatus.content : null, id: footerId }) : null, renderOption, menuProps, getOptionProps, filteredOptions, filteringValue, ref: scrollToIndex, hasDropdownStatus: dropdownStatus.content !== null, screenReaderContent: announcement, highlightType })
    }),
    import_react.default.createElement("div", { hidden: true, id: selectAriaLabelId }, ariaLabel || inlineLabelText)
  );
});
var internal_default2 = InternalSelect;

// node_modules/@cloudscape-design/components/select/index.js
var Select = import_react2.default.forwardRef(({ options = [], filteringType = "none", statusType = "finished", triggerVariant = "label", renderOption, ...restProps }, ref) => {
  var _a, _b, _c, _d;
  const baseComponentProps = useBaseComponent("Select", {
    props: {
      autoFocus: restProps.autoFocus,
      expandToViewport: restProps.expandToViewport,
      filteringType,
      triggerVariant,
      virtualScroll: restProps.virtualScroll,
      readOnly: restProps.readOnly
    },
    metadata: {
      hasInlineLabel: Boolean(restProps.inlineLabelText),
      hasDisabledReasons: options.some((option) => Boolean(option.disabledReason))
    }
  });
  const externalProps = getExternalProps(restProps);
  const componentAnalyticsMetadata = {
    name: "awsui.Select",
    label: `.${styles_css_default["button-trigger"]}`,
    properties: {
      disabled: `${!!externalProps.disabled}`,
      selectedOptionValue: `${externalProps.selectedOption && externalProps.selectedOption.value ? externalProps.selectedOption.value : null}`,
      // Use label for display if available, fallback to value because that's what gets shown in dropdown when label is not provided
      selectedOption: `${(_d = (_b = (_a = externalProps.selectedOption) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : (_c = externalProps.selectedOption) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : null}`
    }
  };
  return import_react2.default.createElement(internal_default2, { renderOption, options, filteringType, statusType, triggerVariant, ...externalProps, ...baseComponentProps, ref, ...getAnalyticsMetadataAttribute({ component: componentAnalyticsMetadata }) });
});
applyDisplayName(Select, "Select");
var select_default = Select;
export {
  select_default as default
};
//# sourceMappingURL=@cloudscape-design_components_select.js.map
