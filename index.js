'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-current-url',

  included(app) {
    this._super.included.apply(this, arguments);
    app.import('vendor/qunit-current-url-dist.js', { type: 'test' });
    app.import('vendor/qunit-current-url-dist.js.map', { type: 'test' });
  },

  treeForVendor(vendorTree) {
    let qunitPluginTree = new Funnel(`${__dirname}/lib`, {
      files: ['qunit-current-url-dist.js', 'qunit-current-url-dist.js.map'],
    });

    return new MergeTrees([vendorTree, qunitPluginTree]);
  },

};
