'use strict';

import soap from 'soap';
import md5 from 'md5';
import moment from 'moment';
import isEmpty from 'lodash.isempty';

export default class Northern911API {

  constructor(options = {}) {
    let {vendorCode, password, sandbox = false} = options;

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

  connect(callback) {
    soap.createClient(this.url, (error, client) => {
      this._client = client;

      // this is a HACK. Need to add it as per:
      // https://github.com/vpulim/node-soap/issues/672
      for (let key in this._envelopeProperties) {
        this._client.wsdl.definitions.xmlns[key] =
          this._envelopeProperties[key];
      }

      this._client.wsdl.xmlnsInEnvelope = this._client.wsdl._xmlnsMap();

      callback(error);
    });
  }

  queryCustomer(phoneNumber, callback) {
    if (!this._client) {
      throw 'northern911-api.queryCustomer: -> connection is closed. ' +
        'Cannot execute';
    }

    let args = {
      vendorCode: this._vendorCode,
      phoneNumber: phoneNumber,
      hash: this.hash
    };

    this._client.QueryCustomer(args, (error, result, body) => {

      // this is a HACK. We need to convert all empty objects into empty strings
      // https://github.com/vpulim/node-soap/issues/707
      if (result.QueryCustomerResult && result.QueryCustomerResult.Customer) {
        for (let key in result.QueryCustomerResult.Customer) {
          if (isEmpty(result.QueryCustomerResult.Customer[key])) {
            result.QueryCustomerResult.Customer[key] = '';
          }
        }
      }

      callback(error, result, body);
    });
  }

  getVendorDumpURL(callback) {
    if (!this._client) {
      throw 'northern911-api.getVendorDumpURL: -> connection is closed. ' +
        'Cannot execute';
    }

    let args = {
      vendorCode: this._vendorCode,
      hash: this.hash
    };

    this._client.GetVendorDumpURL(args, callback);
  }

  addOrUpdateCustomer(options = {}, callback) {
    if (!this._client) {
      throw 'northern911-api.addOrUpdateCustomer: -> connection is closed. ' +
        'Cannot execute';
    }

    if (options.enhancedCapable != 'Y' && options.enhancedCapable != 'N') {
      return console.error('northern911-api.addOrUpdateCustomer: -> ' +
        'ENHANCED_CAPABLE has to be Y or N');
    }

    let args = {
      customer: {
        'ns:CITY': options.city,
        'ns:ENHANCED_CAPABLE': options.enhancedCapable,
        'ns:FIRST_NAME': options.firstName || '',
        'ns:LAST_DATETIME_MODIFIED': options.lastDateTimeModified || '',
        'ns:LAST_DATETIME_MODIFIED_UNIXTIME':
          options.lastDateTimeModifiedUnixTime || '',
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

  verifyCustomer(options = {}, callback) {
    if (!this._client) {
      throw 'northern911-api.verifyCustomer: -> connection is closed. ' +
        'Cannot execute';
    }

    if (options.enhancedCapable != 'Y' && options.enhancedCapable != 'N') {
      return console.error('northern911-api.verifyCustomer: -> ' +
        'ENHANCED_CAPABLE has to be Y or N');
    }

    let args = {
      customer: {
        'ns:CITY': options.city,
        'ns:ENHANCED_CAPABLE': options.enhancedCapable,
        'ns:FIRST_NAME': options.firstName || '',
        'ns:LAST_DATETIME_MODIFIED': options.lastDateTimeModified || '',
        'ns:LAST_DATETIME_MODIFIED_UNIXTIME':
          options.lastDateTimeModifiedUnixTime || '',
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

  deleteCustomer(phoneNumber, callback) {
    let args = {
      vendorCode: this._vendorCode,
      phoneNumber: phoneNumber,
      hash: this.hash
    };

    this._client.DeleteCustomer(args, callback);
  }

  get url() {
    return this._sandbox ? this._urlSandbox : this._url;
  }

  get hash() {
    let gmDate = moment().utc().format(this._dateFormat);
    return md5(this._vendorCode + this._password + gmDate);
  }

};