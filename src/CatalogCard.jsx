import { ArrowUpRight, Box, Layers } from 'lucide-react';

export default function CatalogCard({ product, index, position, status, onOpen, onImageStatus, buttonRef }) {
  const category = product.category.split(' / ').pop().toLocaleLowerCase('pt-BR');
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const hasModel = index === 0 || Boolean(product.model);
  return <button ref={buttonRef} className="product-card" type="button" onClick={onOpen} aria-label={'Ver detalhes de ' + product.name + ' para ' + product.vehicle}>
    <span className={'product-card-visual ' + (status === 'ready' ? 'is-loaded' : status === 'error' ? 'is-error' : 'is-loading')} aria-busy={!status}>
      <img src={product.image} loading={position < 4 ? 'eager' : 'lazy'} decoding="async" onLoad={() => onImageStatus(product.image, 'ready')} onError={() => onImageStatus(product.image, 'error')} alt={product.name + ' para ' + product.vehicle}/>
      <span className="product-card-stamp">{categoryLabel}</span>
      {status === 'error' && <span className="product-image-fallback"><Box aria-hidden="true"/>Imagem indisponível</span>}
      {(hasModel || product.explodedModel) && <span className="product-capabilities">
        {hasModel && <span><Box aria-hidden="true"/>Modelo 3D</span>}
        {product.explodedModel && <span><Layers aria-hidden="true"/>Desmontado</span>}
      </span>}
    </span>
    <span className="product-card-content">
      <span className="product-card-kicker">{product.vehicle}</span>
      <strong className="product-card-name">{product.name}</strong>
      <span className="product-card-variants">{product.variants?.length > 1 ? product.variants.length + ' opções disponíveis' : ''}</span>
      <span className="product-card-link">Ver produto <ArrowUpRight aria-hidden="true" size={18}/></span>
    </span>
  </button>;
}
