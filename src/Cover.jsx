import { ArrowRight, MessageCircle } from 'lucide-react';
import './cover.css';

export function SiteHeader({ onHome, onWhereToBuy, whatsapp, detailOpen = false }) {
  return <header className={'site-header is-visible' + (detailOpen ? ' is-detail-open' : '')}>
    <a className="vitara-cover-logo" href="#inicio" onClick={onHome} aria-label="3D CAR — início">
      <img src="/brand-3dcar.png" alt="" width="40" height="40"/>
      <span><b>3D</b>CAR</span>
    </a>
    <nav className="site-header-actions" aria-label="Canais de compra">
      <button className="sales-shortcut" type="button" onClick={onWhereToBuy}>Onde comprar</button>
      <a className="header-contact" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Fale com a 3D CAR"><MessageCircle aria-hidden="true" size={19}/><span>Fale com a 3D CAR</span></a>
    </nav>
  </header>;
}

export default function Cover({ onExplore, onWhereToBuy }) {
  return <section className="vitara-cover" id="inicio" aria-labelledby="vitara-cover-title">
    <figure className="vitara-cover-image" aria-hidden="true">
      <img className="vitara-cover-photo" src="/grand-vitara-workshop.png" alt="" width="1024" height="576" fetchPriority="high" decoding="async" draggable={false}/>
    </figure>
    <div className="vitara-cover-scene">
      <div className="vitara-cover-copy">
        <h1 id="vitara-cover-title"><span>Seu Grand Vitara</span><span>completo de novo.</span></h1>
        <p className="vitara-cover-description">Produção em impressão 3D para reposição e acabamento.</p>
        <div className="vitara-cover-actions">
          <a className="brand-button brand-button-primary" href="#produtos" onClick={onExplore}>Ver catálogo <ArrowRight aria-hidden="true"/></a>
          <button className="brand-button brand-button-secondary" type="button" onClick={onWhereToBuy}>Onde comprar</button>
        </div>
      </div>
    </div>
  </section>;
}
