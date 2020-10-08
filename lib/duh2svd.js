'use strict';

const ns = require('./ns.js');

const licenseText = () => ['licenseText', 'some licenseText'];

const cpu = (/* node */) => ['cpu',
  ['name', 'other'],
  ['revision', 'r0p0'],
  ['endian', 'little'],
  ['mpuPresent', true],
  ['fpuPresent', false],
  ['nvicPrioBits', 3],
  ['vendorSystickConfig', false]
];

const usage = str => ['usage', {
  memory: 'reserved',
  register: 'registers',
  reserved: 'reserved'
  // buffer
}[str] || 'reserved'];


const modifiedWriteValues = fld => fld.modifiedWriteValue
  ? [['modifiedWriteValues', fld.modifiedWriteValue]]
  : [];

const readAction = fld => fld.readAction
  ? [['readAction', fld.readAction]]
  : [];

const fields = reg =>
  ['fields']
    .concat(reg.fields.map(fld =>
      ['field',
        ['name', fld.name],
        ['bitOffset', fld.bitOffset],
        ['bitWidth', fld.bitWidth],
        ['access', fld.access]
      ]
        .concat(modifiedWriteValues(fld))
        .concat(readAction(fld))
    ));

const peripherals = node => ['peripherals']
  .concat(node.memoryMaps.map(mm => {
    const abs = mm.addressBlocks.map(ab =>
      ['addressBlock',
        ['offset', ab.baseAddress],
        ['size', ab.range],
        usage(ab.usage)
      ]
    );
    const regs = mm.addressBlocks.reduce((pre, ab) =>
      pre.concat((ab.registers || []).map(reg =>
        ['register',
          ['name', reg.name],
          ['addressOffset', reg.addressOffset],
          ['access', reg.access],
          ['resetValue', reg.resetValue],
          ['resetMask', '0xffffffff'],
          fields(reg)
        ]
      )), []
    );
    return ['peripheral',
      ['name', mm.name],
      ['baseAddress', 0]
    ]
      .concat(abs)
      .concat((regs.length > 0) ? [['registers'].concat(regs)] : []);
  }));

const device = node => ['device',
  ns.v1_1(),
  // optional
  ['vendor', node.vendor],
  ['vendorID', node.vendor.split('.')[0]],

  ['name', node.name],
  ['series', node.name],
  ['version', node.version],
  ['description', node.description],
  licenseText(),
  cpu(node),
  ['addressUnitBits', 8],
  ['width', 32],

  // optional
  ['size', 32],
  ['access', 'read-write'],
  ['resetValue', '0x00000000'],
  ['resetMask', '0xFFFFFFFF'],
  peripherals(node)
];

module.exports = node => device(node.component);
