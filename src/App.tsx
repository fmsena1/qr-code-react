
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';


function App() {
  const [qrValue, setQrValue] = useState('https://vitejs.dev');

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + QRCode</h1>
      <div className="card">
        <input
          type="text"
          value={qrValue}
          onChange={e => setQrValue(e.target.value)}
          placeholder="Digite o texto ou URL para o QR Code"
          style={{ marginBottom: 16, width: '100%' }}
        />
        <QRCodeCanvas value={qrValue} size={180} />
      </div>
      <p className="read-the-docs">
        Digite um texto ou URL para gerar o QR Code acima.
      </p>
    </>
  );
}

export default App
