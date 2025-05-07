import React, { useState, useEffect, useCallback } from "react";
  // eslint-disable-next-line
import { TextareaAutosize, Select, MenuItem, FormControl, InputLabel, Button, IconButton} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import arrow from '../assets/arrow.svg';



function AlgorithmSelect({ algorithm, setAlgorithm}){
  return(
    <FormControl style={{ width: 300 }}>
    <InputLabel id="algo-select-label">Encryption Algorithm</InputLabel>
    <Select
      labelId="algo-select-label"
      id="algo-select"
      value={algorithm}
      label="Encryption Algorithm"
      onChange={(e) => setAlgorithm(e.target.value)}
      style={{
        color: "white"
      }}
    >
      <MenuItem value="cesar">Cesar Cipher</MenuItem>
      <MenuItem value="rot13">ROT-13</MenuItem>
      <MenuItem value="rsa">RSA</MenuItem>
    </Select>
  </FormControl>
  )
}


function CopyButton({ onClick }){

  return(
    <div>
      <IconButton aria-label="copy" color="primary" onClick={onClick}>
        <ContentCopyIcon />
      </IconButton>
    </div>
  )
}

function EncryptArea(){

    const [text, setText] = useState('')
    const [encryptedText, setEncryptedText] = useState('')
    const [algorithm, setAlgorithm] = useState('cesar')


        const encrypt = useCallback( async (value) => {
          if (!value) {
            setEncryptedText('');
            return;
          }
          
          // Cesar Encryption
          function encryptCesar(s){
            let result = ''
            for(var i=0; i<s.length; i++){
              let charCode = s[i].charCodeAt(0)
              
              if (charCode > 96 && charCode < 123) {
                // Lower Case
                charCode = ((charCode - 97 + 3) % 26) + 97
                } else if (charCode > 64 && charCode < 91) {
                  // Upper Case
                  charCode = ((charCode - 65 + 3) % 26) + 65
                 }
                 // Else do not modify
                 result+=String.fromCharCode(charCode)
              }
              setEncryptedText(result)
            }
            
            // ROT13 Encryption (Cesar but 13-shift)
          function encryptROT13(s){
            let result = ''
              for(var i=0; i<s.length; i++){
              let charCode = s[i].charCodeAt(0)
                
              if (charCode > 96 && charCode < 123) {
                  // Lower Case
                  charCode = ((charCode - 97 + 13) % 26) + 97
                  } else if (charCode > 64 && charCode < 91) {
                    // Upper Case
                    charCode = ((charCode - 65 + 13) % 26) + 65
                   }
                   // Else do not modify
                   result+=String.fromCharCode(charCode)
                }
                setEncryptedText(result)
              }


              // RSA Encryption using SubtleCrypto
            const RSAEncrypt = async (plainText) => {
                const enc = new TextEncoder();
                const encoded = enc.encode(plainText);
              
                // Generate RSA key pair
                const keyPair = await window.crypto.subtle.generateKey(
                  {
                    name: "RSA-OAEP",
                    modulusLength: 1048,
                    publicExponent: new Uint8Array([1, 0, 1]), // 65537
                    hash: "SHA-256",
                  },
                  true,
                  ["encrypt", "decrypt"]
                );
              
                // Encrypt with public key
                const cipherBuffer = await window.crypto.subtle.encrypt(
                  {
                    name: "RSA-OAEP"
                  },
                  keyPair.publicKey,
                  encoded
                );
              
                // Convert to base64 for display
                const cipherArray = new Uint8Array(cipherBuffer);
                const base64 = btoa(String.fromCharCode(...cipherArray));
                return base64;
              };


          if (algorithm === "cesar") {
            encryptCesar(value);
          } else if (algorithm === "rot13") {
            encryptROT13(value);
          } else if (algorithm === "rsa") {
            let encrypted = await RSAEncrypt(value)
            setEncryptedText(encrypted);
          } 
        }, [algorithm]);  // The function will re-render only if algorithm changes.

      const handleChange = (e) => {
          const value = e.target.value
          setText(value)        
          encrypt(value)
      }
      
      useEffect(() => {
        if (text) {
          encrypt(text);
        }
      }, [algorithm, text, encrypt]);
      
    return(
      <div className="encryptionWrapper">
        <div className="algoSelectContainer">
          <AlgorithmSelect algorithm = {algorithm} setAlgorithm = {setAlgorithm}/>
        </div>
        <div className="copyButton">
        <CopyButton onClick = {() => navigator.clipboard.writeText(encryptedText)}/>
        </div>

      <div className="encryptionContainer">
        <TextareaAutosize
          aria-label="minimum height"
          minRows={9}
          placeholder="Text to Encrypt..."
          onChange={handleChange} 
        />

        <img className="arrow" src={arrow} alt="arrow" />
      
        <TextareaAutosize
          aria-label="minimum height"
          disabled
          minRows={9}
          placeholder="Encrypted text will appear here"
          value={encryptedText}
          style={{
            cursor: "not-allowed",
            pointerEvents: "none",
          }}
        />
      </div>

    </div>
    )
}

export default EncryptArea



