export const siteConfig = {
  name: "BM Xpress",
  legalName: "BM Xpress Logistics Private Limited",
  tagline: "The Future of Smart Logistics",
  description:
    "Technology-powered last-mile delivery, fulfilment and logistics solutions helping businesses scale across India.",
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

/* ------------------------------------------------------------------ */
/* Clients — confirmed active or signed. Do not add a name here        */
/* without a real commercial relationship behind it.                   */
/* ------------------------------------------------------------------ */

export type ClientLogo = { name: string; src?: string };

export const trustedBy: ClientLogo[] = [
  { name: "Flipkart" },
  { name: "Blinkit" },
  { name: "BigBasket" },
  { name: "IGP" },
  { name: "Pidge" },
  { name: "Adloggs" },
  { name: "Manipal Group" },
  { name: "Fresh To You" },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const aboutPillars = [
  {
    title: "Technology first",
    description:
      "Dispatch, routing, proof of delivery and reconciliation run on our own platform — not spreadsheets and phone calls.",
  },
  {
    title: "Built to scale",
    description:
      "The same system that runs a single hyperlocal route runs a multi-hub contract. Growth is a configuration change, not a rebuild.",
  },
  {
    title: "Operational reliability",
    description:
      "Every shipment carries a status trail, a named rider and a settlement record. Nothing moves without an audit line.",
  },
  {
    title: "Customer first",
    description:
      "A named operations contact per account. Escalations reach a person who can act, not a ticket queue.",
  },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services = [
  { title: "Last Mile Delivery", description: "The final hop to the customer's door, tracked end to end with digital proof of delivery." },
  { title: "Hyperlocal Delivery", description: "Point-to-point pickups and drops inside city limits, dispatched in minutes." },
  { title: "Same Day Delivery", description: "Order before the cutoff, delivered before sundown — built for time-sensitive shipments." },
  { title: "Next Day Delivery", description: "Scheduled overnight runs at a fixed, predictable cost per shipment." },
  { title: "Quick Commerce", description: "Sub-30-minute fulfilment for dark stores and instant-delivery storefronts." },
  { title: "Warehouse Fulfilment", description: "Storage, pick, pack and dispatch handled as one integrated operation." },
  { title: "Dark Store Operations", description: "Riders staged at your dark store, ready to pick the moment an order lands." },
  { title: "B2B Logistics", description: "Bulk and pallet movement between warehouses, hubs and retail points." },
  { title: "Enterprise Logistics", description: "Multi-site contracts with dedicated capacity, custom SLAs and account governance." },
  { title: "Dedicated Fleet Solutions", description: "A fleet reserved for your brand alone — consistent riders, consistent standards." },
];

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export const industries = [
  { name: "E-commerce", note: "Marketplace and own-storefront order flow, COD included." },
  { name: "Retail", note: "Store replenishment and direct-to-customer fulfilment." },
  { name: "Fashion", note: "High return rates handled through reverse logistics." },
  { name: "Grocery", note: "Temperature-aware handling on short delivery windows." },
  { name: "Healthcare", note: "Chain-of-custody handling for sensitive consignments." },
  { name: "FMCG", note: "High-frequency, high-volume distribution runs." },
  { name: "Food Delivery", note: "Sub-30-minute dispatch built for peak-hour density." },
  { name: "Electronics", note: "High-value shipments with signature-based delivery." },
  { name: "D2C Brands", note: "API-native order creation straight from your storefront." },
  { name: "Manufacturing", note: "Inbound and outbound movement between plants and hubs." },
];

/* ------------------------------------------------------------------ */
/* Technology                                                          */
/* ------------------------------------------------------------------ */

export const technology = [
  { title: "Real-Time Tracking", description: "Live rider position, route and ETA on every active shipment." },
  { title: "Route Optimisation", description: "Spatial assignment picks the rider who can actually get there fastest." },
  { title: "Automated Dispatch", description: "Orders route to the nearest available rider without a coordinator in the loop." },
  { title: "API Integration", description: "REST endpoints for order creation, with signed webhooks for status callbacks." },
  { title: "Analytics Dashboard", description: "SLA performance, failure reasons and settlement, per account." },
  { title: "Digital Proof of Delivery", description: "Signature or photo captured at the door and attached to the order." },
  { title: "Cloud Platform", description: "Managed infrastructure that scales with volume, not with headcount." },
  { title: "Enterprise Security", description: "Row-level access control and audited data boundaries by default." },
  { title: "Smart Notifications", description: "Status events pushed to your systems and your customer, as they happen." },
];

/* ------------------------------------------------------------------ */
/* Why BM Xpress                                                       */
/* ------------------------------------------------------------------ */

export const whyChooseUs = [
  { title: "Technology Driven", description: "Every rider, hub and order lives in one live system." },
  { title: "Reliable Operations", description: "Status trails and settlement records on every shipment." },
  { title: "Fast Turnaround", description: "Automated dispatch removes the coordination delay before pickup." },
  { title: "Business Scalability", description: "The platform that runs one route runs a hundred." },
  { title: "Enterprise Support", description: "A named operations contact, not a ticket queue." },
  { title: "Flexible Solutions", description: "Hyperlocal, next-day or dedicated fleet under one contract." },
  { title: "Transparent Communication", description: "You see what we see — the same live status, the same data." },
  { title: "Customer Success", description: "Onboarding and account review handled by people who know your ops." },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const processSteps = [
  { label: "Request", description: "An order arrives from your checkout, our API, or the hub console." },
  { label: "Pickup", description: "The nearest rider is assigned and collects the consignment." },
  { label: "Sorting", description: "The parcel is scanned and bagged at the origin hub." },
  { label: "Transportation", description: "Line-haul moves it to the destination hub." },
  { label: "Last Mile", description: "A runsheet rider carries it the final hop." },
  { label: "Delivered", description: "Signature or photo captured, and the order closes out." },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "What areas do you currently serve?",
    a: "Our own hub network operates across West Bengal, where we run riders and infrastructure directly. For shipments beyond that footprint we work through vetted network partners under the same tracking and settlement standards. We'll tell you plainly which of the two applies to your lanes before you sign anything.",
  },
  {
    q: "Can BM Xpress integrate with my existing storefront or ERP?",
    a: "Yes. Orders can be created over our REST API, and status changes are pushed back to your systems through signed webhooks. Our integration team maps your specific setup during onboarding rather than handing you a spec and wishing you luck.",
  },
  {
    q: "How is cash on delivery reconciled?",
    a: "Every COD order is tracked individually from rider collection through hub deposit to settlement, rather than reconciled in bulk at the route level. You get an order-level report each cycle, so a shortfall surfaces in days rather than during a quarterly audit.",
  },
  {
    q: "What happens when a delivery fails?",
    a: "The rider records a failure reason at the door, which lands in your dashboard immediately. Depending on the agreed rule for your account, the shipment is either re-attempted or routed back to origin — either way, tracked the same as forward delivery.",
  },
  {
    q: "Do you offer dedicated riders or fleet?",
    a: "Yes, at two levels. Dedicated Fleet reserves capacity for your brand; Dedicated Riders assigns specific named individuals to your account for continuity. Which one fits depends on your volume and how much rider familiarity matters to your delivery experience.",
  },
  {
    q: "How do we start?",
    a: "Contact sales with your lanes, volumes and SLA expectations. We'll come back with a rate card and an honest answer on which lanes we run directly versus through partners.",
  },
];

/* ------------------------------------------------------------------ */
/* Tracking UI (demo)                                                  */
/* ------------------------------------------------------------------ */

export const shipmentTimeline = [
  { label: "Pickup", time: "10:04 AM" },
  { label: "Processing", time: "10:12 AM" },
  { label: "Transit", time: "10:41 AM" },
  { label: "Out For Delivery", time: "10:52 AM" },
  { label: "Delivered", time: "11:16 AM" },
];

/* ------------------------------------------------------------------ */
/* Hub network — real facilities only                                  */
/* ------------------------------------------------------------------ */

export const coverageHubs = [
  { id: "murshidabad", name: "Murshidabad", x: 60, y: 18, tier: "primary" as const },
  { id: "malda", name: "Malda", x: 30, y: 8, tier: "secondary" as const },
  { id: "nadia", name: "Nadia", x: 62, y: 46, tier: "secondary" as const },
  { id: "hooghly", name: "Hooghly", x: 38, y: 62, tier: "secondary" as const },
  { id: "kolkata", name: "Kolkata", x: 55, y: 78, tier: "primary" as const },
  { id: "howrah", name: "Howrah", x: 40, y: 80, tier: "secondary" as const },
  { id: "durgapur", name: "Durgapur", x: 14, y: 50, tier: "secondary" as const },
  { id: "asansol", name: "Asansol", x: 6, y: 38, tier: "secondary" as const },
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
