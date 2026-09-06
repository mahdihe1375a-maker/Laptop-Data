// Structured, scalable database with scoring and use-case data
const DEFAULT_LAPTOPS = [
  {
    id: "lenovo-legion-5-16",
    brand: "Lenovo",
    series: "Legion",
    model: "Legion 5 16IRX9",
    slug: "lenovo-legion-5-16",
    releaseYear: 2024,
    category: ["Gaming", "Engineering", "Content Creation"],
    image: "https://p1-lenovo.scene7.com/is/image/lenovo/legion-5-16irx9-01?$product$",
    price: 1499,
    currency: "USD",
    variants: [
      { id: "v1", cpu: "Intel Core i7-14650HX", cpuBrand: "Intel", gpu: "NVIDIA RTX 4060", gpuBrand: "NVIDIA", ram: "16 GB", ramType: "DDR5", storage: "1 TB SSD", displaySize: "16 inch", resolution: "2560 x 1600", refreshRate: "165 Hz", panelType: "IPS", brightness: "350 nits", battery: "80 Wh", batteryLife: "6 hours", weight: "2.4 kg", os: "Windows 11 Home" },
      { id: "v2", cpu: "Intel Core i9-14900HX", cpuBrand: "Intel", gpu: "NVIDIA RTX 4070", gpuBrand: "NVIDIA", ram: "32 GB", ramType: "DDR5", storage: "1 TB SSD", displaySize: "16 inch", resolution: "2560 x 1600", refreshRate: "240 Hz", panelType: "IPS", brightness: "500 nits", battery: "80 Wh", batteryLife: "5 hours", weight: "2.5 kg", os: "Windows 11 Pro" }
    ],
    scores: { overall: 88, value: 90, gaming: 87, battery: 70, display: 85, build: 82 },
    useCases: { gaming: 87, programming: 92, engineering: 88, videoEditing: 84, portability: 65, business: 75 },
    ports: "3x USB-A 3.2, 2x USB-C (Thunderbolt 4), HDMI 2.1, Ethernet, Audio Jack",
    source: "Official Lenovo Specifications",
    lastUpdated: "2024-05"
  },
  {
    id: "macbook-air-15-m3", brand: "Apple", series: "MacBook Air", model: "MacBook Air 15 M3", slug: "macbook-air-15-m3", releaseYear: 2024,
    category: ["Ultrabook", "Student", "Programming", "Business"],
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202402?wid=400", price: 1299, currency: "USD",
    variants: [
      { id: "v1", cpu: "Apple M3", cpuBrand: "Apple", gpu: "Apple M3 10-core GPU", gpuBrand: "Apple", ram: "8 GB", ramType: "Unified Memory", storage: "256 GB SSD", displaySize: "15.3 inch", resolution: "2880 x 1864", refreshRate: "60 Hz", panelType: "Liquid Retina", brightness: "500 nits", battery: "66.5 Wh", batteryLife: "18 hours", weight: "1.51 kg", os: "macOS Sonoma" },
      { id: "v2", cpu: "Apple M3", cpuBrand: "Apple", gpu: "Apple M3 10-core GPU", gpuBrand: "Apple", ram: "16 GB", ramType: "Unified Memory", storage: "512 GB SSD", displaySize: "15.3 inch", resolution: "2880 x 1864", refreshRate: "60 Hz", panelType: "Liquid Retina", brightness: "500 nits", battery: "66.5 Wh", batteryLife: "18 hours", weight: "1.51 kg", os: "macOS Sonoma" }
    ],
    scores: { overall: 91, value: 85, gaming: 60, battery: 95, display: 90, build: 95 },
    useCases: { gaming: 60, programming: 95, engineering: 70, videoEditing: 80, portability: 95, business: 90 }, ports: "2x Thunderbolt / USB 4, MagSafe 3, Headphone Jack", source: "Official Apple Specifications", lastUpdated: "2024-05"
  },
  {
    id: "asus-rog-strix-g16", brand: "ASUS", series: "ROG Strix", model: "ROG Strix G16 (2024)", slug: "asus-rog-strix-g16", releaseYear: 2024,
    category: ["Gaming", "Content Creation"], image: "https://dlcdnwebimgs.asus.com/gain/4F3A2F3B-4B8E-4C5D-9A1F-2E3B4C5D6E7F/w1000", price: 1899, currency: "USD",
    variants: [{ id: "v1", cpu: "Intel Core i9-14900HX", cpuBrand: "Intel", gpu: "NVIDIA RTX 4060", gpuBrand: "NVIDIA", ram: "16 GB", ramType: "DDR5", storage: "1 TB SSD", displaySize: "16 inch", resolution: "2560 x 1600", refreshRate: "240 Hz", panelType: "IPS", brightness: "500 nits", battery: "90 Wh", batteryLife: "7 hours", weight: "2.5 kg", os: "Windows 11 Home" }],
    scores: { overall: 89, value: 82, gaming: 92, battery: 75, display: 90, build: 85 },
    useCases: { gaming: 92, programming: 88, engineering: 85, videoEditing: 88, portability: 60, business: 70 }, ports: "1x Thunderbolt 4, 3x USB-A 3.2, HDMI 2.1, Ethernet, Audio Jack", source: "Official ASUS Specifications", lastUpdated: "2024-05"
  }
];

const AppState = {
  laptops: [],
  favorites: JSON.parse(localStorage.getItem('ld_favorites') || '[]'),
  darkMode: localStorage.getItem('ld_darkMode') || 'system',
  init() {
    const saved = localStorage.getItem('ld_laptops');
    this.laptops = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_LAPTOPS));
    if (!saved) this.save();
    this.applyTheme();
  },
  save() { localStorage.setItem('ld_laptops', JSON.stringify(this.laptops)); },
  toggleFavorite(id) {
    if (this.favorites.includes(id)) this.favorites = this.favorites.filter(fid => fid !== id);
    else this.favorites.push(id);
    localStorage.setItem('ld_favorites', JSON.stringify(this.favorites));
    return this.favorites.includes(id);
  },
  applyTheme() {
    const isDark = this.darkMode === 'dark' || (this.darkMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
};

function ensureScores(laptop) {
  if (!laptop.scores) laptop.scores = { overall: 75, value: 80, gaming: 70, battery: 70, display: 75, build: 75 };
  if (!laptop.useCases) laptop.useCases = { gaming: 70, programming: 80, engineering: 75, videoEditing: 70, portability: 70, business: 75 };
  return laptop;
}

AppState.init();
