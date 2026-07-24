import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  ssl: { rejectUnauthorized: false },
  connectionLimit: 5,
  connectTimeout: 20000,
});
const prisma = new PrismaClient({ adapter });

// Color-coded labeled placeholders per category — clean, consistent,
// and honest about being placeholders until real product photography is added.
const categoryColors: Record<string, string> = {
  laptops: "2E9BD6",
  desktops: "1D6E9C",
  monitors: "7C3AED",
  printers: "6B7280",
  networking: "16A34A",
  accessories: "C9A227",
  "mobile-phones": "E8342E",
};

function placeholderImage(categorySlug: string, label: string, size = 800) {
  const color = categoryColors[categorySlug] ?? "2E9BD6";
  const text = encodeURIComponent(label);
  return `https://placehold.co/${size}x${size}/${color}/FFFFFF?text=${text}&font=roboto`;
}

async function main() {
  console.log("Seeding categories...");

  const categoryDefs = [
    { name: "Laptops", slug: "laptops" },
    { name: "Desktops", slug: "desktops" },
    { name: "Monitors", slug: "monitors" },
    { name: "Printers", slug: "printers" },
    { name: "Networking", slug: "networking" },
    { name: "Accessories", slug: "accessories" },
    { name: "Mobile Phones", slug: "mobile-phones" },
  ];

  const categories = await Promise.all(
    categoryDefs.map((c) =>
      prisma.category.create({
        data: {
          name: c.name,
          slug: c.slug,
          imageUrl: placeholderImage(c.slug, c.name, 400),
        },
      })
    )
  );

  const [laptops, desktops, monitors, printers, networking, accessories, phones] =
    categories;

  console.log("Seeding brands...");

  const brands = await Promise.all(
    ["Dell", "HP", "Lenovo", "Apple", "Epson", "TP-Link", "Samsung"].map((name) =>
      prisma.brand.create({
        data: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
          logoUrl: `https://placehold.co/200x100/FFFFFF/1A1A1A?text=${encodeURIComponent(name)}`,
        },
      })
    )
  );

  const [dell, hp, lenovo, apple, epson, tplink, samsung] = brands;

  console.log("Seeding products...");

  // ---------- LAPTOPS ----------

  const dellLaptop = await prisma.product.create({
    data: {
      name: "Dell Latitude 5420",
      slug: "dell-latitude-5420",
      description:
        "Reliable business laptop with strong performance for everyday office work, video calls, and light multitasking.",
      shortDescription: "14-inch business laptop, Intel Core i5, 8GB RAM",
      categoryId: laptops.id,
      brandId: dell.id,
      basePrice: 62000,
      compareAtPrice: 72000,
      sku: "DELL-LAT-5420",
      condition: "REFURBISHED",
      warrantyMonths: 6,
      isFeatured: true,
      publishedAt: new Date(),
      images: {
        create: [
          { url: placeholderImage("laptops", "Dell Latitude 5420"), isPrimary: true, sortOrder: 0 },
        ],
      },
      specs: {
        create: [
          { label: "Processor", value: "Intel Core i5-1135G7", sortOrder: 0 },
          { label: "Screen Size", value: "14 inch FHD", sortOrder: 1 },
          { label: "Storage", value: "256GB SSD", sortOrder: 2 },
          { label: "Operating System", value: "Windows 11 Pro", sortOrder: 3 },
        ],
      },
      variants: {
        create: [
          { name: "8GB RAM / 256GB SSD", sku: "DELL-LAT-5420-8-256", priceDelta: 0, stockQty: 5, isDefault: true },
          { name: "16GB RAM / 512GB SSD", sku: "DELL-LAT-5420-16-512", priceDelta: 12000, stockQty: 3 },
        ],
      },
    },
  });

  const hpLaptop = await prisma.product.create({
    data: {
      name: "HP ProBook 450 G8",
      slug: "hp-probook-450-g8",
      description: "A dependable everyday laptop built for productivity, with a full-size keyboard and long battery life.",
      shortDescription: "15.6-inch laptop, Intel Core i5, 8GB RAM",
      categoryId: laptops.id,
      brandId: hp.id,
      basePrice: 58000,
      sku: "HP-PB-450G8",
      condition: "NEW",
      isFeatured: true,
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("laptops", "HP ProBook 450 G8"), isPrimary: true }] },
      specs: {
        create: [
          { label: "Processor", value: "Intel Core i5-1135G7", sortOrder: 0 },
          { label: "Screen Size", value: "15.6 inch FHD", sortOrder: 1 },
          { label: "Storage", value: "512GB SSD", sortOrder: 2 },
        ],
      },
    },
  });

  const lenovoLaptop = await prisma.product.create({
    data: {
      name: "Lenovo ThinkPad X1 Carbon Gen 9",
      slug: "lenovo-thinkpad-x1-carbon-g9",
      description: "Ultra-light business laptop with a durable carbon-fiber chassis, built for professionals who travel often.",
      shortDescription: "14-inch ultralight, Intel Core i7, 16GB RAM",
      categoryId: laptops.id,
      brandId: lenovo.id,
      basePrice: 95000,
      compareAtPrice: 110000,
      sku: "LEN-X1C-G9",
      condition: "REFURBISHED",
      warrantyMonths: 6,
      isFeatured: true,
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("laptops", "Lenovo ThinkPad X1"), isPrimary: true }] },
      specs: {
        create: [
          { label: "Processor", value: "Intel Core i7-1165G7", sortOrder: 0 },
          { label: "RAM", value: "16GB", sortOrder: 1 },
          { label: "Storage", value: "512GB SSD", sortOrder: 2 },
        ],
      },
    },
  });

  const macbookAir = await prisma.product.create({
    data: {
      name: "Apple MacBook Air M1",
      slug: "apple-macbook-air-m1",
      description: "Apple's fanless MacBook Air with the M1 chip — fast, silent, and long battery life for everyday creative and office work.",
      shortDescription: "13-inch, Apple M1 chip, 8GB RAM, 256GB SSD",
      categoryId: laptops.id,
      brandId: apple.id,
      basePrice: 105000,
      sku: "APPLE-MBA-M1",
      condition: "REFURBISHED",
      warrantyMonths: 6,
      isFeatured: true,
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("laptops", "MacBook Air M1"), isPrimary: true }] },
      specs: {
        create: [
          { label: "Chip", value: "Apple M1", sortOrder: 0 },
          { label: "RAM", value: "8GB", sortOrder: 1 },
          { label: "Storage", value: "256GB SSD", sortOrder: 2 },
        ],
      },
    },
  });

  const hpEliteBook = await prisma.product.create({
    data: {
      name: "HP EliteBook 840 G7",
      slug: "hp-elitebook-840-g7",
      description: "Premium business laptop with a sleek design, strong security features, and reliable all-day performance.",
      shortDescription: "14-inch, Intel Core i5 10th Gen, 8GB RAM",
      categoryId: laptops.id,
      brandId: hp.id,
      basePrice: 54999,
      sku: "HP-EB-840G7",
      condition: "REFURBISHED",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("laptops", "HP EliteBook 840"), isPrimary: true }] },
    },
  });

  const dellInspiron = await prisma.product.create({
    data: {
      name: "Dell Inspiron 15 3000",
      slug: "dell-inspiron-15-3000",
      description: "Budget-friendly everyday laptop, great for students and light home use.",
      shortDescription: "15.6-inch, Intel Core i3, 8GB RAM",
      categoryId: laptops.id,
      brandId: dell.id,
      basePrice: 38000,
      sku: "DELL-INS-15-3000",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("laptops", "Dell Inspiron 15"), isPrimary: true }] },
    },
  });

  // ---------- DESKTOPS ----------

  const lenovoDesktop = await prisma.product.create({
    data: {
      name: "Lenovo ThinkCentre M720s",
      slug: "lenovo-thinkcentre-m720s",
      description: "Compact and powerful desktop tower, ideal for offices and home workstations needing reliable daily performance.",
      shortDescription: "Desktop tower, Intel Core i5, 8GB RAM",
      categoryId: desktops.id,
      brandId: lenovo.id,
      basePrice: 45000,
      sku: "LEN-TC-M720S",
      condition: "REFURBISHED",
      isFeatured: true,
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("desktops", "Lenovo ThinkCentre M720s"), isPrimary: true }] },
      specs: {
        create: [
          { label: "Processor", value: "Intel Core i5-9500", sortOrder: 0 },
          { label: "RAM", value: "8GB DDR4", sortOrder: 1 },
          { label: "Storage", value: "1TB HDD", sortOrder: 2 },
        ],
      },
    },
  });

  const appleIMac = await prisma.product.create({
    data: {
      name: "Apple iMac 21.5-inch",
      slug: "apple-imac-21-5",
      description: "All-in-one desktop with a vibrant Retina display, ideal for creative work, browsing, and everyday productivity.",
      shortDescription: "21.5-inch Retina display, Intel Core i5, 8GB RAM",
      categoryId: desktops.id,
      brandId: apple.id,
      basePrice: 68000,
      compareAtPrice: 79000,
      sku: "APPLE-IMAC-215",
      condition: "REFURBISHED",
      isFeatured: true,
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("desktops", "Apple iMac 21.5"), isPrimary: true }] },
    },
  });

  const dellDesktop = await prisma.product.create({
    data: {
      name: "Dell OptiPlex 3080 Micro",
      slug: "dell-optiplex-3080-micro",
      description: "Compact desktop tower that saves desk space without compromising on everyday office performance.",
      shortDescription: "Mini desktop, Intel Core i5, 8GB RAM",
      categoryId: desktops.id,
      brandId: dell.id,
      basePrice: 42000,
      sku: "DELL-OPT-3080M",
      condition: "REFURBISHED",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("desktops", "Dell OptiPlex 3080"), isPrimary: true }] },
    },
  });

  const hpDesktop = await prisma.product.create({
    data: {
      name: "HP ProDesk 400 G6",
      slug: "hp-prodesk-400-g6",
      description: "Small form-factor business desktop with dependable performance for office workloads.",
      shortDescription: "Small form factor desktop, Intel Core i5, 8GB RAM",
      categoryId: desktops.id,
      brandId: hp.id,
      basePrice: 40000,
      sku: "HP-PD-400G6",
      condition: "REFURBISHED",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("desktops", "HP ProDesk 400 G6"), isPrimary: true }] },
    },
  });

  // ---------- MONITORS ----------

  const dellMonitor = await prisma.product.create({
    data: {
      name: "Dell 24-inch FHD Monitor E2420H",
      slug: "dell-e2420h-monitor",
      description: "Crisp Full HD monitor for office and home use, with an ergonomic tilt stand.",
      shortDescription: "24-inch Full HD IPS monitor",
      categoryId: monitors.id,
      brandId: dell.id,
      basePrice: 13500,
      sku: "DELL-E2420H",
      condition: "NEW",
      isFeatured: true,
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("monitors", "Dell 24in Monitor"), isPrimary: true }] },
      specs: {
        create: [
          { label: "Screen Size", value: "24 inch", sortOrder: 0 },
          { label: "Resolution", value: "1920x1080 FHD", sortOrder: 1 },
        ],
      },
    },
  });

  const hpMonitor = await prisma.product.create({
    data: {
      name: "HP 22-inch LED Monitor",
      slug: "hp-22-led-monitor",
      description: "Affordable, energy-efficient LED monitor with clear visuals for everyday computing.",
      shortDescription: "22-inch LED monitor",
      categoryId: monitors.id,
      brandId: hp.id,
      basePrice: 9800,
      sku: "HP-22-LED",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("monitors", "HP 22in Monitor"), isPrimary: true }] },
    },
  });

  const samsungMonitor = await prisma.product.create({
    data: {
      name: "Samsung 27-inch Curved Monitor",
      slug: "samsung-27-curved-monitor",
      description: "Immersive curved display, great for creative work and entertainment alike.",
      shortDescription: "27-inch curved Full HD monitor",
      categoryId: monitors.id,
      brandId: samsung.id,
      basePrice: 21000,
      compareAtPrice: 25000,
      sku: "SAMSUNG-27-CURVED",
      condition: "NEW",
      isFeatured: true,
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("monitors", "Samsung 27in Curved"), isPrimary: true }] },
    },
  });

  // ---------- PRINTERS ----------

  const epsonPrinter = await prisma.product.create({
    data: {
      name: "Epson L3250 EcoTank",
      slug: "epson-l3250-ecotank",
      description: "Wireless all-in-one printer with refillable ink tanks, built for high-volume, low-cost printing at home or in the office.",
      shortDescription: "Wireless all-in-one printer with EcoTank",
      categoryId: printers.id,
      brandId: epson.id,
      basePrice: 24000,
      sku: "EPSON-L3250",
      condition: "NEW",
      isFeatured: true,
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("printers", "Epson L3250"), isPrimary: true }] },
      specs: {
        create: [
          { label: "Type", value: "Print, Scan, Copy", sortOrder: 0 },
          { label: "Connectivity", value: "Wi-Fi, USB", sortOrder: 1 },
        ],
      },
    },
  });

  const epsonScanner = await prisma.product.create({
    data: {
      name: "Epson DS-1630 Document Scanner",
      slug: "epson-ds-1630-scanner",
      description: "Fast desktop document scanner built for high-volume office scanning with reliable paper feeding.",
      shortDescription: "A4 desktop document scanner, USB",
      categoryId: printers.id,
      brandId: epson.id,
      basePrice: 38000,
      sku: "EPSON-DS-1630",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("printers", "Epson DS-1630 Scanner"), isPrimary: true }] },
    },
  });

  const hpPrinter = await prisma.product.create({
    data: {
      name: "HP LaserJet Pro M404dn",
      slug: "hp-laserjet-pro-m404dn",
      description: "Fast monochrome laser printer built for busy offices needing crisp, reliable text documents.",
      shortDescription: "Monochrome laser printer, network-ready",
      categoryId: printers.id,
      brandId: hp.id,
      basePrice: 32000,
      sku: "HP-LJ-M404DN",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("printers", "HP LaserJet M404dn"), isPrimary: true }] },
    },
  });

  // ---------- NETWORKING ----------

  const tplinkRouter = await prisma.product.create({
    data: {
      name: "TP-Link Archer C6 AC1200",
      slug: "tplink-archer-c6",
      description: "Dual-band Wi-Fi router delivering fast, stable coverage for homes and small offices.",
      shortDescription: "Dual-band AC1200 Wi-Fi router",
      categoryId: networking.id,
      brandId: tplink.id,
      basePrice: 5500,
      sku: "TPLINK-ARCHER-C6",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("networking", "TP-Link Archer C6"), isPrimary: true }] },
      specs: {
        create: [
          { label: "Wi-Fi Speed", value: "AC1200 (867+300 Mbps)", sortOrder: 0 },
          { label: "Ports", value: "4x LAN, 1x WAN", sortOrder: 1 },
        ],
      },
    },
  });

  const tplinkSwitch = await prisma.product.create({
    data: {
      name: "TP-Link TL-SG1008D 8-Port Switch",
      slug: "tplink-sg1008d-switch",
      description: "Unmanaged Gigabit switch for expanding wired network connections in home or small office setups.",
      shortDescription: "8-port Gigabit unmanaged switch",
      categoryId: networking.id,
      brandId: tplink.id,
      basePrice: 3200,
      sku: "TPLINK-SG1008D",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("networking", "TP-Link 8-Port Switch"), isPrimary: true }] },
    },
  });

  const tplinkExtender = await prisma.product.create({
    data: {
      name: "TP-Link RE200 Wi-Fi Extender",
      slug: "tplink-re200-extender",
      description: "Wall-plug Wi-Fi range extender that boosts coverage into rooms your router doesn't reach.",
      shortDescription: "AC750 dual-band Wi-Fi range extender",
      categoryId: networking.id,
      brandId: tplink.id,
      basePrice: 3800,
      sku: "TPLINK-RE200",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("networking", "TP-Link RE200 Extender"), isPrimary: true }] },
    },
  });

  // ---------- ACCESSORIES ----------

  const appleAccessory = await prisma.product.create({
    data: {
      name: "Apple Magic Mouse",
      slug: "apple-magic-mouse",
      description: "Wireless, rechargeable mouse with a multi-touch surface for smooth, precise navigation.",
      shortDescription: "Wireless rechargeable multi-touch mouse",
      categoryId: accessories.id,
      brandId: apple.id,
      basePrice: 9500,
      sku: "APPLE-MAGIC-MOUSE",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("accessories", "Apple Magic Mouse"), isPrimary: true }] },
    },
  });

  const laptopBag = await prisma.product.create({
    data: {
      name: "Targus 15.6-inch Laptop Backpack",
      slug: "targus-laptop-backpack",
      description: "Padded, water-resistant laptop backpack with dedicated compartments for accessories and cables.",
      shortDescription: "Padded backpack, fits up to 15.6-inch laptops",
      categoryId: accessories.id,
      basePrice: 4500,
      sku: "TARGUS-BP-156",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("accessories", "Targus Laptop Backpack"), isPrimary: true }] },
    },
  });

  const wirelessKeyboard = await prisma.product.create({
    data: {
      name: "Logitech MK270 Wireless Combo",
      slug: "logitech-mk270-combo",
      description: "Reliable wireless keyboard and mouse combo for everyday office and home use.",
      shortDescription: "Wireless keyboard + mouse combo",
      categoryId: accessories.id,
      basePrice: 2800,
      sku: "LOGI-MK270",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("accessories", "Logitech MK270 Combo"), isPrimary: true }] },
    },
  });

  const earphones = await prisma.product.create({
    data: {
      name: "Wired Stereo Earphones",
      slug: "wired-stereo-earphones",
      description: "Affordable wired earphones with clear sound, compatible with most phones and laptops.",
      shortDescription: "3.5mm wired earphones",
      categoryId: accessories.id,
      basePrice: 500,
      sku: "GEN-EARPHONES-01",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("accessories", "Stereo Earphones"), isPrimary: true }] },
    },
  });

  // ---------- MOBILE PHONES ----------

  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 13 (128GB)",
      slug: "iphone-13-128gb",
      description: "Apple's iPhone 13 with A15 Bionic chip, dual-camera system, and all-day battery life.",
      shortDescription: "6.1-inch display, A15 Bionic, 128GB storage",
      categoryId: phones.id,
      brandId: apple.id,
      basePrice: 78000,
      compareAtPrice: 85000,
      sku: "APPLE-IPH13-128",
      condition: "REFURBISHED",
      warrantyMonths: 3,
      isFeatured: true,
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("mobile-phones", "iPhone 13 128GB"), isPrimary: true }] },
      specs: {
        create: [
          { label: "Storage", value: "128GB", sortOrder: 0 },
          { label: "Chip", value: "A15 Bionic", sortOrder: 1 },
          { label: "Display", value: "6.1-inch Super Retina XDR", sortOrder: 2 },
        ],
      },
    },
  });

  const samsungPhone = await prisma.product.create({
    data: {
      name: "Samsung Galaxy A54 (128GB)",
      slug: "samsung-galaxy-a54-128gb",
      description: "Mid-range Samsung smartphone with a smooth AMOLED display and a versatile triple-camera setup.",
      shortDescription: "6.4-inch AMOLED, 128GB storage",
      categoryId: phones.id,
      brandId: samsung.id,
      basePrice: 42000,
      sku: "SAMSUNG-A54-128",
      condition: "NEW",
      isFeatured: true,
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("mobile-phones", "Samsung Galaxy A54"), isPrimary: true }] },
    },
  });

  const infinixPhone = await prisma.product.create({
    data: {
      name: "Infinix Note 30 (256GB)",
      slug: "infinix-note-30-256gb",
      description: "Budget-friendly smartphone with a large battery and generous storage for everyday use.",
      shortDescription: "6.78-inch display, 256GB storage",
      categoryId: phones.id,
      basePrice: 24000,
      sku: "INFINIX-N30-256",
      condition: "NEW",
      publishedAt: new Date(),
      images: { create: [{ url: placeholderImage("mobile-phones", "Infinix Note 30"), isPrimary: true }] },
    },
  });

  console.log("Seeding a 'Hot Deals' collection...");

  await prisma.deal.create({
    data: {
      title: "Hot Deals",
      slug: "hot-deals",
      bannerUrl: placeholderImage("laptops", "Hot Deals", 1200),
      isActive: true,
      endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      products: {
        create: [
          { productId: dellLaptop.id },
          { productId: iphone.id },
          { productId: epsonPrinter.id },
          { productId: samsungMonitor.id },
          { productId: appleIMac.id },
        ],
      },
    },
  });

  console.log("Seed complete:", {
    categories: categories.length,
    brands: brands.length,
    products: 22,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });