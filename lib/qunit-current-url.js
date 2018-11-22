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

function getCurrentUrlInfo() {
  const { currentURL }  = require('@ember/test-helpers');
  const currentUrlString = currentURL();
  const currentUrlInfo = extraUrlInfo(currentUrlString);
  return currentUrlInfo;
}

function getUrlInfo(expectedUrl) {
  const currentUrlInfo = getCurrentUrlInfo();
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

function includes(urlPart) {
  const currentUrlInfo = getCurrentUrlInfo();
  QUnit.assert.ok(
    currentUrlInfo.baseUrl.includes(urlPart),
    `Expected base URL to include ${urlPart}`
  );
}

function hasQueryParameters(queryParameters) {
  const currentUrlInfo = getCurrentUrlInfo();
  for (const key in queryParameters) {
    QUnit.assert.ok(
      currentUrlInfo.queryParameters.hasOwnProperty(key),
      `Expected query parameter ${key} to be present`
    )
    QUnit.assert.equal(
      currentUrlInfo.queryParameters[key],
      queryParameters[key],
      'Expected query parameters to be the same'
    )
  }
}

function doesNotInclude(urlPart) {
  const currentUrlInfo = getCurrentUrlInfo();
  QUnit.assert.notOk(
    currentUrlInfo.baseUrl.includes(urlPart),
    `Expected base URL to not include ${urlPart}`
  );
}

function doesNotHaveQueryParameters(queryParameters) {
  const currentUrlInfo = getCurrentUrlInfo();
  for (const key in queryParameters) {
    QUnit.assert.notOk(
      currentUrlInfo.queryParameters.hasOwnProperty(key),
      `Expected query parameter ${key} to not be present`
    )
    QUnit.assert.notEqual(
      currentUrlInfo.queryParameters[key],
      queryParameters[key],
      'Expected query parameters to not be the same'
    )
  }
}

function setupCurrenUrlAssert() {
  QUnit.assert.currentUrl = {
    equals,
    includes,
    hasQueryParameters,
    doesNotInclude,
    doesNotHaveQueryParameters,
  }
}

// Load on next tick becuase dummy addon doesn't load qunit until later.
// Don't need to do this in normal apps annoyingly
setTimeout(setupCurrenUrlAssert, 0);