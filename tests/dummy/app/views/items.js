import Ember from 'ember';
import SortableCollectionView from 'ember-sortable-collection-view/views/sortable-collection';


export default SortableCollectionView.extend({
  tagName: 'ul',

  sortProperties: ['date', 'int', 'number'],

  content: Ember.computed.oneWay('controller.model'),

  click: function () {
    var d = Date.now();
    this.toggleProperty('sortAscending');
    this._applySortOrder();
    d = (Date.now() - d) / 1000;
    console.log('sorted in', d, 'seconds');
  }
});
