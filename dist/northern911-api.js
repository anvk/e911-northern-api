'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _soap = require('soap');

var _soap2 = _interopRequireDefault(_soap);

var _md5 = require('md5');

var _md52 = _interopRequireDefault(_md5);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var Northern911API = (function () {
  function Northern911API() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Northern911API);

    var vendorCode = options.vendorCode;
    var password = options.password;
    var _options$sandbox = options.sandbox;
    var sandbox = _options$sandbox === undefined ? false : _options$sandbox;

    this._vendorCode = vendorCode;
    this._password = password;
    this._sandbox = sandbox;
    this._url = 'https://addressinfo.northern911.com/soap/Service.svc?wsdl';
    this._urlSandbox = 'https://soapdev.northern911.com/soap/Service.svc?wsdl';
    this._dateFormat = 'YYYYMMDD';
    this._envelopeProperties = {
      soapenv: 'http://schemas.xmlsoap.org/soap/envelope/',
      tem: 'http://tempuri.org/',
      ns: 'http://schemas.datacontract.org/2004/07/'
    };
    this._client = undefined;
  }

  _createClass(Northern911API, [{
    key: 'connect',
    value: function connect(callback) {
      var _this = this;

      _soap2['default'].createClient(this.url, function (error, client) {
        _this._client = client;

        for (var key in _this._envelopeProperties) {
          _this._client.wsdl.definitions.xmlns[key] = _this._envelopeProperties[key];
        }

        _this._client.wsdl.xmlnsInEnvelope = _this._client.wsdl._xmlnsMap();

        callback(error);
      });
    }
  }, {
    key: 'queryCustomer',
    value: function queryCustomer(phoneNumber, callback) {
      if (!this._client) {
        throw 'northern911-api.queryCustomer: -> connection is closed. ' + 'Cannot execute';
      }

      var args = {
        vendorCode: this._vendorCode,
        phoneNumber: phoneNumber,
        hash: this.hash
      };

      this._client.QueryCustomer(args, callback);
    }
  }, {
    key: 'getVendorDumpURL',
    value: function getVendorDumpURL(callback) {
      if (!this._client) {
        throw 'northern911-api.getVendorDumpURL: -> connection is closed. ' + 'Cannot execute';
      }

      var args = {
        vendorCode: this._vendorCode,
        hash: this.hash
      };

      this._client.GetVendorDumpURL(args, callback);
    }
  }, {
    key: 'addOrUpdateCustomer',
    value: function addOrUpdateCustomer(options, callback) {
      if (options === undefined) options = {};

      if (!this._client) {
        throw 'northern911-api.addOrUpdateCustomer: -> connection is closed. ' + 'Cannot execute';
      }

      if (options.enhancedCapable != 'Y' && options.enhancedCapable != 'N') {
        return console.error('northern911-api.addOrUpdateCustomer: -> ' + 'ENHANCED_CAPABLE has to be Y or N');
      }

      var args = {
        customer: {
          'ns:CITY': options.city,
          'ns:ENHANCED_CAPABLE': options.enhancedCapable,
          'ns:FIRST_NAME': options.firstName || '',
          'ns:LAST_DATETIME_MODIFIED': options.lastDateTimeModified || '',
          'ns:LAST_DATETIME_MODIFIED_UNIXTIME': options.lastDateTimeModifiedUnixTime || '',
          'ns:LAST_NAME': options.lastName || '',
          'ns:OTHER_ADDRESS_INFO': options.otherAddressInfo || '',
          'ns:PHONE_NUMBER': options.phoneNumber,
          'ns:POSTAL_CODE_ZIP': options.postalCodeZip,
          'ns:PROVINCE_STATE': options.provinceState,
          'ns:STREET_NAME': options.streetName,
          'ns:STREET_NUMBER': options.streetNumber,
          'ns:SUITE_APT': options.suiteApt || '',
          'ns:VENDOR_CODE': this._vendorCode
        },
        hash: this.hash
      };

      this._client.AddorUpdateCustomer(args, callback);
    }
  }, {
    key: 'verifyCustomer',
    value: function verifyCustomer(options, callback) {
      if (options === undefined) options = {};

      if (!this._client) {
        throw 'northern911-api.verifyCustomer: -> connection is closed. ' + 'Cannot execute';
      }

      if (options.enhancedCapable != 'Y' && options.enhancedCapable != 'N') {
        return console.error('northern911-api.verifyCustomer: -> ' + 'ENHANCED_CAPABLE has to be Y or N');
      }

      var args = {
        customer: {
          'ns:CITY': options.city,
          'ns:ENHANCED_CAPABLE': options.enhancedCapable,
          'ns:FIRST_NAME': options.firstName || '',
          'ns:LAST_DATETIME_MODIFIED': options.lastDateTimeModified || '',
          'ns:LAST_DATETIME_MODIFIED_UNIXTIME': options.lastDateTimeModifiedUnixTime || '',
          'ns:LAST_NAME': options.lastName || '',
          'ns:OTHER_ADDRESS_INFO': options.otherAddressInfo || '',
          'ns:PHONE_NUMBER': options.phoneNumber,
          'ns:POSTAL_CODE_ZIP': options.postalCodeZip,
          'ns:PROVINCE_STATE': options.provinceState,
          'ns:STREET_NAME': options.streetName,
          'ns:STREET_NUMBER': options.streetNumber,
          'ns:SUITE_APT': options.suiteApt || '',
          'ns:VENDOR_CODE': this._vendorCode
        },
        hash: this.hash
      };

      this._client.VerifyCustomer(args, callback);
    }
  }, {
    key: 'deleteCustomer',
    value: function deleteCustomer(phoneNumber, callback) {
      var args = {
        vendorCode: this._vendorCode,
        phoneNumber: phoneNumber,
        hash: this.hash
      };

      this._client.DeleteCustomer(args, callback);
    }
  }, {
    key: 'url',
    get: function get() {
      return this._sandbox ? this._urlSandbox : this._url;
    }
  }, {
    key: 'hash',
    get: function get() {
      var gmDate = (0, _moment2['default'])().utc().format(this._dateFormat);
      return (0, _md52['default'])(this._vendorCode + this._password + gmDate);
    }
  }]);

  return Northern911API;
})();

exports['default'] = Northern911API;
;
module.exports = exports['default'];