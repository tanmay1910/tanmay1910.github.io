/* ============================================================
   PRINTZIN — catalog data
   Sourced from the live E Gift Store catalog. Prices in INR.
   Images served from vyapar-catalog CDN.
   ============================================================ */
(function () {
  const CATEGORIES = [
    { id: 'mugs',     name: 'Photo Mugs',         tag: 'Sip the memories',   icon: 'mug',     tint: '#FFE2D2', accent: '#E03E18' },
    { id: 'bottles',  name: 'Bottles & Sippers',  tag: 'Sip in style',       icon: 'bottle',  tint: '#DDEEFF', accent: '#1565C0' },
    { id: 'frames',   name: 'Photo Frames',       tag: 'Frame the moment',   icon: 'frame',   tint: '#FFEFD0', accent: '#F59300' },
    { id: 'magnets',  name: 'Fridge Magnets',     tag: 'Stick the smile',    icon: 'frame',   tint: '#E4F4E6', accent: '#1F9D5B' },
    { id: 'tshirts',  name: 'Custom T-Shirts',    tag: 'Wear your story',    icon: 'shirt',   tint: '#FFE0E8', accent: '#C2185B' },
    { id: 'pens',     name: 'Pens & Keychains',   tag: 'Carry a smile',      icon: 'key',     tint: '#F0E6FF', accent: '#7A3DD6' },
    { id: 'leather',  name: 'Leather & Wallets',  tag: 'Everyday luxury',    icon: 'hamper',  tint: '#F3E7DA', accent: '#8A5A2B' },
    { id: 'led',      name: 'LED & Magic Gifts',  tag: 'Glow with love',     icon: 'lamp',    tint: '#FFF0D9', accent: '#F59300' },
    { id: 'combos',   name: 'Combos & Hampers',   tag: 'Joy, bundled',       icon: 'hamper',  tint: '#E4F4E6', accent: '#1F9D5B' },
    { id: 'office',   name: 'Office & Engraving', tag: 'Desk-worthy gifts',  icon: 'frame',   tint: '#E6EEF2', accent: '#37607A' },
  ];

  const COLORS = [
    { id: 'coral',  name: 'Coral',  hex: '#FF5A36' },
    { id: 'black',  name: 'Black',  hex: '#2A1410' },
    { id: 'white',  name: 'White',  hex: '#F7F0EA' },
    { id: 'amber',  name: 'Amber',  hex: '#FFB020' },
    { id: 'teal',   name: 'Teal',   hex: '#1FA99D' },
    { id: 'pink',   name: 'Pink',   hex: '#FF3D77' },
  ];

  const IMG = 'https://vyapar-catalog.vypcdn.in/';
  const TEE = ['S', 'M', 'L', 'XL', 'XXL'];

  // helper to build products quickly
  let pid = 100;
  function P(o) {
    pid += 1;
    const mrp = o.mrp || Math.round(o.price * (1 + (o.off || 0.25)));
    return Object.assign({
      id: 'p' + pid,
      rating: o.rating || (4 + Math.round(Math.random() * 9) / 10),
      reviews: o.reviews || (40 + Math.floor(Math.random() * 900)),
      mrp,
      off: o.price && mrp ? Math.round((1 - o.price / mrp) * 100) : 0,
      personalizable: o.personalizable !== false,
      colors: o.colors || ['coral', 'black', 'white'],
      sizes: o.sizes || null,
      bestseller: o.bestseller || false,
      badge: o.badge || null,
      image: o.image || null,
    }, o);
  }

  const PRODUCTS = [
    /* ---------- MUGS ---------- */
    P({ name: '3 Tone Mug 11 OZ', cat: 'mugs', price: 250, code: 'Cm2', bestseller: true, badge: 'Bestseller', image: IMG + '73e22a288cde7/73e22a288cde721660e3764c2c0/73e22a288cde7_2_5.jpg?v=1770734910836', blurb: 'Ceramic 11oz mug with a three-tone finish, printed with your photo.' }),
    P({ name: '6 Oz Colour Mug', cat: 'mugs', price: 199, image: IMG + '73e22a288cde7/73e22a288cde7114f157b6b2d2a7/73e22a288cde7_11_24.jpg?v=1771071170859', blurb: 'Compact 6oz coloured ceramic mug, perfect for espresso.' }),
    P({ name: 'Capsul Mug Colour', cat: 'mugs', price: 199, image: IMG + '73e22a288cde7/73e22a288cde71014776c8229bf7/73e22a288cde7_10_23.jpg?v=1771071004956', blurb: 'Capsule-shaped coloured mug printed with your favourite memory.' }),
    P({ name: 'Coffee Mug', cat: 'mugs', price: 199, code: 'Cm 1', bestseller: true, image: IMG + '73e22a288cde7/73e22a288cde716751d467a44e8/73e22a288cde7_1_1.jpg?v=1770724816547', blurb: 'Classic white 325ml ceramic mug — dishwasher safe.' }),
    P({ name: 'Heart Handle Black Magic Mug', cat: 'mugs', price: 380, badge: 'Trending', image: IMG + '73e22a288cde7/73e22a288cde763c1c9f91ca25f/73e22a288cde7_6_25.jpg?v=1771079354381', blurb: 'Heart-shaped handle magic mug that reveals your photo when hot.' }),
    P({ name: 'Heart Handle Mug Colour', cat: 'mugs', price: 249, image: IMG + '73e22a288cde7/73e22a288cde7315a76efa255a7/73e22a288cde7_3_9.jpg?v=1771079481312', blurb: 'Coloured mug with a charming heart-shaped handle.' }),
    P({ name: 'Magic Mug Regular', cat: 'mugs', price: 299, badge: 'Trending', image: IMG + '73e22a288cde7/73e22a288cde7454a5a87bc2d30/73e22a288cde7_4_13.jpg?v=1771066836772', blurb: 'Black mug that magically reveals your photo with a hot drink.' }),
    P({ name: 'Patch Mug', cat: 'mugs', price: 279, image: IMG + '73e22a288cde7/73e22a288cde788d7420d21e848/73e22a288cde7_8_18.jpg?v=1771070816418', blurb: 'Ceramic mug with a colour patch panel for your design.' }),
    P({ name: 'Pot Mug', cat: 'mugs', price: 199, image: IMG + '73e22a288cde7/73e22a288cde7872dc46cfda315f/73e22a288cde7_87_181.jpg?v=1779292671296', blurb: 'Quirky pot-style mug printed with your photo.' }),
    P({ name: 'White Capsul Mug 6 Oz', cat: 'mugs', price: 199, image: IMG + '73e22a288cde7/73e22a288cde7957d108624073f/73e22a288cde7_9_22.jpg?v=1771070920526', blurb: 'White 6oz capsule mug for a clean photo print.' }),
    P({ name: 'White Heart Handle Mug', cat: 'mugs', price: 199, image: IMG + '73e22a288cde7/73e22a288cde7717bf7e3e109a0/73e22a288cde7_7_28.jpg?v=1771079386109', blurb: 'White mug with a heart-shaped handle — a sweet keepsake.' }),

    /* ---------- BOTTLES & SIPPERS ---------- */
    P({ name: '4 in 1 Temperature Bottle — Women Set', cat: 'bottles', price: 1399, badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde747da845ebc470b7/73e22a288cde7_47_118.jpg?v=1774102641648', blurb: 'A four-piece temperature bottle gift set curated for her.' }),
    P({ name: 'Mini Stainless Steel Bottle — 300 ml', cat: 'bottles', price: 399, image: IMG + '73e22a288cde7/73e22a288cde741be7c7463e57e0/73e22a288cde7_41_109.jpg?v=1773419049147', blurb: 'Compact 300ml steel bottle in mixed colours.' }),
    P({ name: 'Sipper Bottle Regular', cat: 'bottles', price: 299, image: IMG + '73e22a288cde7/73e22a288cde712a410910e22e98/73e22a288cde7_12_29.jpg?v=1771080630839', blurb: 'Everyday sipper bottle printed all around with your photo.' }),
    P({ name: 'Sport Steel Bottle — Large Mouth 800 ml', cat: 'bottles', price: 580, badge: 'New', image: IMG + '73e22a288cde7/73e22a288cde735f1fc490abf297/73e22a288cde7_35_95.jpg?v=1774368748861', blurb: 'Black 800ml large-mouth steel bottle for engraving or UV.' }),
    P({ name: 'Sport Steel Bottle 750 ml', cat: 'bottles', price: 380, image: IMG + '73e22a288cde7/73e22a288cde71980632d4048827/73e22a288cde7_19_53.jpg?v=1774368748858', blurb: 'Black 750ml sport steel bottle for engraving or UV printing.' }),
    P({ name: 'Stainless Steel Bottle — 500 ml With Dori', cat: 'bottles', price: 350, image: IMG + '73e22a288cde7/73e22a288cde7201542c25be6780/73e22a288cde7_20_55.jpg?v=1774368748859', blurb: 'Black 500ml steel bottle with carry dori, ready for engraving.' }),
    P({ name: 'Steel Travel Mug With Temperature 500 ml', cat: 'bottles', price: 450, image: IMG + '73e22a288cde7/73e22a288cde7341eca671574f18/73e22a288cde7_34_93.jpg?v=1773342907254', blurb: 'Insulated travel mug with a digital temperature display.' }),
    P({ name: 'Sublimation Big Mouth Sipper 750 ml', cat: 'bottles', price: 399, image: IMG + '73e22a288cde7/73e22a288cde7164b12e3624fd57/73e22a288cde7_16_43.jpg?v=1771082602076', blurb: 'Big-mouth 750ml sublimation sipper for vivid photo prints.' }),
    P({ name: 'Sublimation Cola Bottle 500 ml', cat: 'bottles', price: 499, image: IMG + '73e22a288cde7/73e22a288cde715f6be79672edff/73e22a288cde7_15_40.jpg?v=1771082484885', blurb: 'Retro cola-shaped 500ml bottle, fully customisable.' }),
    P({ name: 'Sublimation Nozzle Sipper 750 ml', cat: 'bottles', price: 399, image: IMG + '73e22a288cde7/73e22a288cde71419449905d7d1f/73e22a288cde7_14_36.jpg?v=1771082317602', blurb: '750ml nozzle sipper bottle printed with your design.' }),
    P({ name: 'Sublimation Sipper — Straw Lid & Hanger 750 ml', cat: 'bottles', price: 380, code: '38620460842', image: IMG + '73e22a288cde7/73e22a288cde71338a7eac6566cf/73e22a288cde7_13_33.jpg?v=1771081377362', blurb: '750ml sipper with straw lid and hanger, fully printable.' }),
    P({ name: 'Sublimation Tumbler 20 oz With Straw', cat: 'bottles', price: 750, image: IMG + '73e22a288cde7/73e22a288cde78411194b06631f0/73e22a288cde7_84_178.jpg?v=1779289230186', blurb: '20oz insulated tumbler with straw — keeps drinks cold for hours.' }),
    P({ name: 'Sublimation Tumbler 20 oz', cat: 'bottles', price: 450, blurb: 'Classic 20oz sublimation tumbler with straw lid.' }),
    P({ name: 'Temperature Bottle — Black 500 ml', cat: 'bottles', price: 350, image: IMG + '73e22a288cde7/73e22a288cde733f1872a1425d78/73e22a288cde7_33_90.jpg?v=1773342460848', blurb: 'Black 500ml temperature-display bottle for engraving or UV.' }),
    P({ name: 'Tumbler', cat: 'bottles', price: 950, badge: 'Premium', image: IMG + '73e22a288cde7/73e22a288cde73016a3f31667458/73e22a288cde7_30_88.jpg?v=1772514137602', blurb: 'Premium insulated tumbler, personalised just for you.' }),
    P({ name: 'Flask', cat: 'bottles', price: 400, blurb: 'Insulated flask to keep beverages hot or cold.' }),

    /* ---------- PHOTO FRAMES ---------- */
    P({ name: 'A3 Size Photo Frame', cat: 'frames', price: 899, badge: 'Premium', image: IMG + '73e22a288cde7/73e22a288cde7634988b044101cf/73e22a288cde7_63_152.jpg?v=1774368871797', blurb: 'Large A3 photo frame to showcase your favourite shot.' }),
    P({ name: 'A4 Photo Frame', cat: 'frames', price: 499, bestseller: true, badge: 'Bestseller', image: IMG + '73e22a288cde7/73e22a288cde7621c16dd6284cff/73e22a288cde7_62_147.jpg?v=1774368749707', blurb: 'Classic A4 tabletop photo frame with your printed photo.' }),
    P({ name: 'Customize Collage Frame', cat: 'frames', price: 1250, badge: 'Premium', image: IMG + '73e22a288cde7/73e22a288cde76457d8c27e2f1e8/73e22a288cde7_64_157.jpg?v=1774369112173', blurb: 'A single frame that tells many stories — your photos, your layout.' }),
    P({ name: 'Polaroid Acrylic Magnetic Frame With Stand 3×4"', cat: 'frames', price: 90, image: IMG + '73e22a288cde7/73e22a288cde74214312e6b8e16f/73e22a288cde7_42_110.jpg?v=1773419497441', blurb: 'Mini acrylic magnetic frame with stand, polaroid style.' }),
    P({ name: 'Polaroid Acrylic Magnetic Frame Rectangle 2.5×6"', cat: 'frames', price: 150, image: IMG + '73e22a288cde7/73e22a288cde769e33578bf4073f/73e22a288cde7_69_168.jpg?v=1775056271937', blurb: 'Rectangular acrylic magnetic photo frame, approx 2.5 × 6 inch.' }),

    /* ---------- FRIDGE MAGNETS ---------- */
    P({ name: 'Polaroid Heart Photo Fridge Magnet', cat: 'magnets', price: 99, image: IMG + '73e22a288cde7/73e22a288cde767a4afd4dd29428/73e22a288cde7_67_166.jpg?v=1775055600540', blurb: 'Yellow polaroid heart magnet with “Love” text, 3.4 × 3.7 inch.' }),
    P({ name: 'Polaroid Rectangle Photo Fridge Magnet', cat: 'magnets', price: 99, image: IMG + '73e22a288cde7/73e22a288cde76846610c9626d17/73e22a288cde7_68_167.jpg?v=1775055737346', blurb: 'Yellow polaroid rectangle magnet with “Love” text, 4 × 2.9 inch.' }),
    P({ name: 'Sublimation MDF Fridge Magnet — Round 3.5"', cat: 'magnets', price: 75, image: IMG + '73e22a288cde7/73e22a288cde76647ee529bdbba0/73e22a288cde7_66_164.jpg?v=1775054044218', blurb: 'Round 3.5 inch MDF magnet printed with your photo.' }),
    P({ name: 'Sublimation MDF Fridge Magnet — Square 3"', cat: 'magnets', price: 75, image: IMG + '73e22a288cde7/73e22a288cde765177282d953bd8/73e22a288cde7_65_161.jpg?v=1775053853135', blurb: 'Square 3 inch MDF fridge magnet, fully customisable.' }),

    /* ---------- T-SHIRTS ---------- */
    P({ name: 'Round Neck Cotton Biowash T-shirt', cat: 'tshirts', price: 380, sizes: TEE, colors: ['white', 'black', 'coral'], bestseller: true, badge: 'Bestseller', image: IMG + '73e22a288cde7/73e22a288cde749a20cc24c43a07/73e22a288cde7_49_120.jpg?v=1774156029961', blurb: 'Soft biowash cotton round-neck tee printed with your design.' }),
    P({ name: 'Round Neck Dryfit T-shirt', cat: 'tshirts', price: 280, sizes: TEE, colors: ['white', 'black', 'teal'], image: IMG + '73e22a288cde7/73e22a288cde75014788eb8ec158/73e22a288cde7_50_122.jpg?v=1774158055655', blurb: 'Breathable dryfit round-neck tee for active days.' }),
    P({ name: 'Round Neck Bio Wash Kids T-shirt', cat: 'tshirts', price: 300, sizes: ['2-3y', '4-5y', '6-7y', '8-9y', '10-11y'], image: IMG + '73e22a288cde7/73e22a288cde751a9279436ea218/73e22a288cde7_51_124.jpg?v=1774158181584', blurb: 'Soft biowash kids tee — add a name and photo.' }),
    P({ name: 'Dry Sport T-shirt', cat: 'tshirts', price: 299, sizes: TEE, image: IMG + '73e22a288cde7/73e22a288cde723927898b07d00./73e22a288cde7_23_64.jpg?v=1771303504467', blurb: 'Moisture-wicking sport tee printed with your design.' }),
    P({ name: 'Forest Club / Dull Dryfit T-shirt', cat: 'tshirts', price: 480, sizes: TEE, image: IMG + '73e22a288cde7/73e22a288cde7298d0662d746118/73e22a288cde7_29_87.jpg?v=1771593786991', blurb: 'Premium dull-finish dryfit tee, Forest Club style.' }),
    P({ name: 'Magic Cooltex Dryfit Tipping T-shirt', cat: 'tshirts', price: 450, sizes: TEE, image: IMG + '73e22a288cde7/73e22a288cde728e93c3b37416e0/73e22a288cde7_28_85.jpg?v=1771589146545', blurb: 'Cooltex dryfit tee with contrast tipping on collar and cuffs.' }),
    P({ name: 'Cotton T-shirt', cat: 'tshirts', price: 450, sizes: TEE, blurb: '100% cotton tee printed with your custom design.' }),

    /* ---------- PENS & KEYCHAINS ---------- */
    P({ name: 'Advocate Pen & Keychain Set', cat: 'pens', price: 499, badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde7317e0e32c8e6f50/73e22a288cde7_31_89.jpg?v=1774368748860', blurb: 'Pen and keychain gift set themed for advocates.' }),
    P({ name: 'Bottle Pen & Keychain Gift Set', cat: 'pens', price: 550, code: 'PRP 2', badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde732129d71f2d2f00/73e22a288cde7_32_146.jpg?v=1774368749706', blurb: 'Coordinated bottle, pen and keychain gift set.' }),
    P({ name: 'Dr. Pen Set With Keychain', cat: 'pens', price: 480, image: IMG + '73e22a288cde7/73e22a288cde722129984a4b1fa8/73e22a288cde7_22_63.jpg?v=1774365071994', blurb: 'Doctor-themed pen set with matching keychain.' }),
    P({ name: 'Magnetic Floating Ball Pen', cat: 'pens', price: 450, badge: 'New', image: IMG + '73e22a288cde7/73e22a288cde756e20f6e79c3117/73e22a288cde7_56_139.jpg?v=1774367319567', blurb: 'Novelty magnetic floating-ball pen for engraving or UV printing.' }),
    P({ name: 'Metal Pen Benz', cat: 'pens', price: 150, image: IMG + '73e22a288cde7/73e22a288cde75419c37b6e222e0/73e22a288cde7_54_137.jpg?v=1774160226888', blurb: 'Sleek metal pen, ideal for engraving or UV printing.' }),
    P({ name: 'Pen — Gold Zari (Indian)', cat: 'pens', price: 250, image: IMG + '73e22a288cde7/73e22a288cde755175f0d30e53f8/73e22a288cde7_55_138.jpg?v=1774160475754', blurb: 'Elegant gold-zari Indian pen, perfect for engraving.' }),
    P({ name: 'Photo Print Silver Metal Keychain (Double Side)', cat: 'pens', price: 70, image: IMG + '73e22a288cde7/73e22a288cde7434465fad1cf84f/73e22a288cde7_43_113.jpg?v=1774101578900', blurb: 'Two-sided printed silver metal keychain in mixed shapes.' }),
    P({ name: 'Stress Busters Keychain', cat: 'pens', price: 150, blurb: 'Squishy stress-buster keychain to keep you calm on the go.' }),

    /* ---------- LEATHER & WALLETS ---------- */
    P({ name: 'Faux Leather Combo Set of 4 (Pen + Diary)', cat: 'leather', price: 650, badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde7386b4d4a8859d8./73e22a288cde7_38_101.jpg?v=1773413205730', blurb: 'Four-piece faux-leather pen and diary set in mixed colours.' }),
    P({ name: 'Faux Leather Couple Combo Set of 2', cat: 'leather', price: 599, badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde79619f4de6cba477/73e22a288cde7_96_186.jpg?v=1779461877394', blurb: 'His-and-hers faux-leather couple combo gift set.' }),
    P({ name: 'Faux Leather Ladies Purse + Pouch (Without Box)', cat: 'leather', price: 450, image: IMG + '73e22a288cde7/73e22a288cde73958896996cd13f/73e22a288cde7_39_103.jpg?v=1773413770979', blurb: 'Faux-leather ladies purse with patti and matching pouch.' }),
    P({ name: 'Faux Leather Ladies Purse With Patti & Pouch', cat: 'leather', price: 450, image: IMG + '73e22a288cde7/73e22a288cde75317331bad99cf0/73e22a288cde7_53_132.jpg?v=1775056782365', blurb: 'Stylish faux-leather ladies purse with patti and pouch.' }),
    P({ name: 'Faux Leather Men’s Combo Set of 3 in 1', cat: 'leather', price: 549, badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde72515f1e30fa8b37/73e22a288cde7_25_70.jpg?v=1771423070662', blurb: 'Three-in-one faux-leather men’s gifting combo.' }),
    P({ name: 'Faux Leather Men’s Combo Set of 4', cat: 'leather', price: 750, badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde7261958427ee7337/73e22a288cde7_26_75.jpg?v=1771423381494', blurb: 'Four-piece faux-leather men’s accessory combo set.' }),
    P({ name: 'Faux Leather Men’s Combo Set of 5 in 1', cat: 'leather', price: 850, badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde7274401d2f226d17/73e22a288cde7_27_80.jpg?v=1771424271039', blurb: 'Five-in-one faux-leather men’s grand gifting combo.' }),
    P({ name: 'Faux Leather Men’s Wallet + Keychain Set', cat: 'leather', price: 280, image: IMG + '73e22a288cde7/73e22a288cde7241ae90c0a1e078/73e22a288cde7_24_65.jpg?v=1771422592307', blurb: 'Faux-leather men’s wallet paired with a matching keychain.' }),
    P({ name: 'Faux Leather Wallet + Keychain + Gold Zari Pen Set', cat: 'leather', price: 450, badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde740112a201762a1f/73e22a288cde7_40_104.jpg?v=1773417926463', blurb: 'Wallet, metal keychain and gold-zari pen in one gift set.' }),
    P({ name: 'Faux Leather Sling Bag', cat: 'leather', price: 480, badge: 'New', image: IMG + '73e22a288cde7/73e22a288cde795d1a8c62696e10/73e22a288cde7_95_184.jpg?v=1779455618206', blurb: 'Compact faux-leather sling bag for everyday carry.' }),
    P({ name: 'Imported Leather Men’s Wallet (With Box)', cat: 'leather', price: 350, image: IMG + '73e22a288cde7/73e22a288cde7376b4d4a7c9a4bf/73e22a288cde7_37_100.jpg?v=1773413205730', blurb: 'Imported leather men’s wallet presented in a gift box.' }),
    P({ name: 'Imported Wallet for Men', cat: 'leather', price: 350, image: IMG + '73e22a288cde7/73e22a288cde72112d8016c176ff/73e22a288cde7_21_58.jpg?v=1771211612957', blurb: 'Durable imported men’s wallet with multiple card slots.' }),
    P({ name: 'Men’s Wallet + Belt Combo', cat: 'leather', price: 620, badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde748da845ec739dc7/73e22a288cde7_48_119.jpg?v=1774368748862', blurb: 'Matching men’s wallet and belt gift combo.' }),
    P({ name: 'Premium Leather Men’s Wallet (With Box)', cat: 'leather', price: 320, badge: 'Premium', image: IMG + '73e22a288cde7/73e22a288cde736e6ebb1405bcbf/73e22a288cde7_36_97.jpg?v=1773412220911', blurb: 'Premium leather men’s wallet in a gift box.' }),
    P({ name: 'Couple Combo 0.1 (Wallet + Clutch)', cat: 'leather', price: 550, badge: 'Combo', image: IMG + '73e22a288cde7/73e22a288cde75270aaa2706c278/73e22a288cde7_52_127.jpg?v=1774159281727', blurb: 'His wallet and her clutch — a perfect couple combo.' }),

    /* ---------- LED & MAGIC GIFTS ---------- */
    P({ name: 'Photo Night Lamp', cat: 'led', price: 250, bestseller: true, badge: 'Trending', image: IMG + '73e22a288cde7/73e22a288cde7726d51142e4458/73e22a288cde7_72_175.jpg?v=1776444556117', blurb: 'Warm LED night lamp printed with your photo.' }),
    P({ name: 'Magic Mirror Inner Colour', cat: 'led', price: 349, image: IMG + '73e22a288cde7/73e22a288cde754ab9156fd0fbf/73e22a288cde7_5_17.jpg?v=1771070377851', blurb: 'Magic mirror with a glossy inner colour that reveals your photo.' }),
    P({ name: 'Magic Photo Mirror (Red)', cat: 'led', price: 450, image: IMG + '73e22a288cde7/73e22a288cde718873a10a2aba18/73e22a288cde7_18_51.jpg?v=1771168708414', blurb: 'Red magic photo mirror that lights up to show your picture.' }),
    P({ name: 'Magic Photo Mirror (White)', cat: 'led', price: 480, image: IMG + '73e22a288cde7/73e22a288cde717adc524ef6ed6f/73e22a288cde7_17_47.jpg?v=1771161340435', blurb: 'White magic photo mirror with hidden photo reveal.' }),
    P({ name: 'MS Star Powerbank 10000 mAh', cat: 'led', price: 1500, badge: 'Premium', blurb: '10000mAh powerbank — keep your devices charged on the move.' }),

    /* ---------- COMBOS & HAMPERS ---------- */
    P({ name: '5 in 1 Executive Set', cat: 'combos', price: 1450, badge: 'Premium', image: IMG + '73e22a288cde7/73e22a288cde744b17a2c009569f/73e22a288cde7_44_115.jpg?v=1774101578901', blurb: 'A five-piece executive gifting set for professionals.' }),
    P({ name: '5 in 1 Women Set', cat: 'combos', price: 1599, badge: 'Premium', image: IMG + '73e22a288cde7/73e22a288cde74635d7e28f3c4d7/73e22a288cde7_46_117.jpg?v=1774102002700', blurb: 'A thoughtfully curated five-piece gift set for her.' }),
    P({ name: '5 in 1 Men Set', cat: 'combos', price: 1399, badge: 'Premium', image: IMG + '73e22a288cde7/73e22a288cde745b17a2c0d7c830/73e22a288cde7_45_116.jpg?v=1774368748862', blurb: 'A five-piece premium gifting set curated for him.' }),
    P({ name: 'Combo Gift', cat: 'combos', price: 2130, badge: 'Combo', bestseller: true, blurb: 'A grand combo gift hamper, beautifully wrapped.' }),

    /* ---------- OFFICE & ENGRAVING ---------- */
    P({ name: 'Desktop Organiser — Advocate (W/o Pen)', cat: 'office', price: 499, image: IMG + '73e22a288cde7/73e22a288cde75827af024fc34ff/73e22a288cde7_58_141.jpg?v=1774364379151', blurb: 'Advocate-themed desktop organiser for engraving or UV.' }),
    P({ name: 'Desktop Organiser — CA (W/o Pen)', cat: 'office', price: 499, image: IMG + '73e22a288cde7/73e22a288cde759127b07ec89737/73e22a288cde7_59_142.jpg?v=1774364442821', blurb: 'Chartered-accountant desktop organiser, ready to personalise.' }),
    P({ name: 'Desktop Organiser — Doctor (W/o Pen)', cat: 'office', price: 499, image: IMG + '73e22a288cde7/73e22a288cde75711b873db6ce30/73e22a288cde7_57_145.jpg?v=1774365113539', blurb: 'Doctor-themed desktop organiser for engraving or UV.' }),
    P({ name: 'Stone Rectangle (15 × 20 cm) SH-03', cat: 'office', price: 450, code: 'Sh03', image: IMG + '73e22a288cde7/73e22a288cde76113ac88d2dcf27/73e22a288cde7_61_144.jpg?v=1774364939934', blurb: 'Rectangular photo stone, 15 × 20 cm, for sublimation prints.' }),
    P({ name: 'Stone Square (15 × 15 cm) SH-19', cat: 'office', price: 425, image: IMG + '73e22a288cde7/73e22a288cde7601804859288f67/73e22a288cde7_60_143.jpg?v=1774364736621', blurb: 'Square photo stone, 15 × 15 cm, with your printed image.' }),
    P({ name: 'Stone Square (15 × 15 cm) SH-25', cat: 'office', price: 450, blurb: 'Square photo stone, 15 × 15 cm, ready to personalise.' }),
    P({ name: 'Sublimation Mouse Pad (11 × 23 inch)', cat: 'office', price: 399, image: IMG + '73e22a288cde7/73e22a288cde770377b804dc40b7/73e22a288cde7_70_170.jpg?v=1775134639909', blurb: 'Large 3mm sublimation mouse pad printed with your design.' }),
    P({ name: 'Half Kada — 8 mm (Mix Colour)', cat: 'office', price: 230, image: IMG + '73e22a288cde7/73e22a288cde782e422d5863efcf/73e22a288cde7_82_177.jpg?v=1776962042859', blurb: 'Engravable 8mm half kada in black, golden, rosegold or silver.' }),
    P({ name: 'Mobile Cover', cat: 'office', price: 185, blurb: 'Custom-printed mobile cover with your photo or design.' }),
    P({ name: 'Rotating Mobile Stand', cat: 'office', price: 150, blurb: 'Adjustable rotating mobile stand for desk or bedside.' }),
    P({ name: 'Packaging Bags', cat: 'office', price: 45, personalizable: false, blurb: 'Sturdy gift packaging bags for your purchases.' }),
  ];

  // Read from the LIVE array so Supabase-loaded products resolve correctly.
  function bySlug(id) { return window.PZ_DATA.PRODUCTS.find(p => p.id === id); }
  function inCat(catId) { return window.PZ_DATA.PRODUCTS.filter(p => p.cat === catId); }

  window.PZ_DATA = { CATEGORIES, COLORS, PRODUCTS, bySlug, inCat };
})();
