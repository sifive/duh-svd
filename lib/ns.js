'use strict';

// XML namespaces

let xsi = 'http://www.w3.org/2001/XMLSchema-instance';

exports.v1_1 = obj => Object.assign((obj || {}), {
  schemaVersion: '1.1',
  'xmlns:xs': xsi,
  'xs:noNamespaceSchemaLocation': 'CMSIS-SVD.xsd'
});
