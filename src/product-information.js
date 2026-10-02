// Details omitted by the short fact lists, taken from the existing product copy.
const additionalInformation = {
  'Puxador interno da porta': [['Aplicação do par', 'Portas dianteiras ou traseiras'], ['Acabamento do par', 'Preto texturizado']],
  'Tampa do bagageiro': [['Aplicação', 'Grand Vitara G3'], ['Resistência', 'Pressão mecânica e temperatura'], ['Fixação', 'Encaixe sob pressão']],
  'Acabamento da ponteira do rack': [['Venda', 'Por unidade'], ['Encaixe', 'Ponteiras dianteiras e traseiras têm formatos diferentes']],
  'Tampa de desbloqueio do câmbio': [['Resistência', 'Pressão mecânica e temperatura'], ['Fixação', 'Encaixe por pressão']],
  'Calota central': [['Aplicação', 'Grand Vitara GV3'], ['Fixação', 'Encaixe por pressão']],
  'Clipe da capa da mala': [['Fixação', 'Encaixe por pressão']],
  'Tampa do reservatório do radiador': [['Instalação', 'Sem necessidade de adaptação'], ['Função', 'Vedação do reservatório e prevenção de vazamentos']],
  'Emblema 3D 4 x 4 (par)': [['Resistência', 'Temperatura']],
  'Emblema do estepe': [['Resistência', 'Temperatura']],
  'Acabamento do banco traseiro': [['Acabamento', 'Preto']],
  'Acabamento do puxador interno da porta': [['Resistência', 'Impactos e altas temperaturas']],
};

export function getPieceInformation(product, copy) {
  const rows = new Map();
  const add = (label, value) => {
    if (value !== undefined && value !== null && String(value).trim()) rows.set(label, value);
  };
  const extra = additionalInformation[product.name] || [];
  const application = copy.facts.find(([label]) => label === 'Aplicação')?.[1]
    || extra.find(([label]) => label === 'Aplicação')?.[1] || product.vehicle;
  add('Aplicação', application);

  for (const [label, rawValue] of copy.facts) {
    const value = rawValue.replace(/\s*·?\s*garantia de [^.·]+/i, '').trim();
    // The option selector below the facts carries this information once.
    if (label === 'Aplicação' || (product.variants?.length > 1 && ['Opções', 'Posições'].includes(label))) continue;
    if (label === 'Material e cores') {
      const [material, colors] = value.split(' · ');
      add('Material', material);
      add('Cores', colors);
    } else if (label === 'Conteúdo e formato') {
      const [quantity, format] = value.split(' · ');
      add('Conteúdo', quantity);
      add('Formato', format);
    } else add(label, value);
  }
  if (/impressão 3D/i.test(copy.description) && !rows.has('Fabricação')) add('Fabricação', 'Impressão 3D');
  for (const [label, value] of extra) if (label !== 'Aplicação') add(label, value);

  const warranty = copy.warranty || product.warranty || copy.description.match(/garantia de ([^.]+)/i)?.[1];
  add('Garantia', warranty);
  add('Disponibilidade', product.availability || copy.availability);
  return [...rows].map(([label, value]) => ({ label, value }));
}
