var Model = require('@naujs/model')
  , _ = require('lodash');

/**
 * @name PersistedModel
 * @constructor
 * @augments Model
 */
class PersistedModel extends Model {

  /**
   * Returns singular and plural names for this modell
   * @method PersistedModel#names
   * @return {Array} [singular, plural]
   */
  names() {
    throw 'Must implement';
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
