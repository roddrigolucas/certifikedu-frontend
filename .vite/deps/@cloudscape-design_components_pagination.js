"use client";
import {
  reset_contexts_for_modal_default
} from "./chunk-KHGLTFQ7.js";
import {
  useTableComponentsContext
} from "./chunk-OEIH233U.js";
import {
  internal_default as internal_default5
} from "./chunk-NTNXT65H.js";
import {
  usePortalModeClasses,
  usePrevious
} from "./chunk-Y6WKMOSF.js";
import {
  useTokenInlineContext
} from "./chunk-WJTR4N7X.js";
import {
  internal_default as internal_default4
} from "./chunk-XKJOMHSK.js";
import "./chunk-ONPXF3KM.js";
import "./chunk-7ITRMATN.js";
import "./chunk-5JE6SL2T.js";
import {
  KeyCode,
  LinkDefaultVariantContext,
  PopoverContainer,
  arrow_default,
  body_default,
  fireNonCancelableEvent,
  getFirstFocusable,
  internal_default,
  internal_default2,
  internal_default3,
  styles_css_default,
  useInternalI18n
} from "./chunk-AF2UB4B7.js";
import {
  copyAnalyticsMetadataAttribute,
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
  Portal,
  useMergeRefs,
  useSingleTabStopNavigation,
  useUniqueId
} from "./chunk-5BBL4WRE.js";
import "./chunk-LAJ4J425.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/pagination/index.js
var import_react4 = __toESM(require_react());

// node_modules/@cloudscape-design/components/pagination/internal.js
var import_react3 = __toESM(require_react());

// node_modules/@cloudscape-design/components/popover/internal.js
var import_react2 = __toESM(require_react());

// node_modules/@cloudscape-design/components/popover/conditional-live-region.js
var import_react = __toESM(require_react());
var ConditionalLiveRegion = ({ condition, children }) => {
  if (condition) {
    return import_react.default.createElement(internal_default, null, children);
  }
  return import_react.default.createElement(import_react.default.Fragment, null, children);
};
var conditional_live_region_default = ConditionalLiveRegion;

// node_modules/@cloudscape-design/components/popover/internal.js
var internal_default6 = import_react2.default.forwardRef(InternalPopover);
function InternalPopover({ position = "right", size = "medium", fixedWidth = false, triggerType = "text", dismissButton = true, children, header, content, triggerAriaLabel, wrapTriggerText = true, isInline = false, renderWithPortal = false, __onOpen, __internalRootRef, __closeAnalyticsAction, __visible: controlledVisible, __onVisibleChange: onVisibleChange, ...restProps }, ref) {
  const baseProps = getBaseProps(restProps);
  const triggerRef = (0, import_react2.useRef)(null);
  const popoverRef = (0, import_react2.useRef)(null);
  const i18n = useInternalI18n("popover");
  const dismissAriaLabel = i18n("dismissAriaLabel", restProps.dismissAriaLabel);
  const [internalVisible, setInternalVisible] = (0, import_react2.useState)(false);
  const isControlled = controlledVisible !== void 0;
  const visible = isControlled ? controlledVisible : internalVisible;
  const updateVisible = (0, import_react2.useCallback)((newVisible) => {
    if (isControlled) {
      fireNonCancelableEvent(onVisibleChange, { visible: newVisible });
    } else {
      setInternalVisible(newVisible);
    }
  }, [isControlled, onVisibleChange]);
  const focusTrigger = (0, import_react2.useCallback)(() => {
    var _a, _b;
    if (["text", "text-inline"].includes(triggerType)) {
      (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    } else if (triggerRef.current) {
      (_b = getFirstFocusable(triggerRef.current)) === null || _b === void 0 ? void 0 : _b.focus();
    }
  }, [triggerType]);
  const onTriggerClick = (0, import_react2.useCallback)(() => {
    fireNonCancelableEvent(__onOpen);
    updateVisible(true);
  }, [__onOpen, updateVisible]);
  const onDismiss = (0, import_react2.useCallback)(() => {
    updateVisible(false);
    focusTrigger();
  }, [focusTrigger, updateVisible]);
  const onTriggerKeyDown = (0, import_react2.useCallback)((event) => {
    const isEscapeKey = event.keyCode === KeyCode.escape;
    const isTabKey = event.keyCode === KeyCode.tab;
    if (isEscapeKey && visible) {
      event.stopPropagation();
    }
    if (isTabKey || isEscapeKey) {
      updateVisible(false);
    }
  }, [visible, updateVisible]);
  (0, import_react2.useImperativeHandle)(ref, () => ({
    dismiss: () => {
      updateVisible(false);
    },
    focus: () => {
      updateVisible(false);
      focusTrigger();
    }
  }), [updateVisible, focusTrigger]);
  const clickFrameId = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (!triggerRef.current) {
      return;
    }
    const document = triggerRef.current.ownerDocument;
    const onDocumentClick = () => {
      if (clickFrameId.current === null) {
        updateVisible(false);
      }
    };
    document.addEventListener("mousedown", onDocumentClick);
    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
    };
  }, [updateVisible]);
  const popoverClasses = usePortalModeClasses(triggerRef, { resetVisualContext: true });
  const { isInlineToken } = useTokenInlineContext();
  const triggerProps = {
    // https://github.com/microsoft/TypeScript/issues/36659
    ref: triggerRef,
    onClick: onTriggerClick,
    onKeyDown: onTriggerKeyDown,
    className: clsx_m_default(styles_css_default.trigger, styles_css_default[`trigger-type-${triggerType}`], isInlineToken && styles_css_default["in-inline-token"])
  };
  const { tabIndex: triggerTabIndex } = useSingleTabStopNavigation(triggerRef);
  const referrerId = useUniqueId();
  const popoverContent = import_react2.default.createElement(
    "div",
    { className: clsx_m_default(popoverClasses, !renderWithPortal && styles_css_default["popover-inline-content"]), "data-awsui-referrer-id": referrerId },
    import_react2.default.createElement(
      PopoverContainer,
      { size, fixedWidth, position, trackRef: triggerRef, arrow: (position2) => import_react2.default.createElement(arrow_default, { position: position2 }), renderWithPortal, zIndex: renderWithPortal ? 7e3 : void 0 },
      import_react2.default.createElement(
        LinkDefaultVariantContext.Provider,
        { value: { defaultVariant: "primary" } },
        import_react2.default.createElement(
          body_default,
          { dismissButton, dismissAriaLabel, header, onDismiss, overflowVisible: "both", closeAnalyticsAction: __closeAnalyticsAction },
          import_react2.default.createElement(conditional_live_region_default, { condition: !dismissButton }, content)
        )
      )
    )
  );
  const mergedRef = useMergeRefs(popoverRef, __internalRootRef);
  return import_react2.default.createElement(
    "span",
    { ...baseProps, className: clsx_m_default(styles_css_default.root, baseProps.className, triggerType === "filtering-token" && styles_css_default["root-filtering-token"], isInline && styles_css_default["no-wrap"]), ref: mergedRef, onMouseDown: () => {
      clickFrameId.current = requestAnimationFrame(() => {
        clickFrameId.current = null;
      });
    } },
    ["text", "text-inline"].includes(triggerType) ? import_react2.default.createElement("button", { ...triggerProps, className: clsx_m_default(triggerProps.className, wrapTriggerText === false && styles_css_default["overflow-ellipsis"]), tabIndex: triggerTabIndex, type: "button", "aria-haspopup": "dialog", id: referrerId, "aria-label": triggerAriaLabel }, children) : import_react2.default.createElement("span", { ...triggerProps, id: referrerId }, children),
    visible && import_react2.default.createElement(reset_contexts_for_modal_default, null, renderWithPortal ? import_react2.default.createElement(Portal, null, popoverContent) : popoverContent)
  );
}

// node_modules/@cloudscape-design/components/pagination/utils.js
function range(from, to) {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
}
function getPaginationState(currentPageIndex, totalPagesCount, isOpenEnd) {
  const numberOfControls = 7;
  const leftDelta = Math.floor(numberOfControls / 2);
  let rightDelta = leftDelta;
  const lowerLimit = 2;
  let upperLimit = totalPagesCount - 1;
  if (isOpenEnd) {
    rightDelta++;
    upperLimit = totalPagesCount + 1;
  }
  let leftIndex = currentPageIndex - leftDelta;
  let rightIndex = currentPageIndex + rightDelta;
  if (leftIndex < lowerLimit) {
    rightIndex += lowerLimit - leftIndex;
    leftIndex = lowerLimit;
  }
  if (rightIndex > upperLimit) {
    leftIndex -= rightIndex - upperLimit;
    rightIndex = upperLimit;
  }
  leftIndex = Math.max(leftIndex, 2);
  rightIndex = Math.min(rightIndex, upperLimit);
  const leftDots = leftIndex > 2;
  const rightDots = isOpenEnd || rightIndex < upperLimit;
  if (leftDots) {
    leftIndex++;
  }
  if (rightDots) {
    rightIndex--;
  }
  return { leftDots, rightDots, leftIndex, rightIndex };
}

// node_modules/@cloudscape-design/components/pagination/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/pagination/styles.scoped.css";
var styles_css_default2 = {
  "root": "awsui_root_fvjdu_ho015_145",
  "button": "awsui_button_fvjdu_ho015_186",
  "dots": "awsui_dots_fvjdu_ho015_187",
  "button-disabled": "awsui_button-disabled_fvjdu_ho015_215",
  "arrow": "awsui_arrow_fvjdu_ho015_220",
  "page-number": "awsui_page-number_fvjdu_ho015_230",
  "button-current": "awsui_button-current_fvjdu_ho015_236",
  "jump-to-page": "awsui_jump-to-page_fvjdu_ho015_249",
  "jump-to-page-input": "awsui_jump-to-page-input_fvjdu_ho015_257",
  "page-item": "awsui_page-item_fvjdu_ho015_267",
  "root-disabled": "awsui_root-disabled_fvjdu_ho015_285"
};

// node_modules/@cloudscape-design/components/pagination/internal.js
function PageButton({ className, ariaLabel, disabled, pageIndex, isCurrent = false, children, onClick, ...rest }) {
  function handleClick(event) {
    event.preventDefault();
    onClick(pageIndex);
  }
  return import_react3.default.createElement(
    "li",
    { className: styles_css_default2["page-item"], ...copyAnalyticsMetadataAttribute(rest) },
    import_react3.default.createElement("button", { className: clsx_m_default(className, styles_css_default2.button, disabled && styles_css_default2["button-disabled"], isCurrent && styles_css_default2["button-current"]), type: "button", "aria-label": ariaLabel, disabled, onClick: handleClick, "aria-current": isCurrent, ...disabled ? {} : getAnalyticsMetadataAttribute({
      action: "click",
      detail: {
        label: { root: "self" }
      }
    }) }, children)
  );
}
function PageNumber({ pageIndex, ...rest }) {
  return import_react3.default.createElement(PageButton, { className: styles_css_default2["page-number"], pageIndex, ...rest, ...rest.disabled ? {} : getAnalyticsMetadataAttribute({
    detail: {
      position: `${pageIndex}`
    }
  }) }, pageIndex);
}
var InternalPagination = import_react3.default.forwardRef(({ openEnd, currentPageIndex, ariaLabels, i18nStrings, pagesCount, disabled, onChange, onNextPageClick, onPreviousPageClick, __internalRootRef, jumpToPage, ...rest }, ref) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j;
  const baseProps = getBaseProps(rest);
  const { leftDots, leftIndex, rightIndex, rightDots } = getPaginationState(currentPageIndex, pagesCount, openEnd);
  const [jumpToPageValue, setJumpToPageValue] = (0, import_react3.useState)(currentPageIndex === null || currentPageIndex === void 0 ? void 0 : currentPageIndex.toString());
  const previousLoading = usePrevious(jumpToPage === null || jumpToPage === void 0 ? void 0 : jumpToPage.loading);
  const jumpToPageInputRef = (0, import_react3.useRef)(null);
  const [hasError, setHasError] = (0, import_react3.useState)(false);
  const i18n = useInternalI18n("pagination");
  import_react3.default.useImperativeHandle(ref, () => ({
    setError: (error) => setHasError(error)
  }));
  import_react3.default.useEffect(() => {
    if (previousLoading && !(jumpToPage === null || jumpToPage === void 0 ? void 0 : jumpToPage.loading)) {
      setJumpToPageValue(String(currentPageIndex));
    }
  }, [previousLoading, jumpToPage === null || jumpToPage === void 0 ? void 0 : jumpToPage.loading, currentPageIndex]);
  const paginationLabel = (_a = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.paginationLabel) !== null && _a !== void 0 ? _a : "";
  const nextPageLabel = (_b = i18n("ariaLabels.nextPageLabel", ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.nextPageLabel)) !== null && _b !== void 0 ? _b : "";
  const previousPageLabel = (_c = i18n("ariaLabels.previousPageLabel", ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.previousPageLabel)) !== null && _c !== void 0 ? _c : "";
  const pageNumberLabelFn = (_d = i18n("ariaLabels.pageLabel", ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.pageLabel, (format) => (pageNumber) => format({ pageNumber }))) !== null && _d !== void 0 ? _d : (pageNumber) => `${pageNumber}`;
  const jumpToPageLabel = (_e = i18n("i18nStrings.jumpToPageInputLabel", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.jumpToPageInputLabel)) !== null && _e !== void 0 ? _e : "";
  const jumpToPageButtonLabel = (_f = i18n("ariaLabels.jumpToPageButtonLabel", ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.jumpToPageButton)) !== null && _f !== void 0 ? _f : "";
  const jumpToPageError = (_g = i18n("i18nStrings.jumpToPageError", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.jumpToPageError)) !== null && _g !== void 0 ? _g : "";
  const jumpToPageLoadingText = (_h = i18n("i18nStrings.jumpToPageLoadingText", i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.jumpToPageLoadingText)) !== null && _h !== void 0 ? _h : "";
  function handlePrevPageClick(requestedPageIndex) {
    handlePageClick(requestedPageIndex);
    fireNonCancelableEvent(onPreviousPageClick, {
      requestedPageAvailable: true,
      requestedPageIndex
    });
  }
  function handleNextPageClick(requestedPageIndex) {
    handlePageClick(requestedPageIndex);
    fireNonCancelableEvent(onNextPageClick, {
      requestedPageAvailable: currentPageIndex < pagesCount,
      requestedPageIndex
    });
  }
  function handlePageClick(requestedPageIndex, errorState) {
    setJumpToPageValue(String(requestedPageIndex));
    setHasError(!!errorState);
    fireNonCancelableEvent(onChange, { currentPageIndex: requestedPageIndex });
  }
  function handleJumpToPageClick(requestedPageIndex) {
    var _a2;
    const adjustedIndex = Math.max(1, Math.floor(requestedPageIndex));
    if (openEnd) {
      handlePageClick(adjustedIndex);
    } else {
      if (adjustedIndex >= 1 && adjustedIndex <= pagesCount) {
        handlePageClick(adjustedIndex);
      } else {
        handlePageClick(pagesCount, true);
      }
    }
    (_a2 = jumpToPageInputRef.current) === null || _a2 === void 0 ? void 0 : _a2.focus();
  }
  const handleInputChange = (e) => {
    setJumpToPageValue(e.detail.value);
    if (hasError) {
      setHasError(false);
    }
  };
  const previousButtonDisabled = disabled || currentPageIndex === 1;
  const nextButtonDisabled = disabled || !openEnd && (pagesCount === 0 || currentPageIndex === pagesCount);
  const tableComponentContext = useTableComponentsContext();
  if ((_j = tableComponentContext === null || tableComponentContext === void 0 ? void 0 : tableComponentContext.paginationRef) === null || _j === void 0 ? void 0 : _j.current) {
    tableComponentContext.paginationRef.current.currentPageIndex = currentPageIndex;
    tableComponentContext.paginationRef.current.totalPageCount = pagesCount;
    tableComponentContext.paginationRef.current.openEnd = openEnd;
  }
  const jumpToPageButton = import_react3.default.createElement(internal_default3, { iconName: "arrow-right", variant: "icon", loading: jumpToPage === null || jumpToPage === void 0 ? void 0 : jumpToPage.loading, loadingText: jumpToPageLoadingText, ariaLabel: (jumpToPage === null || jumpToPage === void 0 ? void 0 : jumpToPage.loading) ? jumpToPageLoadingText : jumpToPageButtonLabel, onClick: () => handleJumpToPageClick(Number(jumpToPageValue)), disabled: !jumpToPageValue || Number(jumpToPageValue) === currentPageIndex });
  return import_react3.default.createElement(
    "ul",
    { "aria-label": paginationLabel, ...baseProps, className: clsx_m_default(baseProps.className, styles_css_default2.root, disabled && styles_css_default2["root-disabled"]), ref: __internalRootRef },
    import_react3.default.createElement(
      PageButton,
      { className: styles_css_default2.arrow, pageIndex: currentPageIndex - 1, ariaLabel: previousPageLabel, disabled: previousButtonDisabled, onClick: handlePrevPageClick, ...previousButtonDisabled ? {} : getAnalyticsMetadataAttribute({
        detail: {
          position: "prev"
        }
      }) },
      import_react3.default.createElement(internal_default2, { name: "angle-left", variant: disabled ? "disabled" : "normal" })
    ),
    import_react3.default.createElement(PageNumber, { pageIndex: 1, isCurrent: currentPageIndex === 1, disabled, ariaLabel: pageNumberLabelFn(1), onClick: handlePageClick }),
    leftDots && import_react3.default.createElement("li", { className: styles_css_default2.dots }, "..."),
    range(leftIndex, rightIndex).map((pageIndex) => import_react3.default.createElement(PageNumber, { key: pageIndex, isCurrent: currentPageIndex === pageIndex, pageIndex, disabled, ariaLabel: pageNumberLabelFn(pageIndex), onClick: handlePageClick })),
    rightDots && import_react3.default.createElement("li", { className: styles_css_default2.dots }, "..."),
    !openEnd && pagesCount > 1 && import_react3.default.createElement(PageNumber, { isCurrent: currentPageIndex === pagesCount, pageIndex: pagesCount, disabled, ariaLabel: pageNumberLabelFn(pagesCount), onClick: handlePageClick }),
    import_react3.default.createElement(
      PageButton,
      { className: styles_css_default2.arrow, pageIndex: currentPageIndex + 1, ariaLabel: nextPageLabel, disabled: nextButtonDisabled, onClick: handleNextPageClick, ...nextButtonDisabled ? {} : getAnalyticsMetadataAttribute({
        detail: {
          position: "next"
        }
      }) },
      import_react3.default.createElement(internal_default2, { name: "angle-right", variant: disabled ? "disabled" : "normal" })
    ),
    jumpToPage && import_react3.default.createElement(
      "li",
      { className: styles_css_default2["jump-to-page"] },
      import_react3.default.createElement(
        internal_default5,
        { size: "xxs", direction: "horizontal", alignItems: "end" },
        import_react3.default.createElement(
          "div",
          { className: styles_css_default2["jump-to-page-input"] },
          import_react3.default.createElement(internal_default4, { ref: jumpToPageInputRef, type: "number", value: jumpToPageValue, __inlineLabelText: jumpToPageLabel || void 0, __fullWidth: true, ariaLabel: jumpToPageLabel || void 0, nativeInputAttributes: {
            min: 1,
            max: !openEnd ? pagesCount : void 0
          }, onChange: handleInputChange, onBlur: () => setHasError(false), onKeyDown: (e) => {
            if (e.detail.keyCode === 13 && jumpToPageValue && Number(jumpToPageValue) !== currentPageIndex) {
              handleJumpToPageClick(Number(jumpToPageValue));
            }
          } })
        ),
        hasError && !(jumpToPage === null || jumpToPage === void 0 ? void 0 : jumpToPage.loading) ? import_react3.default.createElement(internal_default6, { size: "medium", dismissButton: false, __visible: true, content: jumpToPageError, position: "bottom", triggerType: "custom", __onVisibleChange: ({ detail }) => !detail.visible && setHasError(false) }, jumpToPageButton) : jumpToPageButton
      )
    )
  );
});
var internal_default7 = InternalPagination;

// node_modules/@cloudscape-design/components/pagination/index.js
var Pagination = import_react4.default.forwardRef((props, ref) => {
  const baseComponentProps = useBaseComponent("Pagination", {
    props: { openEnd: props.openEnd },
    metadata: { hasJumpToPage: !!props.jumpToPage }
  });
  return import_react4.default.createElement(internal_default7, { ...props, ...baseComponentProps, ref, ...getAnalyticsMetadataAttribute({
    component: {
      name: "awsui.Pagination",
      label: { root: "self" },
      properties: {
        openEnd: `${!!props.openEnd}`,
        pagesCount: `${props.pagesCount || ""}`,
        currentPageIndex: `${props.currentPageIndex}`
      }
    }
  }) });
});
applyDisplayName(Pagination, "Pagination");
var pagination_default = Pagination;
export {
  pagination_default as default
};
//# sourceMappingURL=@cloudscape-design_components_pagination.js.map
