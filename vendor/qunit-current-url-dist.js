(function () {
  'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /* eslint-disable no-undef */
  function extraUrlInfo(urlString) {
    var _urlString$split = urlString.split('?'),
        _urlString$split2 = _slicedToArray(_urlString$split, 2),
        baseUrl = _urlString$split2[0],
        _urlString$split2$ = _urlString$split2[1],
        queryParamsString = _urlString$split2$ === void 0 ? '' : _urlString$split2$;

    var queryParamsPairs = queryParamsString.split('&');
    var queryParameters = {};
    queryParamsPairs.forEach(function (pair) {
      var _pair$split = pair.split('='),
          _pair$split2 = _slicedToArray(_pair$split, 2),
          key = _pair$split2[0],
          value = _pair$split2[1]; // If there are no QP's we don't want to push "": undefined


      if (key) {
        queryParameters[key] = value;
      }
    });
    return {
      baseUrl: baseUrl,
      queryParameters: queryParameters
    };
  }

  function objectToString(object) {
    var keyValueStrings = Object.keys(object).sort(function (a, b) {
      var left = a.toLowerCase();
      var right = b.toLowerCase();

      if (left < right) {
        return -1;
      }

      if (left > right) {
        return 1;
      }

      return 0;
    }).map(function (key) {
      return "".concat(key, "=").concat(object[key]);
    }).join('&');
    return "?".concat(keyValueStrings);
  }

  function setupCurrenUrlAssert() {
    QUnit.assert.currentUrl = function (expectedUrl, expectedQueryParams) {
      var _require = require('@ember/test-helpers'),
          currentURL = _require.currentURL;

      var currentUrlString = currentURL();
      var currentUrlInfo = extraUrlInfo(currentUrlString);

      if (expectedQueryParams) {
        var expectedUrlInfo = extraUrlInfo(expectedUrl);
        QUnit.assert.equal(currentUrlInfo.baseUrl, expectedUrlInfo.baseUrl, 'Expected base URL to be the same');
        QUnit.assert.deepEqual(currentUrlInfo.queryParameters, expectedQueryParams, 'Expected query parameters to be the same');
      } else {
        var _expectedUrlInfo = extraUrlInfo(expectedUrl);

        QUnit.assert.equal(currentUrlInfo.baseUrl, _expectedUrlInfo.baseUrl, 'Expected base URL to be the same');
        QUnit.assert.equal(objectToString(currentUrlInfo.queryParameters), objectToString(_expectedUrlInfo.queryParameters), 'Expected query parameters to be the same');
      }
    };
  } // Load on next tick becuase dummy addon doesn't load qunit until later.
  // Don't need to do this in normal apps annoyingly


  setTimeout(setupCurrenUrlAssert, 0);

}());
//# sourceMappingURL=qunit-current-url-dist.js.map
