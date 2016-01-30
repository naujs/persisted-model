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

  primaryKeyType() {
    return 'number';
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

  toJSON() {
    let json = super.toJSON();
    let pk = this.getPrimaryKeyValue();
    if (pk) {
      json[this.primaryKey()] = pk;
    }
    return json;
  }

  // Lifecycle hooks

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

  onBeforeDelete(options = {}) {
    return true;
  }

  onAfterDelete(options = {}) {
    return this;
  }

  /**
   * Returns all the API endpoints for this model
   * @return {Object}
   * @example
   * {
   * 	'findAll': {
   * 		path: '/',
   * 		type: 'get',
   * 		handler: 'findAll' // if omitted the key (`findAll` in this case) will be used
   * 	},
   * 	'create': false // specify false or null to disable
   * }
   */
  endPoints() {
    return {

    };
  }

  _defaultArgsForId() {
    let args = {};
    args[this.primaryKey()] = {
      'type': this.primaryKeyType(),
      'required': true
    };
    return args;
  }

  _defaultPathForId() {
    return '/:' + this.primaryKey();
  }

  /**
   * A list of default end points
   * @return {Object}
   */
  defaultEndPoints() {
    return {
      'findAll': {
        'path': '/',
        'type': 'GET',
        'args': {
          'where': 'object',
          'include': 'any',
          'field': ['string'],
          'order': ['string'],
          'limit': 'number',
          'offset': 'number'
        }
      },

      'findByPk': {
        'path': this._defaultPathForId(),
        'type': 'GET',
        'args': this._defaultArgsForId()
      },

      'create': {
        'path': '/',
        'type': 'POST'
      },

      'update': {
        'path': this._defaultPathForId(),
        'type': 'PUT',
        'args': this._defaultArgsForId()
      },

      'delete': {
        'path': this._defaultPathForId(),
        'type': 'DELETE',
        'args': this._defaultArgsForId()
      }
    };
  }

  /**
   * Gets the user-defined end points and merge them with the default ones
   * By default there are 5 endpoints for
   * - find all records (findAll)
   * - find one record (find)
   * - create new record (create)
   * - update existing record (update)
   * - delete a record (delete)
   * @return {Object}
   */
  getEndPoints() {
    let userDefinedEndPoints = this.endPoints();

    return _.extend({}, this.defaultEndPoints(), userDefinedEndPoints);
  }

  /**
   * Returns the API name for this model
   * @return {String}
   */
  apiName() {
    return this.modelName();
  }
}

module.exports = PersistedModel;
