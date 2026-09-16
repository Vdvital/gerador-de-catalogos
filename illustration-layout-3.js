(() => {
  function installIllustratedThreeProductStyles() {
    if (document.getElementById('illustratedThreeProductStyles')) return;
    const style = document.createElement('style');
    style.id = 'illustratedThreeProductStyles';
    style.textContent = `
      .illustrated-product-page.illustration-right .product-grid,
      .illustrated-product-page.illustration-left .product-grid{
        grid-template-columns:1fr!important;
        gap:12px!important;
        flex:1;
        min-height:0;
        align-content:start;
      }

      .illustrated-product-page.illustration-right .product-card,
      .illustrated-product-page.illustration-left .product-card{
        min-height:118px!important;
        padding:11px!important;
        display:grid!important;
        grid-template-columns:78px minmax(0,1fr)!important;
        grid-template-rows:auto auto auto 1fr auto!important;
        column-gap:11px!important;
        align-items:start!important;
        border-radius:12px!important;
        background:#fff!important;
        border:1px solid #d8e1e8!important;
        box-shadow:none!important;
      }

      .illustrated-product-page.illustration-right .product-card>img,
      .illustrated-product-page.illustration-right .product-card>.image-placeholder,
      .illustrated-product-page.illustration-left .product-card>img,
      .illustrated-product-page.illustration-left .product-card>.image-placeholder{
        grid-column:1!important;
        grid-row:1/6!important;
        width:78px!important;
        height:78px!important;
        margin:0!important;
        align-self:start!important;
        object-fit:contain!important;
        border-radius:8px!important;
      }

      .illustrated-product-page.illustration-right .product-card>.code,
      .illustrated-product-page.illustration-right .product-card>h4,
      .illustrated-product-page.illustration-right .product-card>p,
      .illustrated-product-page.illustration-right .product-card>.price,
      .illustrated-product-page.illustration-left .product-card>.code,
      .illustrated-product-page.illustration-left .product-card>h4,
      .illustrated-product-page.illustration-left .product-card>p,
      .illustrated-product-page.illustration-left .product-card>.price{
        grid-column:2!important;
      }

      .illustrated-product-page.illustration-right .product-card h4,
      .illustrated-product-page.illustration-left .product-card h4{
        font-size:10px!important;
        margin:3px 0!important;
        line-height:1.2!important;
        font-weight:800!important;
        color:#213547!important;
      }

      .illustrated-product-page.illustration-right .product-card p,
      .illustrated-product-page.illustration-left .product-card p{
        font-size:7px!important;
        margin:0 0 3px!important;
        line-height:1.3!important;
        color:#607080!important;
      }

      .illustrated-product-page.illustration-right .product-card .code,
      .illustrated-product-page.illustration-left .product-card .code{
        font-size:7px!important;
        color:#8a99a8!important;
      }

      .illustrated-product-page.illustration-right .product-card .price,
      .illustrated-product-page.illustration-left .product-card .price{
        font-size:11px!important;
        margin-top:4px!important;
        font-weight:800!important;
      }

      .illustrated-product-page.illustration-right .illustration-content{
        width:calc(100% - var(--illustration-width))!important;
        padding:22px 16px 18px 20px!important;
        margin-right:auto!important;
      }

      .illustrated-product-page.illustration-left .illustration-content{
        width:calc(100% - var(--illustration-width))!important;
        padding:22px 20px 18px 16px!important;
        margin-left:var(--illustration-width)!important;
      }
    `;
    document.head.appendChild(style);
  }

  const originalRenderPreview = renderPreview;

  renderPreview = function () {
    const c = config();
    const root = $('#catalogPreview');
    root.style.setProperty('--catalog-primary', c.primary);
    root.style.setProperty('--catalog-accent', c.accent);

    let pages = [`<section class="a4-page cover-page">${state.coverImage ? `<img class="cover-bg" src="${state.coverImage}" alt="Imagem da capa"><span class="cover-overlay"></span>` : ''}<small>${escapeHtml(c.company).toUpperCase()}</small>${logoMarkup(true)}<h2>${escapeHtml(c.title)}</h2><p>${escapeHtml([c.whatsapp, c.website].filter(Boolean).join('  •  ') || 'Coleção 2026')}</p></section>`];

    const groups = c.group
      ? (Object.groupBy ? Object.groupBy(state.products, p => p.category) : state.products.reduce((a, p) => ((a[p.category] ??= []).push(p), a), {}))
      : { 'Produtos': state.products };

    for (const [category, items] of Object.entries(groups)) {
      const design = state.categoryCovers.get(category) || { color: c.primary, image: null };
      const illustrationActive = state.plan === 'proplus' && design.illustrationEnabled && design.illustrationImage;

      if (c.group && items.length) {
        pages.push(`<section class="a4-page category-page" style="background:${design.color || c.primary}">${state.plan === 'proplus' && design.image ? `<img class="category-bg" src="${design.image}" alt="Capa ${escapeHtml(category)}"><span class="category-overlay"></span>` : ''}${logoMarkup()}<small>CATEGORIA</small><h2>${escapeHtml(category)}</h2></section>`);
      }

      const pageSize = illustrationActive ? 3 : c.perPage;

      for (let i = 0; i < items.length; i += pageSize) {
        const chunk = items.slice(i, i + pageSize);
        const pageNumber = pages.length + 1;
        const cols = c.perPage === 1 ? 1 : 2;

        if (!illustrationActive) {
          pages.push(`<section class="a4-page">${logoMarkup()}<header class="page-header"><h3>${escapeHtml(category)}</h3><small>${escapeHtml(c.company)}</small></header><div class="product-grid" style="--catalog-cols:${cols}">${chunk.map(p => productCard(p, c)).join('')}</div><footer class="page-footer"><span>${escapeHtml(c.website || c.company)}</span><span>${pageNumber}</span></footer></section>`);
          continue;
        }

        const position = ['right', 'left', 'background'].includes(design.illustrationPosition) ? design.illustrationPosition : 'right';
        const width = Math.max(35, Math.min(65, Number(design.illustrationWidth) || 48));
        const opacity = Math.max(20, Math.min(100, Number(design.illustrationOpacity) || 100)) / 100;
        const pageStyle = `--illustration-width:${width}%;--illustration-opacity:${opacity}`;

        pages.push(`<section class="a4-page illustrated-product-page illustration-${position}" style="${pageStyle}"><img class="page-illustration" src="${design.illustrationImage}" alt="Imagem ilustrativa de ${escapeHtml(category)}">${logoMarkup()}<div class="illustration-content"><header class="page-header"><h3>${escapeHtml(category)}</h3><small>${escapeHtml(c.company)}</small></header><div class="product-grid" style="--catalog-cols:1">${chunk.map(p => productCard(p, c)).join('')}</div><footer class="page-footer"><span>${escapeHtml(c.website || c.company)}</span><span>${pageNumber}</span></footer></div></section>`);
      }
    }

    root.innerHTML = pages.join('');
    $('#previewPages').textContent = `${pages.length} página${pages.length === 1 ? '' : 's'}`;
    enableLogoDrag();
  };

  installIllustratedThreeProductStyles();
  renderPreview();
})();
