function shiftLetter(c, shift, base) {
  return String.fromCharCode((c.charCodeAt(0) - base + shift + 26) % 26 + base)
}
function shiftDigit(c, shift) {
  return String.fromCharCode((c.charCodeAt(0) - 48 + shift + 10) % 10 + 48)
}
function shiftSymbol(c, shift) {
  return String.fromCharCode((c.charCodeAt(0) - 33 + shift + 94) % 94 + 33)
}
function isUpper(c) { return c >= 'A' && c <= 'Z' }
function isLower(c) { return c >= 'a' && c <= 'z' }
function isDigit(c) { return c >= '0' && c <= '9' }

function map1(c) {
  if (isUpper(c)) return shiftLetter(c, 3, 65)
  if (isLower(c)) return shiftLetter(c, 3, 97)
  if (isDigit(c)) return shiftDigit(c, 3)
  return shiftSymbol(c, 3)
}

function map2(c) {
  if (isUpper(c)) return String.fromCharCode(90 - (c.charCodeAt(0) - 65))
  if (isLower(c)) return String.fromCharCode(122 - (c.charCodeAt(0) - 97))
  if (isDigit(c)) return String.fromCharCode(57 - (c.charCodeAt(0) - 48))
  return String.fromCharCode(126 - (c.charCodeAt(0) - 33))
}

function map3(c) {
  if (isUpper(c)) return c.toLowerCase()
  if (isLower(c)) return c.toUpperCase()
  if (isDigit(c)) return shiftDigit(c, 5)
  return shiftSymbol(c, 5)
}

function map4(c) {
  if (isUpper(c)) return shiftLetter(c, 8, 65)
  if (isLower(c)) return shiftLetter(c, 8, 97)
  if (isDigit(c)) return shiftDigit(c, 8)
  return shiftSymbol(c, 8)
}

function map5(c) {
  if (isUpper(c)) return shiftLetter(c, 13, 65)
  if (isLower(c)) return shiftLetter(c, 13, 97)
  if (isDigit(c)) return shiftDigit(c, 5)
  return shiftSymbol(c, 5)
}

function map6(c) {
  if (isUpper(c)) return shiftLetter(c, 2, 65)
  if (isLower(c)) return shiftLetter(c, 2, 97)
  if (isDigit(c)) return shiftDigit(c, 2)
  return shiftSymbol(c, 2)
}

function map7(c) {
  return c
}

function map8(c) {
  if (isUpper(c)) return shiftLetter(c.toLowerCase(), 13, 97)
  if (isLower(c)) return shiftLetter(c.toUpperCase(), 13, 65)
  if (isDigit(c)) return shiftDigit(c, 7)
  return shiftSymbol(c, 7)
}

function map9(c) {
  if (isUpper(c)) return shiftLetter(c.toLowerCase(), -5, 97)
  if (isLower(c)) return shiftLetter(c.toUpperCase(), -5, 65)
  if (isDigit(c)) return shiftDigit(c, 4)
  return shiftSymbol(c, 4)
}

const MAPS = [map1, map2, map3, map4, map5, map6, map7, map8, map9]

function applyMap(c) {
  const mapIndex = c.charCodeAt(0) % 9
  return MAPS[mapIndex](c)
}

function maskPassword(password, siteName) {
  const afterVigenere = vigenereCipher(password, siteName)
  return afterVigenere.split('').map(applyMap).join('')
}