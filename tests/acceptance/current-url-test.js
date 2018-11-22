import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | current url', function(hooks) {
  setupApplicationTest(hooks);

  test('We have a catch all route', async function(assert) {
    await visit('/foo?bar=baz');

    assert.equal(currentURL(), '/foo?bar=baz');
  });

  test('Equals functions for basic routes', async function(assert) {
    await visit('/foo');

    assert.equal(currentURL(), '/foo');
    assert.currentUrl.equals('/foo');
  });

  test('Equals functions for with query params', async function(assert) {
    await visit('/foo?bar=baz');

    assert.equal(currentURL(), '/foo?bar=baz');
    assert.currentUrl.equals('/foo?bar=baz');
  });

  test('Equals functions with multiple query params', async function(assert) {
    await visit('/foo?bar=baz&qux=quux');

    assert.equal(currentURL(), '/foo?bar=baz&qux=quux');
    assert.currentUrl.equals('/foo?bar=baz&qux=quux');
  });

  test('Equals functions for with query params (hash)', async function(assert) {
    await visit('/foo?bar=baz');

    assert.equal(currentURL(), '/foo?bar=baz');
    assert.currentUrl.equals('/foo', { bar: 'baz' });
  });

  test('Equals functions with multiple query params (hash)', async function(assert) {
    await visit('/foo?bar=baz&qux=quux');

    assert.equal(currentURL(), '/foo?bar=baz&qux=quux');
    assert.currentUrl.equals('/foo?bar=baz&qux=quux', { bar: 'baz', qux: 'quux' });
  });

  test('Includes functions', async function(assert) {
    await visit('/foo/bar/baz');
    assert.currentUrl.includes('bar');
  });

  test('Has query parameters functions', async function(assert) {
    await visit('/foo?bar=baz');
    assert.currentUrl.hasQueryParameters({
      bar: 'baz'
    });
  });

  test('Does Not Include functions', async function(assert) {
    await visit('/foo/bar/baz');
    assert.currentUrl.doesNotInclude('qux');
  });

  test('Does not have query parameters functions', async function(assert) {
    await visit('/foo?bar=baz');
    assert.currentUrl.doesNotHaveQueryParameters({
      qux: 'quux'
    });
  });
});
