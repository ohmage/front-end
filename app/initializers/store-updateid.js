import DS from "ember-data";

export default {
  name: 'store-updateId',
  initialize: function() {
    DS.Store.reopen({

      /**
        The unique id for a record can change if the version increases
      */
      updateId: function(record, data) {
        var id = data.id;
        this.typeMapFor(record.constructor).idToRecord[id] = record;
        record.set('id', id);
      },
    });
  }
};