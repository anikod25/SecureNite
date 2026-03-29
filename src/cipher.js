function shiftLetter(c, shift, base) {
  let code = c.charCodeAt(0) - base
  return String.fromCharCode((code + shift + 26) % 26 + base)
}

function shiftDigit(c, shift) {
  let num = c.charCodeAt(0) - 48
  return String.fromCharCode((num + shift + 10) % 10 + 48)
}

function shiftSymbol(c, shift) {
  let sym = c.charCodeAt(0) - 33
  return String.fromCharCode((sym + shift + 94) % 94 + 33)
}

// simple checks
function isUpper(c) { return c >= 'A' && c <= 'Z' }
function isLower(c) { return c >= 'a' && c <= 'z' }
function isDigit(c) { return c >= '0' && c <= '9' }

// mapping functions
function map1(c) {
  if (isUpper(c)) return shiftLetter(c, 3, 65)
  else if (isLower(c)) return shiftLetter(c, 3, 97)
  else if (isDigit(c)) return shiftDigit(c, 3)
  return shiftSymbol(c, 3)
}

function map2(c) {
  if (isUpper(c)) return String.fromCharCode(90 - (c.charCodeAt(0) - 65))
  else if (isLower(c)) return String.fromCharCode(122 - (c.charCodeAt(0) - 97))
  else if (isDigit(c)) return String.fromCharCode(57 - (c.charCodeAt(0) - 48))
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
  return c // no change
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

// array of all maps
const maps = [map1, map2, map3, map4, map5, map6, map7, map8, map9]

function applyMap(c) {
  let idx = c.charCodeAt(0) % 9
  return maps[idx](c)
}

// vigenere logic
function vigenereCipher(password, siteName) {
  let key = siteName.toLowerCase().replace(/[^a-z]/g, '')

  if (key.length === 0) return password

  let result = ""

  for (let i = 0; i < password.length; i++) {
    let c = password[i]
    let shift = key.charCodeAt(i % key.length) - 97

    if (isUpper(c)) result += shiftLetter(c, shift, 65)
    else if (isLower(c)) result += shiftLetter(c, shift, 97)
    else if (isDigit(c)) result += shiftDigit(c, shift)
    else result += shiftSymbol(c, shift)
  }

  return result
}

function maskPassword(password, siteName) {
  let temp = vigenereCipher(password, siteName)
  let finalPass = ""

  for (let ch of temp) {
    finalPass += applyMap(ch)
  }

  return finalPass
}