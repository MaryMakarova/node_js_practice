const { generatePassword } = require('secure-pass-gen');
console.log(generatePassword(16, { uppercase: true, lowercase: true, numbers: true }));