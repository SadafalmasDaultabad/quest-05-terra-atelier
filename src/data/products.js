// SAMPLE DATA: all products, prices and ratings below are made up for this demo.
// "shape" and "colors" drive the generated SVG illustration (see ProductArt.jsx).
export const categories = ['Ceramics', 'Textiles', 'Lighting', 'Decor'];

export const products = [
  { id: 'sundial-vase', name: 'Sundial Stoneware Vase', category: 'Ceramics', price: 2400, rating: 4.8, shape: 'vase', colors: ['#E9A23B', '#C4552D'], badge: 'Bestseller', inStock: true,
    blurb: 'A tall, hand-thrown vase with a warm saffron glaze.', details: ['Hand-thrown stoneware', 'Height 28 cm', 'Waterproof glaze inside'] },
  { id: 'clay-mug-set', name: 'Clay Morning Mug Set', category: 'Ceramics', price: 1650, rating: 4.6, shape: 'mug', colors: ['#D9A58A', '#8C3B1F'], inStock: true,
    blurb: 'Set of two chunky mugs made for slow chai mornings.', details: ['Set of 2 mugs', '300 ml each', 'Dishwasher safe'] },
  { id: 'indigo-bowl', name: 'Indigo Serving Bowl', category: 'Ceramics', price: 1950, rating: 4.7, shape: 'bowl', colors: ['#3E5C9A', '#1F2A44'], badge: 'New', inStock: true,
    blurb: 'Deep blue glaze that pools beautifully at the rim.', details: ['Diameter 24 cm', 'Food safe glaze', 'Each piece slightly unique'] },
  { id: 'jaipur-cushion', name: 'Jaipur Block-Print Cushion', category: 'Textiles', price: 1200, rating: 4.5, shape: 'cushion', colors: ['#D4608A', '#F7D6E2'], inStock: true,
    blurb: 'Block-printed cotton cover with a soft linen back.', details: ['45 × 45 cm', 'Removable cover', 'Natural dyes'] },
  { id: 'dune-throw', name: 'Dune Woven Throw', category: 'Textiles', price: 3800, rating: 4.9, shape: 'throw', colors: ['#E8D3B0', '#B98A5A'], badge: 'Bestseller', inStock: true,
    blurb: 'A generous woven throw in sandy, layered stripes.', details: ['130 × 180 cm', '100% cotton', 'Machine washable'] },
  { id: 'sage-tote', name: 'Sage Market Tote', category: 'Textiles', price: 950, rating: 4.4, shape: 'tote', colors: ['#8FA382', '#4F6247'], inStock: true,
    blurb: 'Sturdy canvas tote with reinforced handles.', details: ['Heavy canvas', 'Inner pocket', 'Holds up to 10 kg'] },
  { id: 'ember-lamp', name: 'Ember Table Lamp', category: 'Lighting', price: 4200, rating: 4.8, shape: 'lamp', colors: ['#E9A23B', '#6B3A1E'], badge: 'New', inStock: true,
    blurb: 'A warm glow from a handmade linen shade and clay base.', details: ['Height 42 cm', 'E14 bulb (not included)', 'Fabric cord'] },
  { id: 'dusk-pendant', name: 'Dusk Rattan Pendant', category: 'Lighting', price: 5400, rating: 4.7, shape: 'lamp', colors: ['#C9A77A', '#5A4631'], inStock: false,
    blurb: 'Woven rattan pendant that casts soft patterned light.', details: ['Diameter 40 cm', 'Adjustable cord', 'Currently restocking'] },
  { id: 'amber-candle', name: 'Amber Jar Candle', category: 'Lighting', price: 750, rating: 4.6, shape: 'jar', colors: ['#E9A23B', '#7A4A1C'], inStock: true,
    blurb: 'Soy wax candle with notes of sandalwood and amber.', details: ['40 hour burn', 'Soy wax', 'Reusable jar'] },
  { id: 'arch-mirror', name: 'Arch Terracotta Mirror', category: 'Decor', price: 3200, rating: 4.5, shape: 'mirror', colors: ['#B04A7A', '#F2CFDD'], inStock: true,
    blurb: 'A softly arched mirror framed in terracotta tones.', details: ['50 × 70 cm', 'Wall hook included', 'Solid wood frame'] },
  { id: 'moon-tray', name: 'Moonlit Brass Tray', category: 'Decor', price: 1450, rating: 4.3, shape: 'bowl', colors: ['#D6B25E', '#8A6A21'], inStock: true,
    blurb: 'Hammered brass tray for keys, jewellery or candles.', details: ['Diameter 26 cm', 'Hand hammered', 'Wipe clean'] },
  { id: 'fern-planter', name: 'Fern Glazed Planter', category: 'Decor', price: 1850, rating: 4.7, shape: 'vase', colors: ['#8FA382', '#3F5A3A'], inStock: true,
    blurb: 'Round planter with a drainage hole and saucer.', details: ['Height 20 cm', 'Includes saucer', 'Fits a 15 cm pot'] },
];

export const getProduct = (id) => products.find((p) => p.id === id);
