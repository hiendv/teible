var tabs = (function (exports) {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) { ref = {}; }
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "*, *::after, *::before {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.default-module_datatable__2uq6i {\n  color: #495057;\n  font: 1em/1.5 -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.default-module_datatable__wrapper__3hnz- {\n  position: relative;\n  display: block;\n  text-align: left;\n  width: 100%;\n}\n.default-module_datatable__heading__2vDZI {\n  display: block;\n  margin-bottom: 0.5em;\n  width: 100%;\n}\n.default-module_datatable__unit__Kagxu {\n  display: block;\n  flex-basis: 0;\n  flex-grow: 1;\n  flex-shrink: 1;\n  margin-bottom: 0.5em;\n}\n@media (min-width: 1024px) {\n  .default-module_datatable__heading__2vDZI {\n    display: flex;\n    align-items: center;\n  }\n  .default-module_datatable__text__2qoy7 {\n    padding-left: 1em;\n  }\n}\n.default-module_datatable__content__2bsFb {\n  width: 100%;\n  border: solid 1px #dee2e6;\n  table-layout: fixed;\n}\n.default-module_datatable__row__1uect {\n  background-color: #fff;\n}\n.default-module_datatable__row--odd__3I1gz {\n  background-color: #e9ecef;\n}\n.default-module_datatable__cell__23fSK {\n  position: relative;\n  padding: 0.3em 0.5em;\n  border-right: 1px solid #dee2e6;\n  border-bottom: 1px solid #dee2e6;\n  vertical-align: middle;\n  text-align: left;\n  word-break: break-word;\n}\n.default-module_datatable__cell--last-column__1Wxk0 {\n  border-right: 0;\n}\n.default-module_datatable__cell--last-row__2TENw {\n  border-bottom: 0;\n}\n.default-module_datatable__filter__3I9O4 {\n  position: relative;\n}\n.default-module_datatable__input__e15P2 {\n  width: 100%;\n  padding: 0.3rem 1.5rem 0.3rem 0.75rem;\n  font-size: 1em;\n  line-height: 1.5;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n}\n.default-module_datatable__input__e15P2:focus {\n  outline: 0;\n  border-color: #999;\n  box-shadow: 0 0 0 0.2rem rgba(100, 100, 100, 0.25);\n}\n.default-module_datatable__clear__scBDI {\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: inline-block;\n  height: 100%;\n  border: 1px solid transparent;\n  cursor: pointer;\n  vertical-align: middle;\n}\n.default-module_datatable__clear__scBDI:hover {\n  font-weight: bold;\n}\n.default-module_datatable__clear__scBDI:active {\n  font-weight: bold;\n  text-shadow: 0px 0px 2px #969696;\n}\n.default-module_datatable__x__2E1DU {\n  padding: 0.25em 0.75em;\n  color: inherit !important;\n  text-decoration: none;\n  display: inline-block;\n  vertical-align: middle;\n}\n.default-module_datatable__column__3dVwM {\n  position: relative;\n  padding: 0.5em;\n  padding-right: 1.75em;\n  min-width: 1em;\n  vertical-align: middle;\n  text-align: left;\n  line-height: 1;\n  white-space: nowrap;\n  border-right: 1px solid #dee2e6;\n  border-bottom: 1px solid #dee2e6;\n  box-shadow: 0px 1px 2px 0px rgba(50, 50, 50, 0.1);\n  background-color: #fff;\n  font-weight: bold;\n}\n.default-module_datatable__column--last__1PoT5 {\n  border-right: 0;\n}\n.default-module_datatable__column--active__3bCB2 {\n  background-color: #f0f0f0;\n}\n.default-module_datatable__column--sortable__1S9uo {\n  cursor: pointer;\n}\n.default-module_datatable__column--custom__2DKSX {\n  padding-right: 0.5em;\n}\n.default-module_datatable__column-icon__3TFCL {\n  position: absolute;\n  top: 8px;\n  right: 0.5em;\n}\n.default-module_datatable__column-text__2GDtz {\n  display: inline-block;\n  vertical-align: middle;\n  margin-top: 2px;\n}\n.default-module_datatable__pagination__1M1j3 {\n  display: block;\n}\n.default-module_datatable__plist__ki-o8 {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  margin-top: 0.5em;\n  border-radius: 4px;\n}\n.default-module_datatable__pitem__3MmwP {\n  display: inline;\n}\n.default-module_datatable__plink__2oVf2 {\n  position: relative;\n  float: left;\n  padding: 0.3em 0.6em;\n  margin-left: -1px;\n  color: #337ab7;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n}\n.default-module_datatable__plink--active__2h_YW {\n  z-index: 3;\n  color: #fff !important;\n  cursor: default;\n  background-color: #337ab7 !important;\n  border-color: #337ab7 !important;\n}\n.default-module_datatable__plink--disabled__2U-C1 {\n  color: #777 !important;\n  cursor: not-allowed;\n  background-color: #f0f0f0 !important;\n}\n.default-module_datatable__plink__2oVf2:focus, .default-module_datatable__plink__2oVf2:hover {\n  z-index: 2;\n  background-color: #eee;\n}";
  var default_module = {"datatable":"default-module_datatable__2uq6i","datatable__wrapper":"default-module_datatable__wrapper__3hnz-","datatable__heading":"default-module_datatable__heading__2vDZI","datatable__unit":"default-module_datatable__unit__Kagxu","datatable__text":"default-module_datatable__text__2qoy7","datatable__content":"default-module_datatable__content__2bsFb","datatable__row":"default-module_datatable__row__1uect","datatable__row--odd":"default-module_datatable__row--odd__3I1gz","datatable__cell":"default-module_datatable__cell__23fSK","datatable__cell--last-column":"default-module_datatable__cell--last-column__1Wxk0","datatable__cell--last-row":"default-module_datatable__cell--last-row__2TENw","datatable__filter":"default-module_datatable__filter__3I9O4","datatable__input":"default-module_datatable__input__e15P2","datatable__clear":"default-module_datatable__clear__scBDI","datatable__x":"default-module_datatable__x__2E1DU","datatable__column":"default-module_datatable__column__3dVwM","datatable__column--last":"default-module_datatable__column--last__1PoT5","datatable__column--active":"default-module_datatable__column--active__3bCB2","datatable__column--sortable":"default-module_datatable__column--sortable__1S9uo","datatable__column--custom":"default-module_datatable__column--custom__2DKSX","datatable__column-icon":"default-module_datatable__column-icon__3TFCL","datatable__column-text":"default-module_datatable__column-text__2GDtz","datatable__pagination":"default-module_datatable__pagination__1M1j3","datatable__plist":"default-module_datatable__plist__ki-o8","datatable__pitem":"default-module_datatable__pitem__3MmwP","datatable__plink":"default-module_datatable__plink__2oVf2","datatable__plink--active":"default-module_datatable__plink--active__2h_YW","datatable__plink--disabled":"default-module_datatable__plink--disabled__2U-C1"};
  styleInject(css);

  var chunk = function (arr, size) {
    if (!size) {
      size = arr.length;
    }

    var result = [];
    for (var i = 0, len = arr.length; i < len; i += size) { result.push(arr.slice(i, i + size)); }
    return result
  };

  var orderBy = function (arr, field, order) {
    if (!arr || !arr.length) {
      return []
    }

    var GREATER = order === 'desc' ? -1 : 1;
    var SMALLER = -GREATER;

    return arr.sort(function (a, b) {
      var first = dotGet(a, field);
      var second = dotGet(b, field);

      if (!first && !second) {
        return 0
      }

      if (!first && first !== 0) {
        return SMALLER
      }

      if (!second && second !== 0) {
        return GREATER
      }

      if (typeof first === 'number' && typeof second === 'number') {
        if (first === second) {
          return 0
        }

        if (first > second) {
          return GREATER
        }

        return SMALLER
      }

      if (typeof first === 'string' && typeof second === 'string') {
        var cmp = first.localeCompare(second);
        if (cmp === 0) {
          return 0
        }

        if (cmp > 0) {
          return GREATER
        }

        return SMALLER
      }

      // other or mixed types are blindly compare with `>` & `<`
      // therefore, it's not reliable
      if (first > second) {
        return GREATER
      }

      if (first < second) {
        return SMALLER
      }

      return 0
    })
  };

  var filter = function (items, filtering) {
    return items.filter(function (item) {
      for (var i = 0; i < filtering.fields.length; i++) {
        var field = filtering.fields[i];
        var value = dotGet(item, field);

        if (!value) {
          continue
        }

        if (("" + value).toLowerCase().indexOf(filtering.query) === -1) {
          continue
        }

        return true
      }

      return false
    })
  };

  var load = function (data, filtering, sorting, paging) {
    var filtered = (!filtering || !filtering.query) ? data : filter(data, filtering);
    if (!filtered || !filtered.length) {
      return {
        items: [],
        total: 0
      }
    }

    var ordered = orderBy(filtered, sorting.by, sorting.order);
    var chunked = chunk(ordered, paging.perPage);
    var items = chunked[paging.page - 1];
    if (!items) {
      return {
        items: [],
        total: filtered.length
      }
    }

    return {
      items: items,
      total: filtered.length
    }
  };

  var dotGet = function (obj, path) {
    return path.split('.').reduce(function (o, i) { return o[i]; }, obj)
  };

  var dotSet = function (obj, path, val) {
    var parts = path.split('.');
    return parts.reduce(function (o, i, idx) {
      if (idx === parts.length - 1) {
        o[i] = val;
        return o[i]
      }

      if (!o.hasOwnProperty(i)) {
        o[i] = {};
      }

      return o[i]
    }, obj)
  };

  var uniqArr = function (arr) {
    return arr.filter(function (item, pos) {
      return arr.indexOf(item) === pos
    })
  };

  var range = function (n) {
    var a = [];
    for (var i = 0; i < n; i++) {
      a[i] = i + 1;
    }

    return a
  };

  var paginate = function (currentPage, total) {
    var showing = 3;
    var eachSide = 2;
    if (total <= showing + eachSide) {
      return paginationValueOrThreeDots(range(total))
    }

    var pages = [];

    for (var i = 0; i < eachSide; i++) {
      pages.push(i + 1);
      pages.push(total - i);
    }

    for (var i$1 = 0; i$1 < Math.ceil(showing / 2); i$1++) {
      if (currentPage - i$1 > 1) {
        pages.push(currentPage - i$1);
      }

      if (currentPage + i$1 < total) {
        pages.push(currentPage + i$1);
      }
    }

    return paginationValueOrThreeDots(uniqArr(pages).sort(function (a, b) { return a - b; }))
  };

  var paginationValueOrThreeDots = function (pages) {
    var dots = '...';
    for (var i = 0; i < pages.length - 1; i++) {
      if (pages[i + 1] - pages[i] > 1) {
        pages.splice(i + 1, 0, dots);
      }
    }

    pages = pages.map(function (page) {
      return {
        value: page,
        disabled: page === dots
      }
    });

    return pages
  };

  function transform (data, columns) {
    if ( data === void 0 ) data = [];
    if ( columns === void 0 ) columns = [];

    return data.map(function (item) {
      columns.filter(function (column) { return typeof column.render === 'function'; }).forEach(function (column) {
        var field = column.field;
        var render = column.render;
        var parts = field.split('.');
        var originalField = parts.reduce(function (a, b, index) {
          if (index === parts.length - 1) {
            return (a + ".$_" + b)
          }
          return (a + "." + b)
        });

        if (parts.length === 1) {
          originalField = "$_" + field;
        }

        if (item.hasOwnProperty(originalField)) {
          return
        }

        dotSet(item, originalField, dotGet(item, field));
        dotSet(item, field, render(dotGet(item, field), item));
      });
      return item
    })
  }

  exports.dotGet = dotGet;
  exports.dotSet = dotSet;
  exports.load = load;
  exports.orderBy = orderBy;
  exports.paginate = paginate;
  exports.themeDefault = default_module;
  exports.transform = transform;

  return exports;

}({}));
