# Password Generator Lib

A simple library for generating random passwords, created as part of a Node.JS tutorial.

## Use Cases

- Generate secure passwords for users
- Create fake passwords for testing login forms
- Build command-line password tools

## Installation

```bash
npm install secure-pass-gen
```

## Usage

```
const { generatePassword } = require('secure-pass-gen');

// Generate a default password (12 characters, includes letters and numbers)
const password1 = generatePassword();
console.log(password1);

// Generate a 16-character password with symbols
const password2 = generatePassword(16, { symbols: true });
console.log(password2);

// Generate a numeric-only password
const password3 = generatePassword(10, {
  uppercase: false,
  lowercase: false,
  numbers: true,
  symbols: false
});
console.log(password3);

```

## Options

The `generatePassword(length, options)` function accepts:

- `length` (number) — desired password length (default: `12`)

- `options` (object):

    - `uppercase` (boolean) — include uppercase letters (default: `true`)

    - `lowercase` (boolean) — include lowercase letters (default: `true`)

    - `numbers` (boolean) — include digits (default: `true`)

    - `symbols` (boolean) — include special characters like `!@#$%^&*` (default: `false`)

## Examples

```
$ node index.js
fKm39qBv61Rt
!@9Bd3rTg8#LpWzQ
0928374651

```
