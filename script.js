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
  populateBrandFilter();
  attachFilterListeners();
  renderLaptops();
  document.getElementById('totalLaptops').textContent = laptops.length;
});

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
    return `
      <div class="laptop-card" onclick="openDetail(${laptop.id})">
        <div class="compare-checkbox ${isSelected ? 'active' : ''}" 
             onclick="event.stopPropagation(); toggleCompare(${laptop.id})">
        </div>
        <div class="laptop-image-wrap">
          <img src="${laptop.image}" alt="${laptop.name}" 
               onerror="this.src='https://via.placeholder.com/300x200/f3f4f6/6b7280?text=Laptop'">
        </div>
        <div class="laptop-info">
          <div class="laptop-brand">${laptop.brand}</div>
          <div class="laptop-name">${laptop.name}</div>
          <div class="laptop-specs">
            <span class="spec-tag">${laptop.cpu}</span>
            <span class="spec-tag">${laptop.ram}</span>
            <span class="spec-tag">${laptop.displaySize}</span>
          </div>
          <div class="laptop-footer">
            <div class="laptop-price">$${laptop.price.toLocaleString()} <span>USD</span></div>
            <button class="btn-details" onclick="event.stopPropagation(); openDetail(${laptop.id})">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== Filters =====
function populateBrandFilter() {
  const brands = [...new Set(laptops.map(l => l.brand))].sort();
  const select = document.querySelector('[data-filter="brand"]');
  brands.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b;
    opt.textContent = b;
    select.appendChild(opt);
  });
}

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
    if (currentFilters.search) {
      const s = currentFilters.search;
      const searchable = `${l.name} ${l.brand} ${l.cpu} ${l.description}`.toLowerCase();
      if (!searchable.includes(s)) return false;
    }
    if (currentFilters.brand && l.brand !== currentFilters.brand) return false;
    if (currentFilters.cpuType && l.cpuType !== currentFilters.cpuType) return false;
    if (currentFilters.ram && l.ram !== currentFilters.ram) return false;
    if (currentFilters.displayType && !l.displayType.toLowerCase().includes(currentFilters.displayType.toLowerCase())) return false;
    if (currentFilters.displaySize && !l.displaySize.startsWith(currentFilters.displaySize)) return false;
    if (currentFilters.gpu && !l.gpu.toLowerCase().includes(currentFilters.gpu.toLowerCase())) return false;
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
  content.innerHTML = `
    <div class="modal-header">
      <img src="${laptop.image}" alt="${laptop.name}"
           onerror="this.src='https://via.placeholder.com/400x250/f3f4f6/6b7280?text=Laptop'">
      <div class="brand">${laptop.brand}</div>
      <h2>${laptop.name}</h2>
    </div>
    <div class="modal-body">
      <div class="specs-grid">
        <div class="spec-item">
          <div class="spec-label">Processor</div>
          <div class="spec-value">${laptop.cpu}</div>
        </div>
        <div class="spec-item">
          <div class="spec-label">RAM</div>
          <div class="spec-value">${laptop.ram}</div>
        </div>
        <div class="spec-item">
          <div class="spec-label">Storage</div>
          <div class="spec-value">${laptop.storage}</div>
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
          <div class="spec-label">Graphics</div>
          <div class="spec-value">${laptop.gpu}</div>
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
          <div class="spec-value" style="font-size: 24px; color: var(--primary);">$${laptop.price.toLocaleString()}</div>
        </div>
      </div>
      <div class="description">${laptop.description}</div>
    </div>
  `;
  
  document.getElementById('detailModal').classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// Close on ESC
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
    { label: 'RAM', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Display Size', key: 'displaySize' },
    { label: 'Display Type', key: 'displayType' },
    { label: 'Resolution', key: 'resolution' },
    { label: 'Graphics', key: 'gpu' },
    { label: 'Battery', key: 'battery' },
    { label: 'Weight', key: 'weight' },
    { label: 'OS', key: 'os' },
    { label: 'Ports', key: 'ports' },
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
                <img src="${l.image}" class="compare-img" onerror="this.src='https://via.placeholder.com/100x75/f3f4f6/6b7280?text=L'">
                <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${l.name}</div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          ${specs.map(spec => `
            <tr>
              <td>${spec.label}</td>
              ${selected.map(l => `
                <td>${spec.format ? spec.format(l[spec.key]) : l[spec.key]}</td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
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