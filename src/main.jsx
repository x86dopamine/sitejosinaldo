import { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, MessageCircle, Search, X } from 'lucide-react';
import './styles.css';
import './design-system.css';
import Cover, { SiteHeader } from './Cover.jsx';
import ProductDetails from './ProductDetails.jsx';
import CatalogCard from './CatalogCard.jsx';
import SalesDialog from './SalesDialog.jsx';
import './catalog-refresh.css';
import './product-gallery.css';
const whatsapp = 'https://api.whatsapp.com/message/CVKYJT6PWN42E1?autoload=1&app_absent=0&utm_source=ig';
const productPhotos = {
 diffuserPair:'/products/gallery/difusor-kit-2.webp',
 rackFrontPassenger:'/products/gallery/catalog-rackFrontPassenger.webp',
 rackRearDriver:'/products/gallery/catalog-rackRearDriver.webp',
 rackRearPassenger:'/products/gallery/catalog-rackRearPassenger.webp',
 coverOne:'/products/gallery/catalog-coverOne.webp',
 coverTwo:'/products/gallery/catalog-coverTwo.webp',
 coverFive:'/products/gallery/catalog-coverFive.webp',
 coverTen:'/products/gallery/tampa-rack-kit-10.webp',
 pullerOne:'/products/gallery/catalog-pullerOne.webp',
 doorSeal:'/products/gallery/catalog-doorSeal.webp',
 frontEmblem:'/products/gallery/catalog-frontEmblem.webp',
 blackEmblem:'/products/gallery/catalog-blackEmblem.webp',
 chromeEmblem:'/products/gallery/catalog-chromeEmblem.webp',
 wheelCap:'/products/gallery/catalog-wheelCap.webp',
 trunkClipOne:'/products/gallery/catalog-trunkClipOne.webp',
 trunkClipFour:'/products/gallery/catalog-trunkClipFour.webp',
 bagagitoLatch:'/products/gallery/catalog-bagagitoLatch.webp',
 bagagitoSupport:'/products/gallery/catalog-bagagitoSupport.webp',
 radiatorCap:'/products/gallery/catalog-radiatorCap.webp',
 fourByFour:'/products/gallery/catalog-fourByFour.webp',
 consoleLatch:'/products/gallery/catalog-consoleLatch.webp',
 spareEmblem:'/products/gallery/catalog-spareEmblem.webp',
 seatTrim:'/products/gallery/catalog-seatTrim.webp',
 pullerTrim:'/products/acabamento-puxador-interno-porta.png',
 gearUnlock:'/products/gallery/catalog-gearUnlock.webp'
};
const catalogProducts = [
 {name:'Difusor de ar lateral',vehicle:'Suzuki Grand Vitara',category:'PEÇA 01 / INTERIOR',image:'/products/difusor-card.png',variants:[{label:'1 peça',image:'/products/difusor-card.png',alt:'Um difusor lateral de ar para Suzuki Grand Vitara'},{label:'2 peças',image:productPhotos.diffuserPair,alt:'Par de difusores laterais de ar para Suzuki Grand Vitara, modelo 2009 a 2015'}]},
 {name:'Emblema da grade dianteira',vehicle:'Suzuki Grand Vitara',category:'PEÇA 02 / EXTERIOR',image:productPhotos.frontEmblem,model:'/products/emblema-grade-dianteira.glb',vehicleImage:'/products/emblema-no-veiculo.png'},
 {name:'Emblema Suzuki Grand Vitara preto',vehicle:'Suzuki Grand Vitara',category:'PEÇA 03 / EXTERIOR',image:productPhotos.blackEmblem,model:'/products/emblema-suzuki-preto.glb',vehicleImage:'/products/emblema-suzuki-preto-no-veiculo.png',vehicleImageFrame:'landscape',disableAutoRotate:true},
 {name:'Emblema traseiro cromado',vehicle:'Suzuki Grand Vitara',category:'PEÇA 04 / EXTERIOR',image:productPhotos.chromeEmblem,model:'/products/emblema-suzuki-cromado.glb',vehicleImage:'/products/emblema-traseiro-suzuki-cromado-no-veiculo.png',vehicleImageFrame:'square',vehicleImageAlt:'Emblema Suzuki Grand Vitara cromado instalado na tampa traseira do veículo'},
 {name:'Puxador interno da porta',vehicle:'Suzuki Grand Vitara',category:'PEÇA 05 / INTERIOR',image:productPhotos.pullerOne,variants:[{label:'1 peça',image:productPhotos.pullerOne,alt:'Um puxador interno da porta Suzuki Grand Vitara'},{label:'2 peças',image:'/products/kit-puxadores-porta-grand-vitara-2-pecas.png',alt:'Kit com dois puxadores internos da porta Suzuki Grand Vitara'},{label:'4 peças',image:'/products/kit-puxadores-porta-grand-vitara.png',alt:'Kit com quatro puxadores internos da porta Suzuki Grand Vitara'}]},
 {name:'Tampa do bagageiro',vehicle:'Suzuki Grand Vitara',category:'PEÇA 06 / EXTERIOR',image:productPhotos.coverOne,variants:[{label:'1 peça',image:productPhotos.coverOne,alt:'Uma tampa do rack do bagageiro para Suzuki Grand Vitara'},{label:'2 peças',image:productPhotos.coverTwo,alt:'Duas tampas do rack do bagageiro para Suzuki Grand Vitara'},{label:'5 peças',image:productPhotos.coverFive,alt:'Cinco tampas do rack do bagageiro para Suzuki Grand Vitara'},{label:'10 peças',image:productPhotos.coverTen,alt:'Kit com dez tampas do rack do bagageiro para Suzuki Grand Vitara'},{label:'12 peças',image:'/products/catalog-placeholder.svg',alt:'Foto do kit de doze tampas em breve',photoPending:true}]},
 {name:'Acabamento da ponteira do rack',vehicle:'Suzuki Grand Vitara',category:'PEÇA 07 / EXTERIOR',selectorLabel:'Posição no veículo',image:productPhotos.rackFrontPassenger,variants:[{label:'Dianteira · passageiro',image:productPhotos.rackFrontPassenger,alt:'Acabamento da ponteira dianteira do rack, lado do passageiro'},{label:'Traseira · motorista',image:productPhotos.rackRearDriver,alt:'Acabamento da ponteira traseira do rack, lado do motorista'},{label:'Traseira · passageiro',image:productPhotos.rackRearPassenger,alt:'Acabamento da ponteira traseira do rack, lado do passageiro'}]},
 {name:'Tampa de desbloqueio do câmbio',vehicle:'Suzuki Grand Vitara',category:'PEÇA 08 / INTERIOR',image:productPhotos.gearUnlock},
 {name:'Calota central',vehicle:'Suzuki Grand Vitara',category:'PEÇA 09 / EXTERIOR',image:productPhotos.wheelCap},
 {name:'Clipe da capa da mala',vehicle:'Suzuki Grand Vitara',category:'PEÇA 10 / INTERIOR',image:productPhotos.trunkClipOne,variants:[{label:'1 peça',image:productPhotos.trunkClipOne,alt:'Um clipe da capa da mala do Suzuki Grand Vitara'},{label:'4 peças',image:productPhotos.trunkClipFour,alt:'Quatro clipes da capa da mala do Suzuki Grand Vitara'}]},
 {name:'Presilha da lona do bagagito',vehicle:'Suzuki Grand Vitara',category:'PEÇA 11 / INTERIOR',image:productPhotos.bagagitoLatch},
 {name:'Suporte da tampa do bagagito',vehicle:'Suzuki Grand Vitara',category:'PEÇA 12 / INTERIOR',image:productPhotos.bagagitoSupport},
 {name:'Selo da porta',vehicle:'Suzuki Grand Vitara',category:'PEÇA 13 / EXTERIOR',image:productPhotos.doorSeal},
 {name:'Tampa do reservatório do radiador',vehicle:'Suzuki Grand Vitara',category:'PEÇA 14 / REPOSIÇÃO',image:productPhotos.radiatorCap},
 {name:'Emblema 3D 4 x 4 (par)',vehicle:'Suzuki Grand Vitara',category:'PEÇA 15 / EXTERIOR',image:productPhotos.fourByFour},
 {name:'Trava do console central',vehicle:'Suzuki Grand Vitara',category:'PEÇA 16 / INTERIOR',image:productPhotos.consoleLatch},
 {name:'Emblema do estepe',vehicle:'Suzuki Grand Vitara',category:'PEÇA 17 / EXTERIOR',image:productPhotos.spareEmblem},
 {name:'Acabamento do banco traseiro',vehicle:'Suzuki Grand Vitara',category:'PEÇA 18 / INTERIOR',image:productPhotos.seatTrim},
 {name:'Acabamento do puxador interno da porta',vehicle:'Suzuki Grand Vitara',category:'PEÇA 19 / INTERIOR',image:productPhotos.pullerTrim},
 {name:'Tampa metálica de válvula Capsilone',vehicle:'Suzuki',category:'PEÇA 20 / REPOSIÇÃO',image:'/products/tampa-valvula-capsilone.png'}
];
const productGalleryPhotos = {
  "0": [
    {
      "src": "/products/gallery/difusor-frente-aberto.webp",
      "label": "Lâminas abertas",
      "alt": "Difusor de ar com as lâminas abertas"
    },
    {
      "src": "/products/gallery/difusor-frente-fechado.webp",
      "label": "Lâminas fechadas",
      "alt": "Difusor de ar com as lâminas fechadas"
    },
    {
      "src": "/products/gallery/difusor-lateral-real.webp",
      "label": "Vista lateral",
      "alt": "Encaixes laterais do difusor de ar"
    },
    {
      "src": "/products/gallery/difusor-encaixes.webp",
      "label": "Encaixe traseiro",
      "alt": "Parte traseira do difusor de ar"
    },
    {
      "src": "/products/gallery/difusor-mecanismo.webp",
      "label": "Mecanismo",
      "alt": "Mecanismo das lâminas do difusor de ar"
    },
    {
      "src": "/products/gallery/difusor-painel-aberto.webp",
      "label": "No painel",
      "alt": "Difusor aberto instalado na saída lateral do painel"
    },
    {
      "src": "/products/gallery/difusor-painel-fechado.webp",
      "label": "No painel · fechado",
      "alt": "Difusor fechado instalado no painel"
    },
    {
      "src": "/products/gallery/difusor-painel-motorista.webp",
      "label": "Lado do motorista",
      "alt": "Difusor instalado no lado do motorista"
    }
  ],
  "1": [
    {
      "src": "/products/gallery/emblema-grade-instalado.webp",
      "label": "No veículo",
      "alt": "Emblema vermelho instalado na grade dianteira do Grand Vitara"
    }
  ],
  "3": [
    {
      "src": "/products/gallery/emblema-cromado-frente.webp",
      "label": "Vista frontal",
      "alt": "Emblema Suzuki cromado visto de frente"
    },
    {
      "src": "/products/gallery/emblema-cromado-perspectiva.webp",
      "label": "Perspectiva",
      "alt": "Emblema Suzuki cromado em perspectiva"
    },
    {
      "src": "/products/gallery/emblema-cromado-lateral.webp",
      "label": "Vista lateral",
      "alt": "Espessura e acabamento do emblema cromado"
    }
  ],
  "4": [
    {
      "src": "/products/gallery/puxador-frente-real.webp",
      "label": "Vista frontal",
      "alt": "Puxador interno da porta visto de frente"
    },
    {
      "src": "/products/gallery/puxador-verso-real.webp",
      "label": "Parte traseira",
      "alt": "Parte traseira do puxador interno da porta"
    },
    {
      "src": "/products/gallery/puxador-lateral-real.webp",
      "label": "Vista lateral",
      "alt": "Puxador interno da porta visto de lado"
    },
    {
      "src": "/products/gallery/puxador-textura-real.webp",
      "label": "Textura e encaixes",
      "alt": "Textura e encaixes do puxador interno"
    },
    {
      "src": "/products/gallery/puxador-instalado.webp",
      "label": "Instalado",
      "alt": "Puxador interno instalado na porta"
    },
    {
      "src": "/products/gallery/puxador-porta-bege.webp",
      "label": "Na porta",
      "alt": "Puxador instalado em uma porta com acabamento bege"
    }
  ],
  "5": [
    {
      "src": "/products/gallery/tampa-rack-frente.webp",
      "label": "Detalhe · frente",
      "alt": "Uma tampa do rack vista pela frente"
    },
    {
      "src": "/products/gallery/tampa-rack-encaixes.webp",
      "label": "Detalhe · encaixes",
      "alt": "Encaixes na parte traseira de uma tampa do rack"
    }
  ],
  "6": [
    {
      "src": "/products/gallery/ponteira-rack-frente.webp",
      "label": "Dianteira · frente",
      "alt": "Vista frontal da ponteira dianteira do rack",
      "variantIndex": 0
    },
    {
      "src": "/products/gallery/ponteira-rack-verso.webp",
      "label": "Dianteira · encaixes",
      "alt": "Encaixes da ponteira dianteira do rack",
      "variantIndex": 0
    }
  ],
  "8": [
    {
      "src": "/products/gallery/calota-frente-real.webp",
      "label": "Detalhe · frente",
      "alt": "Calota central com emblema Suzuki vermelho vista de frente"
    },
    {
      "src": "/products/gallery/calota-verso-real.webp",
      "label": "Detalhe · verso",
      "alt": "Encaixes traseiros da calota central"
    },
    {
      "src": "/products/gallery/calota-instalada.webp",
      "label": "Na roda",
      "alt": "Calota central instalada na roda do estepe"
    }
  ],
  "11": [
    {
      "src": "/products/gallery/suporte-bagagito-frente.webp",
      "label": "Vista frontal",
      "alt": "Suporte da tampa do bagagito e seus pontos de fixação"
    },
    {
      "src": "/products/gallery/suporte-bagagito-perspectiva.webp",
      "label": "Perspectiva",
      "alt": "Suporte da tampa do bagagito visto em perspectiva"
    }
  ],
  "13": [
    {
      "src": "/products/tampa-reservatorio-clean.jpg",
      "label": "Foto da peça",
      "alt": "Tampa verde do reservatório do radiador vista de perto"
    }
  ],
  "14": [
    {
      "src": "/products/gallery/four-by-four-installed.jpg",
      "label": "No veículo",
      "alt": "Emblema 4 x 4 instalado na traseira do Grand Vitara"
    }
  ],
  "15": [
    {
      "src": "/products/gallery/trava-console-real.webp",
      "label": "Foto da peça",
      "alt": "Trava do console central vista de perto"
    }
  ],
  "16": [
    {
      "src": "/products/gallery/estepe-no-veiculo.webp",
      "label": "No veículo",
      "alt": "Emblema aplicado à capa do estepe do Grand Vitara"
    },
    {
      "src": "/products/gallery/estepe-vista-traseira.webp",
      "label": "Vista traseira",
      "alt": "Vista traseira do Grand Vitara com a capa do estepe"
    }
  ],
  "17": [
    {
      "src": "/products/gallery/banco-acabamento-frente.webp",
      "label": "Vista frontal",
      "alt": "Acabamento do banco traseiro visto de frente"
    },
    {
      "src": "/products/gallery/banco-acabamento-verso.webp",
      "label": "Encaixes",
      "alt": "Encaixes do acabamento do banco traseiro"
    },
    {
      "src": "/products/gallery/banco-acabamento-detalhe.webp",
      "label": "Detalhe da peça",
      "alt": "Formato do acabamento do banco traseiro"
    }
  ],
  "18": [
    {
      "src": "/products/gallery/door-trim-installed-one.jpg",
      "label": "Na porta",
      "alt": "Acabamento do puxador interno instalado na porta"
    },
    {
      "src": "/products/gallery/door-trim-installed-two.jpg",
      "label": "Vista do interior",
      "alt": "Acabamento do puxador no interior do Grand Vitara"
    }
  ]
};
const pieces = catalogProducts.map(product=>product.name);
const catalogCategories = ['Todos', ...new Set(catalogProducts.map(product=>product.category.split(' / ').pop()).map(category=>category[0]+category.slice(1).toLowerCase()))];
const normalizeSearch = value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const whatsappPhone = '558487116445';
const salesChannels = [{name:'Mercado Livre',url:'https://lista.mercadolivre.com.br/_CustId_105236790?item_id=MLB5231025828&category_id=MLB432998&seller_id=105236790&client=recoview-selleritems&recos_listing=true#origin=upp&component=sellerData&typeSeller=classic'},{name:'Shopee',url:'https://shopee.com.br/3dcar?page=0&sortBy=sales&tab=0'}];
const productCopyByName = {
 'Difusor de ar lateral': {location:'SAÍDA DE AR DO PAINEL',lead:'Difusor lateral para as saídas de ar do painel.',description:'Compatível com Suzuki Grand Vitara 2009–2015. Serve nos lados direito ou esquerdo. Produzido por impressão 3D. Disponível em unidade avulsa ou par com duas peças. Garantia de 6 meses.',facts:[['Fabricação','Impressão 3D'],['Aplicação','Grand Vitara 2009–2015 · lado direito ou esquerdo'],['Opções','1 peça ou 2 peças · garantia de 6 meses']]},
 'Emblema da grade dianteira': {location:'GRADE DIANTEIRA',lead:'Emblema Suzuki de reposição para a grade dianteira.',description:'Emblema para a grade dianteira do Grand Vitara, fabricado em ABS por impressão 3D. Garantia de 6 meses.',facts:[['Posição','Grade dianteira'],['Material','ABS'],['Fabricação','Impressão 3D · garantia de 6 meses']]},
 'Emblema Suzuki Grand Vitara preto': {location:'EMBLEMAS EXTERNOS',lead:'Emblema preto para a parte traseira do Grand Vitara.',description:'Emblema preto para aplicação traseira no Grand Vitara. Fabricado por impressão 3D, com resistência ao calor e proteção contra raios UV. Garantia de 6 meses.',facts:[['Posição','Traseira'],['Acabamento','Preto'],['Proteção','Resistência térmica e UV · garantia de 6 meses']]},
 'Emblema traseiro cromado': {location:'TAMPA TRASEIRA',lead:'Emblema Suzuki cromado para a traseira.',description:'Emblema cromado para a tampa traseira do Grand Vitara. Instalação com fita adesiva automotiva de alta fixação. Garantia de 6 meses.',facts:[['Posição','Traseira'],['Acabamento','Cromado'],['Fixação','Fita adesiva automotiva de alta fixação']]},
 'Puxador interno da porta': {location:'PORTAS INTERNAS',lead:'Puxador interno para as portas do Grand Vitara.',description:'Fabricado por impressão 3D. Escolha uma unidade, um par para portas dianteiras ou traseiras, ou o kit com quatro puxadores. O par tem acabamento preto texturizado em ABS Premium.',facts:[['Fabricação','Impressão 3D'],['Material do par','ABS Premium'],['Opções','1 unidade · par · 4 unidades']]},
 'Tampa do bagageiro': {location:'RACK DO TETO',lead:'Tampas de acabamento para o rack do teto do Grand Vitara G3.',description:'Tampas em ABS Premium, fabricadas por impressão 3D e resistentes à pressão mecânica e à temperatura. Fixação por encaixe sob pressão. Escolha entre 1, 2, 5, 10 ou 12 peças.',facts:[['Fabricação','Impressão 3D'],['Material','ABS Premium'],['Opções','1 · 2 · 5 · 10 · 12 peças']]},
 'Acabamento da ponteira do rack': {location:'EXTREMIDADES DO RACK',lead:'Acabamento para as ponteiras do rack, vendido por unidade.',description:'Compatível com Grand Vitara 2009–2015 equipado com rack original. Escolha dianteira do passageiro, traseira do motorista ou traseira do passageiro. As ponteiras dianteiras e traseiras têm formatos diferentes. Acabamento preto, com garantia de 6 meses.',facts:[['Posições','Dianteira passageiro · traseira motorista · traseira passageiro'],['Aplicação','Grand Vitara 2009–2015 · rack original'],['Acabamento','Preto · garantia de 6 meses']]},
 'Tampa de desbloqueio do câmbio': {location:'SELETORA DO CÂMBIO',lead:'Tampa para o ponto de desbloqueio da seletora.',description:'Fabricada por impressão 3D em ABS Premium, resistente à pressão mecânica e à temperatura. Encaixe por pressão. Garantia de 1 ano.',facts:[['Local','Seletora do câmbio'],['Material','ABS Premium'],['Fabricação','Impressão 3D · garantia de 1 ano']]},
 'Calota central': {location:'CENTRO DA RODA',lead:'Kit com quatro calotas centrais pretas.',description:'Kit com 4 unidades para o centro das rodas do Grand Vitara GV3. Produzidas por impressão 3D em ABS Premium, com encaixe por pressão. Garantia de 2 meses.',facts:[['Conteúdo','4 unidades'],['Material','ABS Premium'],['Acabamento','Preto · garantia de 2 meses']]},
 'Clipe da capa da mala': {location:'CAPA DA MALA',lead:'Clipe de fixação para a capa da mala do Grand Vitara.',description:'Fabricado em ABS por impressão 3D, com encaixe por pressão. Disponível em unidade avulsa ou kit com 4 peças. Garantia de 2 meses.',facts:[['Fabricação','Impressão 3D'],['Material','ABS'],['Opções','1 ou 4 unidades · garantia de 2 meses']]},
 'Presilha da lona do bagagito': {location:'LONA DO BAGAGITO',lead:'Presilha de fixação para a lona do bagagito.',description:'Presilha produzida por impressão 3D, com resistência mecânica. Garantia de 6 meses.',facts:[['Local','Lona do bagagito'],['Fabricação','Impressão 3D'],['Resistência','Mecânica · garantia de 6 meses']]},
 'Suporte da tampa do bagagito': {location:'TAMPA DO BAGAGITO',lead:'Suporte para a tampa do bagagito do Grand Vitara.',description:'Peça produzida por impressão 3D, resistente ao desgaste mecânico. Garantia de 1 ano.',facts:[['Local','Tampa do bagagito'],['Fabricação','Impressão 3D'],['Resistência','Ao desgaste mecânico · garantia de 1 ano']]},
 'Selo da porta': {location:'PORTA',lead:'Selo de porta para Suzuki Grand Vitara.',description:'Peça para as portas do Suzuki Grand Vitara, produzida por impressão 3D.',facts:[['Aplicação','Suzuki Grand Vitara'],['Fabricação','Impressão 3D']]},
 'Tampa do reservatório do radiador': {location:'RESERVATÓRIO DE EXPANSÃO',lead:'Tampa verde para o reservatório do sistema de arrefecimento.',description:'Compatível com Grand Vitara 2009–2015. Fabricada em plástico verde, sem necessidade de adaptação. Ajuda na vedação do reservatório e na prevenção de vazamentos. Garantia de 1 ano.',facts:[['Aplicação','Grand Vitara 2009–2015'],['Material','Plástico verde'],['Local','Reservatório de expansão · garantia de 1 ano']]},
 'Emblema 3D 4 x 4 (par)': {location:'EMBLEMA TRASEIRO',lead:'Par de emblemas 4 x 4 em alto-relevo.',description:'Kit com 2 emblemas para aplicação traseira no Suzuki Grand Vitara. Fabricados por impressão 3D em ABS resistente à temperatura. Disponíveis nas cores preta ou vermelha. Garantia de 6 meses.',facts:[['Posição','Traseira'],['Conteúdo e formato','2 unidades · alto-relevo'],['Material e cores','ABS · preto ou vermelho · garantia de 6 meses']]},
 'Trava do console central': {location:'CONSOLE CENTRAL',lead:'Trava completa para o console central do Grand Vitara.',description:'Compatível com Grand Vitara 2009–2015. Acompanha parafusos de fixação e mola metálica reforçada. Corpo em plástico. Garantia de 2 meses.',facts:[['Aplicação','Grand Vitara 2009–2015'],['Acompanha','Parafusos e mola metálica reforçada'],['Material','Plástico · garantia de 2 meses']]},
 'Emblema do estepe': {location:'TAMPA DO ESTEPE',lead:'Emblema Suzuki para a tampa traseira do estepe.',description:'Emblema para aplicação traseira no Grand Vitara, produzido por impressão 3D e resistente à temperatura. A fita dupla face para instalação não acompanha o produto. Garantia de 6 meses.',facts:[['Posição','Traseira · tampa do estepe'],['Fabricação','Impressão 3D'],['Instalação','Fita dupla face não inclusa · garantia de 6 meses']]},
 'Acabamento do banco traseiro': {location:'BANCO TRASEIRO',lead:'Acabamento preto para o banco traseiro do Grand Vitara.',description:'Produzido por impressão 3D em ABS Premium, resistente ao calor e a impactos. Garantia de 1 ano.',facts:[['Material','ABS Premium'],['Fabricação','Impressão 3D'],['Resistência','Calor e impactos · garantia de 1 ano']]},
 'Acabamento do puxador interno da porta': {location:'PUXADOR DA PORTA',lead:'Acabamento de reposição para o puxador interno.',description:'Fabricado em ABS por impressão 3D, resistente a impactos e altas temperaturas. Disponível nas cores preta ou vermelha. Garantia de 6 meses.',facts:[['Local','Interior da porta'],['Material','ABS'],['Cores','Preto ou vermelho · garantia de 6 meses']]},
 'Tampa metálica de válvula Capsilone': {location:'VÁLVULA DO PNEU',lead:'Tampa metálica Capsilone para válvula Suzuki.',description:'Tampa metálica para válvula de pneu, com acabamento Capsilone e emblema Suzuki. Dimensões: 14 mm de largura por 19 mm de altura.',facts:[['Material','Metal'],['Acabamento','Capsilone · emblema Suzuki'],['Dimensões','14 mm de largura × 19 mm de altura']]}
};
function whatsappFor(product,variant){
 const name=typeof product==='string'?product:product.name, options=variant?` Opção: ${variant.label}.`:'';
 const message = `Olá! Tenho interesse em ${name} para o Suzuki Grand Vitara.${options} Pode me informar o preço, a disponibilidade e o frete?`;
 return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}
function App() {
 const [selected, setSelected] = useState(0);
 const [detailOpen, setDetailOpen] = useState(false);
 const [salesOpen, setSalesOpen] = useState(false);
 const [catalogTransition, setCatalogTransition] = useState('');
 const [variantSelections, setVariantSelections] = useState({});
 const [search, setSearch] = useState('');
 const [category, setCategory] = useState('Todos');
 const [imageStatus, setImageStatus] = useState({});
 const backButton = useRef(null);
 const catalogCards = useRef({});
 const selectedProduct = catalogProducts[selected];
 const productCopy = productCopyByName[selectedProduct.name];
 const variantIndex = variantSelections[selected] ?? 0;
 const activeVariant = selectedProduct.variants?.[variantIndex];
 const visibleProducts = catalogProducts.map((product, index) => ({ product, index })).filter(({ product }) =>
  (category === 'Todos' || product.category.endsWith(category.toUpperCase())) &&
  normalizeSearch(product.name + ' ' + product.vehicle + ' ' + product.category).includes(normalizeSearch(search))
 );
 useLayoutEffect(() => {
  if (!detailOpen) return;
  const bodyOverflow = document.body.style.overflow;
  const rootOverflow = document.documentElement.style.overflow;
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.getElementById('produtos').scrollTop = 0;
  backButton.current?.focus({ preventScroll: true });
  return () => {
   document.body.style.overflow = bodyOverflow;
   document.documentElement.style.overflow = rootOverflow;
  };
 }, [detailOpen]);
 useLayoutEffect(() => {
  if (!catalogTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll(detailOpen ? '#produtos > .catalog-detail-bar, #produtos > .product-layout' : '#produtos > .product-shelf');
  const direction = catalogTransition === 'forward' ? 1 : -1;
  const animations = [...targets].map((element, index) => element.animate(
   [{ opacity: 0, transform: 'translateX(' + (16 * direction) + 'px)' }, { opacity: 1, transform: 'translateX(0)' }],
   { duration: 240, delay: index * 20, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'both' }
  ));
  return () => animations.forEach(animation => animation.cancel());
 }, [catalogTransition, detailOpen]);
 function recordImage(image, status) {
  setImageStatus(current => current[image] === status ? current : { ...current, [image]: status });
 }
 function showSales(event) {
  event?.preventDefault();
  setSalesOpen(true);
 }
 function navigateCatalog(event, target = 'produtos') {
  if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
  event?.preventDefault();
  setCatalogTransition(detailOpen ? 'back' : '');
  setDetailOpen(false);
  window.history.replaceState(null, '', '#' + target);
  requestAnimationFrame(() => {
   document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
   if (target === 'produtos') catalogCards.current[selected]?.focus({ preventScroll: true });
  });
 }
 return <>
  <SiteHeader onHome={event => navigateCatalog(event, 'inicio')} onWhereToBuy={showSales} whatsapp={whatsapp} detailOpen={detailOpen}/>
  <Cover onExplore={navigateCatalog} onWhereToBuy={showSales}/>
  <main>
   <section className={'catalog catalog-refresh ' + (detailOpen ? 'product-detail ' : '') + (catalogTransition ? 'catalog-transition-' + catalogTransition : '')} id="produtos" aria-label={detailOpen ? 'Detalhes de ' + selectedProduct.name : 'Catálogo de peças'}>
    {detailOpen ? <>
     <div className="catalog-bar catalog-detail-bar">
      <button ref={backButton} className="back-to-catalog" type="button" onClick={navigateCatalog}>← Voltar ao catálogo</button>
      <span className="detail-breadcrumb">{selectedProduct.category.split(' / ').pop().toLowerCase().replace(/^./, letter => letter.toUpperCase())} / {selectedProduct.vehicle}</span>
     </div>
     <ProductDetails product={selectedProduct} copy={productCopy} extras={productGalleryPhotos[selected]} variantIndex={variantIndex} onVariantChange={index => setVariantSelections(current => ({ ...current, [selected]: index }))} isDiffuser={selected === 0} contactHref={whatsappFor(selectedProduct, activeVariant)}/>
    </> : <div className="product-shelf">
     <div className="product-shelf-intro">
      <h1 className="catalog-title">Peças para o Grand Vitara</h1>
      <p>Encontre a peça e escolha a opção certa para o seu veículo.</p>
     </div>
     <div className="catalog-tools">
      <div className="catalog-controls">
       <div className="catalog-search" role="search" aria-label="Busca do catálogo">
        <Search aria-hidden="true"/>
        <label className="visually-hidden" htmlFor="catalog-search">Buscar peça</label>
        <input id="catalog-search" type="search" placeholder="Qual peça você procura?" value={search} onChange={event => setSearch(event.target.value)} autoComplete="off"/>
        {search && <button type="button" aria-label="Limpar busca" onClick={() => { setSearch(''); document.getElementById('catalog-search')?.focus(); }}><X aria-hidden="true"/></button>}
       </div>
       <div className="catalog-categories" role="group" aria-label="Categorias">
        {catalogCategories.map(item => <button key={item} type="button" aria-pressed={category === item} aria-controls="catalog-grid" onClick={() => setCategory(item)}>{item}</button>)}
       </div>
      </div>
      <p className="catalog-result-count" role="status" aria-live="polite" aria-atomic="true">
       {visibleProducts.length} {visibleProducts.length === 1 ? 'produto' : 'produtos'}{search || category !== 'Todos' ? (visibleProducts.length === 1 ? ' encontrado' : ' encontrados') : ' no catálogo'}
      </p>
     </div>
     <div className="product-shelf-grid" id="catalog-grid">
      {visibleProducts.map(({ product, index }, position) => <CatalogCard key={product.name} product={product} index={index} position={position} status={imageStatus[product.image]} onImageStatus={recordImage} buttonRef={node => { catalogCards.current[index] = node; }} onOpen={() => { setCatalogTransition('forward'); setSelected(index); setDetailOpen(true); }}/>)}
     </div>
     {visibleProducts.length === 0 && <div className="catalog-empty"><Search aria-hidden="true"/><h2>Nenhuma peça encontrada</h2><p>Tente outro nome ou escolha outra categoria.</p><button type="button" onClick={() => { setSearch(''); setCategory('Todos'); }}>Limpar filtros</button></div>}
    </div>}
   </section>
  </main>
  <footer className="sales-footer" id="lojas">
   <div className="sales-footer-inner">
    <div className="sales-footer-copy"><h2>Escolha onde comprar</h2><p>Confira nossos produtos nos canais de venda.</p></div>
    <div className="sales-channel-links">
     {salesChannels.map(channel => <a key={channel.name} href={channel.url} target="_blank" rel="noreferrer" aria-label={'Abrir a loja da 3D CAR no ' + channel.name + ' em nova aba'}><strong>{channel.name}</strong><span>Ver produtos <ArrowUpRight aria-hidden="true" size={16}/></span></a>)}
     <a className="sales-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" size={20}/><span>Fale com a 3D CAR</span></a>
    </div>
   </div>
  </footer>
  <SalesDialog open={salesOpen} onClose={() => setSalesOpen(false)} channels={salesChannels} whatsapp={whatsapp}/>
 </>;
}
const root=import.meta.hot?.data.root??createRoot(document.getElementById('root'));
if(import.meta.hot)import.meta.hot.data.root=root;
root.render(<App/>);







