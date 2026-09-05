// ===== State =====
let laptops = loadLaptops();
let filteredLaptops = [...laptops];
let compareList = [];
let currentFilters = {
  search: '',
  brand: '',
  cpuType: '',
  ram: '',
  displayType: '',
  displaySize: '',
  gpu: ''
};

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  populateFilters();
  attachFilterListeners();
  renderLaptops();
});

// ===== Sidebar =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}

function scrollToLaptops() {
  document.getElementById('laptops').scrollIntoView({ behavior: 'smooth' });
}

function showCompareFromMenu() {
  toggleSidebar();
  if (compareList.length < 2) {
    showToast('Select at least 2 laptops to compare', 'error');
    return;
  }
  openCompare();
}

// ===== Populate Filters =====
function populateFilters() {
  // Brands
  const brands = [...new Set(laptops.map(l => l.brand))].sort();
  const brandSelect = document.querySelector('[data-filter="brand"]');
  brands.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b;
    opt.textContent = b;
    brandSelect.appendChild(opt);
  });

  // RAM from variants
  const rams = getAllVariantValues(laptops, 'ram');
  const ramSelect = document.querySelector('[data-filter="ram"]');
  rams.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    opt.textContent = r;
    ramSelect.appendChild(opt);
  });
}

// ===== Render =====
function renderLaptops() {
  const grid = document.getElementById('laptopsGrid');
  const info = document.getElementById('resultsInfo');
  
  applyFilters();
  
  if (filteredLaptops.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No Results Found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>
    `;
    info.textContent = '0 laptops found';
    return;
  }
  
  info.textContent = `${filteredLaptops.length} laptop${filteredLaptops.length !== 1 ? 's' : ''} found`;
  
  grid.innerHTML = filteredLaptops.map(laptop => {
    const isSelected = compareList.includes(laptop.id);
    const minPrice = Math.min(...laptop.variants.map(v => v.price));
    const variantCount = laptop.variants.length;
    const firstVariant = laptop.variants[0];
    
    return `
      <div class="laptop-card" onclick="openDetail(${laptop.id})">
        <div class="compare-checkbox ${isSelected ? 'active' : ''}" 
             onclick="event.stopPropagation(); toggleCompare(${laptop.id})">
        </div>
        ${variantCount > 1 ? `<div class="variant-badge">${variantCount} configurations</div>` : ''}
        <div class="laptop-image-wrap">
          <img src="${laptop.image}" alt="${laptop.name}" 
               onerror="this.src='https://via.placeholder.com/300x200/f5f5f7/6e6e73?text=Laptop'">
        </div>
        <div class="laptop-info">
          <div class="laptop-brand">${laptop.brand}</div>
          <div class="laptop-name">${laptop.name}</div>
          <div class="laptop-specs">
            <span class="spec-tag">${firstVariant.cpu}</span>
            <span class="spec-tag">${firstVariant.ram}</span>
            <span class="spec-tag">${laptop.displaySize}</span>
          </div>
          <div class="laptop-footer">
            <div class="laptop-price">From $${minPrice.toLocaleString()} <span>USD</span></div>
            <button class="btn-details" onclick="event.stopPropagation(); openDetail(${laptop.id})">
              Details
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== Filters =====
function attachFilterListeners() {
  document.getElementById('searchInput').addEventListener('input', e => {
    currentFilters.search = e.target.value.toLowerCase();
    renderLaptops();
  });
  
  document.querySelectorAll('.filter-select').forEach(select => {
    select.addEventListener('change', e => {
      const key = e.target.dataset.filter;
      currentFilters[key] = e.target.value;
      renderLaptops();
    });
  });
}

function applyFilters() {
  filteredLaptops = laptops.filter(l => {
    // Search
    if (currentFilters.search) {
      const s = currentFilters.search;
      const searchable = `${l.name} ${l.brand} ${l.description} ${l.variants.map(v => v.cpu).join(' ')}`.toLowerCase();
      if (!searchable.includes(s)) return false;
    }
    
    // Brand
    if (currentFilters.brand && l.brand !== currentFilters.brand) return false;
    
    // Display
    if (currentFilters.displayType && !l.displayType.toLowerCase().includes(currentFilters.displayType.toLowerCase())) return false;
    if (currentFilters.displaySize && !l.displaySize.startsWith(currentFilters.displaySize)) return false;
    
    // Variant-based filters (must have at least one matching variant)
    if (currentFilters.cpuType) {
      const hasMatch = l.variants.some(v => v.cpuType === currentFilters.cpuType);
      if (!hasMatch) return false;
    }
    
    if (currentFilters.ram) {
      const hasMatch = l.variants.some(v => v.ram === currentFilters.ram);
      if (!hasMatch) return false;
    }
    
    if (currentFilters.gpu) {
      const hasMatch = l.variants.some(v => v.gpu.toLowerCase().includes(currentFilters.gpu.toLowerCase()));
      if (!hasMatch) return false;
    }
    
    return true;
  });
}

function resetFilters() {
  currentFilters = { search: '', brand: '', cpuType: '', ram: '', displayType: '', displaySize: '', gpu: '' };
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('.filter-select').forEach(s => s.value = '');
  renderLaptops();
}

// ===== Detail Modal =====
function openDetail(id) {
  const laptop = laptops.find(l => l.id === id);
  if (!laptop) return;
  
  const content = document.getElementById('detailContent');
  
  // Generate variant options HTML
  const variantOptionsHtml = laptop.variants.map((v, idx) => `
    <button class="variant-option ${idx === 0 ? 'active' : ''}" 
            onclick="selectVariant(${laptop.id}, ${idx}, this)">
      <div class="variant-option-name">${v.cpu}</div>
      <div class="variant-option-specs">${v.ram} • ${v.storage} • ${v.gpu}</div>
      <div class="variant-option-price">$${v.price.toLocaleString()}</div>
    </button>
  `).join('');
  
  content.innerHTML = `
    <div class="modal-header">
      <img src="${laptop.image}" alt="${laptop.name}"
           onerror="this.src='https://via.placeholder.com/400x250/f5f5f7/6e6e73?text=Laptop'">
      <div class="brand">${laptop.brand}</div>
      <h2>${laptop.name}</h2>
    </div>
    <div class="modal-body">
      ${laptop.variants.length > 1 ? `
        <div class="variant-selector">
          <div class="variant-selector-title">Choose Configuration</div>
          <div class="variant-options" id="variantOptions">
            ${variantOptionsHtml}
          </div>
        </div>
      ` : ''}
      
      <div class="specs-grid" id="specsGrid">
        ${renderSpecsGrid(laptop, 0)}
      </div>
      
      <div class="description">${laptop.description}</div>
    </div>
  `;
  
  document.getElementById('detailModal').classList.add('active');
}

function renderSpecsGrid(laptop, variantIdx) {
  const v = laptop.variants[variantIdx];
  return `
    <div class="spec-item">
      <div class="spec-label">Processor</div>
      <div class="spec-value">${v.cpu}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">Graphics</div>
      <div class="spec-value">${v.gpu}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">RAM</div>
      <div class="spec-value">${v.ram}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">Storage</div>
      <div class="spec-value">${v.storage}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">Display Size</div>
      <div class="spec-value">${laptop.displaySize}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">Display Type</div>
      <div class="spec-value">${laptop.displayType}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">Resolution</div>
      <div class="spec-value">${laptop.resolution}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">Battery</div>
      <div class="spec-value">${laptop.battery}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">Weight</div>
      <div class="spec-value">${laptop.weight}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">Operating System</div>
      <div class="spec-value">${laptop.os}</div>
    </div>
    <div class="spec-item" style="grid-column: 1 / -1;">
      <div class="spec-label">Ports</div>
      <div class="spec-value">${laptop.ports}</div>
    </div>
    <div class="spec-item" style="grid-column: 1 / -1;">
      <div class="spec-label">Price</div>
      <div class="spec-value" style="font-size: 22px; color: var(--primary);">$${v.price.toLocaleString()}</div>
    </div>
  `;
}

function selectVariant(laptopId, variantIdx, element) {
  const laptop = laptops.find(l => l.id === laptopId);
  if (!laptop) return;
  
  // Update active state
  document.querySelectorAll('.variant-option').forEach(el => el.classList.remove('active'));
  element.classList.add('active');
  
  // Update specs grid
  document.getElementById('specsGrid').innerHTML = renderSpecsGrid(laptop, variantIdx);
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
  }
});

// ===== Compare =====
function toggleCompare(id) {
  const idx = compareList.indexOf(id);
  if (idx > -1) {
    compareList.splice(idx, 1);
  } else {
    if (compareList.length >= 4) {
      showToast('Maximum 4 laptops can be compared', 'error');
      return;
    }
    compareList.push(id);
  }
  updateCompareBar();
  renderLaptops();
}

function updateCompareBar() {
  const bar = document.getElementById('compareBar');
  document.getElementById('compareCount').textContent = compareList.length;
  if (compareList.length > 0) {
    bar.classList.add('visible');
  } else {
    bar.classList.remove('visible');
  }
}

function clearCompare() {
  compareList = [];
  updateCompareBar();
  renderLaptops();
}

function openCompare() {
  if (compareList.length < 2) {
    showToast('Select at least 2 laptops to compare', 'error');
    return;
  }
  
  const selected = compareList.map(id => laptops.find(l => l.id === id));
  const specs = [
    { label: 'Processor', key: 'cpu' },
    { label: 'Graphics', key: 'gpu' },
    { label: 'RAM', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Display Size', key: 'displaySize', laptopKey: true },
    { label: 'Display Type', key: 'displayType', laptopKey: true },
    { label: 'Resolution', key: 'resolution', laptopKey: true },
    { label: 'Battery', key: 'battery', laptopKey: true },
    { label: 'Weight', key: 'weight', laptopKey: true },
    { label: 'OS', key: 'os', laptopKey: true },
    { label: 'Ports', key: 'ports', laptopKey: true },
    { label: 'Price', key: 'price', format: v => `$${v.toLocaleString()}` }
  ];
  
  const content = document.getElementById('compareContent');
  content.innerHTML = `
    <div style="overflow-x: auto;">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Specifications</th>
            ${selected.map(l => `
              <th>
                <img src="${l.image}" class="compare-img" onerror="this.src='https://via.placeholder.com/80x60/f5f5f7/6e6e73?text=L'">
                <div style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${l.name}</div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          ${specs.map(spec => `
            <tr>
              <td>${spec.label}</td>
              ${selected.map(l => {
                const v = l.variants[0];
                const value = spec.laptopKey ? l[spec.key] : v[spec.key];
                return `<td>${spec.format ? spec.format(value) : value}</td>`;
              }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <p style="margin-top: 16px; font-size: 12px; color: var(--text-tertiary); text-align: center;">
      * Showing base configuration. Open individual laptop details to see all variants.
    </p>
  `;
  
  document.getElementById('compareModal').classList.add('active');
}

// ===== Toast =====
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
    }
