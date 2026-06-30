"use client";
import {
  ScreenreaderOnly
} from "./chunk-6QZPSAOL.js";
import {
  checkOptionValueField,
  dropdown_footer_default,
  filter_default,
  findOptionIndex,
  getDropdownMinWidth,
  internal_default as internal_default2,
  internal_default2 as internal_default3,
  isGroup,
  plain_list_default,
  prepareOptions,
  styles_css_default,
  styles_css_default2,
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
  getFirstFocusable,
  internal_default2 as internal_default,
  isFocusable,
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

// node_modules/@cloudscape-design/components/multiselect/index.js
var import_react7 = __toESM(require_react());

// node_modules/@cloudscape-design/components/multiselect/internal.js
var import_react6 = __toESM(require_react());

// node_modules/@cloudscape-design/components/token-group/internal.js
var import_react4 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/token-list/index.js
var import_react2 = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/token-list/token-limit-toggle.js
var import_react = __toESM(require_react());

// node_modules/@cloudscape-design/components/internal/components/token-list/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/internal/components/token-list/styles.scoped.css";
var styles_css_default3 = {
  "root": "awsui_root_gfwv3_vu63l_193",
  "horizontal": "awsui_horizontal_gfwv3_vu63l_196",
  "vertical": "awsui_vertical_gfwv3_vu63l_202",
  "list": "awsui_list_gfwv3_vu63l_207",
  "grid": "awsui_grid_gfwv3_vu63l_226",
  "list-item": "awsui_list-item_gfwv3_vu63l_238",
  "toggle-container-inline": "awsui_toggle-container-inline_gfwv3_vu63l_245",
  "toggle": "awsui_toggle_gfwv3_vu63l_245",
  "description": "awsui_description_gfwv3_vu63l_338",
  "separator": "awsui_separator_gfwv3_vu63l_342"
};

// node_modules/@cloudscape-design/components/internal/components/token-list/token-limit-toggle.js
function TokenLimitToggle({ controlId, allHidden, expanded, numberOfHiddenOptions, onClick, i18nStrings = {}, limitShowFewerAriaLabel, limitShowMoreAriaLabel }) {
  const i18n = useInternalI18n("token-group");
  const numberOfHiddenOptionLabel = allHidden ? numberOfHiddenOptions : `+${numberOfHiddenOptions}`;
  const description = expanded ? i18n("i18nStrings.limitShowFewer", i18nStrings.limitShowFewer) : `${i18n("i18nStrings.limitShowMore", i18nStrings.limitShowMore) || ""} (${numberOfHiddenOptionLabel})`;
  const ariaLabel = expanded ? limitShowFewerAriaLabel : limitShowMoreAriaLabel;
  const handleClick = (0, import_react.useCallback)(() => {
    fireNonCancelableEvent(onClick, null);
  }, [onClick]);
  const analyticsMetadata = {
    action: !expanded ? "showMore" : "showLess",
    detail: {
      label: { root: "self" }
    }
  };
  return import_react.default.createElement(
    "button",
    { type: "button", className: styles_css_default3.toggle, onClick: handleClick, "aria-controls": controlId, "aria-expanded": expanded, "aria-label": ariaLabel, ...getAnalyticsMetadataAttribute(analyticsMetadata) },
    import_react.default.createElement(internal_default, { name: expanded ? "treeview-collapse" : "treeview-expand" }),
    import_react.default.createElement("span", { className: styles_css_default3.description }, description)
  );
}

// node_modules/@cloudscape-design/components/internal/components/token-list/index.js
function TokenList({ items, alignment, renderItem, limit, after, i18nStrings, limitShowFewerAriaLabel, limitShowMoreAriaLabel, onExpandedClick = () => void 0 }) {
  const controlId = useUniqueId();
  const [expanded, setExpanded] = (0, import_react2.useState)(false);
  const hasItems = items.length > 0;
  const hasHiddenItems = hasItems && limit !== void 0 && items.length > limit;
  const visibleItems = hasHiddenItems && !expanded ? items.slice(0, limit) : items;
  const hasVisibleItems = visibleItems.length > 0;
  const toggle = hasHiddenItems ? import_react2.default.createElement(
    "div",
    { className: styles_css_default3[`toggle-container-${alignment}`] },
    import_react2.default.createElement(TokenLimitToggle, { controlId: hasVisibleItems ? controlId : void 0, allHidden: limit === 0, expanded, numberOfHiddenOptions: items.length - visibleItems.length, i18nStrings, limitShowFewerAriaLabel, limitShowMoreAriaLabel, onClick: () => {
      const isExpanded = !expanded;
      setExpanded(isExpanded);
      onExpandedClick(isExpanded);
    } })
  ) : null;
  if (alignment === "inline") {
    return import_react2.default.createElement(
      "div",
      { className: clsx_m_default(styles_css_default3.root, styles_css_default3.horizontal) },
      hasItems && import_react2.default.createElement("ul", { id: controlId, className: styles_css_default3.list }, visibleItems.map((item, itemIndex) => import_react2.default.createElement("li", { key: itemIndex, className: styles_css_default3["list-item"], "aria-setsize": items.length, "aria-posinset": itemIndex + 1 }, renderItem(item, itemIndex)))),
      toggle,
      after && import_react2.default.createElement("div", { className: styles_css_default3.separator }),
      after
    );
  }
  return import_react2.default.createElement(
    "div",
    { className: clsx_m_default(styles_css_default3.root, styles_css_default3.vertical) },
    hasVisibleItems && import_react2.default.createElement("ul", { id: controlId, className: clsx_m_default(styles_css_default3.list, {
      [styles_css_default3.vertical]: alignment === "vertical",
      [styles_css_default3.horizontal]: alignment === "horizontal",
      [styles_css_default3.grid]: alignment === "horizontal-grid"
    }) }, visibleItems.map((item, itemIndex) => import_react2.default.createElement("li", { key: itemIndex, className: styles_css_default3["list-item"], "aria-setsize": items.length, "aria-posinset": itemIndex + 1 }, renderItem(item, itemIndex)))),
    toggle,
    after
  );
}

// node_modules/@cloudscape-design/components/internal/hooks/use-list-focus-controller.js
var import_react3 = __toESM(require_react());
function useListFocusController({ nextFocusIndex, onFocusMoved, listItemSelector, fallbackSelector, showMoreSelector }) {
  const tokenListRef = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    if (nextFocusIndex === void 0 || nextFocusIndex === null || tokenListRef.current === null) {
      return;
    }
    const tokenElements = tokenListRef.current.querySelectorAll(listItemSelector);
    const fallbackElement = fallbackSelector ? selectElement(tokenListRef.current, fallbackSelector) : null;
    const toggleButton = showMoreSelector ? selectElement(tokenListRef.current, showMoreSelector) : null;
    let closestPrevIndex = Number.NEGATIVE_INFINITY;
    let closestNextIndex = Number.POSITIVE_INFINITY;
    for (let activeIndex = 0; activeIndex < tokenElements.length; activeIndex++) {
      if (activeIndex < nextFocusIndex) {
        closestPrevIndex = nextFocusIndex - activeIndex < nextFocusIndex - closestPrevIndex ? activeIndex : closestPrevIndex;
      } else {
        closestNextIndex = activeIndex - nextFocusIndex < closestNextIndex - nextFocusIndex ? activeIndex : closestNextIndex;
      }
    }
    const nextElement = tokenElements[closestNextIndex];
    const prevElement = tokenElements[closestPrevIndex];
    const focusTarget = getFirstEligible({ id: "next", element: nextElement }, { id: "prev", element: prevElement }, { id: "show-more", element: toggleButton }, { id: "fallback", element: fallbackElement });
    if (focusTarget) {
      onFocusMoved(focusTarget.element, focusTarget.id);
    }
  }, [nextFocusIndex, listItemSelector, fallbackSelector, showMoreSelector]);
  return tokenListRef;
}
function getFirstEligible(...elements) {
  for (const { id, element } of elements) {
    const focusable = element ? getFocusableElement(element) : null;
    if (focusable) {
      return { id, element: focusable };
    }
  }
  return null;
}
function getFocusableElement(element) {
  if (!(element instanceof HTMLElement)) {
    return null;
  }
  if (isFocusable(element)) {
    return element;
  }
  return getFirstFocusable(element);
}
function selectElement(container, selector) {
  if (container.matches(selector)) {
    return container;
  }
  return container.querySelector(selector);
}

// node_modules/@cloudscape-design/components/token-group/internal.js
function InternalTokenGroup({ alignment, items, onDismiss, limit, i18nStrings, disableOuterPadding, limitShowFewerAriaLabel, limitShowMoreAriaLabel, readOnly, isItemReadOnly, __internalRootRef, ...props }) {
  checkControlled("TokenGroup", "items", items, "onDismiss", onDismiss);
  const [nextFocusIndex, setNextFocusIndex] = (0, import_react4.useState)(null);
  const tokenListRef = useListFocusController({
    nextFocusIndex,
    onFocusMoved: (target) => {
      target.focus();
      setNextFocusIndex(null);
    },
    listItemSelector: `.${styles_css_default3["list-item"]}`,
    showMoreSelector: `.${styles_css_default3.toggle}`
  });
  const baseProps = getBaseProps(props);
  const hasItems = items.length > 0;
  const mergedRef = useMergeRefs(__internalRootRef, tokenListRef);
  return import_react4.default.createElement(
    "div",
    { ...baseProps, className: clsx_m_default(baseProps.className, styles_css_default2.root, hasItems && styles_css_default2["has-items"], disableOuterPadding && styles_css_default2["no-padding"]), ref: mergedRef },
    import_react4.default.createElement(TokenList, { alignment, items, limit, renderItem: (item, itemIndex) => import_react4.default.createElement(internal_default3, { ...item, label: item.label, key: itemIndex, onDismiss: () => {
      fireNonCancelableEvent(onDismiss, { itemIndex });
      setNextFocusIndex(itemIndex);
    }, readOnly: readOnly || (isItemReadOnly === null || isItemReadOnly === void 0 ? void 0 : isItemReadOnly(item)), variant: "normal", icon: item.iconName || item.iconUrl || item.iconSvg ? import_react4.default.createElement(internal_default, { name: item.iconName, svg: item.iconSvg, url: item.iconUrl, ariaLabel: item.iconAlt, size: "normal" }) : void 0, ...item.disabled || readOnly ? {} : getAnalyticsMetadataAttribute({ detail: { position: `${itemIndex + 1}` } }) }), i18nStrings, limitShowFewerAriaLabel, limitShowMoreAriaLabel, onExpandedClick: (isExpanded) => {
      if (isExpanded && limit) {
        setNextFocusIndex(limit);
      } else {
        setNextFocusIndex(null);
      }
    } })
  );
}

// node_modules/@cloudscape-design/components/multiselect/use-multiselect.js
var import_react5 = __toESM(require_react());
function useMultiselect({ options, filteringType, filteringResultsText, disabled, statusType, empty, loadingText, finishedText, errorText, noMatch, renderHighlightedAriaLive, selectedOptions, deselectAriaLabel, keepOpen, onBlur, onFocus, onLoadItems, onChange, controlId, ariaLabelId, footerId, filteringValue, setFilteringValue, externalRef, embedded, enableSelectAll, i18nStrings, ...restProps }) {
  checkOptionValueField("Multiselect", "options", options);
  const i18n = useInternalI18n("multiselect");
  const i18nCommon = useInternalI18n("select");
  const recoveryText = i18nCommon("recoveryText", restProps.recoveryText);
  const errorIconAriaLabel = i18nCommon("errorIconAriaLabel", restProps.errorIconAriaLabel);
  const selectedAriaLabel = i18nCommon("selectedAriaLabel", restProps.selectedAriaLabel);
  if (restProps.recoveryText && !onLoadItems) {
    warnOnce("Multiselect", "`onLoadItems` must be provided for `recoveryText` to be displayed.");
  }
  const { handleLoadMore, handleRecoveryClick, fireLoadItems } = useLoadItems({
    onLoadItems,
    options,
    statusType
  });
  const useInteractiveGroups = true;
  const { flatOptions, filteredOptions, parentMap, totalCount, matchesCount } = prepareOptions(options, filteringType, filteringValue);
  const selectAllOption = {
    type: "select-all",
    afterHeader: filteringType !== "none",
    option: { label: i18n("i18nStrings.selectAllText", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.selectAllText) }
  };
  const visibleOptions = enableSelectAll && filteredOptions.length ? [selectAllOption, ...filteredOptions] : filteredOptions;
  const allNonParentOptions = flatOptions.filter((item) => item.type !== "parent").map((option) => option.option);
  const filteredNonParentOptions = filteredOptions.filter((item) => item.type !== "parent").map((item) => item.option);
  const selectedValues = (0, import_react5.useMemo)(() => new Set(selectedOptions.map((option) => option.value)), [selectedOptions]);
  const isSomeSelected = selectedOptions.length > 0;
  const isAllVisibleSelectableSelected = isSomeSelected && filteredNonParentOptions.every((option) => option.disabled || selectedValues.has(option.value));
  const isAllSelected = allNonParentOptions.every((option) => selectedValues.has(option.value));
  const toggleAll = () => {
    const filteredNonParentOptionValues = new Set(filteredNonParentOptions.map((option) => option.value));
    fireNonCancelableEvent(onChange, {
      selectedOptions: isAllVisibleSelectableSelected ? selectedOptions.filter((option) => !filteredNonParentOptionValues.has(option.value)) : allNonParentOptions.filter(({ disabled: disabled2, value }) => selectedValues.has(value) || !disabled2 && filteredNonParentOptionValues.has(value))
    });
  };
  const updateSelectedOption = (0, import_react5.useCallback)((option) => {
    const isAllChildrenSelected = (optionsArray) => optionsArray.every((item) => findOptionIndex(selectedOptions, item) > -1 || item.disabled);
    const intersection = (visibleOptions2, options2) => visibleOptions2.filter((item) => findOptionIndex(options2, item) > -1 && !item.disabled);
    const union = (visibleOptions2, options2) => visibleOptions2.filter((item) => findOptionIndex(options2, item) === -1).concat(options2);
    const select = (options2, selectedOptions2) => {
      return union(selectedOptions2, options2);
    };
    const unselect = (options2, selectedOptions2) => {
      return selectedOptions2.filter((option2) => findOptionIndex(options2, option2) === -1);
    };
    let newSelectedOptions = [...selectedOptions];
    if (isGroup(option)) {
      const visibleOptions2 = intersection([...option.options], filteredNonParentOptions);
      newSelectedOptions = isAllChildrenSelected(visibleOptions2) ? unselect(visibleOptions2, newSelectedOptions) : select(visibleOptions2, newSelectedOptions);
    } else {
      newSelectedOptions = isAllChildrenSelected([option]) ? unselect([option], newSelectedOptions) : select([option], newSelectedOptions);
    }
    fireNonCancelableEvent(onChange, {
      selectedOptions: newSelectedOptions
    });
  }, [selectedOptions, onChange, filteredNonParentOptions]);
  const scrollToIndex = (0, import_react5.useRef)(null);
  const { isOpen, highlightType, highlightedOption, highlightedIndex, getTriggerProps, getDropdownProps, getFilterProps, getMenuProps, getOptionProps, highlightOption, announceSelected, focusActiveRef } = useSelect({
    selectedOptions,
    updateSelectedOption,
    options: visibleOptions,
    filteringType,
    onFocus,
    onBlur,
    externalRef,
    keepOpen,
    fireLoadItems,
    setFilteringValue,
    useInteractiveGroups,
    statusType,
    embedded,
    isAllSelected,
    isSomeSelected,
    toggleAll
  });
  const wrapperOnKeyDown = useNativeSearch({
    isEnabled: filteringType === "none" && isOpen,
    options: visibleOptions,
    highlightOption,
    highlightedOption: highlightedOption === null || highlightedOption === void 0 ? void 0 : highlightedOption.option,
    useInteractiveGroups
  });
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
    onRecoveryClick: () => {
      handleRecoveryClick();
      focusActiveRef();
    },
    errorIconAriaLabel,
    hasRecoveryCallback: !!onLoadItems
  });
  const announcement = useAnnouncement({
    announceSelected,
    highlightedOption,
    getParent: (option) => {
      var _a;
      return (_a = parentMap.get(option)) === null || _a === void 0 ? void 0 : _a.option;
    },
    selectedAriaLabel,
    renderHighlightedAriaLive
  });
  const tokens = selectedOptions.map((option) => ({
    label: option.label,
    disabled: disabled || option.disabled,
    labelTag: option.labelTag,
    description: option.description,
    iconAlt: option.iconAlt,
    iconName: option.iconName,
    iconUrl: option.iconUrl,
    iconSvg: option.iconSvg,
    tags: option.tags,
    dismissLabel: i18n("deselectAriaLabel", deselectAriaLabel === null || deselectAriaLabel === void 0 ? void 0 : deselectAriaLabel(option), (format) => {
      var _a;
      return format({ option__label: (_a = option.label) !== null && _a !== void 0 ? _a : "" });
    })
  }));
  (0, import_react5.useEffect)(() => {
    var _a;
    (_a = scrollToIndex.current) === null || _a === void 0 ? void 0 : _a.call(scrollToIndex, highlightedIndex);
  }, [highlightedIndex]);
  const dropdownOnMouseDown = (event) => {
    const target = event.target;
    if (target !== document.activeElement) {
      event.preventDefault();
    }
  };
  const tokenOnDismiss = ({ detail }) => {
    const optionToDeselect = selectedOptions[detail.itemIndex];
    updateSelectedOption(optionToDeselect);
    const targetRef = getTriggerProps().ref;
    if (targetRef.current) {
      targetRef.current.focus();
    }
  };
  return {
    isOpen,
    tokens,
    announcement,
    dropdownStatus,
    filteringValue,
    filteredOptions: visibleOptions,
    highlightType,
    scrollToIndex,
    getFilterProps,
    getTriggerProps,
    getMenuProps: () => ({
      ...getMenuProps(),
      onLoadMore: handleLoadMore,
      ariaLabelledby: joinStrings(ariaLabelId, controlId),
      ariaDescribedby: dropdownStatus.content ? footerId : void 0,
      embedded
    }),
    getOptionProps,
    getTokenProps: () => ({ onDismiss: tokenOnDismiss }),
    getDropdownProps: () => ({ ...getDropdownProps(), onMouseDown: dropdownOnMouseDown }),
    getWrapperProps: () => ({ onKeyDown: wrapperOnKeyDown }),
    highlightedIndex
  };
}

// node_modules/@cloudscape-design/components/multiselect/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/multiselect/styles.scoped.css";
var styles_css_default4 = {
  "root": "awsui_root_f8g6q_1paz0_145",
  "embedded": "awsui_embedded_f8g6q_1paz0_177",
  "tokens": "awsui_tokens_f8g6q_1paz0_210"
};

// node_modules/@cloudscape-design/components/multiselect/internal.js
var InternalMultiselect = import_react6.default.forwardRef(({ options, filteringType, filteringPlaceholder, filteringAriaLabel, filteringClearAriaLabel, ariaRequired, placeholder, disabled, readOnly, ariaLabel, inlineLabelText, selectedOptions, deselectAriaLabel, tokenLimit, i18nStrings, virtualScroll, inlineTokens = false, hideTokens, expandToViewport, tokenLimitShowFewerAriaLabel, tokenLimitShowMoreAriaLabel, __internalRootRef, autoFocus, enableSelectAll, renderOption, ...restProps }, externalRef) => {
  var _a;
  const baseProps = getBaseProps(restProps);
  const formFieldContext = useFormFieldContext(restProps);
  const i18n = useInternalI18n("multiselect");
  const selfControlId = useUniqueId("trigger");
  const controlId = (_a = formFieldContext.controlId) !== null && _a !== void 0 ? _a : selfControlId;
  const ariaLabelId = useUniqueId("multiselect-ariaLabel-");
  const footerId = useUniqueId("multiselect-footer-");
  const [filteringValue, setFilteringValue] = (0, import_react6.useState)("");
  const multiselectProps = useMultiselect({
    options,
    selectedOptions,
    filteringType,
    disabled,
    deselectAriaLabel,
    controlId,
    ariaLabelId,
    footerId,
    filteringValue,
    setFilteringValue,
    externalRef,
    enableSelectAll,
    i18nStrings,
    ...restProps
  });
  const filter = import_react6.default.createElement(filter_default, { clearAriaLabel: filteringClearAriaLabel, filteringType, placeholder: filteringPlaceholder, ariaLabel: filteringAriaLabel, ariaRequired, value: filteringValue, ...multiselectProps.getFilterProps() });
  const triggerRef = (0, import_react6.useRef)(null);
  const [triggerWidth, setTriggerWidth] = (0, import_react6.useState)(null);
  useResizeObserver(() => triggerRef.current, (entry) => entry.borderBoxWidth > 0 && setTriggerWidth(entry.borderBoxWidth));
  const trigger = import_react6.default.createElement(trigger_default, { ref: triggerRef, placeholder, disabled, readOnly, triggerProps: multiselectProps.getTriggerProps(disabled, autoFocus), selectedOption: null, selectedOptions, triggerVariant: inlineTokens ? "tokens" : "placeholder", isOpen: multiselectProps.isOpen, inlineLabelText, ...formFieldContext, controlId, ariaLabelledby: joinStrings(formFieldContext.ariaLabelledby, ariaLabelId) });
  const tokens = selectedOptions.map((option) => ({
    label: option.label,
    disabled,
    labelTag: option.labelTag,
    description: option.description,
    iconAlt: option.iconAlt,
    iconName: option.iconName,
    iconUrl: option.iconUrl,
    iconSvg: option.iconSvg,
    tags: option.tags,
    dismissLabel: i18n("deselectAriaLabel", deselectAriaLabel === null || deselectAriaLabel === void 0 ? void 0 : deselectAriaLabel(option), (format) => {
      var _a2;
      return format({ option__label: (_a2 = option.label) !== null && _a2 !== void 0 ? _a2 : "" });
    }),
    _readOnly: !!option.disabled
  }));
  const ListComponent = virtualScroll ? virtual_list_default : plain_list_default;
  const showTokens = !hideTokens && !inlineTokens && tokens.length > 0;
  const tokenGroupI18nStrings = {
    limitShowFewer: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.tokenLimitShowFewer,
    limitShowMore: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.tokenLimitShowMore
  };
  const dropdownStatus = multiselectProps.dropdownStatus;
  const dropdownProps = multiselectProps.getDropdownProps();
  const hasFilteredOptions = multiselectProps.filteredOptions.length > 0;
  const hasOptions = (0, import_react6.useRef)(options.length > 0);
  hasOptions.current = hasOptions.current || options.length > 0;
  return import_react6.default.createElement(
    "div",
    { ...baseProps, ref: __internalRootRef, className: clsx_m_default(styles_css_default4.root, baseProps.className), ...multiselectProps.getWrapperProps() },
    import_react6.default.createElement(internal_default2, {
      ...dropdownProps,
      ariaLabelledby: dropdownProps.ariaRole ? joinStrings(ariaLabelId, controlId) : void 0,
      ariaDescribedby: dropdownProps.ariaRole ? dropdownStatus.content ? footerId : void 0 : void 0,
      open: multiselectProps.isOpen,
      minWidth: getDropdownMinWidth({ expandToViewport, triggerWidth }),
      maxWidth: getBreakpointValue("xxs"),
      trigger,
      header: filter,
      footer: dropdownStatus.isSticky ? import_react6.default.createElement(dropdown_footer_default, { content: multiselectProps.isOpen ? dropdownStatus.content : null, id: footerId }) : null,
      expandToViewport,
      // Forces dropdown position recalculation when new options are loaded
      contentKey: hasOptions.current.toString(),
      content: import_react6.default.createElement(ListComponent, { renderOption, listBottom: !dropdownStatus.isSticky ? import_react6.default.createElement(dropdown_footer_default, { content: multiselectProps.isOpen ? dropdownStatus.content : null, id: footerId }) : null, menuProps: { ...multiselectProps.getMenuProps(), ariaRequired }, getOptionProps: multiselectProps.getOptionProps, filteredOptions: multiselectProps.filteredOptions, filteringValue, ref: multiselectProps.scrollToIndex, hasDropdownStatus: dropdownStatus.content !== null, checkboxes: true, useInteractiveGroups: true, screenReaderContent: multiselectProps.announcement, highlightType: multiselectProps.highlightType, firstOptionSticky: hasFilteredOptions && enableSelectAll, isMultiSelect: true })
    }),
    showTokens && import_react6.default.createElement(InternalTokenGroup, { ...multiselectProps.getTokenProps(), className: styles_css_default4.tokens, alignment: "horizontal", limit: tokenLimit, items: tokens, i18nStrings: tokenGroupI18nStrings, limitShowMoreAriaLabel: tokenLimitShowMoreAriaLabel, limitShowFewerAriaLabel: tokenLimitShowFewerAriaLabel, disableOuterPadding: true, readOnly, isItemReadOnly: (item) => item._readOnly }),
    import_react6.default.createElement(ScreenreaderOnly, { id: ariaLabelId }, ariaLabel || inlineLabelText)
  );
});
var internal_default4 = InternalMultiselect;

// node_modules/@cloudscape-design/components/multiselect/index.js
var Multiselect = import_react7.default.forwardRef(({ options = [], filteringType = "none", statusType = "finished", selectedOptions = [], keepOpen = true, hideTokens = false, renderOption, ...restProps }, ref) => {
  const baseComponentProps = useBaseComponent("Multiselect", {
    props: {
      inlineTokens: restProps.inlineTokens,
      autoFocus: restProps.autoFocus,
      expandToViewport: restProps.expandToViewport,
      filteringType,
      hideTokens,
      keepOpen,
      tokenLimit: restProps.tokenLimit,
      virtualScroll: restProps.virtualScroll,
      readOnly: restProps.readOnly,
      enableSelectAll: restProps.enableSelectAll
    },
    metadata: {
      hasInlineLabel: Boolean(restProps.inlineLabelText),
      hasDisabledReasons: options.some((option) => Boolean(option.disabledReason))
    }
  });
  const componentAnalyticsMetadata = {
    name: "awsui.Multiselect",
    label: `.${styles_css_default["button-trigger"]}`,
    properties: {
      disabled: `${!!restProps.disabled}`,
      selectedOptionsCount: `${selectedOptions.length}`,
      selectedOptionsValues: selectedOptions.filter((option) => option.value !== void 0).map((option) => `${option.value}`),
      selectedOptions: selectedOptions.filter((option) => option.value !== void 0).map((option) => {
        var _a;
        return `${(_a = option.label) !== null && _a !== void 0 ? _a : option.value}`;
      })
    }
  };
  return import_react7.default.createElement(internal_default4, { renderOption, options, filteringType, statusType, selectedOptions, keepOpen, hideTokens, ...restProps, ...baseComponentProps, ref, ...getAnalyticsMetadataAttribute({ component: componentAnalyticsMetadata }) });
});
applyDisplayName(Multiselect, "Multiselect");
var multiselect_default = Multiselect;
export {
  multiselect_default as default
};
//# sourceMappingURL=@cloudscape-design_components_multiselect.js.map
