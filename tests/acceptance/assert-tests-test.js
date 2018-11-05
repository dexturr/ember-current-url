import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | assert tests', function(hooks) {
  setupApplicationTest(hooks);

  test('We have a catch all route', async function(assert) {
    await visit('/foo?bar=baz');

    assert.equal(currentURL(), '/foo?bar=baz');
  });

  test('Functions for basic routes', async function(assert) {
    await visit('/foo');

    assert.equal(currentURL(), '/foo');
    assert.currentUrl('/foo');
  });

  test('Functions for with query params', async function(assert) {
    await visit('/foo?bar=baz');

    assert.equal(currentURL(), '/foo?bar=baz');
    assert.currentUrl('/foo?bar=baz');
  });

  test('Functions with multiple query params', async function(assert) {
    await visit('/foo?bar=baz&qux=quux');

    assert.equal(currentURL(), '/foo?bar=baz&qux=quux');
    assert.currentUrl('/foo?bar=baz&qux=quux');
  });

  test('Functions for with query params (hash)', async function(assert) {
    await visit('/foo?bar=baz');

    assert.equal(currentURL(), '/foo?bar=baz');
    assert.currentUrl('/foo', { bar: 'baz' });
  });

  test('Functions with multiple query params (hash)', async function(assert) {
    await visit('/foo?bar=baz&qux=quux');

    assert.equal(currentURL(), '/foo?bar=baz&qux=quux');
    assert.currentUrl('/foo?bar=baz&qux=quux', { bar: 'baz', qux: 'quux' });
  });
});
