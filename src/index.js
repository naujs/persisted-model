var Model = require('@naujs/model')
  , _ = require('lodash');

const DEFAULT_ID_ATTRIBUTES = [
  'id',
  '_id'
];

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
    let key = this.primaryKey();
    if (!key) {
      for (let index in DEFAULT_ID_ATTRIBUTES) {
        let value = DEFAULT_ID_ATTRIBUTES[index];
        if (this[value] !== void(0)) {
          return this[value];
        }
      }
      return null;
    }
    return this[key];
  }

  setPrimaryKeyValue(value) {
    if (!value) {
      return this;
    }

    let primaryKey = this.primaryKey();
    if (primaryKey) {
      this[primaryKey] = value;
    } else {
      this.id = value;
      this._id = value;
    }

    return this;
  }

  setAttributes(attributes = {}) {
    super.setAttributes(attributes);

    let primaryKey = this.primaryKey();
    if (!primaryKey) {
      for (let index in DEFAULT_ID_ATTRIBUTES) {
        let attr = DEFAULT_ID_ATTRIBUTES[index];
        if (attributes[attr] !== void(0)) {
          this.setPrimaryKeyValue(attributes[attr]);
        }
      }
    } else {
      this.setPrimaryKeyValue(attributes[primaryKey]);
    }
  }

  isNew() {
    return !!!this.getPrimaryKeyValue();
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
