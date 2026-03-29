function shiftLetter(c, shift, base) {
  let val = c.charCodeAt(0) - base
  return String.fromCharCode((val + shift + 26) % 26 + base)
}

function shiftDigit(c, shift) {
  let val = c.charCodeAt(0) - 48
  return String.fromCharCode((val + shift + 10) % 10 + 48)
}

// only common symbols
const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"

function shiftSymbol(c, shift) {
  let i = symbols.indexOf(c)

  if (i === -1) return c

  let newIndex = (i + shift) % symbols.length
  if (newIndex < 0) newIndex += symbols.length

  return symbols[newIndex]
}

// checks
function isUpper(c) { return c >= 'A' && c <= 'Z' }
function isLower(c) { return c >= 'a' && c <= 'z' }
function isDigit(c) { return c >= '0' && c <= '9' }

// maps
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

  let i = symbols.indexOf(c)
  if (i === -1) return c
  return symbols[symbols.length - 1 - i]
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

const maps = [map1, map2, map3, map4, map5, map6, map7, map8, map9]

function applyMap(c) {
  let i = c.charCodeAt(0) % maps.length
  return maps[i](c)
}

function vigenereCipher(password, siteName) {
  let key = siteName.toLowerCase().replace(/[^a-z]/g, "")

  if (!key.length) return password

  let res = ""

  for (let i = 0; i < password.length; i++) {
    let ch = password[i]
    let shift = key.charCodeAt(i % key.length) - 97

    if (isUpper(ch)) res += shiftLetter(ch, shift, 65)
    else if (isLower(ch)) res += shiftLetter(ch, shift, 97)
    else if (isDigit(ch)) res += shiftDigit(ch, shift)
    else res += shiftSymbol(ch, shift)
  }

  return res
}

function maskPassword(password, siteName) {
  let temp = vigenereCipher(password, siteName)
  let out = ""

  for (let ch of temp) {
    out += applyMap(ch)
  }

  return out
}