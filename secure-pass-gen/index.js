
function generatePassword(length = 12, options = {}) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:<>,.?/';

    let chars = '';
    if (options.uppercase !== false) chars += upper;
    if (options.lowercase !== false) chars += lower;
    if (options.numbers !== false) chars += numbers;
    if (options.symbols === true) chars += symbols;

    if (!chars) throw new Error('No character sets selected!');

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    return password;
}

module.exports = {
    generatePassword
};
