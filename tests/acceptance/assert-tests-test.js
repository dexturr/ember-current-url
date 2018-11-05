import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | assert tests', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /assert-tests', async function(assert) {
    await visit('/assert-tests');

    assert.equal(currentURL(), '/assert-tests');
  });
});
