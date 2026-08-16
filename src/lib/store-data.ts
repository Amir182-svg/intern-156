import {
  Refrigerator, AirVent, Tv, WashingMachine, Snowflake, Microwave, CookingPot,
  Droplet, Fan, Flame, ShowerHead, Wind, Bot, Shirt, Blend, GlassWater,
  Coffee, Battery, Zap, Sun, BatteryCharging, Power, UtensilsCrossed,
  Plug, Smartphone, BatteryFull, Cable, Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type Category = { slug: string; name: string; icon: LucideIcon; count: number };

export const categories: Category[] = [
  { slug: "refrigerators", name: "Refrigerators", icon: Refrigerator, count: 42 },
  { slug: "air-conditioners", name: "Air Conditioners", icon: AirVent, count: 38 },
  { slug: "led-tvs", name: "LED TVs", icon: Tv, count: 55 },
  { slug: "smart-tvs", name: "Smart TVs", icon: Tv, count: 34 },
  { slug: "washing-machines", name: "Washing Machines", icon: WashingMachine, count: 29 },
  { slug: "deep-freezers", name: "Deep Freezers", icon: Snowflake, count: 21 },
  { slug: "microwaves", name: "Microwave Ovens", icon: Microwave, count: 24 },
  { slug: "kitchen-appliances", name: "Kitchen Appliances", icon: CookingPot, count: 48 },
  { slug: "water-dispensers", name: "Water Dispensers", icon: Droplet, count: 18 },
  { slug: "water-coolers", name: "Water Coolers", icon: GlassWater, count: 12 },
  { slug: "fans", name: "Fans", icon: Fan, count: 40 },
  { slug: "electric-heaters", name: "Electric Heaters", icon: Flame, count: 16 },
  { slug: "geysers", name: "Geysers", icon: ShowerHead, count: 14 },
  { slug: "air-coolers", name: "Air Coolers", icon: Wind, count: 22 },
  { slug: "vacuum-cleaners", name: "Vacuum Cleaners", icon: Bot, count: 19 },
  { slug: "iron", name: "Iron", icon: Shirt, count: 15 },
  { slug: "blenders", name: "Blenders", icon: Blend, count: 20 },
  { slug: "juicers", name: "Juicers", icon: GlassWater, count: 17 },
  { slug: "mixers", name: "Mixers", icon: Blend, count: 13 },
  { slug: "ups", name: "UPS", icon: Battery, count: 11 },
  { slug: "inverters", name: "Inverters", icon: Zap, count: 14 },
  { slug: "solar-systems", name: "Solar Systems", icon: Sun, count: 9 },
  { slug: "batteries", name: "Batteries", icon: BatteryCharging, count: 25 },
  { slug: "generators", name: "Generators", icon: Power, count: 10 },
  { slug: "kitchen-accessories", name: "Kitchen Accessories", icon: UtensilsCrossed, count: 32 },
  { slug: "small-appliances", name: "Small Appliances", icon: Coffee, count: 28 },
  { slug: "mobile-accessories", name: "Mobile Accessories", icon: Smartphone, count: 45 },
  { slug: "power-banks", name: "Power Banks", icon: BatteryFull, count: 22 },
  { slug: "extension-boards", name: "Extension Boards", icon: Plug, count: 18 },
  { slug: "electrical-accessories", name: "Electrical Accessories", icon: Cable, count: 30 },
];

export const brands = [
  "Haier", "PEL", "Dawlance", "Samsung", "LG", "Orient", "Canon", "Panasonic",
  "Philips", "Anex", "Westpoint", "Nasgas", "Boss", "Kenwood", "Gree",
  "Super Asia", "EcoStar", "Sony",
];

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string; // category slug
  price: number;
  original: number;
  rating: number;
  reviews: number;
  stock: "in-stock" | "low-stock" | "out-of-stock";
  isNew?: boolean;
  isBestSeller?: boolean;
  isFlash?: boolean;
  image: string;
  desc: string;
};

const tints = [
  "from-sky-100 to-indigo-100",
  "from-orange-100 to-rose-100",
  "from-emerald-100 to-teal-100",
  "from-purple-100 to-pink-100",
  "from-amber-100 to-orange-100",
  "from-slate-100 to-blue-100",
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Inverter Refrigerator 16 CFT No-Frost",
    brand: "Dawlance",
    category: "refrigerators",
    price: 189000,
    original: 215000,
    rating: 4.7,
    reviews: 218,
    stock: "in-stock",
    isBestSeller: true,
    image: "p1.jpg",
    desc: "Energy-saving inverter compressor, digital display, 10-year warranty on compressor."
  },
  {
    id: "p2",
    name: "DC Inverter Split AC 1.5 Ton Turbo Cool",
    brand: "Haier",
    category: "air-conditioners",
    price: 145000,
    original: 169000,
    rating: 4.8,
    reviews: 512,
    stock: "in-stock",
    isFlash: true,
    image: "p2.jpg",
    desc: "Cools 30% faster with turbo mode. Anti-bacterial filter and long-throw airflow."
  },
  {
    id: "p3",
    name: '55" 4K Crystal UHD Smart TV',
    brand: "Samsung",
    category: "smart-tvs",
    price: 165000,
    original: 189000,
    rating: 4.9,
    reviews: 340,
    stock: "in-stock",
    isNew: true,
    image: "p3.jpg",
    desc: "PurColor, HDR10+, built-in voice assistant and Tizen apps."
  },
  {
    id: "p4",
    name: "8kg Fully Automatic Front Load Washer",
    brand: "PEL",
    category: "washing-machines",
    price: 78500,
    original: 89000,
    rating: 4.5,
    reviews: 174,
    stock: "in-stock",
    image: "p4.jpg",
    desc: "16 wash programs, quick-wash cycle, energy class A+++."
  },
  {
    id: "p5",
    name: "Microwave Oven 30L Grill + Convection",
    brand: "Orient",
    category: "microwaves",
    price: 32900,
    original: 36900,
    rating: 4.4,
    reviews: 96,
    stock: "in-stock",
    image: "p5.jpg",
    desc: "10 auto-cook menus, child lock, easy-clean interior."
  },
  {
    id: "p6",
    name: "Ceiling Fan Super Deluxe 56\" Copper",
    brand: "Super Asia",
    category: "fans",
    price: 12500,
    original: 14200,
    rating: 4.6,
    reviews: 415,
    stock: "in-stock",
    isBestSeller: true,
    image: "p6.jpg",
    desc: "100% pure copper motor, high airflow, low noise."
  },
  {
    id: "p7",
    name: 'LED TV 43" Full HD Android',
    brand: "EcoStar",
    category: "led-tvs",
    price: 68900,
    original: 79900,
    rating: 4.3,
    reviews: 129,
    stock: "in-stock",
    image: "p7.jpg",
    desc: "Android smart TV with Google Play, Netflix and YouTube."
  },
  {
    id: "p8",
    name: "Chest Deep Freezer 12 CFT Twin",
    brand: "Dawlance",
    category: "deep-freezers",
    price: 95000,
    original: 108000,
    rating: 4.6,
    reviews: 88,
    stock: "low-stock",
    image: "p8.jpg",
    desc: "Twin doors, fast-freeze mode, tropical inverter compressor."
  },
  {
    id: "p9",
    name: "Instant Gas Geyser 8L",
    brand: "Nasgas",
    category: "geysers",
    price: 26900,
    original: 29900,
    rating: 4.4,
    reviews: 61,
    stock: "in-stock",
    isFlash: true,
    image: "p9.jpg",
    desc: "Instant hot water, LPG & natural gas compatible."
  },
  {
    id: "p10",
    name: "Room Air Cooler 65L Ice Chamber",
    brand: "Boss",
    category: "air-coolers",
    price: 34900,
    original: 39900,
    rating: 4.5,
    reviews: 143,
    stock: "in-stock",
    image: "p10.jpg",
    desc: "Honeycomb pads, remote control, ice chamber technology."
  },
  {
    id: "p11",
    name: "1200VA Home UPS Pure Sine Wave",
    brand: "Homage",
    category: "ups",
    price: 24500,
    original: 27900,
    rating: 4.6,
    reviews: 210,
    stock: "in-stock",
    image: "p11.jpg",
    desc: "Pure sine wave output, auto-restart, LCD indicators."
  },
  {
    id: "p12",
    name: "5kW Off-Grid Solar Inverter",
    brand: "Inverex",
    category: "solar-systems",
    price: 289000,
    original: 325000,
    rating: 4.8,
    reviews: 74,
    stock: "low-stock",
    isNew: true,
    image: "p12.jpg",
    desc: "MPPT solar charge controller, WiFi monitoring, dual output."
  },
  {
    id: "p13",
    name: "Automatic Vacuum Cleaner Robotic",
    brand: "Panasonic",
    category: "vacuum-cleaners",
    price: 42900,
    original: 49900,
    rating: 4.4,
    reviews: 55,
    stock: "in-stock",
    image: "p13.jpg",
    desc: "Smart mapping, app control, 120-min runtime."
  },
  {
    id: "p14",
    name: "Blender 3-in-1 Juicer Grinder",
    brand: "Anex",
    category: "blenders",
    price: 8900,
    original: 10500,
    rating: 4.3,
    reviews: 320,
    stock: "in-stock",
    image: "p14.jpg",
    desc: "Stainless steel blades, 3 jars, 700W copper motor."
  },
  {
    id: "p15",
    name: 'Smart LED TV 65" QLED 4K',
    brand: "Sony",
    category: "smart-tvs",
    price: 279000,
    original: 315000,
    rating: 4.9,
    reviews: 96,
    stock: "in-stock",
    isNew: true,
    image: "p15.jpg",
    desc: "QLED panel, Dolby Vision & Atmos, Google TV."
  },
  {
    id: "p16",
    name: "Water Dispenser Hot & Cold with Fridge",
    brand: "Orient",
    category: "water-dispensers",
    price: 32500,
    original: 36500,
    rating: 4.5,
    reviews: 82,
    stock: "in-stock",
    image: "p16.jpg",
    desc: "Hot, cold & normal water, built-in mini fridge."
  },
  {
    id: "p17",
    name: "Steam Iron 2200W Auto Shut-off",
    brand: "Philips",
    category: "iron",
    price: 7900,
    original: 9500,
    rating: 4.6,
    reviews: 405,
    stock: "in-stock",
    isBestSeller: true,
    image: "p17.jpg",
    desc: "Steam glide soleplate, calc-clean, quick heat-up."
  },
  {
    id: "p18",
    name: "20000mAh Fast Charge Power Bank",
    brand: "Anker",
    category: "power-banks",
    price: 6900,
    original: 8500,
    rating: 4.7,
    reviews: 512,
    stock: "in-stock",
    isFlash: true,
    image: "p18.jpg",
    desc: "22.5W PD fast charging, dual USB, digital display."
  },
];


export const formatPKR = (n: number) => `PKR ${n.toLocaleString("en-PK")}`;
