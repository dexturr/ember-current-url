ember-current-url
==============================================================================

High Level URL Assertions for [QUnit](https://qunitjs.com/) in [Ember](http://emberjs.com), heavily inspired by [qunit-dom](https://github.com/simplabs/qunit-dom).

Installation
------------------------------------------------------------------------------

```
ember install ember-current-url
```

Then run [this codemod](https://github.com/dexturr/ember-current-url-codemod) in you project directory order to migrate.  To run the codemod:

If you do not have jscodeshift installed globally, then run: `npm i jscodeshift -g`

To perform the transformation run the following command: 

`jscodeshift -t https://raw.githubusercontent.com/dexturr/ember-current-url-codemod/master/index.js ./tests`

API
------------------------------------------------------------------------------

This adds a new functionality to QUnit `assert` which verifies properties of the current URL. This utaltizes a hash for the query parameters so that tests are not dependant on the order of the query parameters.

## equals

```js
  test('Basic routes', async function(assert) {
    await visit('/foo');
    assert.currentUrl.equals('/foo');
  });

  // Query params function either by using a URL 
  test('Query params', async function(assert) {
    await visit('/foo?bar=baz&qux=quux');
    assert.currentUrl.equals('/foo?bar=baz&qux=quux');
  });

  // Or a hash
  test('Query params (hash)', async function(assert) {
    await visit('/foo?bar=baz&qux=quux');
    assert.currentUrl.equals(
        '/foo', 
        { 
            bar: 'baz', 
            qux: 'quux' 
        }
    );
  });
```

## incudes

```js
  test('Includes', async function(assert) {
    await visit('/foo/bar/baz');
    assert.currentUrl.includes('bar');
  });
```

## doesNotInclude

```js
  test('Does Not Include', async function(assert) {
    await visit('/foo/bar/baz');
    assert.currentUrl.doesNotInclude('qux');
  });
```

## hasQueryParameters

```js
  test('Has query parameters', async function(assert) {
    await visit('/foo?bar=baz');
    assert.currentUrl.hasQueryParameters({
      bar: 'baz'
    });
  });
```


## doesNotHaveQueryParameters

```js
  test('Does not have query parameters functions', async function(assert) {
    await visit('/foo?bar=baz');
    assert.currentUrl.doesNotHaveQueryParameters({
      qux: 'quux'
    });
  });
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-current-url`
* `npm install`

### Building

In general you can just run `npm build` (which runs both the below) however if altering anything in `./lib` you will need to build rollup and rebuild Ember in order to see your changes (it sucks, I know).

#### Rollup build

* `npm run build:dist`

#### Ember Build

* `npm run build:ember`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
