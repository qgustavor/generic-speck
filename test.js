const testValues = []
const maxTestValue = 2 ** 52
for (let i = 0; i < 1024; i++) {
  testValues.push(Math.floor(Math.random() * maxTestValue))
}

// === TEST FORMATTING ===
const format = require('./format')
const testAlphabets = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  '23456789ABCDEFGHIJKMNPQRSTUVWXYZ',
  '23456789CFGHJMPQRVWX'
]

for (let alphabet of testAlphabets) {
  for (let value of testValues) {
    const encoded = format.encode(value, alphabet)
    const decoded = format.decode(encoded, alphabet)
    if (decoded !== value) throwError('format', {decoded, value})
  }
}

for (let alphabet of testAlphabets) {
  for (let value of testValues) {
    const encoded = format.encode(value, alphabet, maxTestValue)
    const decoded = format.decode(encoded, alphabet)
    if (decoded !== value) throwError('format', {decoded, value})
  }
}

// === TEST CIPHER ===
const createSpeck = require('./speck')

// The "bits" setting refer to the half of the block size as the Speck
// cipher work by splitting blocks into two code words.
// This implementation supports from (2 * 8) bits to (2 * 26) bits because
// JavaScript's max safe integer is 2 ** 53 - 1.
// If someone needs more than (2 * 26) bits then use other block cipher.
// Only (2 * 16) and (2 * 24) bits settings exist in Speck specification
// so only those got tested against vulnerabilities.

const settings = [
  {bits: 8,  rounds: 22, rightRotations: 7, leftRotations: 2},
  {bits: 10, rounds: 22, rightRotations: 7, leftRotations: 2},
  {bits: 15, rounds: 22, rightRotations: 7, leftRotations: 2},
  {bits: 16, rounds: 22, rightRotations: 7, leftRotations: 2},
  {bits: 20, rounds: 22, rightRotations: 7, leftRotations: 2},
  {bits: 24, rounds: 22, rightRotations: 8, leftRotations: 3},
  {bits: 25, rounds: 22, rightRotations: 8, leftRotations: 3},
  {bits: 26, rounds: 22, rightRotations: 8, leftRotations: 3}
]

for (let setting of settings) {
  console.log('Setting:', setting)

  const keys = []
  const maxKeyValue = 2 ** setting.bits

  for (let i = 0; i < 16; i++) {
    const key = []
    const keyLength = i % 2 ? 4 : 2
    for (let j = 0; j < keyLength; j++) {
      key.push(Math.floor(Math.random() * maxKeyValue))
    }
    keys.push(key)
  }

  const testValues = []
  const maxTestValue = 2 ** (setting.bits * 2) - 1
  for (let i = 0; i < 256; i++) {
    testValues.push(Math.floor(Math.random() * maxTestValue))
  }

  const speck = createSpeck(setting)
  for (let value of testValues) {
    for (let key of keys) {
      const cipher = speck.encrypt(value, key)
      const plain = speck.decrypt(cipher, key)

      if (plain !== value) throwError('decrypt', {plain, value})
    }
  }
}

function throwError (type, context) {
  throw Error(type + ' error: ' + JSON.stringify(context))
}
