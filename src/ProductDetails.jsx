import { MessageCircle } from 'lucide-react';
import ProductGallery from './ProductGallery.jsx';
import { getPieceInformation } from './product-information.js';
import './product-details.css';

export default function ProductDetails({ product, copy, extras, variantIndex, onVariantChange, isDiffuser, contactHref }) {
  const information = getPieceInformation(product, copy);
  const variant = product.variants?.[variantIndex];
  const sentenceCase = value => value.toLocaleLowerCase('pt-BR').replace(/^./, letter => letter.toUpperCase());
  const category = sentenceCase(product.category.split(' / ').pop());

  return <div className="product-layout">
    <ProductGallery key={product.name} product={product} extras={extras} variantIndex={variantIndex} onVariantChange={onVariantChange} isDiffuser={isDiffuser}/>
    <aside className="product-info" aria-labelledby="product-detail-title">
      <div className="product-summary">
        <div className="product-context"><span className="product-category">{category}</span><span>{sentenceCase(copy.location)}</span></div>
        <h1 id="product-detail-title">{product.name}</h1>
        <p className="product-vehicle">{product.vehicle}</p>
        <p className="lead">{copy.lead}</p>
      </div>
      <table className="piece-information">
        <caption>Informações da peça</caption>
        <tbody>
          {information.map(({ label, value }) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}
          {product.variants?.length > 1 && <tr className="piece-option-row">
            <th scope="row"><label htmlFor="product-variant">{product.selectorLabel || 'Quantidade'}</label></th>
            <td><select id="product-variant" value={variantIndex} onChange={event => onVariantChange(Number(event.target.value))}>
              {product.variants.map((option, index) => <option key={option.label} value={index}>{option.label}</option>)}
            </select>{variant?.photoPending && <small>Foto deste kit em breve. Veja os detalhes da peça na galeria.</small>}</td>
          </tr>}
        </tbody>
      </table>
      <a className="contact-button" href={contactHref} target="_blank" rel="noreferrer"><MessageCircle size={24}/>Consultar esta peça</a>
    </aside>
  </div>;
}
