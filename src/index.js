var Model = require('@naujs/model');

/**
 * @name PersistedModel
 * @constructor
 * @augments Model
 */
class PersistedModel extends Model {

  /**
   * Returns the table or collection name of this model
   * @method PersistedModel#name
   * @return {string}
   */
  name() {
    throw 'Must implement';
  }
}

module.exports = PersistedModel;
