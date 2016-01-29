'use strict';

var PersistedModel = require('../')
  , _ = require('lodash');

const DEFAULT_ENDPOINTS = {
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
    'path': '/:id',
    'type': 'GET',
    'args': {
      'id': {
        'type': 'number',
        'required': true
      }
    }
  },
  'create': {
    'path': '/',
    'type': 'POST'
  },
  'update': {
    'path': '/:id',
    'type': 'PUT',
    'args': {
      'id': {
        'type': 'number',
        'required': true
      }
    }
  },
  'delete': {
    'path': '/:id',
    'type': 'DELETE',
    'args': {
      'id': {
        'type': 'number',
        'required': true
      }
    }
  }
};

class DummyModel extends PersistedModel {
  attributes() {
    return {
      firstName: {
        type: PersistedModel.Types.string
      },
      lastName: {
        type: PersistedModel.Types.string
      },
      name: {
        type: PersistedModel.Types.string,
        persistable: false
      }
    };
  }

  endPoints() {
    return {
      'test': {
        path: 'test',
        type: 'GET'
      }
    };
  }
}

describe('PersistedModel', () => {
  var model;

  beforeEach(() => {
    spyOn(DummyModel.prototype, 'primaryKey').and.callThrough();
    model = new DummyModel({
      firstName: 'Tan',
      lastName: 'Nguyen',
      name: 'Tan Nguyen'
    });
  });

  describe('#getPersistableAttributes', () => {
    it('should return all persistable attributes', () => {
      expect(model.getPersistableAttributes()).toEqual({
        firstName: 'Tan',
        lastName: 'Nguyen'
      });
    });
  });

  describe('#setAttributes', () => {
    it('should set id using the default attributes', () => {
      model.setAttributes({
        id: 1,
        firstName: 'Tan'
      });

      expect(model.id).toEqual(1);
      expect(model.firstName).toEqual('Tan');
    });

    it('should set id defined by the user', () => {
      DummyModel.prototype.primaryKey.and.returnValue('ssn');
      model.setAttributes({
        ssn: 1,
        firstName: 'Tan'
      });

      expect(model.ssn).toEqual(1);
      expect(model.id).not.toBeDefined();
      expect(model.firstName).toEqual('Tan');
    });
  });

  describe('#isNew', () => {
    it('should return true when the model is new', () => {
      model.setAttributes({
        firstName: 'Tan'
      });

      expect(model.isNew()).toBe(true);
    });

    it('should return false when the model is not new', () => {
      model.setAttributes({
        id: 1,
        firstName: 'Tan'
      });

      expect(model.isNew()).toBe(false);
    });
  });

  describe('#defaultEndPoints', () => {
    it('should construct default end points using the defined primary key', () => {
      expect(model.defaultEndPoints()).toEqual(DEFAULT_ENDPOINTS);
    });
  });

  describe('#getEndPoints', () => {
    it('should merge user-defined end points and default end points', () => {
      expect(model.getEndPoints()).toEqual(_.extend({
        'test': {
          path: 'test',
          type: 'GET'
        }
      }, DEFAULT_ENDPOINTS));
    });
  });
});
