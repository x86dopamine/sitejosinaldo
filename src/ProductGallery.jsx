import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, ChevronLeft, ChevronRight, Image as ImageIcon, Layers, Maximize, Minus, Plus, RotateCcw, X } from 'lucide-react';

function ProductPhoto({ photo, onOpen }) {
  const [status, setStatus] = useState('loading');
  const image = useRef(null);
  useEffect(() => {
    if (image.current?.complete) {
      setStatus(image.current.naturalWidth ? 'ready' : 'error');
    }
  }, []);
  if (photo.pending) return <div className="gallery-message"><ImageIcon/><p>Foto desta opção em breve</p><small>{photo.label}</small></div>;
  return <>
    <button className="gallery-photo-button" type="button" onClick={onOpen} disabled={!onOpen || status === 'error'} aria-label="Ampliar a foto do produto">
      <img ref={image} src={photo.src} alt={photo.alt} decoding="async" onLoad={() => setStatus('ready')} onError={() => setStatus('error')} />
    </button>
    {status !== 'ready' && <div className="gallery-message" role="status"><ImageIcon/><p>{status === 'error' ? 'Não foi possível carregar esta foto.' : 'Carregando foto…'}</p>{status === 'error' && <small>Selecione outra imagem na galeria.</small>}</div>}
  </>;
}

function ProductModel({ source, name, disableAutoRotate, exploded, animationTime = 0 }) {
  const model = useRef(null);
  const [status, setStatus] = useState('loading');
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const element = model.current;
    let active = true;
    setStatus('loading');
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const loaded = () => {
      if (!active) return;
      element.pause();
      element.currentTime = animationTime;
      setStatus('ready');
      if (exploded) element.play({ repetitions: 1 });
    };
    const failed = () => { if (active) setStatus('error'); };
    element.addEventListener('load', loaded);
    element.addEventListener('error', failed);
    import('@google/model-viewer').then(() => { if (element.loaded) loaded(); }).catch(failed);
    return () => { active = false; element.removeEventListener('load', loaded); element.removeEventListener('error', failed); };
  }, [source, exploded, animationTime]);
  function reset() {
    const element = model.current;
    element.cameraOrbit = 'auto auto auto';
    element.fieldOfView = 'auto';
    element.resetTurntableRotation();
    element.jumpCameraToGoal();
    element.pause();
    element.currentTime = animationTime;
    if (exploded) element.play({ repetitions: 1 });
  }
  function fullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else model.current.closest('.gallery-viewport').requestFullscreen();
  }
  return <>
    <model-viewer ref={model} className="gallery-model" src={source} alt={`${name}${exploded ? ' desmontado' : ''} em 3D`} camera-controls touch-action="pan-y" environment-image="neutral" shadow-intensity="1" exposure="1.05" interaction-prompt="none" {...(animationTime > 0 ? { 'animation-name': 'Abrir_Fechar' } : {})} {...(exploded ? { 'animation-name': 'Desmontar', poster: '/products/difusor-exploded.png' } : {})} {...(disableAutoRotate || reducedMotion || exploded ? {} : { 'auto-rotate': '', 'rotation-per-second': '8deg' })} />
    <div className="gallery-model-controls" role="group" aria-label="Controles do modelo 3D">
      <button type="button" aria-label="Aproximar modelo 3D" disabled={status !== 'ready'} onClick={() => model.current.zoom(1)}><Plus/></button>
      <button type="button" aria-label="Afastar modelo 3D" disabled={status !== 'ready'} onClick={() => model.current.zoom(-1)}><Minus/></button>
      <button type="button" aria-label="Reiniciar visualização 3D" disabled={status !== 'ready'} onClick={reset}><RotateCcw/></button>
      {typeof document !== 'undefined' && document.fullscreenEnabled && <button type="button" aria-label="Alternar tela cheia do modelo 3D" onClick={fullscreen}><Maximize/></button>}
    </div>
    {status !== 'ready' && <div className="gallery-message" role="status"><Box/><p>{status === 'error' ? 'Modelo 3D indisponível. As fotos continuam disponíveis.' : 'Carregando modelo 3D…'}</p></div>}
  </>;
}

export default function ProductGallery({ product, extras = [], variantIndex = 0, onVariantChange, isDiffuser }) {
  const photos = useMemo(() => {
    const vehicleImage = product.vehicleImage || (isDiffuser ? '/products/difusor-no-veiculo.png' : null);
    const variants = product.variants?.length ? product.variants.map((variant, index) => ({
      src: variant.image, alt: variant.alt || product.name, label: variant.label,
      variantIndex: index, pending: variant.photoPending, id: `variant-${index}`,
    })) : [{ src: product.image, alt: product.name, label: 'Produto', id: 'main' }];
    const all = [...variants, ...extras.map(photo => ({ ...photo, id: photo.src })), ...(vehicleImage ? [{
      src: vehicleImage, alt: product.vehicleImageAlt || `${product.name} no Grand Vitara`, label: 'No veículo', id: 'vehicle',
    }] : [])];
    return all.filter((photo, index) => photo.pending || all.findIndex(other => other.src === photo.src) === index);
  }, [product, extras, isDiffuser]);
  const [selectedId, setSelectedId] = useState(product.variants?.length ? `variant-${variantIndex}` : 'main');
  const [mode, setMode] = useState('photo');
  const [expanded, setExpanded] = useState(false);
  const strip = useRef(null);
  const dialog = useRef(null);
  const previousVariant = useRef(variantIndex);
  const activeIndex = Math.max(0, photos.findIndex(photo => photo.id === selectedId));
  const photo = photos[activeIndex];
  const photoCount = photos.filter(item => !item.pending).length;
  const photoPosition = photos.slice(0, activeIndex + 1).filter(item => !item.pending).length;
  const assembledModel = product.model;
  const explodedModel = product.explodedModel;
  const modelSource = mode === 'exploded' ? explodedModel : assembledModel;

  useEffect(() => {
    if (previousVariant.current !== variantIndex) {
      previousVariant.current = variantIndex;
      setSelectedId(`variant-${variantIndex}`);
      setMode('photo');
    }
  }, [variantIndex]);
  useEffect(() => {
    const container = strip.current;
    const current = container?.children[activeIndex];
    if (current) container.scrollTo({ left: current.offsetLeft - container.offsetLeft - (container.clientWidth - current.clientWidth) / 2, behavior: 'auto' });
  }, [activeIndex]);
  useEffect(() => {
    if (!expanded) return;
    const modal = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.showModal();
    return () => { modal.close(); document.body.style.overflow = overflow; };
  }, [expanded]);

  function select(index) {
    const next = photos[(index + photos.length) % photos.length];
    // A detail photo tied to a position also selects that position in the form.
    if (next.variantIndex !== undefined) {
      previousVariant.current = next.variantIndex;
      onVariantChange?.(next.variantIndex);
    }
    setSelectedId(next.id);
    setMode('photo');
  }
  function keyboard(event) {
    if (mode !== 'photo') return;
    if (event.target.tagName === 'SELECT') return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      select(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }
  const navigation = photos.length > 1 && <>
    <button className="gallery-arrow gallery-arrow-prev" type="button" aria-label="Foto anterior" onClick={() => select(activeIndex - 1)}><ChevronLeft/></button>
    <button className="gallery-arrow gallery-arrow-next" type="button" aria-label="Próxima foto" onClick={() => select(activeIndex + 1)}><ChevronRight/></button>
  </>;

  return <section className="product-media" aria-label={`Galeria de ${product.name}`} onKeyDown={keyboard}>
    <div className="gallery-modes" role="group" aria-label="Modo de visualização">
      <button type="button" aria-pressed={mode === 'photo'} onClick={() => setMode('photo')}><ImageIcon/>Fotos <span>{photoCount}</span></button>
      {assembledModel && <button type="button" aria-pressed={mode === '3d'} onClick={() => setMode('3d')}><Box/>Modelo 3D</button>}
      {explodedModel && <button type="button" aria-pressed={mode === 'exploded'} onClick={() => setMode('exploded')}><Layers/>Desmontado</button>}
    </div>
    <div className="gallery-viewport">
      {mode === 'photo' ? <><ProductPhoto key={photo.id} photo={photo} onOpen={() => setExpanded(true)}/>{navigation}{!photo.pending && <button className="gallery-expand" type="button" onClick={() => setExpanded(true)}><Maximize/>Ampliar</button>}</> : <ProductModel key={modelSource} source={modelSource} name={product.name} disableAutoRotate={product.disableAutoRotate} exploded={mode === 'exploded'} animationTime={mode === '3d' ? product.modelAnimationTime : 0}/>}
    </div>
    <div className="gallery-filmstrip">
    <div ref={strip} className="gallery-thumbnails" role="group" aria-label="Escolher foto do produto">
      {photos.map((item, index) => <button key={item.id} type="button" className="gallery-thumbnail" aria-label={`Foto ${index + 1}: ${item.label || item.alt}`} aria-pressed={mode === 'photo' && activeIndex === index} onClick={() => select(index)}>
        <span className="gallery-thumbnail-image">{item.pending ? <ImageIcon/> : <img src={item.src} alt="" loading="lazy" decoding="async"/>}</span>
        <span className="gallery-thumbnail-label">{item.label || `Detalhe ${index + 1}`}</span>
      </button>)}
    </div>
      <span className="gallery-counter" aria-live="polite">{mode !== 'photo' ? '3D' : photo.pending ? 'Em breve' : `${photoPosition} / ${photoCount}`}</span>
    </div>
    <div className="gallery-caption"><p aria-live="polite"><strong>{mode === 'photo' ? photo.label || 'Detalhe da peça' : 'Arraste para girar · use a roda do mouse ou dois dedos para aproximar'}</strong></p></div>
    {expanded && <dialog ref={dialog} className="gallery-lightbox" aria-label={`Fotos ampliadas de ${product.name}`} onCancel={() => setExpanded(false)} onClick={event => { if (event.target === dialog.current) setExpanded(false); }}>
      <div className="gallery-lightbox-top"><strong>{product.name}</strong><button autoFocus type="button" aria-label="Fechar foto ampliada" onClick={() => setExpanded(false)}><X/></button></div>
      <div className="gallery-lightbox-photo"><ProductPhoto key={photo.id} photo={photo}/>{navigation}</div>
      <div className="gallery-lightbox-caption" aria-live="polite">{photo.label || 'Detalhe da peça'} · {photo.pending ? 'Foto em breve' : `${photoPosition} / ${photoCount}`}</div>
    </dialog>}
  </section>;
}
