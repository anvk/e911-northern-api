# northern911-api [![Build Status](https://travis-ci.org/anvk/northern911-api.svg?branch=master)](https://travis-ci.org/anvk/northern911-api)

> A Node.js wrapper around Northern911 SOAP api. For more information about this API please read [Northern911 SOAP API Overview](https://addressinfo.northern911.com/soapapidocs/)

## Install

```
$ npm install northern911-api --save
```

## API

#### Northern911API(options)

> constructor to initialize the module

> `vendorCode` - vendor code given by Northern  
> `password` - password given by Northern  
> `sandbox` - (default: false) module will use Northern sandbox SOAP url if true

#### connect(callback)

> function to establish connection with Northern SOAP API

> `callback` - function(error) callback upon connection. All module functions have to be executed within

#### queryCustomer(phoneNumber, callback)

> Returns current data for the requested record. https://addressinfo.northern911.com/soapapidocs/#Query

> `phoneNumber` - Customer phone number.  
> `callback` - function(error, result, body). error contains error, result contains JSON result object and body contains full XML body result

#### getVendorDumpURL(callback)

> Get a URL to download the entire vendor database as CSV. https://addressinfo.northern911.com/soapapidocs/#VendorDump

> `callback` - function(error, result, body). error contains error, result contains JSON result object and body contains full XML body result

#### addOrUpdateCustomer(options, callback)

> Add new or update existing client record. https://addressinfo.northern911.com/soapapidocs/#AddUpdate

> `options.phoneNumber` - Customer phone number. Must be 10 digits  
> `options.lastName` - Last name or company name  
> `options.firstName` - First name  
> `options.streetNumber` - Street number  
> `options.suiteApt` - Suite or apartment number  
> `options.streetName` - Street name  
> `options.city` - City  
> `options.provinceState` - Two letter province or state code  
> `options.postalCodeZip` - Canadian postal code or USA zip code  
> `options.otherAddressInfo` - Other information  
> `options.enhancedCapable` - Yes or No. Must be 'Y' or 'N'.  
> `callback` - function(error, result, body). error contains error, result contains JSON result object and body contains full XML body result

#### verifyCustomer(options, callback)

> This does not modify customer details and only verifies whether or not the data passed to AddorUpdateCustomer would succeed. https://addressinfo.northern911.com/soapapidocs/#Verify

> `options.phoneNumber` - Customer phone number. Must be 10 digits  
> `options.lastName` - Last name or company name  
> `options.firstName` - First name  
> `options.streetNumber` - Street number  
> `options.suiteApt` - Suite or apartment number  
> `options.streetName` - Street name  
> `options.city` - City  
> `options.provinceState` - Two letter province or state code  
> `options.postalCodeZip` - Canadian postal code or USA zip code  
> `options.otherAddressInfo` - Other information  
> `options.enhancedCapable` - Yes or No. Must be 'Y' or 'N'.  
> `callback` - function(error, result, body). error contains error, result contains JSON result object and body contains full XML body result

#### deleteCustomer(phoneNumber, callback)

> Delete an existing client record. https://addressinfo.northern911.com/soapapidocs/#Delete

> `phoneNumber` - Customer phone number.  
> `callback` - function(error, result, body). error contains error, result contains JSON result object and body contains full XML body result

#### url

> property which contains production or sandbox url this module will be connecting to

#### hash

> property which contains current hash which will be sent to Northern for authorization for every request

## Usage

TBD

## Example

```
node example.js
```

## License

MIT license; see [LICENSE](./LICENSE).

(c) 2015 by Alexey Novak
