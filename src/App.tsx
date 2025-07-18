
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
        <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto' }}>
          <QRCodeCanvas id="qr-canvas" value={qrValue} size={180} style={{ position: 'absolute', left: 0, top: 0 }} />
          <img
            src="/Rectangle.png"
            alt="Ícone central"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 63,
              height: 30,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          />
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button
            onClick={async () => {
              const qrCanvas = document.getElementById('qr-canvas');
              if (qrCanvas instanceof HTMLCanvasElement) {
                // Cria um canvas auxiliar para compor QR + ícone
                const size = 180;
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = size;
                tempCanvas.height = size;
                const ctx = tempCanvas.getContext('2d');
                if (ctx) {
                  // Desenha o QR
                  ctx.drawImage(qrCanvas, 0, 0, size, size);
                  // Carrega o ícone
                  const img = new window.Image();
                  img.src = '/Rectangle.png';
                  img.onload = () => {
                  // Centraliza o ícone no QR
                  const iconWidth = 63;
                  const iconHeight = 30;
                  ctx.drawImage(img, (size-iconWidth)/2, (size-iconHeight)/2, iconWidth, iconHeight);
                    const link = document.createElement('a');
                    link.href = tempCanvas.toDataURL('image/png');
                    link.download = 'qrcode.png';
                    link.click();
                  };
                }
              }
            }}
          >Baixar QR Code</button>
          <button
            onClick={async () => {
              const qrCanvas = document.getElementById('qr-canvas');
              if (qrCanvas instanceof HTMLCanvasElement) {
                const size = 180;
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = size;
                tempCanvas.height = size;
                const ctx = tempCanvas.getContext('2d');
                if (ctx) {
                  ctx.drawImage(qrCanvas, 0, 0, size, size);
                  const img = new window.Image();
                  img.src = '/Rectangle.png';
                  img.onload = async () => {
                    const iconWidth = 63;
                    const iconHeight = 30;
                    ctx.drawImage(img, (size-iconWidth)/2, (size-iconHeight)/2, iconWidth, iconHeight);
                    tempCanvas.toBlob(async (blob) => {
                      if (blob) {
                        try {
                          await navigator.clipboard.write([
                            new window.ClipboardItem({ 'image/png': blob })
                          ]);
                        } catch (err) {
                          alert('Falha ao copiar QR Code.');
                        }
                      }
                    });
                  };
                }
              }
            }}
          >Copiar QR Code</button>
        </div>
      </div>
      <p className="read-the-docs">
        Digite um texto ou URL para gerar o QR Code acima.
      </p>
    </>
  );
}

export default App
