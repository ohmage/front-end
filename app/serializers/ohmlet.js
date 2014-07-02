import ApplicationSerializer from "./application";

export default ApplicationSerializer.extend({
  // Because of a bug in Ember Data and how the primary key is looked up for embedded records
  // We use the adapter to inject 'id' for an ajax request
  // primaryKey: 'ohmlet_id',
});