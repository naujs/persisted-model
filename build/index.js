'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Model = require('@naujs/model'),
    _ = require('lodash');

var DEFAULT_ID_ATTRIBUTES = 'id';

var DEFAULT_ENDPOINTS = {
  'findAll': {
    'path': '/',
    'type': 'GET',
    'args': {
      'where': 'object',
      'include': 'any',
      'field': 'array',
      'order': 'array',
      'limit': 'number',
      'offset': 'number'
    }
  },

  'find': {
    'path': '/:id',
    'type': 'GET',
    'args': {
      'where': 'object',
      'include': 'any',
      'field': 'array',
      'order': 'array',
      'limit': 'number',
      'offset': 'number'
    }
  },

  'create': {
    'path': '/',
    'type': 'POST'
  },

  'update': {
    'path': '/:id',
    'type': 'PUT'
  },

  'delete': {
    'path': '/:id',
    'type': 'DELETE'
  }
};

/**
 * @name PersistedModel
 * @constructor
 * @augments Model
 */

var PersistedModel = function (_Model) {
  _inherits(PersistedModel, _Model);

  function PersistedModel() {
    _classCallCheck(this, PersistedModel);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PersistedModel).apply(this, arguments));
  }

  _createClass(PersistedModel, [{
    key: 'modelName',

    /**
     * Returns the table/collection name for this model
     * @method PersistedModel#modelName
     * @return {String}
     */
    value: function modelName() {
      throw 'Must implement';
    }

    /**
     * Returns the primary key for this model
     * @method PersistedModel#primaryKey
     * @return {String}
     */

  }, {
    key: 'primaryKey',
    value: function primaryKey() {
      return DEFAULT_ID_ATTRIBUTES;
    }

    /**
     * Gets the actual value of the primary key
     * @return {String|Number}
     */

  }, {
    key: 'getPrimaryKeyValue',
    value: function getPrimaryKeyValue() {
      var key = this.primaryKey();

      if (this[key] !== void 0) {
        return this[key];
      }
    }
  }, {
    key: 'setPrimaryKeyValue',
    value: function setPrimaryKeyValue(value) {
      if (!value) {
        return this;
      }

      var primaryKey = this.primaryKey();
      this[primaryKey] = value;
      return this;
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes() {
      var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _get(Object.getPrototypeOf(PersistedModel.prototype), 'setAttributes', this).call(this, attributes);

      var primaryKey = this.primaryKey();
      this.setPrimaryKeyValue(attributes[primaryKey]);
    }
  }, {
    key: 'isNew',
    value: function isNew() {
      return !!!this.getPrimaryKeyValue();
    }
  }, {
    key: 'getPersistableAttributes',
    value: function getPersistableAttributes() {
      var _this2 = this;

      var attributes = this.attributes();
      var persistableAttributes = {};

      _.each(attributes, function (options, attr) {
        if (options.persistable === false) {
          // skip it
        } else {
            persistableAttributes[attr] = _this2[attr];
          }
      });

      return persistableAttributes;
    }

    // Lifecycle hooks

  }, {
    key: 'onAfterFind',
    value: function onAfterFind() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return this;
    }
  }, {
    key: 'onBeforeCreate',
    value: function onBeforeCreate() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return true;
    }
  }, {
    key: 'onAfterCreate',
    value: function onAfterCreate() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return this;
    }
  }, {
    key: 'onBeforeUpdate',
    value: function onBeforeUpdate() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return true;
    }
  }, {
    key: 'onAfterUpdate',
    value: function onAfterUpdate() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return this;
    }
  }, {
    key: 'onBeforeSave',
    value: function onBeforeSave() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return true;
    }
  }, {
    key: 'onAfterSave',
    value: function onAfterSave() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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

  }, {
    key: 'endPoints',
    value: function endPoints() {
      return {};
    }

    /**
     * A list of default end points
     * @return {Object}
     */

  }, {
    key: 'defaultEndPoints',
    value: function defaultEndPoints() {
      return DEFAULT_ENDPOINTS;
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

  }, {
    key: 'getEndPoints',
    value: function getEndPoints() {
      var userDefinedEndPoints = this.endPoints();

      return _.extend({}, this.defaultEndPoints(), userDefinedEndPoints);
    }

    /**
     * Returns the API name for this model
     * @return {String}
     */

  }, {
    key: 'apiName',
    value: function apiName() {
      return this.modelName();
    }
  }]);

  return PersistedModel;
}(Model);

module.exports = PersistedModel;