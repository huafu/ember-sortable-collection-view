import Ember from 'ember';
import SortableCollectionItem from './sortable-collection-item';

export default Ember.CollectionView.extend({
  /**
   * @inheritDoc
   */
  itemViewClass:    SortableCollectionItem.extend({}),
  /**
   * Name of the template for one item
   * @property itemTemplateName
   * @type String
   */
  itemTemplateName: null,
  /**
   * Like for SortableMixin, the property names used to sort
   * @property sortProperties
   * @type Array<String>
   */
  sortProperties:   Ember.computed(function (key, value) {
    if (arguments.length > 1) {
      if (typeof value === 'string') {
        value = value.split(/,/g);
      }
    }
    return value || [];
  }),
  /**
   * Are we sorting in normal or reverse order?
   * @property sortAscending
   * @type Boolean
   */
  sortAscending:    true,
  /**
   * Function used to compare values
   * @property sortFunction
   * @type Function
   */
  sortFunction:     Ember.compare,

  /**
   * Are we sorted? (can be used to disabled the sort)
   * @property isSorted
   * @type Boolean
   */
  isSorted: Ember.computed('sortProperties', function (key, value) {
    // read the sort order from the # of sortProperties even if we're trying to write `true`
    if (arguments.length < 2 || value) {
      value = this.get('sortProperties');
      value = value && value.length > 0;
    }
    return !!value;
  }),

  /**
   * Public access to the sorting method. Schedule visual sorting when it will be able to do it
   *
   * @method arrangeVisualContent
   */
  arrangeVisualContent: function () {
    this._triggerSorting();
  },

  /**
   * Listen for elements which would need to trigger the sorting again
   * TODO: do this intelligent, listening for added/removed items, etc...
   *
   * @method _triggerSorting
   */
  _triggerSorting: Ember.on('didInsertElement', Ember.observer(
    'sortProperties.@each', 'sortAscending', 'sortFunction', 'content.[]',
    function () {
      Ember.run.once(this, '_applySortOrder');
    }
  )),


  /**
   * Used internally to build a bare array used for sorting
   *
   * @method _buildSortingArray
   * @returns {Array<Object>}
   * @private
   */
  _buildSortingArray: function () {
    var content = this.get('content');
    var sortProperties = this.get('sortProperties');
    var childViews = this.get('childViews');
    var sortingArray = [];
    for (var i = 0; i < content.length; i++) {
      sortingArray.push({
        hash: Ember.getProperties(content[i], sortProperties),
        view: childViews[i]
      });
    }
    return sortingArray;
  },

  /**
   * Apply the sort order on the elements
   *
   * @method _applySortOrder
   * @private
   */
  _applySortOrder: function () {
    var sortingArray, parentNode, sortedArray, sortAscending, keys, sortFunction, self;
    if (this._state !== 'inDOM') {
      // we aren't in the DOM, let's schedule the sort after we're rendered
      Ember.run.scheduleOnce('afterRender', this, 'applySortOrder');
    }
    else {
      self = this;
      sortingArray = this._buildSortingArray();
      parentNode = this.get('element');
      keys = this.get('sortProperties');
      sortAscending = this.get('sortAscending');
      sortFunction = this.get('sortFunction');
      sortedArray = sortingArray.sort(function (item1, item2) {
        var res;
        for (var i = 0; i < keys.length; i++) {
          if ((res = sortFunction.call(self, item1.hash[keys[i]], item2.hash[keys[i]]))) {
            return sortAscending ? res : (-1) * res;
          }
        }
        return 0;
      });
      for (var i = 0; i < sortedArray.length; i++) {
        sortedArray[i].view.set('sortIndex', i);
        parentNode.appendChild(sortedArray[i].view.get('element'));
      }
    }
  },
});
