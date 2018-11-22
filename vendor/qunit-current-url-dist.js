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

  function getCurrentUrlInfo() {
    var _require = require('@ember/test-helpers'),
        currentURL = _require.currentURL;

    var currentUrlString = currentURL();
    var currentUrlInfo = extraUrlInfo(currentUrlString);
    return currentUrlInfo;
  }

  function getUrlInfo(expectedUrl) {
    var currentUrlInfo = getCurrentUrlInfo();
    var expectedUrlInfo = extraUrlInfo(expectedUrl);
    return {
      currentUrlInfo: currentUrlInfo,
      expectedUrlInfo: expectedUrlInfo
    };
  }

  function equals(expectedUrl, expectedQueryParams) {
    var _getUrlInfo = getUrlInfo(expectedUrl),
        currentUrlInfo = _getUrlInfo.currentUrlInfo,
        expectedUrlInfo = _getUrlInfo.expectedUrlInfo;

    if (expectedQueryParams) {
      QUnit.assert.equal(currentUrlInfo.baseUrl, expectedUrlInfo.baseUrl, 'Expected base URL to be the same');
      QUnit.assert.deepEqual(currentUrlInfo.queryParameters, expectedQueryParams, 'Expected query parameters to be the same');
    } else {
      QUnit.assert.equal(currentUrlInfo.baseUrl, expectedUrlInfo.baseUrl, 'Expected base URL to be the same');
      QUnit.assert.deepEqual(currentUrlInfo.queryParameters, expectedUrlInfo.queryParameters, 'Expected query parameters to be the same');
    }
  }

  function includes(urlPart) {
    var currentUrlInfo = getCurrentUrlInfo();
    QUnit.assert.ok(currentUrlInfo.baseUrl.includes(urlPart), "Expected base URL to include ".concat(urlPart));
  }

  function hasQueryParameters(queryParameters) {
    var currentUrlInfo = getCurrentUrlInfo();

    for (var key in queryParameters) {
      QUnit.assert.ok(currentUrlInfo.queryParameters.hasOwnProperty(key), "Expected query parameter ".concat(key, " to be present"));
      QUnit.assert.equal(currentUrlInfo.queryParameters[key], queryParameters[key], 'Expected query parameters to be the same');
    }
  }

  function doesNotInclude(urlPart) {
    var currentUrlInfo = getCurrentUrlInfo();
    QUnit.assert.notOk(currentUrlInfo.baseUrl.includes(urlPart), "Expected base URL to include ".concat(urlPart));
  }

  function doesNotHaveQueryParameters(queryParameters) {
    var currentUrlInfo = getCurrentUrlInfo();

    for (var key in queryParameters) {
      QUnit.assert.notOk(currentUrlInfo.queryParameters.hasOwnProperty(key), "Expected query parameter ".concat(key, " to be present"));
      QUnit.assert.notEqual(currentUrlInfo.queryParameters[key], queryParameters[key], 'Expected query parameters to be the same');
    }
  }

  function setupCurrenUrlAssert() {
    QUnit.assert.currentUrl = {
      equals: equals,
      includes: includes,
      hasQueryParameters: hasQueryParameters,
      doesNotInclude: doesNotInclude,
      doesNotHaveQueryParameters: doesNotHaveQueryParameters
    };
  } // Load on next tick becuase dummy addon doesn't load qunit until later.
  // Don't need to do this in normal apps annoyingly


  setTimeout(setupCurrenUrlAssert, 0);

}());
//# sourceMappingURL=qunit-current-url-dist.js.map
