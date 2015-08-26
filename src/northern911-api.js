'use strict';

import soap from 'soap';
import md5 from 'md5';
import moment from 'moment';

export default class Northern911API {

  constructor(options = {}) {
    let {vendorCode, password, sandbox = false} = options;

    this._vendorCode = vendorCode;
    this._password = password;
    this._sandbox = sandbox;
    this._url = 'https://addressinfo.northern911.com/soap/Service.svc?wsdl';
    this._urlSandbox = 'https://soapdev.northern911.com/soap/Service.svc?wsdl';
    this._dateFormat = 'YYYYMMDD';
    this._client = undefined;
  }

  connect(callback) {
    soap.createClient(this.url, (error, client) => {
      this._client = client;
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

    this._client.QueryCustomer(args, callback);
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
        VENDOR_CODE: this._vendorCode,
        PHONE_NUMBER: options.phoneNumber,
        LAST_NAME: options.lastName || '',
        FIRST_NAME: options.firstName || '',
        STREET_NUMBER: options.streetNumber,
        SUITE_APT: options.suiteApt || '',
        STREET_NAME: options.streetName,
        CITY: options.city,
        PROVINCE_STATE: options.provinceState,
        POSTAL_CODE_ZIP: options.postalCodeZip,
        OTHER_ADDRESS_INFO: options.otherAddressInfo || '',
        ENHANCED_CAPABLE: options.enhancedCapable
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
        VENDOR_CODE: this._vendorCode,
        PHONE_NUMBER: options.phoneNumber,
        LAST_NAME: options.lastName || '',
        FIRST_NAME: options.firstName || '',
        STREET_NUMBER: options.streetNumber,
        SUITE_APT: options.suiteApt || '',
        STREET_NAME: options.streetName,
        CITY: options.city,
        PROVINCE_STATE: options.provinceState,
        POSTAL_CODE_ZIP: options.postalCodeZip,
        OTHER_ADDRESS_INFO: options.otherAddressInfo || '',
        ENHANCED_CAPABLE: options.enhancedCapable
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