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

async function main() {
  console.log("Seeding categories...");

  const categories = await Promise.all(
    [
      { name: "Laptops", slug: "laptops" },
      { name: "Desktops", slug: "desktops" },
      { name: "Printers", slug: "printers" },
      { name: "Networking", slug: "networking" },
      { name: "Accessories", slug: "accessories" },
      { name: "Mobile Phones", slug: "mobile-phones" },
    ].map((c) =>
      prisma.category.create({
        data: {
          name: c.name,
          slug: c.slug,
          imageUrl: `https://picsum.photos/seed/${c.slug}/400/400`,
        },
      })
    )
  );

  const [laptops, desktops, printers, networking, accessories, phones] =
    categories;

  console.log("Seeding brands...");

  const brands = await Promise.all(
    ["Dell", "HP", "Lenovo", "Apple", "Epson", "TP-Link"].map((name) =>
      prisma.brand.create({
        data: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
          logoUrl: `https://picsum.photos/seed/${name.toLowerCase()}-logo/200/100`,
        },
      })
    )
  );

  const [dell, hp, lenovo, apple, epson, tplink] = brands;

  console.log("Seeding products...");

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
          {
            url: "https://picsum.photos/seed/dell-latitude-1/800/800",
            isPrimary: true,
            sortOrder: 0,
          },
          {
            url: "https://picsum.photos/seed/dell-latitude-2/800/800",
            sortOrder: 1,
          },
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
          {
            name: "8GB RAM / 256GB SSD",
            sku: "DELL-LAT-5420-8-256",
            priceDelta: 0,
            stockQty: 5,
            isDefault: true,
          },
          {
            name: "16GB RAM / 512GB SSD",
            sku: "DELL-LAT-5420-16-512",
            priceDelta: 12000,
            stockQty: 3,
          },
        ],
      },
    },
  });

  const hpLaptop = await prisma.product.create({
    data: {
      name: "HP ProBook 450 G8",
      slug: "hp-probook-450-g8",
      description:
        "A dependable everyday laptop built for productivity, with a full-size keyboard and long battery life.",
      shortDescription: "15.6-inch laptop, Intel Core i5, 8GB RAM",
      categoryId: laptops.id,
      brandId: hp.id,
      basePrice: 58000,
      sku: "HP-PB-450G8",
      condition: "NEW",
      isFeatured: true,
      publishedAt: new Date(),
      images: {
        create: [
          {
            url: "https://picsum.photos/seed/hp-probook-1/800/800",
            isPrimary: true,
          },
        ],
      },
      specs: {
        create: [
          { label: "Processor", value: "Intel Core i5-1135G7", sortOrder: 0 },
          { label: "Screen Size", value: "15.6 inch FHD", sortOrder: 1 },
          { label: "Storage", value: "512GB SSD", sortOrder: 2 },
        ],
      },
    },
  });

  const lenovoDesktop = await prisma.product.create({
    data: {
      name: "Lenovo ThinkCentre M720s",
      slug: "lenovo-thinkcentre-m720s",
      description:
        "Compact and powerful desktop tower, ideal for offices and home workstations needing reliable daily performance.",
      shortDescription: "Desktop tower, Intel Core i5, 8GB RAM",
      categoryId: desktops.id,
      brandId: lenovo.id,
      basePrice: 45000,
      sku: "LEN-TC-M720S",
      condition: "REFURBISHED",
      publishedAt: new Date(),
      images: {
        create: [
          {
            url: "https://picsum.photos/seed/lenovo-desktop-1/800/800",
            isPrimary: true,
          },
        ],
      },
      specs: {
        create: [
          { label: "Processor", value: "Intel Core i5-9500", sortOrder: 0 },
          { label: "RAM", value: "8GB DDR4", sortOrder: 1 },
          { label: "Storage", value: "1TB HDD", sortOrder: 2 },
        ],
      },
    },
  });

  const epsonPrinter = await prisma.product.create({
    data: {
      name: "Epson L3250 EcoTank",
      slug: "epson-l3250-ecotank",
      description:
        "Wireless all-in-one printer with refillable ink tanks, built for high-volume, low-cost printing at home or in the office.",
      shortDescription: "Wireless all-in-one printer with EcoTank",
      categoryId: printers.id,
      brandId: epson.id,
      basePrice: 24000,
      sku: "EPSON-L3250",
      condition: "NEW",
      isFeatured: true,
      publishedAt: new Date(),
      images: {
        create: [
          {
            url: "https://picsum.photos/seed/epson-printer-1/800/800",
            isPrimary: true,
          },
        ],
      },
      specs: {
        create: [
          { label: "Type", value: "Print, Scan, Copy", sortOrder: 0 },
          { label: "Connectivity", value: "Wi-Fi, USB", sortOrder: 1 },
        ],
      },
    },
  });

  const tplinkRouter = await prisma.product.create({
    data: {
      name: "TP-Link Archer C6 AC1200",
      slug: "tplink-archer-c6",
      description:
        "Dual-band Wi-Fi router delivering fast, stable coverage for homes and small offices.",
      shortDescription: "Dual-band AC1200 Wi-Fi router",
      categoryId: networking.id,
      brandId: tplink.id,
      basePrice: 5500,
      sku: "TPLINK-ARCHER-C6",
      condition: "NEW",
      publishedAt: new Date(),
      images: {
        create: [
          {
            url: "https://picsum.photos/seed/tplink-router-1/800/800",
            isPrimary: true,
          },
        ],
      },
      specs: {
        create: [
          { label: "Wi-Fi Speed", value: "AC1200 (867+300 Mbps)", sortOrder: 0 },
          { label: "Ports", value: "4x LAN, 1x WAN", sortOrder: 1 },
        ],
      },
    },
  });

  const appleAccessory = await prisma.product.create({
    data: {
      name: "Apple Magic Mouse",
      slug: "apple-magic-mouse",
      description:
        "Wireless, rechargeable mouse with a multi-touch surface for smooth, precise navigation.",
      shortDescription: "Wireless rechargeable multi-touch mouse",
      categoryId: accessories.id,
      brandId: apple.id,
      basePrice: 9500,
      sku: "APPLE-MAGIC-MOUSE",
      condition: "NEW",
      publishedAt: new Date(),
      images: {
        create: [
          {
            url: "https://picsum.photos/seed/apple-mouse-1/800/800",
            isPrimary: true,
          },
        ],
      },
    },
  });

  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 13 (128GB)",
      slug: "iphone-13-128gb",
      description:
        "Apple's iPhone 13 with A15 Bionic chip, dual-camera system, and all-day battery life.",
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
      images: {
        create: [
          {
            url: "https://picsum.photos/seed/iphone13-1/800/800",
            isPrimary: true,
          },
        ],
      },
      specs: {
        create: [
          { label: "Storage", value: "128GB", sortOrder: 0 },
          { label: "Chip", value: "A15 Bionic", sortOrder: 1 },
          { label: "Display", value: "6.1-inch Super Retina XDR", sortOrder: 2 },
        ],
      },
    },
  });

  console.log("Seeding more products for row density...");

  const moreLaptops = await Promise.all([
    prisma.product.create({
      data: {
        name: "Lenovo ThinkPad E14",
        slug: "lenovo-thinkpad-e14",
        description:
          "Durable business laptop with a spill-resistant keyboard and solid all-day battery life.",
        shortDescription: "14-inch laptop, Intel Core i5, 8GB RAM",
        categoryId: laptops.id,
        brandId: lenovo.id,
        basePrice: 55000,
        sku: "LEN-TP-E14",
        condition: "REFURBISHED",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/thinkpad-e14/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "MacBook Air M1",
        slug: "macbook-air-m1",
        description:
          "Apple silicon laptop with fanless design, all-day battery, and a stunning Retina display.",
        shortDescription: "13-inch, Apple M1, 8GB RAM",
        categoryId: laptops.id,
        brandId: apple.id,
        basePrice: 95000,
        compareAtPrice: 110000,
        sku: "APPLE-MBA-M1",
        condition: "REFURBISHED",
        warrantyMonths: 6,
        isFeatured: true,
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/mba-m1/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "HP Pavilion 15",
        slug: "hp-pavilion-15",
        description:
          "Everyday laptop balancing performance and portability for students and home use.",
        shortDescription: "15.6-inch laptop, Intel Core i5, 8GB RAM",
        categoryId: laptops.id,
        brandId: hp.id,
        basePrice: 52000,
        sku: "HP-PAV-15",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/hp-pavilion-15/800/800", isPrimary: true }],
        },
      },
    }),
  ]);

  const moreDesktops = await Promise.all([
    prisma.product.create({
      data: {
        name: "Dell OptiPlex 3080",
        slug: "dell-optiplex-3080",
        description:
          "Compact desktop built for reliable office computing with easy serviceability.",
        shortDescription: "Desktop tower, Intel Core i5, 8GB RAM",
        categoryId: desktops.id,
        brandId: dell.id,
        basePrice: 42000,
        sku: "DELL-OPTI-3080",
        condition: "REFURBISHED",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/optiplex-3080/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "HP EliteDesk 800 G4",
        slug: "hp-elitedesk-800-g4",
        description:
          "Small form factor desktop with enterprise-grade reliability for daily office tasks.",
        shortDescription: "Desktop, Intel Core i5, 8GB RAM",
        categoryId: desktops.id,
        brandId: hp.id,
        basePrice: 44000,
        sku: "HP-ED-800G4",
        condition: "REFURBISHED",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/elitedesk-800/800/800", isPrimary: true }],
        },
      },
    }),
  ]);

  const morePrinters = await Promise.all([
    prisma.product.create({
      data: {
        name: "HP LaserJet Pro M15w",
        slug: "hp-laserjet-pro-m15w",
        description:
          "Compact monochrome laser printer with wireless printing for small offices.",
        shortDescription: "Wireless monochrome laser printer",
        categoryId: printers.id,
        brandId: hp.id,
        basePrice: 14000,
        sku: "HP-LJ-M15W",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/hp-laserjet-m15w/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Epson L1250 EcoTank",
        slug: "epson-l1250-ecotank",
        description:
          "Wireless single-function inkjet printer with high-yield ink tanks for low-cost printing.",
        shortDescription: "Wireless EcoTank inkjet printer",
        categoryId: printers.id,
        brandId: epson.id,
        basePrice: 19000,
        sku: "EPSON-L1250",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/epson-l1250/800/800", isPrimary: true }],
        },
      },
    }),
  ]);

  const moreNetworking = await Promise.all([
    prisma.product.create({
      data: {
        name: "TP-Link Deco M4 (2-Pack)",
        slug: "tplink-deco-m4",
        description:
          "Whole-home mesh Wi-Fi system that eliminates dead zones across large homes or offices.",
        shortDescription: "Mesh Wi-Fi system, 2-pack",
        categoryId: networking.id,
        brandId: tplink.id,
        basePrice: 12000,
        sku: "TPLINK-DECO-M4",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/deco-m4/800/800", isPrimary: true }],
        },
      },
    }),
  ]);

  const moreAccessories = await Promise.all([
    prisma.product.create({
      data: {
        name: "Dell Wireless Keyboard & Mouse Combo",
        slug: "dell-km636-combo",
        description:
          "Reliable wireless keyboard and mouse combo for everyday office use.",
        shortDescription: "Wireless keyboard and mouse combo",
        categoryId: accessories.id,
        brandId: dell.id,
        basePrice: 3500,
        sku: "DELL-KM636",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/dell-km636/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "HP USB-C Docking Station",
        slug: "hp-usbc-dock",
        description:
          "Single-cable docking solution for connecting monitors, peripherals, and network to a laptop.",
        shortDescription: "USB-C docking station",
        categoryId: accessories.id,
        brandId: hp.id,
        basePrice: 8500,
        sku: "HP-DOCK-USBC",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/hp-usbc-dock/800/800", isPrimary: true }],
        },
      },
    }),
  ]);

  const morePhones = await Promise.all([
    prisma.product.create({
      data: {
        name: "iPhone 12 (64GB)",
        slug: "iphone-12-64gb",
        description:
          "Apple's iPhone 12 with A14 Bionic chip and OLED Super Retina XDR display.",
        shortDescription: "6.1-inch display, A14 Bionic, 64GB storage",
        categoryId: phones.id,
        brandId: apple.id,
        basePrice: 62000,
        sku: "APPLE-IPH12-64",
        condition: "REFURBISHED",
        warrantyMonths: 3,
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/iphone12-1/800/800", isPrimary: true }],
        },
      },
    }),
  ]);

  console.log("Seeding accessories: earphones, cables, adapters, extensions...");

  const moreAccessories2 = await Promise.all([
    prisma.product.create({
      data: {
        name: "JBL Tune 215BT Wireless Earphones",
        slug: "jbl-tune-215bt",
        description:
          "Bluetooth in-ear earphones with punchy bass, a lightweight neckband design, and up to 16 hours of battery life.",
        shortDescription: "Wireless Bluetooth earphones, 16hr battery",
        categoryId: accessories.id,
        basePrice: 3200,
        compareAtPrice: 4000,
        sku: "JBL-TUNE-215BT",
        condition: "NEW",
        isFeatured: true,
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/jbl-earphones/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Apple EarPods (Lightning)",
        slug: "apple-earpods-lightning",
        description:
          "Wired earphones with a Lightning connector, precision-engineered for clear sound and a comfortable fit.",
        shortDescription: "Wired earphones with Lightning connector",
        categoryId: accessories.id,
        brandId: apple.id,
        basePrice: 2800,
        sku: "APPLE-EARPODS-LIGHTNING",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/apple-earpods/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "USB-C to HDMI Adapter",
        slug: "usbc-to-hdmi-adapter",
        description:
          "Connect your laptop or phone to an external display or projector with support for up to 4K output.",
        shortDescription: "USB-C to HDMI adapter, 4K support",
        categoryId: accessories.id,
        basePrice: 1500,
        sku: "USBC-HDMI-ADAPTER",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/usbc-hdmi-adapter/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "3-in-1 USB-C Hub Adapter",
        slug: "usbc-hub-3in1",
        description:
          "Compact hub adding USB-A, HDMI, and SD card slots to a single USB-C port for expanded connectivity.",
        shortDescription: "USB-C hub with USB-A, HDMI, SD card slot",
        categoryId: accessories.id,
        basePrice: 2600,
        sku: "USBC-HUB-3IN1",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/usbc-hub/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "HDMI Cable (2m, 4K)",
        slug: "hdmi-cable-2m-4k",
        description:
          "High-speed HDMI cable supporting 4K resolution at 60Hz, ideal for monitors, TVs, and projectors.",
        shortDescription: "2m HDMI cable, supports 4K @ 60Hz",
        categoryId: accessories.id,
        basePrice: 900,
        sku: "HDMI-CABLE-2M",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/hdmi-cable/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "USB-C Charging Cable (1m)",
        slug: "usbc-charging-cable-1m",
        description:
          "Durable braided USB-C charging and data cable, compatible with most modern laptops and phones.",
        shortDescription: "1m braided USB-C cable",
        categoryId: accessories.id,
        basePrice: 700,
        sku: "USBC-CABLE-1M",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/usbc-cable/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "4-Way Power Extension Cable",
        slug: "4-way-power-extension",
        description:
          "Heavy-duty power extension with 4 outlets and surge protection, ideal for desks and workstations.",
        shortDescription: "4-outlet power extension with surge protection",
        categoryId: accessories.id,
        basePrice: 1800,
        sku: "POWER-EXT-4WAY",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/power-extension/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "USB 3.0 Extension Cable (3m)",
        slug: "usb3-extension-cable-3m",
        description:
          "Extend the reach of your USB devices with this shielded USB 3.0 extension cable for stable, fast data transfer.",
        shortDescription: "3m USB 3.0 extension cable",
        categoryId: accessories.id,
        basePrice: 950,
        sku: "USB3-EXT-3M",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/usb-extension/800/800", isPrimary: true }],
        },
      },
    }),
  ]);

  console.log("Seeding more desktops and printers...");

  const morePCs = await Promise.all([
    prisma.product.create({
      data: {
        name: "Dell OptiPlex 7080 SFF",
        slug: "dell-optiplex-7080-sff",
        description:
          "Small form factor desktop with strong multitasking performance, suited for demanding office workloads.",
        shortDescription: "Desktop, Intel Core i7, 16GB RAM",
        categoryId: desktops.id,
        brandId: dell.id,
        basePrice: 68000,
        compareAtPrice: 78000,
        sku: "DELL-OPTI-7080-SFF",
        condition: "REFURBISHED",
        isFeatured: true,
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/optiplex-7080/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Lenovo ThinkCentre M90t Tower",
        slug: "lenovo-thinkcentre-m90t",
        description:
          "Full-tower desktop built for expandability, ideal for graphics-heavy or multi-monitor office setups.",
        shortDescription: "Desktop tower, Intel Core i7, 16GB RAM",
        categoryId: desktops.id,
        brandId: lenovo.id,
        basePrice: 72000,
        sku: "LEN-TC-M90T",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/thinkcentre-m90t/800/800", isPrimary: true }],
        },
      },
    }),
  ]);

  const morePrinters2 = await Promise.all([
    prisma.product.create({
      data: {
        name: "HP LaserJet Pro MFP M428fdw",
        slug: "hp-laserjet-m428fdw",
        description:
          "All-in-one monochrome laser printer with fax, duplex printing, and wireless connectivity for busy offices.",
        shortDescription: "All-in-one laser printer with fax and duplex",
        categoryId: printers.id,
        brandId: hp.id,
        basePrice: 38000,
        sku: "HP-LJ-M428FDW",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/hp-m428fdw/800/800", isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "A4 Thermal Laminator",
        slug: "a4-thermal-laminator",
        description:
          "Desktop laminating machine for A4 documents, with quick warm-up and jam-release lever for smooth operation.",
        shortDescription: "A4 desktop thermal laminator",
        categoryId: printers.id,
        basePrice: 4200,
        sku: "A4-LAMINATOR",
        condition: "NEW",
        publishedAt: new Date(),
        images: {
          create: [{ url: "https://picsum.photos/seed/laminator/800/800", isPrimary: true }],
        },
      },
    }),
  ]);

  console.log("Seeding a 'Hot Deals' collection...");

  await prisma.deal.create({
    data: {
      title: "Hot Deals",
      slug: "hot-deals",
      bannerUrl: "https://picsum.photos/seed/hot-deals-banner/1200/300",
      isActive: true,
      endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from seed time
      products: {
        create: [
          { productId: dellLaptop.id },
          { productId: iphone.id },
          { productId: epsonPrinter.id },
          { productId: moreLaptops[1].id }, // MacBook Air
          { productId: moreAccessories2[0].id }, // JBL Earphones
          { productId: morePrinters2[1].id }, // A4 Laminator
        ],
      },
    },
  });

  console.log("Seed complete:", {
    categories: categories.length,
    brands: brands.length,
    products:
      7 +
      moreLaptops.length +
      moreDesktops.length +
      morePrinters.length +
      moreNetworking.length +
      moreAccessories.length +
      morePhones.length +
      moreAccessories2.length +
      morePCs.length +
      morePrinters2.length,
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