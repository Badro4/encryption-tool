# 🔐 Encryption Tool

A React-based web application that allows users to encrypt text live using different cryptographic algorithms.

![Demo Screenshot](./assets/demo.png) 
##  Features

- Three encryption algorithms currently:
  - **Cesar Cipher** - Simple letter shifting encryption
  - **ROT-13** - Special case of Caesar cipher with 13 shifts
  - **RSA** - Asymmetric encryption using Web Crypto API
- Clean, responsive UI built with React, Material UI and Bootstrap
- One-click copy functionality for encrypted results using Clipboard API
- Modern SVG icons and visuals
- Responsive and easy to use

---

## Tech Stack

- **Frontend**: 
  - React.js (Functional components with Hooks)
  - Bootstrap 5 for styling
  - Material-UI for form components
  - Custom CSS for styling
- **Encryption**:
  - Custom implementations for Cesar and ROT13
  - Web Crypto API for RSA encryption

---

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm install
```
Then run the development server

```bash
npm start
```
And open http://localhost:3000 in your browser

## Usage Guide
- Select an encryption algorithm from the dropdown
- Type or paste your text in the left textarea
- The encrypted result will appear automatically in the right textarea
- Click the copy button (📋) to copy the encrypted text to your clipboard

## TODOs/Future Improvements
- Add decryption support
- Add more algorithms (e.g., Vigenère, AES)
- Add light theme toggle

## License 
MIT License – feel free to use, modify, and share.

