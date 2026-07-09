export type ServiceContent = {
  slug: string;
  title: string;
  shortDescription: string;
  metaDescription: string;
  intro: string;
  body: string[];
  useCases: string[];
  faqs: { q: string; a: string }[];
};

export const servicesContent: ServiceContent[] = [
  {
    slug: "hyperlocal-delivery",
    title: "Hyperlocal Delivery",
    shortDescription: "Point-to-point pickups and drops inside city limits, dispatched in minutes, not hours.",
    metaDescription:
      "Hyperlocal delivery across West Bengal with BM Xpress — rider dispatch inside minutes, live tracking, and COD support for local businesses in Murshidabad, Kolkata and beyond.",
    intro:
      "Hyperlocal delivery is built for businesses that need something moved across town, not across the country — a single parcel, a document, a last-minute order that can't wait for a scheduled run.",
    body: [
      "When a customer places an order that needs to move within the same city or town, every extra minute of dispatch time is a minute your customer notices. BM Xpress runs a rider-first hyperlocal network across our West Bengal hubs, so pickups are typically assigned to the nearest available rider within minutes of an order coming in, not batched into the next scheduled route.",
      "This works because our riders are staged inside each hub rather than centralised in one warehouse — a rider in Berhampore isn't waiting on a dispatch decision made in Kolkata. Each hub operates its own local queue, which keeps average pickup-to-assignment time low even during peak order volumes.",
      "Every hyperlocal order is tracked from pickup to delivery on the same live dashboard used across our other services, so your support team (and your customer, if you share the tracking link) can see exactly where the rider is at any point in the run.",
    ],
    useCases: [
      "Local retail stores fulfilling same-city online orders",
      "Pharmacies delivering prescriptions within a few kilometres",
      "Document and parcel courier for small businesses",
      "Restaurants and cloud kitchens needing overflow delivery capacity",
    ],
    faqs: [
      {
        q: "How fast is hyperlocal delivery in West Bengal with BM Xpress?",
        a: "Most hyperlocal orders are picked up within 15–30 minutes of being placed, depending on hub load and distance, with delivery typically completed the same hour for in-city drops.",
      },
      {
        q: "Do you support cash on delivery for hyperlocal orders?",
        a: "Yes — COD is supported and reconciled through our business dashboard, with settlement cycles agreed as part of your onboarding.",
      },
    ],
  },
  {
    slug: "same-day-delivery",
    title: "Same Day Delivery",
    shortDescription: "Order before the cutoff, delivered before sundown — built for time-sensitive shipments.",
    metaDescription:
      "Same-day delivery service across BM Xpress's West Bengal hub network — order before the daily cutoff and it's delivered before close of business.",
    intro:
      "Same-day delivery gives you a predictable, fixed-cost way to promise customers their order will arrive before the day is out — without the operational overhead of running your own fleet.",
    body: [
      "Same-day delivery sits between hyperlocal (immediate, small-radius) and next-day (scheduled, overnight) — it's for orders that don't need to move in the next 30 minutes but absolutely need to land before the business day ends. We publish a daily cutoff time per hub; anything booked before that cutoff is guaranteed a same-day attempt.",
      "Behind the scenes, same-day orders are batched into route-optimised runs rather than dispatched one-by-one, which keeps the per-order cost lower than hyperlocal while still hitting a same-day SLA. This makes it the default choice for D2C brands and marketplace sellers who need a dependable middle tier between instant delivery and scheduled logistics.",
      "You get the same live tracking, COD handling and delivery-proof capture as every other service tier — the difference is purely in how orders are batched and routed, not in visibility or accountability.",
    ],
    useCases: [
      "D2C brands promising same-day dispatch on their storefront",
      "Marketplace sellers fulfilling same-day SLA commitments",
      "B2B replenishment between warehouses and retail counters",
      "Time-sensitive documents and business correspondence",
    ],
    faqs: [
      {
        q: "What is the cutoff time for same-day delivery?",
        a: "Cutoff times vary by hub and are confirmed during onboarding — typically late morning to early afternoon for a same-day attempt.",
      },
      {
        q: "What happens if a same-day order is delayed?",
        a: "Any order that misses its same-day window is automatically escalated and prioritised for the next available run, with proactive notification to your ops contact.",
      },
    ],
  },
  {
    slug: "next-day-delivery",
    title: "Next Day Delivery",
    shortDescription: "Scheduled overnight runs across our full pincode network at a fixed, predictable cost.",
    metaDescription:
      "Next-day delivery across 200+ pincodes in West Bengal — scheduled overnight logistics from BM Xpress with fixed, predictable per-shipment pricing.",
    intro:
      "Next-day delivery is the backbone of our network — scheduled, route-optimised, and priced predictably enough to build into your unit economics.",
    body: [
      "Next-day delivery covers our full pincode network, including areas outside our primary same-day and hyperlocal hub radius. Orders booked during the day are consolidated overnight and dispatched on the first delivery wave the following morning, which lets us serve a much wider geography at a lower cost per shipment than same-day or hyperlocal tiers.",
      "This is the tier most of our 3PL and warehouse partners run as their default shipping option — it's predictable enough to quote a delivery date at checkout, and the batching means costs stay flat even as volume scales.",
      "Every next-day shipment still gets full tracking visibility, proof of delivery capture, and COD reconciliation — the scheduling is different from same-day, but the accountability isn't.",
    ],
    useCases: [
      "E-commerce and marketplace fulfilment at scale",
      "Retail chains replenishing stores across districts",
      "3PL partners needing a dependable default shipping tier",
      "Bulk B2B shipments where next-day is fast enough",
    ],
    faqs: [
      {
        q: "How many pincodes does next-day delivery cover?",
        a: "Next-day delivery is available across 200+ pincodes in our West Bengal network — the exact list is confirmed during onboarding based on your shipping origin.",
      },
      {
        q: "Is next-day delivery cheaper than same-day?",
        a: "Yes — because next-day orders are consolidated into overnight batch routes, the per-shipment cost is typically lower than same-day or hyperlocal delivery.",
      },
    ],
  },
  {
    slug: "quick-commerce",
    title: "Quick Commerce",
    shortDescription: "Sub-30-minute fulfilment for dark stores and instant-delivery storefronts.",
    metaDescription:
      "Quick commerce delivery infrastructure for dark stores and instant-delivery apps in West Bengal — sub-30-minute rider dispatch from BM Xpress.",
    intro:
      "Quick commerce runs on a completely different clock to traditional delivery — orders need a rider assigned in seconds and delivered in minutes, not hours.",
    body: [
      "Our quick commerce service is built around riders staged directly at or near your dark store, ready to pick the moment an order drops rather than being routed in from elsewhere in the city. This proximity-first staffing model is what makes sub-30-minute delivery windows achievable consistently, not just on a good day.",
      "We work with quick-commerce platforms and dark-store operators to size rider capacity against your order curve — including surge staffing for peak hours like evening meal times or weekend spikes — so your delivery promise doesn't slip when demand does.",
      "Integration is API-first: orders can be pushed to our dispatch system automatically from your platform, with webhook updates flowing back for tracking status, so your app's own tracking UI stays in sync without manual intervention.",
    ],
    useCases: [
      "Dark store and instant-delivery grocery platforms",
      "Quick-commerce marketplaces needing rider capacity on demand",
      "Pharmacy and essentials apps with tight delivery SLAs",
      "Restaurant aggregators running their own delivery layer",
    ],
    faqs: [
      {
        q: "Can BM Xpress guarantee 10-minute delivery?",
        a: "Delivery windows depend on order radius and rider staging, but our dark-store-adjacent rider model is built to consistently hit sub-30-minute windows, with faster times achievable in dense, well-staffed zones.",
      },
      {
        q: "Do you integrate with our order management system?",
        a: "Yes — we offer REST APIs for order creation and webhook-based tracking updates so orders flow automatically without manual dispatch.",
      },
    ],
  },
  {
    slug: "dark-store-fulfilment",
    title: "Dark Store",
    shortDescription: "Riders staged at your dark store, ready to pick the moment an order drops.",
    metaDescription:
      "Dark store fulfilment and rider staging for quick-commerce operators in West Bengal — BM Xpress keeps delivery capacity matched to your order curve.",
    intro:
      "Running a dark store means your delivery capacity has to move in lockstep with demand that spikes and falls within the same hour — we staff to that curve, not to a flat average.",
    body: [
      "Dark store fulfilment is about capacity planning as much as it is about delivery. We work with your operations team to understand your order curve — the predictable peaks around meal times, weekends, and local events — and staff riders at your store location accordingly, rather than a flat headcount that's either under capacity at peak or overpaid off-peak.",
      "Because riders are physically staged at your dark store, pick-to-dispatch time is minimal: there's no travel time between a central hub and your store before a rider can even start the delivery leg.",
      "We also support multi-store operators who need consistent SLAs across several dark store locations under one contract, one dashboard, and one point of operational contact rather than negotiating separately per site.",
    ],
    useCases: [
      "Single dark store operators needing dedicated rider capacity",
      "Multi-location quick-commerce chains standardising delivery SLAs",
      "Seasonal or event-driven demand spikes needing surge staffing",
      "New dark store launches needing delivery infrastructure from day one",
    ],
    faqs: [
      {
        q: "How is rider capacity decided for a dark store?",
        a: "We review historical or projected order volume by hour and staff riders to match that curve, with surge capacity built in for known peak periods.",
      },
      {
        q: "Can you support multiple dark store locations under one contract?",
        a: "Yes — multi-site operators can run all locations under a single agreement, dashboard and operations contact.",
      },
    ],
  },
  {
    slug: "warehouse-delivery",
    title: "Warehouse",
    shortDescription: "Bulk and pallet-level movement between warehouses, hubs and last-mile stations.",
    metaDescription:
      "Warehouse-to-hub and inter-warehouse delivery across West Bengal — bulk and pallet-level logistics from BM Xpress for retail and 3PL operators.",
    intro:
      "Not every shipment is a single parcel to a customer's door — warehouse delivery handles the bulk movement that keeps your supply chain fed upstream of last-mile.",
    body: [
      "Warehouse delivery covers the movement of stock between your warehouse and our last-mile hubs, between two of your own warehouses, or directly to retail counters that need bulk replenishment rather than individual parcel drops. This is priced and routed differently from parcel-level delivery — by load and distance rather than per-shipment.",
      "We work with vehicles sized to your typical load — from a loaded two-wheeler for smaller restocks up to light commercial vehicles for pallet-level movement — and can run scheduled recurring routes (a daily 6am run between your warehouse and a retail cluster, for example) rather than one-off bookings.",
      "For 3PL partners, warehouse delivery is usually the first leg of a longer chain that ends in last-mile delivery through our hyperlocal or next-day network — the two connect directly so stock keeps moving without a handoff gap.",
    ],
    useCases: [
      "Inter-warehouse stock transfers",
      "Bulk replenishment to retail counters and stores",
      "First-mile movement from warehouse to last-mile delivery hub",
      "Scheduled recurring routes for predictable restocking",
    ],
    faqs: [
      {
        q: "What vehicle types are used for warehouse delivery?",
        a: "Vehicle size is matched to load — from two-wheelers for smaller restocks to light commercial vehicles for pallet-level movement.",
      },
      {
        q: "Can warehouse delivery run on a recurring schedule?",
        a: "Yes — recurring routes (daily, weekly, or custom schedules) can be set up as part of your service agreement.",
      },
    ],
  },
  {
    slug: "dedicated-fleet",
    title: "Fleet Provider",
    shortDescription: "A fleet reserved for your brand alone — consistent riders, consistent SLAs.",
    metaDescription:
      "Dedicated delivery fleet solutions in West Bengal — riders reserved exclusively for your brand with consistent SLAs, from BM Xpress.",
    intro:
      "A dedicated fleet means the riders delivering your orders aren't shared with anyone else during their shift — consistency you can build a customer promise around.",
    body: [
      "High-volume partners and brands with strict delivery SLAs often need more than shared rider capacity — they need riders who are reserved for their orders during operating hours, trained specifically on their handling requirements, and consistently available regardless of what else is happening in the shared network that day.",
      "A dedicated fleet is sized to your peak volume and contracted on either a per-shift or full-day basis. Because the same riders work your account repeatedly, they become familiar with your pickup locations, packaging, and customer base — which tends to reduce delivery exceptions over time compared to a rotating shared pool.",
      "This tier is priced on a fleet-reservation basis rather than per-delivery, which gives you a fixed, forecastable delivery cost regardless of daily order fluctuations — useful for brands that need to lock in unit economics.",
    ],
    useCases: [
      "High-volume D2C brands with strict delivery SLAs",
      "Enterprise retail chains needing consistent daily coverage",
      "Brands requiring specially trained riders for sensitive handling",
      "Businesses that need predictable, fixed delivery costs",
    ],
    faqs: [
      {
        q: "How is a dedicated fleet priced?",
        a: "Dedicated fleet is priced on a fleet-reservation basis (per shift or per day) rather than per delivery, giving you a fixed, predictable cost.",
      },
      {
        q: "How many riders can be dedicated to one brand?",
        a: "Fleet size is sized against your peak volume during onboarding and can scale up as your order volume grows.",
      },
    ],
  },
  {
    slug: "3pl-logistics",
    title: "3PL Fulfillment",
    shortDescription: "End-to-end third-party logistics: storage, pick-pack, dispatch and delivery in one contract.",
    metaDescription:
      "Third-party logistics (3PL) in West Bengal — storage, pick-pack, dispatch and last-mile delivery under one contract with BM Xpress.",
    intro:
      "3PL logistics is for businesses that want to hand off the entire fulfilment chain — not just the last mile — under a single contract and a single point of accountability.",
    body: [
      "Our 3PL service covers the full chain from inventory storage through pick-pack and dispatch to final last-mile delivery. Rather than coordinating separate vendors for warehousing, order processing and delivery, you work with one operations team and one dashboard that shows inventory, order status and delivery progress in one place.",
      "This is particularly useful for brands entering West Bengal without their own warehouse infrastructure — you ship stock into our facility, and from that point on, order fulfilment through to doorstep delivery is handled entirely on our side, with your team only needing to push order data in and pull status data out.",
      "Because the same organisation controls storage through delivery, there's no handoff friction between fulfilment and last-mile — a common source of delay and lost accountability when those functions sit with different vendors.",
    ],
    useCases: [
      "Brands entering West Bengal without existing warehouse infrastructure",
      "D2C companies wanting to outsource fulfilment entirely",
      "Seasonal businesses needing flexible storage and dispatch capacity",
      "Marketplace sellers consolidating multiple fulfilment vendors into one",
    ],
    faqs: [
      {
        q: "Does 3PL include warehousing, or just delivery?",
        a: "Full 3PL includes storage, pick-pack, dispatch and last-mile delivery under one contract — it's the complete fulfilment chain, not delivery alone.",
      },
      {
        q: "Can we start with delivery only and add warehousing later?",
        a: "Yes — many partners start on a delivery-only tier (next-day, same-day, or dedicated fleet) and move to full 3PL once volume justifies dedicated storage.",
      },
    ],
  },
  {
    slug: "express-delivery",
    title: "Express Delivery",
    shortDescription: "Our fastest tier — priority dispatch and priority routing across the whole network.",
    metaDescription:
      "Express delivery from BM Xpress — priority dispatch and routing for time-critical shipments across West Bengal.",
    intro:
      "Express is the priority lane through our entire network — used when a shipment needs to jump the queue, not just move fast within one tier.",
    body: [
      "Where same-day and hyperlocal are speed tiers defined by geography and batching, Express is a priority flag that applies across any of them — the shipment gets first claim on the next available rider and isn't held for batch consolidation, regardless of which service tier it's shipping under.",
      "This is typically used for genuinely urgent one-off shipments — a replacement part that has to land today, a document that can't wait for the next scheduled run — rather than as a default checkout option, since priority dispatch carries a cost premium precisely because it pulls capacity away from batched routes.",
      "Every Express shipment gets the same tracking, proof-of-delivery and COD handling as standard tiers — the only difference is queue priority, not the underlying operational process.",
    ],
    useCases: [
      "Genuinely time-critical one-off shipments",
      "Replacement parts and urgent business documents",
      "Events and time-bound deliveries that can't slip",
      "VIP or escalated customer orders",
    ],
    faqs: [
      {
        q: "How is Express different from same-day delivery?",
        a: "Same-day is a scheduling tier with a daily cutoff; Express is priority dispatch that jumps the queue within whichever tier you're shipping under, for genuinely urgent single shipments.",
      },
      {
        q: "Is Express available everywhere in your network?",
        a: "Express priority is available across our full hub network, though actual delivery speed still depends on distance from the nearest hub.",
      },
    ],
  },
  {
    slug: "ecommerce-logistics",
    title: "Ecommerce Logistics",
    shortDescription: "Purpose-built fulfilment for online stores — from cart to doorstep, COD included.",
    metaDescription:
      "Ecommerce logistics for online stores in West Bengal — order fulfilment, COD collection and delivery from BM Xpress.",
    intro:
      "Ecommerce logistics bundles the specific mix of services online sellers actually need — next-day and same-day delivery, COD collection, and return handling — under one integration.",
    body: [
      "Running an online store means dealing with a delivery mix that a single generic courier tier doesn't quite fit: most orders can go next-day, some need same-day, a meaningful share are COD, and a share of those will come back as returns. Ecommerce logistics is that specific combination pre-configured as one service, rather than something you assemble yourself from separate contracts.",
      "For marketplace sellers and D2C brands, this usually means integrating order creation via our API so orders flow from your storefront or marketplace listing straight into dispatch, with tracking updates flowing back the same way — no manual order entry.",
      "COD reconciliation and return/RTO handling are built into the same service rather than being separate add-ons, which is usually where ecommerce sellers feel the most operational pain with generic courier partners.",
    ],
    useCases: [
      "D2C brands running their own online store",
      "Marketplace sellers on Flipkart, Amazon, Meesho and similar platforms",
      "Sellers needing integrated COD collection and reconciliation",
      "Stores with a meaningful return/RTO volume to manage",
    ],
    faqs: [
      {
        q: "Can this integrate with my Shopify or WooCommerce store?",
        a: "Yes — orders can be pushed via our API from most storefront platforms; our integration team can help map your specific setup during onboarding.",
      },
      {
        q: "Does this include return pickups?",
        a: "Yes — return-to-origin pickups are handled as part of the same service, not a separate booking.",
      },
    ],
  },
  {
    slug: "dedicated-riders",
    title: "Dedicated Riders",
    shortDescription: "Named riders assigned specifically to your business, not shared across other clients.",
    metaDescription:
      "Dedicated riders for your business from BM Xpress — named riders trained on your handling requirements, not shared across other clients.",
    intro:
      "Dedicated Riders puts specific, named individuals on your account — not a reserved capacity slot in a shared pool, but riders your team can actually know by name.",
    body: [
      "This sits one level more specific than our Fleet Provider tier: rather than reserving fleet capacity that could be filled by any available rider, Dedicated Riders assigns specific individuals to your business who work your account as their primary or sole assignment. Over time, they learn your pickup locations, packaging quirks, and customer expectations in a way a rotating pool can't replicate.",
      "This tier suits businesses with a moderate, steady order volume that doesn't yet justify a full reserved fleet, but where consistency of who's actually delivering matters — repeat B2B routes, premium D2C brands, or businesses where the rider is effectively a face of your brand at the doorstep.",
      "Replacement riders are provided for leave or attrition with a handover period, so continuity doesn't fully reset each time someone moves on.",
    ],
    useCases: [
      "Businesses wanting brand consistency at the doorstep",
      "Steady repeat B2B delivery routes",
      "Premium D2C brands where delivery experience matters",
      "Moderate volume that doesn't yet need a full dedicated fleet",
    ],
    faqs: [
      {
        q: "How is this different from Fleet Provider?",
        a: "Fleet Provider reserves capacity that can be filled by any available rider; Dedicated Riders assigns specific named individuals to your account for continuity.",
      },
      {
        q: "What happens if my dedicated rider is on leave?",
        a: "A replacement is provided with a handover period so your account stays covered without a full continuity reset.",
      },
    ],
  },
  {
    slug: "reverse-logistics",
    title: "Reverse Logistics",
    shortDescription: "Pickups, returns and exchanges routed back through the network as smoothly as forward delivery.",
    metaDescription:
      "Reverse logistics and return pickup service from BM Xpress — customer returns and exchanges routed back through the network across West Bengal.",
    intro:
      "Reverse logistics is forward delivery run backwards — a return pickup from the customer, routed back to your warehouse or origin point, tracked the same way as an outbound order.",
    body: [
      "Every return or exchange is, operationally, a delivery in the opposite direction: a rider needs to go to the customer's address, collect the item, and route it back to your warehouse or a return processing point. We run this through the same rider network and hub infrastructure as forward delivery, rather than treating returns as an afterthought bolted onto a different process.",
      "This matters most for ecommerce sellers, where return volume is a predictable percentage of forward orders and needs the same tracking rigor — a return that goes missing between pickup and warehouse is as costly as a lost outbound delivery.",
      "Reverse pickups can be scheduled individually or set up as a recurring collection route for sellers with steady, predictable return volume from specific pickup zones.",
    ],
    useCases: [
      "Ecommerce return and exchange pickups",
      "Defective or wrong-item collection for D2C brands",
      "Scheduled recurring return routes for high-return categories",
      "Warehouse-to-warehouse reverse stock movement",
    ],
    faqs: [
      {
        q: "How is a return pickup tracked?",
        a: "The same live tracking and status timeline used for forward delivery applies to return pickups, so you can see when it's collected and when it reaches your warehouse.",
      },
      {
        q: "Can returns be batched into a recurring pickup route?",
        a: "Yes — sellers with steady return volume from the same zones can set up scheduled recurring collection instead of booking each return individually.",
      },
    ],
  },
  {
    slug: "cod-management",
    title: "COD Management",
    shortDescription: "Cash collection, reconciliation and settlement — handled systematically, not on trust.",
    metaDescription:
      "Cash on delivery (COD) management from BM Xpress — systematic collection, reconciliation and weekly settlement for sellers across West Bengal.",
    intro:
      "COD Management is the reconciliation layer underneath every cash-on-delivery order we run — tracking cash from rider collection through to your settlement, order by order.",
    body: [
      "Every COD order is tracked individually from the moment a rider collects payment through deposit and settlement, rather than reconciled only at the rider or route level. That order-level tracking is what makes it possible to identify shortfalls or disputes quickly instead of discovering a gap weeks later during a broader audit.",
      "Collected cash is deposited by riders at their hub rather than held, and hub-level custody is itself tracked before funds move to bank deposit — the same discipline our internal hub cash-custody process uses operationally, now extended into a reportable service for partners.",
      "Settlement runs on a weekly cycle by default, with a reconciliation report showing exactly which orders were collected, deposited and settled — so you're not just told a total, you can see it order by order.",
    ],
    useCases: [
      "Ecommerce and marketplace sellers running COD as a payment option",
      "Businesses needing weekly, auditable settlement",
      "Sellers who've had reconciliation gaps with previous delivery partners",
      "High COD-volume operations needing order-level accountability",
    ],
    faqs: [
      {
        q: "How often is COD settled?",
        a: "Weekly by default — other cycles can be arranged for high-volume partners during onboarding.",
      },
      {
        q: "Can I see a reconciliation report per order, not just a total?",
        a: "Yes — every settlement cycle comes with an order-level report showing collection, deposit and settlement status for each COD order.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return servicesContent.find((s) => s.slug === slug);
}
