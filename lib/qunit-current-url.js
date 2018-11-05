/* eslint-disable no-undef */

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

function objectToString(object) {
  const keyValueStrings = Object.keys(object)
    .sort(function (a, b) {
        const left = a.toLowerCase();
        const right = b.toLowerCase();
        if (left < right) { 
            return -1;
        }
        if (left > right) { 
            return 1; 
        }
        return 0;
    })
    .map((key) => `${key}=${object[key]}`)
    .join('&');
  return `?${keyValueStrings}`;
}

QUnit.assert.currentUrl = function(expectedUrl, expectedQueryParams) {
  const { currentURL }  = require('@ember/test-helpers');
  const currentUrlString = currentURL();
  const currentUrlInfo = extraUrlInfo(currentUrlString);
  if (expectedQueryParams) {
    const expectedUrlInfo = extraUrlInfo(expectedUrl);
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
    const expectedUrlInfo = extraUrlInfo(expectedUrl);
    QUnit.assert.equal(
      currentUrlInfo.baseUrl,
      expectedUrlInfo.baseUrl,
      'Expected base URL to be the same'
    );
    QUnit.assert.equal(
      objectToString(currentUrlInfo.queryParameters),
      objectToString(expectedUrlInfo.queryParameters),
      'Expected query parameters to be the same'
    );
  }
};