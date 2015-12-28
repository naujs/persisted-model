'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Model = require('@naujs/model');

/**
 * @name PersistedModel
 * @constructor
 * @augments Model
 */

var PersistedModel = (function (_Model) {
  _inherits(PersistedModel, _Model);

  function PersistedModel() {
    _classCallCheck(this, PersistedModel);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PersistedModel).apply(this, arguments));
  }

  _createClass(PersistedModel, [{
    key: 'name',

    /**
     * Returns the table or collection name of this model
     * @method PersistedModel#name
     * @return {string}
     */
    value: function name() {
      throw 'Must implement';
    }
  }]);

  return PersistedModel;
})(Model);

module.exports = PersistedModel;