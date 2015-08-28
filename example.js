'use strict';

var /* Northern911API = require('northern911-api'), // Use this require if you load module through npm */
    Northern911API = require('./dist/northern911-api.js');

var northern911API = new Northern911API({
  vendorCode: '',   // put your vendor code here
  password: '',     // put your vendor password here
  sandbox: true
});

var callback = function(error, result, body) {
  console.log(body);
  console.log();
  console.log(result);

  if (error) {
    console.error(error);
  }
};

northern911API.connect(function(error) {
  if (error) {
    return console.error(error);
  }

  northern911API.getVendorDumpURL(callback);

  northern911API.verifyCustomer({
    phoneNumber: '6479250483',
    lastName: '',
    firstName: '',
    streetNumber: '1234',
    suiteApt: '',
    streetName: 'Trail Ridge Lane',
    city: 'Markham',
    provinceState: 'ON',
    postalCodeZip: 'L6C2C6',
    otherAddressInfo: '',
    enhancedCapable: 'N'
  }, callback);

  northern911API.addOrUpdateCustomer({
    phoneNumber: '6479250483',
    lastName: '',
    firstName: '',
    streetNumber: '1234',
    suiteApt: '',
    streetName: 'Trail Ridge Lane',
    city: 'Markham',
    provinceState: 'ON',
    postalCodeZip: 'L6C2C6',
    otherAddressInfo: '',
    enhancedCapable: 'N'
  }, callback);

  northern911API.queryCustomer('6479250483', callback);

  northern911API.deleteCustomer('6479250483', callback);
});