/**
 * MEGAPARTSEALER — PRODUCT DATA STORE
 * Clean, verified product catalog for sealer machine spare parts.
 */

const SHOPEE_STORE_URL = "https://shopee.co.id/megapartsealer";
const WHATSAPP_NUMBER = "6281234567890";

const categories = [
  { name: "Semua", count: 7 },
  { name: "Kawat Motif", count: 3, image: "assets/images/1.png" },
  { name: "Kawat Polos", count: 2, image: "assets/images/1.png" },
  { name: "Kain", count: 1, image: "assets/images/1.png" },
  { name: "Kain Teflon", count: 1, image: "assets/images/1.png" }
];

const products = [
  {
    id: 1,
    name: "Kawat Motif Mesin Hand Impulse Sealer FS-500",
    category: "Kawat Motif",
    machine: "FS-500",
    size: "3mm × 50cm",
    quantity: "10 pcs",
    type: "Kawat Motif",
    customizable: "Bisa custom ukuran",
    price: 35000,
    stock: true,
    image: "assets/images/1.png",
    description: "Kawat elemen pemanas bermotif untuk mesin hand impulse sealer FS-500. Menghasilkan pola segel bergerigi rapat yang kuat dan rapi pada berbagai jenis plastik kemasan.",
    specifications: {
      "Nama Produk": "Kawat Motif Mesin Hand Impulse Sealer",
      "Model Mesin": "FS-500",
      "Ukuran": "3mm × 50cm",
      "Isi": "10 pcs",
      "Jenis": "Kawat Motif",
      "Kustomisasi": "Bisa custom ukuran",
      "Kompatibilitas": "Hand Sealer & Impulse Sealer tipe 500 / 50cm"
    },
    shopeeUrl: "https://shopee.co.id/search?keyword=Kawat%20Motif%20FS-500%20Sealer"
  },
  {
    id: 2,
    name: "Kawat Motif Mesin Hand Impulse Sealer FS-300",
    category: "Kawat Motif",
    machine: "FS-300",
    size: "3mm × 30cm",
    quantity: "10 pcs",
    type: "Kawat Motif",
    customizable: "Bisa custom ukuran",
    price: 28000,
    stock: true,
    image: "assets/images/1.png",
    description: "Kawat elemen pemanas motif gerigi presisi untuk mesin press plastik ukuran 30cm. Memberikan daya rekat segel kemasan yang rapat dan tidak mudah bocor.",
    specifications: {
      "Nama Produk": "Kawat Motif Mesin Hand Impulse Sealer",
      "Model Mesin": "FS-300",
      "Ukuran": "3mm × 30cm",
      "Isi": "10 pcs",
      "Jenis": "Kawat Motif",
      "Kustomisasi": "Bisa custom ukuran",
      "Kompatibilitas": "Hand Sealer & Impulse Sealer tipe 300 / 30cm"
    },
    shopeeUrl: "https://shopee.co.id/search?keyword=Kawat%20Motif%20FS-300%20Sealer"
  },
  {
    id: 3,
    name: "Kawat Motif Mesin Hand Impulse Sealer FS-400",
    category: "Kawat Motif",
    machine: "FS-400",
    size: "3mm × 40cm",
    quantity: "10 pcs",
    type: "Kawat Motif",
    customizable: "Bisa custom ukuran",
    price: 32000,
    stock: true,
    image: "assets/images/1.png",
    description: "Kawat pemanas motif gelombang presisi untuk mesin press sealer 40cm. Cocok untuk kemasan snack, standing pouch, dan plastik pembungkus.",
    specifications: {
      "Nama Produk": "Kawat Motif Mesin Hand Impulse Sealer",
      "Model Mesin": "FS-400",
      "Ukuran": "3mm × 40cm",
      "Isi": "10 pcs",
      "Jenis": "Kawat Motif",
      "Kustomisasi": "Bisa custom ukuran",
      "Kompatibilitas": "Hand Sealer & Impulse Sealer tipe 400 / 40cm"
    },
    shopeeUrl: "https://shopee.co.id/search?keyword=Kawat%20Motif%20FS-400%20Sealer"
  },
  {
    id: 4,
    name: "Kawat Polos Pipih Sealer 2mm FS-300",
    category: "Kawat Polos",
    machine: "FS-300",
    size: "2mm × 30cm",
    quantity: "10 pcs",
    type: "Kawat Polos",
    customizable: "Bisa custom ukuran",
    price: 20000,
    stock: true,
    image: "assets/images/1.png",
    description: "Kawat elemen pemanas pipih polos lebar 2mm untuk hasil seal lurus standar pada plastik tipis hingga sedang seperti PE dan PP.",
    specifications: {
      "Nama Produk": "Kawat Polos Pipih Sealer",
      "Model Mesin": "FS-300",
      "Ukuran": "2mm × 30cm",
      "Isi": "10 pcs",
      "Jenis": "Kawat Polos",
      "Kustomisasi": "Bisa custom ukuran",
      "Kompatibilitas": "Hand Sealer 200 / 300 Series"
    },
    shopeeUrl: "https://shopee.co.id/search?keyword=Kawat%20Polos%20FS-300%20Sealer"
  },
  {
    id: 5,
    name: "Kawat Polos Lebar Sealer 5mm FS-500",
    category: "Kawat Polos",
    machine: "FS-500",
    size: "5mm × 50cm",
    quantity: "10 pcs",
    type: "Kawat Polos",
    customizable: "Bisa custom ukuran",
    price: 25000,
    stock: true,
    image: "assets/images/1.png",
    description: "Kawat pemanas pipih lebar 5mm untuk penyegelan kemasan tebal agar kedap udara maksimal dan tidak mudah sobek saat pengiriman.",
    specifications: {
      "Nama Produk": "Kawat Polos Lebar Sealer",
      "Model Mesin": "FS-500",
      "Ukuran": "5mm × 50cm",
      "Isi": "10 pcs",
      "Jenis": "Kawat Polos",
      "Kustomisasi": "Bisa custom ukuran",
      "Kompatibilitas": "Hand Sealer & Pedal Sealer 500 / 50cm"
    },
    shopeeUrl: "https://shopee.co.id/search?keyword=Kawat%20Polos%20FS-500%20Sealer"
  },
  {
    id: 6,
    name: "Kain Sealer Penahan Panas Fiberglass",
    category: "Kain",
    machine: "Universal Hand & Impulse Sealer",
    size: "50mm × 1 Meter",
    quantity: "1 Roll",
    type: "Kain Penahan Panas",
    customizable: "-",
    price: 30000,
    stock: true,
    image: "assets/images/1.png",
    description: "Kain pelapis tahan panas serat kaca (fiberglass fabric) untuk meratakan panas elemen dan melindungi kawat pemanas mesin sealer.",
    specifications: {
      "Nama Produk": "Kain Sealer Penahan Panas",
      "Model Mesin": "Universal Hand & Impulse Sealer",
      "Ukuran": "50mm × 1 Meter",
      "Isi": "1 Roll",
      "Jenis": "Kain Penahan Panas",
      "Material": "Fiberglass High Temperature Woven Fabric",
      "Kompatibilitas": "Seluruh tipe Hand Sealer, Impulse Sealer, & Pedal Sealer"
    },
    shopeeUrl: "https://shopee.co.id/search?keyword=Kain%20Sealer%20Penahan%20Panas"
  },
  {
    id: 7,
    name: "Kain Teflon Sealer Anti Lengket PTFE",
    category: "Kain Teflon",
    machine: "Universal Sealer",
    size: "0.13mm × 1 Meter",
    quantity: "1 Lembar",
    type: "Kain Teflon PTFE Anti Lengket",
    customizable: "-",
    price: 45000,
    stock: true,
    image: "assets/images/1.png",
    description: "Kain teflon PTFE murni anti lengket kualitas tinggi. Menjaga kemasan plastik agar tidak menempel pada elemen pemanas saat proses penyegelan.",
    specifications: {
      "Nama Produk": "Kain Teflon Sealer Anti Lengket",
      "Model Mesin": "Universal Sealer",
      "Ukuran": "0.13mm × 1 Meter (Tebal 0.13mm)",
      "Isi": "1 Lembar",
      "Jenis": "Kain Teflon PTFE Anti Lengket",
      "Ketahanan Suhu": "Hingga 300°C",
      "Kompatibilitas": "Hand Sealer, Impulse Sealer, Vacuum Sealer, & Continuous Sealer"
    },
    shopeeUrl: "https://shopee.co.id/search?keyword=Kain%20Teflon%20Sealer%20PTFE"
  }
];

// Helper Functions
function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find(p => p.id === parseInt(id, 10));
}

function getCategories() {
  return categories;
}

function formatRupiah(amount) {
  if (!amount || amount === 0) return "Hubungi Kami";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}
