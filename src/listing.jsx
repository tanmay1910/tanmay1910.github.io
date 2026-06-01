/* PRINTZIN — Listing + Search pages */

const SORTS = [
  { id: 'pop', label: 'Popularity' },
  { id: 'low', label: 'Price: Low to High' },
  { id: 'high', label: 'Price: High to Low' },
  { id: 'rate', label: 'Top rated' },
  { id: 'disc', label: 'Discount' },
];

function applySort(list, sort) {
  const a = [...list];
  if (sort === 'low') a.sort((x,y) => x.price - y.price);
  else if (sort === 'high') a.sort((x,y) => y.price - x.price);
  else if (sort === 'rate') a.sort((x,y) => y.rating - x.rating);
  else if (sort === 'disc') a.sort((x,y) => y.off - x.off);
  else a.sort((x,y) => (y.bestseller?1:0)-(x.bestseller?1:0) || y.reviews - x.reviews);
  return a;
}

const PRICE_BANDS = [
  { id: 'b1', label: 'Under ₹300', test: p => p.price < 300 },
  { id: 'b2', label: '₹300 – ₹600', test: p => p.price >= 300 && p.price <= 600 },
  { id: 'b3', label: '₹600 – ₹1000', test: p => p.price > 600 && p.price <= 1000 },
  { id: 'b4', label: '₹1000 – ₹2000', test: p => p.price > 1000 && p.price <= 2000 },
  { id: 'b5', label: 'Above ₹2000', test: p => p.price > 2000 },
];

const FilterPanel = ({ cat, setCat, bands, toggleBand, colorSel, toggleColor, persOnly, setPersOnly, minRate, setMinRate, clearAll }) => {
  const { CATEGORIES, COLORS } = window.PZ_DATA;
  return (
    <aside className="pz-filters">
      <div className="pz-filter-head">
        <h3><Icon name="filter" size={18} /> Filters</h3>
        <button onClick={clearAll}>Clear all</button>
      </div>

      <div className="pz-filter-grp">
        <h4>Category</h4>
        <label className="pz-radio">
          <input type="radio" checked={!cat} onChange={() => setCat(null)} /><span>All gifts</span>
        </label>
        {CATEGORIES.map(c => (
          <label className="pz-radio" key={c.id}>
            <input type="radio" checked={cat === c.id} onChange={() => setCat(c.id)} /><span>{c.name}</span>
          </label>
        ))}
      </div>

      <div className="pz-filter-grp">
        <h4>Price</h4>
        {PRICE_BANDS.map(b => (
          <label className="pz-check" key={b.id}>
            <input type="checkbox" checked={bands.includes(b.id)} onChange={() => toggleBand(b.id)} />
            <span className="pz-box"><Icon name="check" size={12} stroke={3} /></span>{b.label}
          </label>
        ))}
      </div>

      <div className="pz-filter-grp">
        <h4>Print colour</h4>
        <div className="pz-swatches">
          {COLORS.map(c => (
            <button key={c.id} className={'pz-swatch' + (colorSel.includes(c.id) ? ' on' : '')}
              onClick={() => toggleColor(c.id)} title={c.name} style={{ '--sw': c.hex }}>
              <span style={{ background: c.hex }} />
            </button>
          ))}
        </div>
      </div>

      <div className="pz-filter-grp">
        <h4>Rating</h4>
        {[4.5, 4, 3.5].map(r => (
          <label className="pz-radio" key={r}>
            <input type="radio" checked={minRate === r} onChange={() => setMinRate(minRate === r ? 0 : r)} />
            <span><Icon name="star" size={13} style={{fill:'var(--star)',stroke:'var(--star)'}}/> {r} &amp; up</span>
          </label>
        ))}
      </div>

      <div className="pz-filter-grp">
        <label className="pz-check">
          <input type="checkbox" checked={persOnly} onChange={() => setPersOnly(!persOnly)} />
          <span className="pz-box"><Icon name="check" size={12} stroke={3} /></span>Personalisable only
        </label>
      </div>
    </aside>
  );
};

const ResultsGrid = ({ list }) => {
  if (list.length === 0) return (
    <div className="pz-empty">
      <span className="pz-empty-ic"><Icon name="search" size={32} /></span>
      <h3>No gifts match those filters</h3>
      <p>Try removing a filter or two to see more.</p>
    </div>
  );
  return <div className="pz-grid pz-grid-shop">{list.map(p => <ProductCard key={p.id} product={p} />)}</div>;
};

const ShopPage = ({ mode }) => {
  const { view, nav, query } = usePZ();
  const { CATEGORIES, PRODUCTS } = window.PZ_DATA;
  const isSearch = mode === 'search';

  const [cat, setCat] = React.useState(view.params?.cat || null);
  const [bands, setBands] = React.useState([]);
  const [colorSel, setColorSel] = React.useState([]);
  const [persOnly, setPersOnly] = React.useState(false);
  const [minRate, setMinRate] = React.useState(0);
  const [sort, setSort] = React.useState('pop');
  const [sortOpen, setSortOpen] = React.useState(false);

  React.useEffect(() => { setCat(view.params?.cat || null); }, [view.params?.cat]);

  const toggleBand = (id) => setBands(b => b.includes(id) ? b.filter(x=>x!==id) : [...b, id]);
  const toggleColor = (id) => setColorSel(c => c.includes(id) ? c.filter(x=>x!==id) : [...c, id]);
  const clearAll = () => { setBands([]); setColorSel([]); setPersOnly(false); setMinRate(0); if (!isSearch) setCat(null); };

  const q = (isSearch ? (view.params?.q || query || '') : '').trim().toLowerCase();

  let list = PRODUCTS.filter(p => {
    if (cat && p.cat !== cat) return false;
    if (q) {
      const catName = (CATEGORIES.find(c=>c.id===p.cat)||{}).name || '';
      if (!(p.name + ' ' + catName + ' ' + (p.blurb||'')).toLowerCase().includes(q)) return false;
    }
    if (bands.length && !bands.some(id => PRICE_BANDS.find(b=>b.id===id).test(p))) return false;
    if (colorSel.length && !colorSel.some(c => (p.colors||[]).includes(c))) return false;
    if (persOnly && !p.personalizable) return false;
    if (minRate && p.rating < minRate) return false;
    return true;
  });
  list = applySort(list, sort);

  const catObj = CATEGORIES.find(c => c.id === cat);
  const heading = isSearch ? `Results for “${view.params?.q || ''}”` : (catObj ? catObj.name : 'All Gifts');
  const sub = isSearch ? `${list.length} gift${list.length!==1?'s':''} found` : (catObj ? catObj.tag : 'Every personalised gift in the studio');

  return (
    <div className="wrap pz-shop fade-in">
      <div className="pz-crumb">
        <button onClick={() => nav('home')}>Home</button><Icon name="chevron" size={13} />
        <span>{isSearch ? 'Search' : (catObj ? catObj.name : 'All gifts')}</span>
      </div>

      {!isSearch && catObj && (
        <div className="pz-cat-banner" style={{ background: catObj.tint }}>
          <div>
            <span className="eyebrow" style={{ color: catObj.accent }}>{catObj.tag}</span>
            <h1>{catObj.name}</h1>
            <p>Upload your photo, add a message — we print &amp; deliver across India.</p>
          </div>
          <ProductGlyph type={catObj.icon} size={120} color={catObj.accent} />
        </div>
      )}

      <div className="pz-shop-head">
        <div>
          <h2 className="pz-shop-title">{heading}</h2>
          <span className="pz-shop-sub">{sub}</span>
        </div>
        <div className="pz-sort">
          <button className="pz-sort-btn" onClick={() => setSortOpen(o=>!o)}>
            Sort: <strong>{SORTS.find(s=>s.id===sort).label}</strong> <Icon name="chevronDown" size={15} />
          </button>
          {sortOpen && (
            <div className="pz-sort-menu" onMouseLeave={()=>setSortOpen(false)}>
              {SORTS.map(s => (
                <button key={s.id} className={s.id===sort?'on':''} onClick={() => { setSort(s.id); setSortOpen(false); }}>
                  {s.label}{s.id===sort && <Icon name="check" size={15} stroke={3} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pz-shop-body">
        <FilterPanel {...{ cat: isSearch?cat:cat, setCat: isSearch?setCat:(c)=>{ setCat(c); if(c) nav('listing',{cat:c}); }, bands, toggleBand, colorSel, toggleColor, persOnly, setPersOnly, minRate, setMinRate, clearAll }} />
        <div className="pz-shop-main">
          <div className="pz-resultbar"><span>{list.length} gift{list.length!==1?'s':''}</span></div>
          <ResultsGrid list={list} />
        </div>
      </div>
    </div>
  );
};
window.ShopPage = ShopPage;
