(() => {
  const defaults = {
    illustrationImage: null,
    illustrationEnabled: false,
    illustrationPosition: 'right',
    illustrationWidth: 48,
    illustrationOpacity: 100
  };

  function ensureCategoryDesign(category) {
    if (!state.categoryCovers.has(category)) {
      state.categoryCovers.set(category, { color: $('#primaryColor').value, image: null });
    }
    const design = state.categoryCovers.get(category);
    for (const [key, value] of Object.entries(defaults)) {
      if (typeof design[key] === 'undefined') design[key] = value;
    }
    return design;
  }

  function installIllustrationStyles() {
    if ($('#illustrationEditorStyles')) return;
    const style = document.createElement('style');
    style.id = 'illustrationEditorStyles';
    style.textContent = `
      .category-cover-row.illustration-editor-row{display:block!important;padding:14px!important}
      .category-row-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px}
      .category-row-head>div{display:grid;gap:3px}.category-row-head strong{font-size:11px!important}.category-row-head small{font-size:8px;color:#7c8d9b}
      .illustration-status{font-size:8px;font-weight:800;padding:5px 7px;border-radius:999px;background:#edf2f6;color:#758592;white-space:nowrap}
      .illustration-status.on{background:#e7f7ef;color:#16845e}
      .category-basic-controls{display:grid;grid-template-columns:90px 1fr;gap:10px;align-items:end;padding-bottom:12px;border-bottom:1px solid #e4ebf0}
      .category-basic-controls label,.illustration-panel label{display:grid!important;gap:6px!important;font-size:9px!important;color:#4b5e6f!important;font-weight:700!important}
      .category-basic-controls input[type=file],.illustration-panel input[type=file],.illustration-panel select{width:100%;font-size:9px!important;padding:8px!important;border:1px solid #dbe5ed;border-radius:8px;background:#fff}
      .illustration-panel{margin-top:12px;padding:12px;border-radius:10px;background:#f7f9fb;border:1px solid #e1e8ee;display:grid;gap:11px}
      .illustration-toggle{display:flex!important;grid-template-columns:17px 1fr!important;align-items:center!important;gap:8px!important;color:#24394b!important}
      .illustration-toggle input{width:16px!important;height:16px!important;accent-color:var(--accent)}
      .illustration-controls-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .illustration-controls-grid .wide{grid-column:1/-1}
      .range-head{display:flex;justify-content:space-between;align-items:center;gap:8px}
      .range-value{font-size:8px;font-weight:800;color:#0c78c8;background:#e9f4fe;padding:3px 6px;border-radius:5px}
      .illustration-panel input[type=range]{width:100%;accent-color:var(--accent);padding:0!important;border:0!important;background:transparent!important}
      .illustration-preview-line{display:flex;align-items:center;gap:10px;min-height:50px}
      .illustration-thumb{width:72px;height:48px;border-radius:7px;object-fit:cover;border:1px solid #d8e2e9;background:#eef3f6}
      .illustration-empty{width:72px;height:48px;border-radius:7px;border:1px dashed #c6d3dc;display:grid;place-items:center;font-size:7px;color:#8595a1;text-align:center;padding:5px;background:#fff}
      .illustration-remove{border:1px solid #d8e1e8;background:#fff;color:#6e7e8b;border-radius:7px;padding:7px 9px;font:700 8px Inter;cursor:pointer}
      .illustration-remove:disabled{opacity:.45;cursor:not-allowed}
      .illustration-help{font-size:8px;color:#7c8d9b;line-height:1.45}

      .illustrated-product-page{padding:0!important;position:relative;overflow:hidden;background:#fff}
      .illustrated-product-page .page-illustration{position:absolute;z-index:0;object-fit:cover;opacity:var(--illustration-opacity,1)}
      .illustrated-product-page .illustration-content{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;background:#fff}
      .illustrated-product-page.illustration-right::before,
      .illustrated-product-page.illustration-left::before,
      .illustrated-product-page.illustration-right::after,
      .illustrated-product-page.illustration-left::after{content:none!important;display:none!important;border:0!important;background:none!important;box-shadow:none!important}
      .illustrated-product-page.illustration-right .page-illustration{right:0;top:0;width:var(--illustration-width);height:100%;border-radius:0 0 0 78px}
      .illustrated-product-page.illustration-left .page-illustration{left:0;top:0;width:var(--illustration-width);height:100%;border-radius:0 0 78px 0}
      .illustrated-product-page.illustration-right .illustration-content{width:calc(100% - var(--illustration-width));padding:24px 14px 18px 22px;margin-right:auto}
      .illustrated-product-page.illustration-left .illustration-content{width:calc(100% - var(--illustration-width));padding:24px 22px 18px 14px;margin-left:var(--illustration-width)}
      .illustrated-product-page.illustration-right .page-header,.illustrated-product-page.illustration-left .page-header{margin-bottom:9px;padding-bottom:7px;position:relative;z-index:5;border-bottom:0!important;box-shadow:none!important}
      .illustrated-product-page.illustration-right .page-header::before,.illustrated-product-page.illustration-right .page-header::after,.illustrated-product-page.illustration-left .page-header::before,.illustrated-product-page.illustration-left .page-header::after{content:none!important;display:none!important;border:0!important;background:none!important}
      .illustrated-product-page.illustration-right .page-header h3,.illustrated-product-page.illustration-left .page-header h3{font-size:17px;line-height:1.05}
      .illustrated-product-page.illustration-right .page-header small,.illustrated-product-page.illustration-left .page-header small{display:none}
      .illustrated-product-page.illustration-right .product-grid,.illustrated-product-page.illustration-left .product-grid{grid-template-columns:1fr!important;gap:6px;flex:1;min-height:0}
      .illustrated-product-page.illustration-right .product-card,.illustrated-product-page.illustration-left .product-card{min-height:0;padding:6px;display:grid;grid-template-columns:56px minmax(0,1fr);grid-template-rows:auto auto auto 1fr auto;column-gap:7px;align-items:start;border-radius:7px;background:#fff}
      .illustrated-product-page.illustration-right .product-card>img,.illustrated-product-page.illustration-right .product-card>.image-placeholder,.illustrated-product-page.illustration-left .product-card>img,.illustrated-product-page.illustration-left .product-card>.image-placeholder{grid-column:1;grid-row:1/6;width:56px;height:56px;margin:0;align-self:center}
      .illustrated-product-page.illustration-right .product-card>.code,.illustrated-product-page.illustration-right .product-card>h4,.illustrated-product-page.illustration-right .product-card>p,.illustrated-product-page.illustration-right .product-card>.price,.illustrated-product-page.illustration-left .product-card>.code,.illustrated-product-page.illustration-left .product-card>h4,.illustrated-product-page.illustration-left .product-card>p,.illustrated-product-page.illustration-left .product-card>.price{grid-column:2}
      .illustrated-product-page.illustration-right .product-card h4,.illustrated-product-page.illustration-left .product-card h4{font-size:8px;margin:2px 0 2px;line-height:1.2}
      .illustrated-product-page.illustration-right .product-card p,.illustrated-product-page.illustration-left .product-card p{font-size:6px;margin:0 0 2px;line-height:1.25}
      .illustrated-product-page.illustration-right .product-card .code,.illustrated-product-page.illustration-left .product-card .code{font-size:6px}
      .illustrated-product-page.illustration-right .product-card .price,.illustrated-product-page.illustration-left .product-card .price{font-size:9px;margin-top:2px}
      .illustrated-product-page.illustration-right .page-footer,.illustrated-product-page.illustration-left .page-footer{padding-top:5px;font-size:6px}
      .illustrated-product-page.illustration-right .catalog-logo,.illustrated-product-page.illustration-left .catalog-logo{z-index:9}

      .illustrated-product-page.illustration-background .page-illustration{inset:0;width:100%;height:100%}
      .illustrated-product-page.illustration-background:after{content:"";position:absolute;inset:0;z-index:1;background:rgba(255,255,255,.58);pointer-events:none}
      .illustrated-product-page.illustration-background .illustration-content{width:100%;padding:26px;background:transparent;z-index:2}
      .illustrated-product-page.illustration-background .product-card{background:rgba(255,255,255,.92);backdrop-filter:blur(2px)}
      .illustrated-product-page.illustration-background .page-header{background:rgba(255,255,255,.72);padding:9px 10px;border-radius:8px;border-bottom:0!important;margin-bottom:12px}
      .illustrated-product-page.illustration-background .page-footer{color:#526473;font-weight:700}

      @media(max-width:760px){
        .category-basic-controls,.illustration-controls-grid{grid-template-columns:1fr}
        .illustration-controls-grid .wide{grid-column:auto}
      }
    `;
    document.head.appendChild(style);
  }

  renderCategoryCoverEditor = function () {
    const root = $('#categoryCoverList');
    if (!root) return;
    const categories = [...new Set(state.products.map(p => p.category))];
    if (!categories.length) {
      root.innerHTML = '<div class="status-box">Importe uma planilha para visualizar as categorias.</div>';
      return;
    }

    root.innerHTML = categories.map(category => {
      const design = ensureCategoryDesign(category);
      const enabled = design.illustrationEnabled && design.illustrationImage;
      return `
        <div class="category-cover-row illustration-editor-row" data-category="${escapeHtml(category)}">
          <div class="category-row-head">
            <div><strong>${escapeHtml(category)}</strong><small>Personalize a capa e as páginas de produtos desta categoria.</small></div>
            <span class="illustration-status ${enabled ? 'on' : ''}">${enabled ? 'ILUSTRAÇÃO ATIVA' : 'SEM ILUSTRAÇÃO'}</span>
          </div>
          <div class="category-basic-controls">
            <label>Cor da capa<input class="category-color" type="color" value="${design.color}"></label>
            ${state.plan === 'proplus' ? `<label>Imagem da capa da categoria<input class="category-image" type="file" accept="image/png,image/jpeg,image/webp"></label>` : '<span class="locked">Imagem de capa disponível no Pro Plus</span>'}
          </div>
          <div class="illustration-panel">
            <label class="illustration-toggle"><input class="illustration-enabled" type="checkbox" ${design.illustrationEnabled ? 'checked' : ''} ${state.plan !== 'proplus' ? 'disabled' : ''}> Usar imagem ilustrativa nas páginas de produtos</label>
            ${state.plan === 'proplus' ? `
              <label>Imagem ilustrativa<input class="illustration-image" type="file" accept="image/png,image/jpeg,image/webp"></label>
              <div class="illustration-controls-grid">
                <label>Posição
                  <select class="illustration-position">
                    <option value="right" ${design.illustrationPosition === 'right' ? 'selected' : ''}>Direita — como a referência</option>
                    <option value="left" ${design.illustrationPosition === 'left' ? 'selected' : ''}>Esquerda</option>
                    <option value="background" ${design.illustrationPosition === 'background' ? 'selected' : ''}>Fundo inteiro</option>
                  </select>
                </label>
                <label class="wide"><span class="range-head"><span>Largura da imagem</span><span class="range-value illustration-width-value">${design.illustrationWidth}%</span></span><input class="illustration-width" type="range" min="35" max="65" step="1" value="${design.illustrationWidth}"></label>
                <label class="wide"><span class="range-head"><span>Opacidade</span><span class="range-value illustration-opacity-value">${design.illustrationOpacity}%</span></span><input class="illustration-opacity" type="range" min="20" max="100" step="5" value="${design.illustrationOpacity}"></label>
              </div>
              <div class="illustration-preview-line">
                ${design.illustrationImage ? `<img class="illustration-thumb" src="${design.illustrationImage}" alt="Imagem ilustrativa de ${escapeHtml(category)}">` : '<span class="illustration-empty">Nenhuma imagem selecionada</span>'}
                <button class="illustration-remove" type="button" ${design.illustrationImage ? '' : 'disabled'}>Remover imagem</button>
              </div>
              <span class="illustration-help">No modo lateral, os produtos ficam em uma coluna compacta e a foto ocupa a lateral da página. O PDF usa exatamente a mesma composição da prévia.</span>
            ` : '<span class="locked">Imagem ilustrativa disponível no Pro Plus.</span>'}
          </div>
        </div>`;
    }).join('');

    $$('.illustration-editor-row').forEach(row => {
      const category = row.dataset.category;
      const design = ensureCategoryDesign(category);

      row.querySelector('.category-color').oninput = e => {
        design.color = e.target.value;
        renderPreview();
      };

      const categoryImage = row.querySelector('.category-image');
      if (categoryImage) categoryImage.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        design.image = URL.createObjectURL(file);
        renderPreview();
        toast(`Capa de ${category} atualizada`);
      };

      const enabled = row.querySelector('.illustration-enabled');
      if (enabled) enabled.onchange = e => {
        if (e.target.checked && !design.illustrationImage) {
          e.target.checked = false;
          toast('Selecione primeiro uma imagem ilustrativa');
          return;
        }
        design.illustrationEnabled = e.target.checked;
        renderCategoryCoverEditor();
        renderPreview();
      };

      const imageInput = row.querySelector('.illustration-image');
      if (imageInput) imageInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        if (design.illustrationImage && String(design.illustrationImage).startsWith('blob:')) URL.revokeObjectURL(design.illustrationImage);
        design.illustrationImage = URL.createObjectURL(file);
        design.illustrationEnabled = true;
        renderCategoryCoverEditor();
        renderPreview();
        toast(`Imagem ilustrativa de ${category} adicionada`);
      };

      const position = row.querySelector('.illustration-position');
      if (position) position.onchange = e => {
        design.illustrationPosition = e.target.value;
        renderPreview();
      };

      const width = row.querySelector('.illustration-width');
      if (width) width.oninput = e => {
        design.illustrationWidth = Number(e.target.value);
        row.querySelector('.illustration-width-value').textContent = `${design.illustrationWidth}%`;
        renderPreview();
      };

      const opacity = row.querySelector('.illustration-opacity');
      if (opacity) opacity.oninput = e => {
        design.illustrationOpacity = Number(e.target.value);
        row.querySelector('.illustration-opacity-value').textContent = `${design.illustrationOpacity}%`;
        renderPreview();
      };

      const remove = row.querySelector('.illustration-remove');
      if (remove) remove.onclick = () => {
        if (design.illustrationImage && String(design.illustrationImage).startsWith('blob:')) URL.revokeObjectURL(design.illustrationImage);
        design.illustrationImage = null;
        design.illustrationEnabled = false;
        renderCategoryCoverEditor();
        renderPreview();
        toast(`Imagem ilustrativa de ${category} removida`);
      };
    });
  };

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
      const design = ensureCategoryDesign(category);

      if (c.group && items.length) {
        pages.push(`<section class="a4-page category-page" style="background:${design.color}">${state.plan === 'proplus' && design.image ? `<img class="category-bg" src="${design.image}" alt="Capa ${escapeHtml(category)}"><span class="category-overlay"></span>` : ''}${logoMarkup()}<small>CATEGORIA</small><h2>${escapeHtml(category)}</h2></section>`);
      }

      for (let i = 0; i < items.length; i += c.perPage) {
        const chunk = items.slice(i, i + c.perPage);
        const cols = c.perPage === 1 ? 1 : 2;
        const pageNumber = pages.length + 1;
        const illustrationActive = state.plan === 'proplus' && design.illustrationEnabled && design.illustrationImage;

        if (!illustrationActive) {
          pages.push(`<section class="a4-page">${logoMarkup()}<header class="page-header"><h3>${escapeHtml(category)}</h3><small>${escapeHtml(c.company)}</small></header><div class="product-grid" style="--catalog-cols:${cols}">${chunk.map(p => productCard(p, c)).join('')}</div><footer class="page-footer"><span>${escapeHtml(c.website || c.company)}</span><span>${pageNumber}</span></footer></section>`);
          continue;
        }

        const position = ['right', 'left', 'background'].includes(design.illustrationPosition) ? design.illustrationPosition : 'right';
        const width = Math.max(35, Math.min(65, Number(design.illustrationWidth) || 48));
        const opacity = Math.max(20, Math.min(100, Number(design.illustrationOpacity) || 100)) / 100;
        const style = `--illustration-width:${width}%;--illustration-opacity:${opacity}`;

        pages.push(`<section class="a4-page illustrated-product-page illustration-${position}" style="${style}"><img class="page-illustration" src="${design.illustrationImage}" alt="Imagem ilustrativa de ${escapeHtml(category)}">${logoMarkup()}<div class="illustration-content"><header class="page-header"><h3>${escapeHtml(category)}</h3><small>${escapeHtml(c.company)}</small></header><div class="product-grid" style="--catalog-cols:${cols}">${chunk.map(p => productCard(p, c)).join('')}</div><footer class="page-footer"><span>${escapeHtml(c.website || c.company)}</span><span>${pageNumber}</span></footer></div></section>`);
      }
    }

    root.innerHTML = pages.join('');
    $('#previewPages').textContent = `${pages.length} página${pages.length === 1 ? '' : 's'}`;
    enableLogoDrag();
  };

  installIllustrationStyles();
  if (state.products.length) renderCategoryCoverEditor();
  renderPreview();

  const layoutScript = document.createElement('script');
  layoutScript.src = 'illustration-layout-3.js?v=20260916-1';
  document.head.appendChild(layoutScript);
})();
