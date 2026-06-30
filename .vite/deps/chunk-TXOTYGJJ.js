import {
  parseCountValue
} from "./chunk-A6RJQIQJ.js";
import {
  useTableComponentsContext
} from "./chunk-OEIH233U.js";
import {
  internal_default as internal_default2
} from "./chunk-XKJOMHSK.js";
import {
  useDebounceCallback
} from "./chunk-5JE6SL2T.js";
import {
  joinStrings
} from "./chunk-ICFQLI2S.js";
import {
  fireNonCancelableEvent,
  internal_default,
  useForwardFocus
} from "./chunk-AF2UB4B7.js";
import {
  clsx_m_default,
  getBaseProps
} from "./chunk-EFQZML4R.js";
import {
  useUniqueId
} from "./chunk-5BBL4WRE.js";
import {
  require_react
} from "./chunk-VO6GS3IB.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/@cloudscape-design/components/text-filter/internal.js
var import_react4 = __toESM(require_react());

// node_modules/@cloudscape-design/components/text-filter/analytics/use-table-integration.js
var import_react = __toESM(require_react());
var useTableIntegration = (filteringText, countText) => {
  const tableComponentContext = useTableComponentsContext();
  const countValue = (0, import_react.useMemo)(() => parseCountValue(countText), [countText]);
  (0, import_react.useEffect)(() => {
    var _a;
    if ((_a = tableComponentContext === null || tableComponentContext === void 0 ? void 0 : tableComponentContext.filterRef) === null || _a === void 0 ? void 0 : _a.current) {
      tableComponentContext.filterRef.current.filterText = filteringText;
      tableComponentContext.filterRef.current.filterCount = countValue;
      tableComponentContext.filterRef.current.filtered = !!filteringText;
      return () => {
        var _a2, _b, _c;
        (_a2 = tableComponentContext.filterRef.current) === null || _a2 === void 0 ? true : delete _a2.filterText;
        (_b = tableComponentContext.filterRef.current) === null || _b === void 0 ? true : delete _b.filterCount;
        (_c = tableComponentContext.filterRef.current) === null || _c === void 0 ? true : delete _c.filtered;
      };
    }
  }, [tableComponentContext === null || tableComponentContext === void 0 ? void 0 : tableComponentContext.filterRef, countValue, filteringText]);
};

// node_modules/@cloudscape-design/components/text-filter/search-results.js
var import_react2 = __toESM(require_react());

// node_modules/@cloudscape-design/components/text-filter/styles.css.js
import "C:/CERTIFIKEDUROD/certifikedu-code-plataform-84be73dd447a/node_modules/@cloudscape-design/components/text-filter/styles.scoped.css";
var styles_css_default = {
  "root": "awsui_root_1sdq3_fvap4_145",
  "input": "awsui_input_1sdq3_fvap4_180",
  "results": "awsui_results_1sdq3_fvap4_184"
};

// node_modules/@cloudscape-design/components/text-filter/search-results.js
var LIVE_REGION_DELAY = 2e3;
var SearchResults = import_react2.default.forwardRef(({ id, renderLiveRegion, children }, ref) => {
  const liveRegionRef = (0, import_react2.useRef)(null);
  (0, import_react2.useImperativeHandle)(ref, () => ({
    reannounce: () => {
      var _a;
      (_a = liveRegionRef.current) === null || _a === void 0 ? void 0 : _a.reannounce();
    }
  }), []);
  return import_react2.default.createElement(
    import_react2.default.Fragment,
    null,
    import_react2.default.createElement("span", { className: styles_css_default.results, id }, children),
    renderLiveRegion && import_react2.default.createElement(internal_default, { delay: LIVE_REGION_DELAY, tagName: "span", hidden: true, ref: liveRegionRef }, children)
  );
});

// node_modules/@cloudscape-design/components/text-filter/use-debounce-search-result-callback.js
var import_react3 = __toESM(require_react());
var LIVE_REGION_DELAY2 = 2e3;
function useDebounceSearchResultCallback({ searchQuery, countText, loading, announceCallback }) {
  const loadingRef = (0, import_react3.useRef)(loading);
  const debounceLiveAnnouncement = useDebounceCallback(() => {
    if (!countText || loadingRef.current) {
      return;
    }
    announceCallback();
  }, LIVE_REGION_DELAY2);
  (0, import_react3.useEffect)(() => {
    loadingRef.current = loading;
    debounceLiveAnnouncement();
  }, [searchQuery, countText, loading, debounceLiveAnnouncement]);
}

// node_modules/@cloudscape-design/components/text-filter/internal.js
var InternalTextFilter = import_react4.default.forwardRef(({ filteringText, filteringAriaLabel, filteringPlaceholder, filteringClearAriaLabel, controlId, ariaLabelledby, ariaDescribedby, disabled, countText, disableBrowserAutocorrect, onChange, onDelayedChange, loading = false, style, __internalRootRef, ...rest }, ref) => {
  const baseProps = getBaseProps(rest);
  const inputRef = (0, import_react4.useRef)(null);
  const searchResultsRef = (0, import_react4.useRef)(null);
  useForwardFocus(ref, inputRef);
  useTableIntegration(filteringText, countText);
  const searchResultsId = useUniqueId("text-filter-search-results");
  const showResults = filteringText && countText && !disabled;
  useDebounceSearchResultCallback({
    searchQuery: filteringText,
    countText,
    loading,
    announceCallback: () => {
      var _a;
      (_a = searchResultsRef.current) === null || _a === void 0 ? void 0 : _a.reannounce();
    }
  });
  return import_react4.default.createElement(
    "div",
    { ...baseProps, className: clsx_m_default(baseProps.className, styles_css_default.root), ref: __internalRootRef },
    import_react4.default.createElement(internal_default2, { __inheritFormFieldProps: true, disableBrowserAutocorrect, ref: inputRef, className: styles_css_default.input, type: "search", ariaLabel: filteringAriaLabel, placeholder: filteringPlaceholder, value: filteringText, disabled, controlId, ariaLabelledby, ariaDescribedby: joinStrings(showResults ? searchResultsId : void 0, ariaDescribedby), autoComplete: false, clearAriaLabel: filteringClearAriaLabel, onChange: (event) => fireNonCancelableEvent(onChange, { filteringText: event.detail.value }), __onDelayedInput: (event) => fireNonCancelableEvent(onDelayedChange, { filteringText: event.detail.value }), style }),
    showResults ? import_react4.default.createElement(SearchResults, { renderLiveRegion: !loading, id: searchResultsId, ref: searchResultsRef }, countText) : null
  );
});
var internal_default3 = InternalTextFilter;

export {
  internal_default3 as internal_default
};
//# sourceMappingURL=chunk-TXOTYGJJ.js.map
