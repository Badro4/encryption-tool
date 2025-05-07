  // eslint-disable-next-line 
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
  // eslint-disable-next-line 
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import EncryptArea from './components/encryptionArea.js'
import './App.css'
import lock from './assets/lock1.svg';

export default function App() {

  return (
    <div>
    <Header />
    <Container className="py-5">
      <div className="bg shadow p-4">
        <PageTitle />
        <EncryptArea />
      </div>
    </Container>
    </div>
  );
}

function PageTitle() {
  return (
    <div className="text-center mb-4">
      <div className="mb-3">
        <i className="fa fa-lock text-primary" style={{ fontSize: "3rem"  }}></i>
      </div>
      <h1 className="fw-bold text-primary">Encryption Tool</h1>
      <p className="text fw-bold">Secure your message with different encryption algorithms</p>
    </div>
  );
}

function Header(){
  return (
    <header>
    <div className="container">
      <div className="d-flex justify-content-left align-items-center">
      <img className="logo" src={lock} alt="logo"/>
        <h1>Encryption Tool</h1>
      </div>
    </div>
  </header>
  )
}
