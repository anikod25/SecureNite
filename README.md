# SecureNite

A lightweight Chrome extension that transforms your base password into a unique, site-specific masked password using a custom multi-layer cipher — with zero storage, zero servers, and zero risk of your passwords being leaked.

---

## How it works

Instead of storing passwords, SecureNite transforms them on the fly using a three-layer cipher chain:

1. **Vigenère cipher** — your base password is encrypted using the site name as the key. Same password, different site = completely different output.
2. **Custom map layer** — each character is passed through one of 9 custom Caesar-variant maps, selected by the character's ASCII value mod 9.
3. **Consistency** — same input + same site name always produces the same output, so you never need to store anything.

### The 9 maps
| Map | Type |
|-----|------|
| 1 | Caesar +3 |
| 2 | Atbash mirror |
| 3 | Case flip |
| 4 | Caesar +8 |
| 5 | ROT13 |
| 6 | Caesar +2 |
| 7 | No-op (intentional) |
| 8 | ROT13 + case flip |
| 9 | Caesar -5 + case flip |

---

## Why this is secure

- **Nothing is stored** — no passwords, no site names, no output. Ever.
- **No network calls** — everything runs locally in your browser
- **One-time transform** — the cipher runs once and the result lives only in your clipboard
- **Site-specific output** — even if someone knows your base password, they can't get your masked password without knowing the exact site name and cipher logic
- **Symbols stay symbols** — letters, digits and symbols each stay in their own character class through the entire cipher

---

## Example
```
Base password : APc@123
Site name     : instagram
Output        : LKx]915
```

---

## Installation

Since this extension is not on the Chrome Web Store yet, you can load it manually:

1. Clone the repo
```bash
git clone https://github.com/yourusername/SecureNite
```
2. Open Chrome and go to `chrome://extensions`
3. Toggle **Developer mode** on (top right)
4. Click **Load unpacked**
5. Select the `src` folder

The SecureNite icon will appear in your Chrome toolbar.

---

## Usage

1. Click the SecureNite icon in your Chrome toolbar
2. Enter your base password
3. Enter the site name (e.g. `instagram`, `github`, `google`)
4. Click **Generate**
5. Copy the masked password and use it

> Use the same base password and site name every time — you'll always get the same output, so no need to remember or store the result.

---

## Project structure
```
SecureNite/
├── README.md
├── .gitignore
├── src/
│   ├── manifest.json      — Chrome extension config
│   ├── cipher.js          — all cipher logic
│   ├── popup.html         — extension UI
│   ├── popup.js           — UI logic
│   ├── popup.css          — styling
│   └── icons/             — extension icons
└── tests/
    └── cipher.test.js     — cipher test cases
```

---

## Planned features

- Auto-detect site name from current tab URL
- Device-unique salt layer for extra security
- Firefox support

---

## Disclaimer

SecureNite is a personal utility tool. It is not a replacement for a fully audited password manager. Use it as an additional layer of security, not your only one.