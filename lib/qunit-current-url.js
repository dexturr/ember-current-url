function extraUrlInfo(urlString) {
  const [baseUrl, queryParamsString = ''] = urlString.split('?');
  const queryParamsPairs = queryParamsString.split('&');
  const queryParameters = {};
  queryParamsPairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    // If there are no QP's we don't want to push "": undefined
    if (key) {
      queryParameters[key] = value;
    }
  });
  return {
    baseUrl,
    queryParameters,
  };
}

function getUrlInfo(expectedUrl) {
  const { currentURL }  = require('@ember/test-helpers');
  const currentUrlString = currentURL();
  const currentUrlInfo = extraUrlInfo(currentUrlString);
  const expectedUrlInfo = extraUrlInfo(expectedUrl);
  return {
    currentUrlInfo,
    expectedUrlInfo,
  }
}

function equals(expectedUrl, expectedQueryParams) {
  const { currentUrlInfo, expectedUrlInfo } = getUrlInfo(expectedUrl);
  if (expectedQueryParams) {
    QUnit.assert.equal(
      currentUrlInfo.baseUrl,
      expectedUrlInfo.baseUrl,
      'Expected base URL to be the same'
    );
    QUnit.assert.deepEqual(
      currentUrlInfo.queryParameters,
      expectedQueryParams,
      'Expected query parameters to be the same'
    );
  } else {
    QUnit.assert.equal(
      currentUrlInfo.baseUrl,
      expectedUrlInfo.baseUrl,
      'Expected base URL to be the same'
    );
    QUnit.assert.deepEqual(
      currentUrlInfo.queryParameters,
      expectedUrlInfo.queryParameters,
      'Expected query parameters to be the same'
    );
  }
}

function setupCurrenUrlAssert() {
  QUnit.assert.currentUrl = {
    equals
  }
}

// Load on next tick becuase dummy addon doesn't load qunit until later.
// Don't need to do this in normal apps annoyingly
setTimeout(setupCurrenUrlAssert, 0);