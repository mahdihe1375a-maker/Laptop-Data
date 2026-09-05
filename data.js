// Default laptop data with multiple variants per laptop
const DEFAULT_LAPTOPS = [
  {
    id: 1,
    name: "MacBook Pro 16",
    brand: "Apple",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=400",
    variants: [
      { cpu: "Apple M3 Pro", cpuType: "Apple Silicon", gpu: "16-core GPU", ram: "18 GB", storage: "512 GB SSD", price: 2499 },
      { cpu: "Apple M3 Pro", cpuType: "Apple Silicon", gpu: "18-core GPU", ram: "36 GB", storage: "1 TB SSD", price: 3499 },
      { cpu: "Apple M3 Max", cpuType: "Apple Silicon", gpu: "30-core GPU", ram: "36 GB", storage: "1 TB SSD", price: 3999 },
      { cpu: "Apple M3 Max", cpuType: "Apple Silicon", gpu: "40-core GPU", ram: "128 GB", storage: "8 TB SSD", price: 7199 }
    ],
    displaySize: "16.2 inch",
    displayType: "Liquid Retina XDR",
    resolution: "3456 x 2234",
    battery: "22 hours",
    weight: "2.14 kg",
    os: "macOS Sonoma",
    ports: "3x Thunderbolt 4, HDMI, SD Card, MagSafe, Headphone",
    description: "The most advanced MacBook Pro ever. Built for demanding workflows with the M3 Pro and M3 Max chips."
  },
  {
    id: 2,
    name: "MacBook Air 15",
    brand: "Apple",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202402?wid=400",
    variants: [
      { cpu: "Apple M3", cpuType: "Apple Silicon", gpu: "10-core GPU", ram: "8 GB", storage: "256 GB SSD", price: 1299 },
      { cpu: "Apple M3", cpuType: "Apple Silicon", gpu: "10-core GPU", ram: "16 GB", storage: "512 GB SSD", price: 1499 },
      { cpu: "Apple M3", cpuType: "Apple Silicon", gpu: "10-core GPU", ram: "24 GB", storage: "1 TB SSD", price: 1899 }
    ],
    displaySize: "15.3 inch",
    displayType: "Liquid Retina",
    resolution: "2880 x 1864",
    battery: "18 hours",
    weight: "1.51 kg",
    os: "macOS Sonoma",
    ports: "2x Thunderbolt / USB 4, MagSafe, Headphone",
    description: "Impossibly thin. Incredibly powerful. The 15-inch MacBook Air with M3 chip."
  },
  {
    id: 3,
    name: "Dell XPS 15",
    brand: "Dell",
    image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product/imagery/laptop/xps-15-9530/media-gallery/xps-9530t-platinum-gallery-1.psd?fmt=png-alpha&wid=400",
    variants: [
      { cpu: "Intel Core i7-13700H", cpuType: "Intel", gpu: "Intel Iris Xe", ram: "16 GB", storage: "512 GB SSD", price: 1599 },
      { cpu: "Intel Core i7-13700H", cpuType: "Intel", gpu: "NVIDIA RTX 4050", ram: "16 GB", storage: "1 TB SSD", price: 1899 },
      { cpu: "Intel Core i9-13900H", cpuType: "Intel", gpu: "NVIDIA RTX 4070", ram: "32 GB", storage: "1 TB SSD", price: 2399 }
    ],
    displaySize: "15.6 inch",
    displayType: "OLED",
    resolution: "3456 x 2160",
    battery: "13 hours",
    weight: "1.86 kg",
    os: "Windows 11",
    ports: "2x Thunderbolt 4, USB-C, SD Card, Headphone",
    description: "Premium Windows laptop with stunning OLED display and powerful performance."
  },
  {
    id: 4,
    name: "ThinkPad X1 Carbon Gen 11",
    brand: "Lenovo",
    image: "https://p1-lenovo.scene7.com/is/image/lenovo/ThinkPad-X1-Carbon-Gen-11-01?$medium$",
    variants: [
      { cpu: "Intel Core i5-1335U", cpuType: "Intel", gpu: "Intel Iris Xe", ram: "16 GB", storage: "256 GB SSD", price: 1399 },
      { cpu: "Intel Core i7-1365U", cpuType: "Intel", gpu: "Intel Iris Xe", ram: "16 GB", storage: "512 GB SSD", price: 1699 },
      { cpu: "Intel Core i7-1365U", cpuType: "Intel", gpu: "Intel Iris Xe", ram: "32 GB", storage: "1 TB SSD", price: 2099 }
    ],
    displaySize: "14 inch",
    displayType: "IPS",
    resolution: "1920 x 1200",
    battery: "15 hours",
    weight: "1.12 kg",
    os: "Windows 11 Pro",
    ports: "2x Thunderbolt 4, 2x USB-A, HDMI, Headphone",
    description: "Ultra-lightweight business laptop with legendary ThinkPad durability."
  },
  {
    id: 5,
    name: "ROG Zephyrus G14",
    brand: "Asus",
    image: "https://dlcdnwebimgs.asus.com/gain/4F3A2F3B-4B8E-4C5D-9A1F-2E3B4C5D6E7F/w1000",
    variants: [
      { cpu: "AMD Ryzen 7 7735HS", cpuType: "AMD", gpu: "NVIDIA RTX 4050", ram: "16 GB", storage: "512 GB SSD", price: 1399 },
      { cpu: "AMD Ryzen 9 7940HS", cpuType: "AMD", gpu: "NVIDIA RTX 4060", ram: "16 GB", storage: "1 TB SSD", price: 1799 },
      { cpu: "AMD Ryzen 9 7940HS", cpuType: "AMD", gpu: "NVIDIA RTX 4070", ram: "32 GB", storage: "1 TB SSD", price: 2199 }
    ],
    displaySize: "14 inch",
    displayType: "IPS",
    resolution: "2560 x 1600",
    battery: "10 hours",
    weight: "1.65 kg",
    os: "Windows 11",
    ports: "USB-C, USB-A, HDMI 2.1, Headphone",
    description: "Lightweight gaming laptop with high performance and portability."
  },
  {
    id: 6,
    name: "HP Spectre x360 16",
    brand: "HP",
    image: "https://www.hp.com/emea_africa-en/shop/AssetStore/v1/ctg/pdp/hp-spectre-x360-2-in-1-laptop-16-ea0013dx/5z3m3ua/5z3m3ua_image_1.png",
    variants: [
      { cpu: "Intel Core i7-13700H", cpuType: "Intel", gpu: "Intel Iris Xe", ram: "16 GB", storage: "512 GB SSD", price: 1399 },
      { cpu: "Intel Core i7-13700H", cpuType: "Intel", gpu: "Intel Arc A370M", ram: "16 GB", storage: "1 TB SSD", price: 1599 },
      { cpu: "Intel Core i9-13900H", cpuType: "Intel", gpu: "Intel Arc A370M", ram: "32 GB", storage: "2 TB SSD", price: 2199 }
    ],
    displaySize: "16 inch",
    displayType: "OLED",
    resolution: "2880 x 1800",
    battery: "12 hours",
    weight: "2.04 kg",
    os: "Windows 11",
    ports: "2x Thunderbolt 4, USB-A, HDMI, Headphone",
    description: "2-in-1 convertible laptop with OLED touchscreen and premium design."
  }
];

function loadLaptops() {
  const saved = localStorage.getItem('laptops_data');
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem('laptops_data', JSON.stringify(DEFAULT_LAPTOPS));
  return DEFAULT_LAPTOPS;
}

function saveLaptops(data) {
  localStorage.setItem('laptops_data', JSON.stringify(data));
}

// Get all unique values from variants for filters
function getAllVariantValues(laptops, key) {
  const values = new Set();
  laptops.forEach(l => {
    l.variants.forEach(v => {
      if (v[key]) values.add(v[key]);
    });
  });
  return [...values].sort();
    }
