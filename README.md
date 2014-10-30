# sortable-collection-view

Provide a `SortableCollectionView` and `SortableCollectionItemView` to sort **visually** a collection
of items. The items are not sorted in memory, but only on the screen, which allow very fast sorting.


**This is still a WIP, while it is working, it does not yet listen correctly for changes in the given
`content` and its items' properties**


## Installation

* `npm install --save-dev ember-sortable-collection-view`
* In your template:

    ```handlebars
    {{view 'ember-sortable-collection-view@sortable-collection'
        content=model
        itemTemplate='some/template'
        sortProperties='name,date'
        sortAscending=false}}
    ```

