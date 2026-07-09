export const siteConfig = {
  name: "BM Xpress",
  legalName: "BM Xpress Logistics Private Limited",
  tagline: "Delivering Speed. Powered by Technology.",
  description:
    "Hyperlocal delivery, last-mile logistics, quick commerce fulfilment and dedicated fleet solutions across West Bengal — built on a network of 500+ riders and 200+ pincodes.",
  url: "https://bmxpress.in",
  phone: "8597891638",
  phoneDisplay: "+91 85978 91638",
  email: "contact@bmxpress.in",
  address: {
    line1: "Village Kamarpara, Gouripur",
    line2: "Sagardighi, Murshidabad",
    line3: "West Bengal 742122",
  },
  social: {
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/918597891638",
  },
};

export const heroStats = [
  { value: 500, suffix: "+", label: "Active riders" },
  { value: 30, suffix: "+", label: "Service locations" },
  { value: 200, suffix: "+", label: "Pincodes covered" },
  { value: 24, suffix: "x7", label: "Operations" },
];

export type ClientLogo = {
  name: string;
  /**
   * Optional path to a logo file in /public/logos (e.g. "/logos/flipkart.svg").
   * When absent, the client's name renders as a styled wordmark instead —
   * so the marquee works today and upgrades to real logos with a one-line edit.
   */
  src?: string;
};

export const trustedBy: ClientLogo[] = [
  { name: "Flipkart" },
  { name: "Pidge" },
  { name: "Shiprocket" },
  { name: "Adloggs" },
  { name: "ONDC" },
  { name: "ElasticRun" },
  { name: "Meesho" },
  { name: "Amazon" },
  { name: "Nykaa" },
  { name: "Licious" },
  { name: "More Retail" },
  { name: "Blinkit" },
  { name: "Zepto" },
  { name: "Swiggy" },
  { name: "Zomato" },
  { name: "BigBasket" },
];

export const services = [
  {
    title: "Hyperlocal Delivery",
    description: "Point-to-point pickups and drops inside city limits, dispatched in minutes, not hours.",
  },
  {
    title: "Same Day Delivery",
    description: "Order before the cutoff, delivered before sundown — built for time-sensitive shipments.",
  },
  {
    title: "Next Day Delivery",
    description: "Scheduled overnight runs across our full pincode network at a fixed, predictable cost.",
  },
  {
    title: "Quick Commerce",
    description: "Sub-30-minute fulfilment for dark stores and instant-delivery storefronts.",
  },
  {
    title: "Dark Store Fulfilment",
    description: "Riders staged at your dark store, ready to pick the moment an order drops.",
  },
  {
    title: "Warehouse Delivery",
    description: "Bulk and pallet-level movement between warehouses, hubs and last-mile stations.",
  },
  {
    title: "Dedicated Fleet",
    description: "A fleet reserved for your brand alone — consistent riders, consistent SLAs.",
  },
  {
    title: "3PL Logistics",
    description: "End-to-end third-party logistics: storage, pick-pack, dispatch and delivery in one contract.",
  },
];

export const features = [
  { title: "Fast Delivery", description: "Median delivery time under 40 minutes inside serviceable hubs." },
  { title: "Real-Time Tracking", description: "Live rider location, ETA and route on every single order." },
  { title: "COD Management", description: "Cash collection, reconciliation and next-day settlement handled for you." },
  { title: "Dedicated Fleet", description: "Ring-fenced riders for high-volume partners during peak hours." },
  { title: "API Integration", description: "REST APIs for order creation, tracking webhooks and rate cards." },
  { title: "Warehouse Management", description: "Inventory-aware dispatch straight from your fulfilment centre." },
  { title: "Professional Riders", description: "Verified, trained and uniformed riders representing your brand." },
  { title: "Business Dashboard", description: "One panel for orders, payouts, performance and support tickets." },
];

export const whyChooseUs = [
  { title: "Fastest Delivery", description: "Route-optimised dispatch keeps last-mile time to a minimum." },
  { title: "Reliable Operations", description: "24x7 hub coverage means no single point of failure." },
  { title: "Affordable Pricing", description: "Volume-based rate cards that scale down as you scale up." },
  { title: "Dedicated Support", description: "A named operations contact, not a ticket queue." },
  { title: "Technology Driven", description: "Every rider, hub and order tracked through one live system." },
  { title: "Professional Team", description: "Riders trained on handling, etiquette and delivery protocol." },
];

export const numbers = [
  { value: 500, suffix: "+", label: "Active riders" },
  { value: 3000, suffix: "+", label: "Daily deliveries" },
  { value: 200, suffix: "+", label: "Pincodes" },
  { value: 99, suffix: "%", label: "Delivery success" },
];

export const testimonials = [
  {
    quote: "BM Xpress became our default courier for every dark store launch in Murshidabad — SLAs held even during festival spikes.",
    name: "Operations Lead",
    company: "Quick-commerce partner",
  },
  {
    quote: "Onboarding took two days. Our COD reconciliation finally closes on time every single week.",
    name: "Finance Manager",
    company: "D2C fashion brand",
  },
  {
    quote: "Their dedicated fleet model gave us predictable delivery costs we could actually forecast against.",
    name: "Supply Chain Head",
    company: "Regional retail chain",
  },
  {
    quote: "The live dashboard means our support team stopped guessing where an order was and started just checking.",
    name: "Customer Experience Lead",
    company: "Marketplace seller",
  },
];

export type CoverageHub = {
  id: string;
  name: string;
  x: number;
  y: number;
  tier: "primary" | "hub";
};

// Schematic network layout (not geographically literal) — styled like a
// transit map so the coverage story reads as a live delivery network.
export const coverageHubs: CoverageHub[] = [
  { id: "murshidabad", name: "Murshidabad", x: 60, y: 18, tier: "primary" },
  { id: "malda", name: "Malda", x: 30, y: 8, tier: "hub" },
  { id: "nadia", name: "Nadia", x: 62, y: 46, tier: "hub" },
  { id: "hooghly", name: "Hooghly", x: 38, y: 62, tier: "hub" },
  { id: "kolkata", name: "Kolkata", x: 55, y: 78, tier: "primary" },
  { id: "howrah", name: "Howrah", x: 40, y: 80, tier: "hub" },
  { id: "durgapur", name: "Durgapur", x: 14, y: 50, tier: "hub" },
  { id: "asansol", name: "Asansol", x: 6, y: 38, tier: "hub" },
];

export const coverageRoutes: [string, string][] = [
  ["asansol", "durgapur"],
  ["durgapur", "hooghly"],
  ["malda", "murshidabad"],
  ["murshidabad", "nadia"],
  ["nadia", "hooghly"],
  ["hooghly", "howrah"],
  ["howrah", "kolkata"],
  ["nadia", "kolkata"],
];

export const shipmentTimeline = [
  { label: "Order Picked", time: "10:04 AM" },
  { label: "In Transit", time: "10:12 AM" },
  { label: "Out for Delivery", time: "10:41 AM" },
  { label: "Delivered", time: "10:58 AM" },
];
