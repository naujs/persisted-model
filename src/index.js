var Model = require('@naujs/model')
  , _ = require('lodash');

/**
 * @name PersistedModel
 * @constructor
 * @augments Model
 */
class PersistedModel extends Model {

  /**
   * Returns the table/collection name for this model
   * @method PersistedModel#modelName
   * @return {String}
   */
  modelName() {
    throw 'Must implement';
  }

  /**
   * Returns the primary key for this model
   * By default it return null which means that
   * the model will try its best to guest the primary key
   * which is usually `id` for sql databases or `_id` for mongodb
   * @method PersistedModel#primaryKey
   * @return {String}
   */
  primaryKey() {
    return null;
  }

  /**
   * Gets the actual value of the primary key
   * @return {String|Number}
   */
  getPrimaryKeyValue() {
    var key = this.primaryKey();
    if (!key) {
      for (let value in ['id', '_id']) {
        if (this[value] !== void(0)) {
          return this[value];
        }
      }
      return null;
    }
    return this[key];
  }

  getPersistableAttributes() {
    let attributes = this.attributes();
    let persistableAttributes = {};

    _.each(attributes, (options, attr) => {
      if (options.persistable === false) {
        // skip it
      } else {
        persistableAttributes[attr] = this[attr];
      }
    });

    return persistableAttributes;
  }

  onAfterFind(options = {}) {
    return this;
  }

  onBeforeCreate(options = {}) {
    return true;
  }

  onAfterCreate(options = {}) {
    return this;
  }

  onBeforeUpdate(options = {}) {
    return true;
  }

  onAfterUpdate(options = {}) {
    return this;
  }

  onBeforeSave(options = {}) {
    return true;
  }

  onAfterSave(options = {}) {
    return this;
  }
}

module.exports = PersistedModel;
