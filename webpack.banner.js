const toTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

const pkg = require('./package.json')

const name = toTitleCase(pkg.name.split('-').join(' '))

module.exports = `${name} ${pkg.version}\n${pkg.homepage}\nCopyright (c) ${new Date().getFullYear()} ${name} Authors`
