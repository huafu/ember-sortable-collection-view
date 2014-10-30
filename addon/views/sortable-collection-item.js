import Ember from 'ember';


export default Ember.View.extend({
  /**
   * So that we have the item as context of our view as if we used {{each}}
   * @property context
   * @type *
   */
  context:     Ember.computed.alias('content'),

  /**
   * Index of this item related to the sort order
   * @property sortIndex
   * @type Number
   */
  sortIndex: null,

  /**
   * @inheritDoc
   */
  templateName: Ember.computed.oneWay('parentView.itemTemplateName')
});
