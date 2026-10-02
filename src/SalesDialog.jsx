import { useEffect, useRef } from 'react';
import { ArrowUpRight, MessageCircle, X } from 'lucide-react';
import './sales-dialog.css';

export default function SalesDialog({ open, onClose, channels, whatsapp }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (!modal.open) modal.showModal();
    return () => {
      if (modal.open) modal.close();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
    };
  }, [open]);

  return <dialog ref={dialog} className="sales-dialog" aria-labelledby="sales-dialog-title" onCancel={onClose} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="sales-dialog-content">
      <button className="sales-dialog-close" type="button" aria-label="Fechar canais de compra" onClick={onClose} autoFocus><X size={22}/></button>
      <h2 id="sales-dialog-title">Onde comprar</h2>
      <p>Escolha um canal para conhecer as peças da 3D CAR.</p>
      <div className="sales-dialog-channels">{channels.map(channel => <a key={channel.name} href={channel.url} target="_blank" rel="noreferrer">
        <span><strong>{channel.name}</strong><small>Acessar loja</small></span><ArrowUpRight aria-hidden="true" size={22}/>
      </a>)}</div>
      <a className="brand-button brand-button-primary" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true"/>Fale com a 3D CAR</a>
    </div>
  </dialog>;
}
