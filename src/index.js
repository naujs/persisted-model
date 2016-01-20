var Model = require('@naujs/model')
  , _ = require('lodash');

const DEFAULT_ID_ATTRIBUTES = 'id';

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
   * @method PersistedModel#primaryKey
   * @return {String}
   */
  primaryKey() {
    return DEFAULT_ID_ATTRIBUTES;
  }

  /**
   * Gets the actual value of the primary key
   * @return {String|Number}
   */
  getPrimaryKeyValue() {
    let key = this.primaryKey();

    if (this[key] !== void(0)) {
      return this[key];
    }
  }

  setPrimaryKeyValue(value) {
    if (!value) {
      return this;
    }

    let primaryKey = this.primaryKey();
    this[primaryKey] = value;
    return this;
  }

  setAttributes(attributes = {}) {
    super.setAttributes(attributes);

    let primaryKey = this.primaryKey();
    this.setPrimaryKeyValue(attributes[primaryKey]);
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
