'use strict';

module.exports = {
  name: 'ember-current-url',

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/qunit-current-url-dist.js', { type: 'test' });
    app.import('vendor/qunit-current-url-dist.js.map', { type: 'test' });
  },
};
