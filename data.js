// Default laptop data - You can edit from admin panel
const DEFAULT_LAPTOPS = [
  {
    id: 1,
    name: "MacBook Pro 16 M3 Pro",
    brand: "Apple",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=400",
    price: 2499,
    cpu: "Apple M3 Pro",
    cpuType: "Apple Silicon",
    ram: "18 GB",
    storage: "512 GB SSD",
    displaySize: "16.2 inch",
    displayType: "Liquid Retina XDR",
    resolution: "3456 x 2234",
    gpu: "Apple M3 Pro 16-core",
    battery: "22 hours",
    weight: "2.14 kg",
    os: "macOS Sonoma",
    ports: "3x Thunderbolt 4, HDMI, SD Card, MagSafe",
    description: "Professional laptop with M3 Pro chip for heavy workloads"
  },
  {
    id: 2,
    name: "MacBook Air 15 M3",
    brand: "Apple",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202402?wid=400",
    price: 1299,
    cpu: "Apple M3",
    cpuType: "Apple Silicon",
    ram: "16 GB",
    storage: "256 GB SSD",
    displaySize: "15.3 inch",
    displayType: "Liquid Retina",
    resolution: "2880 x 1864",
    gpu: "Apple M3 10-core",
    battery: "18 hours",
    weight: "1.51 kg",
    os: "macOS Sonoma",
    ports: "2x Thunderbolt / USB 4, MagSafe, Headphone",
    description: "Lightweight and powerful laptop for everyday use"
  },
  {
    id: 3,
    name: "Dell XPS 15 9530",
    brand: "Dell",
    image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product/imagery/laptop/xps-15-9530/media-gallery/xps-9530t-platinum-gallery-1.psd?fmt=png-alpha&wid=400",
    price: 1899,
    cpu: "Intel Core i7-13700H",
    cpuType: "Intel",
    ram: "16 GB",
    storage: "512 GB SSD",
    displaySize: "15.6 inch",
    displayType: "OLED",
    resolution: "3456 x 2160",
    gpu: "NVIDIA RTX 4050",
    battery: "13 hours",
    weight: "1.86 kg",
    os: "Windows 11",
    ports: "2x Thunderbolt 4, USB-C, SD Card, Headphone",
    description: "Premium Windows laptop with stunning OLED display"
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    brand: "Lenovo",
    image: "https://p1-lenovo.scene7.com/is/image/lenovo/ThinkPad-X1-Carbon-Gen-11-01?$medium$",
    price: 1699,
    cpu: "Intel Core i7-1365U",
    cpuType: "Intel",
    ram: "16 GB",
    storage: "512 GB SSD",
    displaySize: "14 inch",
    displayType: "IPS",
    resolution: "1920 x 1200",
    gpu: "Intel Iris Xe",
    battery: "15 hours",
    weight: "1.12 kg",
    os: "Windows 11 Pro",
    ports: "2x Thunderbolt 4, 2x USB-A, HDMI, Headphone",
    description: "Ultra-lightweight business laptop with durability"
  },
  {
    id: 5,
    name: "ASUS ROG Zephyrus G14",
    brand: "Asus",
    image: "https://dlcdnwebimgs.asus.com/gain/4F3A2F3B-4B8E-4C5D-9A1F-2E3B4C5D6E7F/w1000",
    price: 1799,
    cpu: "AMD Ryzen 9 7940HS",
    cpuType: "AMD",
    ram: "32 GB",
    storage: "1 TB SSD",
    displaySize: "14 inch",
    displayType: "IPS",
    resolution: "2560 x 1600",
    gpu: "NVIDIA RTX 4060",
    battery: "10 hours",
    weight: "1.65 kg",
    os: "Windows 11",
    ports: "USB-C, USB-A, HDMI 2.1, Headphone",
    description: "Lightweight gaming laptop with high performance"
  },
  {
    id: 6,
    name: "HP Spectre x360 16",
    brand: "HP",
    image: "https://www.hp.com/emea_africa-en/shop/AssetStore/v1/ctg/pdp/hp-spectre-x360-2-in-1-laptop-16-ea0013dx/5z3m3ua/5z3m3ua_image_1.png",
    price: 1599,
    cpu: "Intel Core i7-13700H",
    cpuType: "Intel",
    ram: "16 GB",
    storage: "1 TB SSD",
    displaySize: "16 inch",
    displayType: "OLED",
    resolution: "2880 x 1800",
    gpu: "Intel Iris Xe",
    battery: "12 hours",
    weight: "2.04 kg",
    os: "Windows 11",
    ports: "2x Thunderbolt 4, USB-A, HDMI, Headphone",
    description: "2-in-1 laptop with OLED touchscreen"
  }
];

// Load data from localStorage or use defaults
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