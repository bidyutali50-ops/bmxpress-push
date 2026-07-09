export type AreaContent = {
  slug: string;
  name: string;
  region: string;
  metaDescription: string;
  intro: string;
  body: string[];
  localNotes: string[];
};

export const areasContent: AreaContent[] = [
  {
    slug: "murshidabad",
    name: "Murshidabad",
    region: "Murshidabad district, West Bengal",
    metaDescription:
      "Delivery and logistics services in Murshidabad, West Bengal — hyperlocal, same-day and next-day delivery from BM Xpress, headquartered in Sagardighi.",
    intro:
      "Murshidabad is home to our headquarters — the district where BM Xpress operates its deepest hub coverage and the shortest average dispatch times in our network.",
    body: [
      "Our operations are based out of Sagardighi, giving us dense rider coverage across Murshidabad's mix of urban centres like Berhampore and Jangipur and the more spread-out rural pockets that many courier networks skip entirely. If your business already ships into Murshidabad, there's a good chance we already cover your delivery pincode.",
      "Because this is our home district, Murshidabad benefits from our shortest hub-to-hub coordination time — hyperlocal orders here typically see faster pickup assignment than in districts further from our operational base.",
      "We support retail, pharma, grocery and D2C brands operating in and around Murshidabad, with COD collection and reconciliation handled locally so you're not waiting on settlements to route through a distant regional office.",
    ],
    localNotes: [
      "Hub coverage: Sagardighi, Berhampore, Jangipur and surrounding blocks",
      "Fastest average dispatch time in our network",
      "Full COD collection and local settlement",
    ],
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    region: "Kolkata, West Bengal",
    metaDescription:
      "Hyperlocal and same-day delivery in Kolkata from BM Xpress — dense rider coverage across the city for quick commerce, D2C and 3PL partners.",
    intro:
      "Kolkata is our largest urban hub — a dense, high-order-volume market where speed and rider density matter more than almost anywhere else in our network.",
    body: [
      "As West Bengal's largest city and its commercial capital, Kolkata carries the highest order density in our network — which means we run our densest rider staffing here to keep pickup and delivery times competitive against city traffic and distance between neighbourhoods.",
      "We serve quick-commerce dark stores, D2C brands, marketplace sellers and enterprise retail chains across Kolkata's metro area, with hyperlocal delivery built for the reality of moving through a busy metro rather than a rural or semi-urban route.",
      "Kolkata is also our primary hub for onward next-day connections into surrounding districts — Howrah, Hooghly and Nadia are all a short hop from our Kolkata coordination point, which keeps regional delivery times tight.",
    ],
    localNotes: [
      "Highest rider density in our network",
      "Primary connection point for onward delivery to Howrah, Hooghly and Nadia",
      "Preferred hub for quick-commerce and dark-store partners",
    ],
  },
  {
    slug: "howrah",
    name: "Howrah",
    region: "Howrah district, West Bengal",
    metaDescription:
      "Delivery services in Howrah, West Bengal — hyperlocal and next-day delivery from BM Xpress, connected directly to our Kolkata hub network.",
    intro:
      "Howrah sits right across the river from Kolkata and functions as an industrial and transport hub in its own right — our coverage here is built to serve both.",
    body: [
      "Howrah's mix of industrial areas, residential neighbourhoods and its role as a major rail and transport junction makes it a distinct delivery market from Kolkata proper, even though the two are geographically close. We run dedicated hub coverage in Howrah rather than treating it as an extension of Kolkata, which keeps local dispatch times accurate to actual road distance rather than straight-line distance across the river.",
      "Retailers and manufacturers based in Howrah's industrial belt use our warehouse delivery and dedicated fleet services for B2B movement, while D2C and quick-commerce partners lean on hyperlocal and same-day delivery for residential drops.",
      "Because Howrah connects directly into our Kolkata coordination hub, cross-district orders (Howrah to Kolkata or onward) move without the delay of routing through a distant central hub.",
    ],
    localNotes: [
      "Dedicated hub coverage, not treated as a Kolkata extension",
      "Strong fit for industrial B2B and warehouse delivery",
      "Direct connection into the Kolkata hub for cross-district orders",
    ],
  },
  {
    slug: "hooghly",
    name: "Hooghly",
    region: "Hooghly district, West Bengal",
    metaDescription:
      "Delivery and logistics coverage in Hooghly district, West Bengal — same-day and next-day delivery from BM Xpress across Chinsurah, Serampore and Chandannagar.",
    intro:
      "Hooghly district's spread of industrial towns along the river — Chinsurah, Serampore, Chandannagar and beyond — needs a delivery network that doesn't treat the whole district as one dispatch zone.",
    body: [
      "Hooghly is geographically long and narrow, stretched along the river with distinct towns rather than one contiguous urban sprawl. We route deliveries here by local sub-zone rather than a single district-wide dispatch queue, which keeps delivery times realistic for a district where two pincodes can be 40 kilometres apart.",
      "The district's industrial base — jute mills, engineering units and a growing retail and D2C presence — means we see a mix of bulk warehouse delivery and parcel-level hyperlocal and next-day orders, often from the same business shipping both B2B and D2C.",
      "Hooghly connects into our Kolkata and Howrah hubs for onward routing, so orders moving between Hooghly and the wider Kolkata metro area don't need a separate regional handoff.",
    ],
    localNotes: [
      "Sub-zone routing across Chinsurah, Serampore and Chandannagar",
      "Strong fit for combined B2B warehouse and D2C parcel delivery",
      "Connected into Kolkata and Howrah hubs for onward routing",
    ],
  },
  {
    slug: "malda",
    name: "Malda",
    region: "Malda district, West Bengal",
    metaDescription:
      "Delivery services in Malda, West Bengal — next-day and scheduled delivery from BM Xpress for retail, grocery and D2C businesses.",
    intro:
      "Malda anchors the northern end of our coverage network, connecting our core Murshidabad operations up toward North Bengal.",
    body: [
      "As one of the northernmost districts in our active network, Malda is primarily served through scheduled next-day delivery rather than hyperlocal dispatch — the distance from our core hubs means batched, route-optimised runs make more operational sense than instant dispatch for most order types here.",
      "We work with retail stores, agricultural produce-linked businesses and growing D2C sellers in and around English Bazar and the wider district, with COD collection built into the same reconciliation process used across our network.",
      "For businesses that need faster-than-next-day service in Malda — a launch event, a time-critical B2B shipment — same-day delivery can be arranged with advance coordination, even where it isn't the default service tier for the area.",
    ],
    localNotes: [
      "Primary coverage via scheduled next-day delivery",
      "Serves English Bazar and surrounding blocks",
      "Same-day service available with advance coordination for time-critical orders",
    ],
  },
  {
    slug: "asansol",
    name: "Asansol",
    region: "Paschim Bardhaman district, West Bengal",
    metaDescription:
      "Delivery and logistics in Asansol, West Bengal — hyperlocal, next-day and warehouse delivery from BM Xpress across the Asansol-Durgapur industrial belt.",
    intro:
      "Asansol is a core part of the industrial belt that runs alongside Durgapur — our coverage here is built with heavier B2B and warehouse movement in mind, alongside standard parcel delivery.",
    body: [
      "As one of West Bengal's major industrial centres, Asansol sees a different order mix than our more residential-heavy hubs — a larger share of warehouse delivery, bulk B2B movement and dedicated fleet contracts alongside standard hyperlocal and next-day parcel delivery.",
      "We run coordinated coverage across the wider Asansol-Durgapur belt, which means businesses with operations spanning both towns can run delivery under a single contract and dashboard rather than treating them as separate service areas.",
      "For retail and D2C sellers operating in Asansol specifically, hyperlocal and same-day delivery are fully supported alongside the industrial and warehouse services the district is best known for on our network.",
    ],
    localNotes: [
      "Coordinated coverage across the Asansol-Durgapur industrial belt",
      "Strong fit for warehouse delivery and dedicated fleet contracts",
      "Standard hyperlocal and same-day delivery also available for retail and D2C",
    ],
  },
  {
    slug: "durgapur",
    name: "Durgapur",
    region: "Paschim Bardhaman district, West Bengal",
    metaDescription:
      "Delivery services in Durgapur, West Bengal — hyperlocal, next-day and dedicated fleet delivery from BM Xpress across the industrial city and surrounding areas.",
    intro:
      "Durgapur's planned industrial layout and growing retail sector make it one of the more straightforward cities in our network to run dense, fast delivery coverage in.",
    body: [
      "Durgapur's grid-planned layout — a legacy of its development as a steel and industrial township — makes route planning more predictable than in older, denser urban centres, which translates into consistent hyperlocal and same-day delivery times across the city.",
      "We serve Durgapur's steel-belt industrial businesses with warehouse delivery and dedicated fleet contracts, while the city's growing residential and retail sectors are served through standard hyperlocal, same-day and next-day parcel delivery.",
      "Durgapur connects into our wider Asansol coverage for businesses that need delivery across both towns under one operational relationship rather than separate vendor contracts.",
    ],
    localNotes: [
      "Predictable, planned street layout supports consistent delivery times",
      "Strong industrial B2B base alongside growing retail and D2C demand",
      "Connected coverage with Asansol for multi-town operations",
    ],
  },
  {
    slug: "nadia",
    name: "Nadia",
    region: "Nadia district, West Bengal",
    metaDescription:
      "Delivery and logistics coverage in Nadia district, West Bengal — hyperlocal, same-day and next-day delivery from BM Xpress across Krishnanagar, Kalyani and Ranaghat.",
    intro:
      "Nadia's spread of university towns, planned townships and market centres — Krishnanagar, Kalyani, Ranaghat — gets coverage tuned to each town's own delivery pattern.",
    body: [
      "Nadia isn't a single urban market — it's a collection of distinct towns with different order profiles: Kalyani's planned township layout, Krishnanagar's mix of administrative and retail activity, and Ranaghat's market-town character. We route delivery by local sub-zone rather than a flat district-wide model to reflect that.",
      "The district sits close enough to our Kolkata hub for same-day delivery to be a practical default for many Nadia towns, rather than falling back to next-day-only coverage as some more distant districts do.",
      "Retail, grocery and growing e-commerce demand across Nadia's towns are served through the same hyperlocal, same-day and next-day tiers available across our core network, with COD reconciliation handled centrally.",
    ],
    localNotes: [
      "Sub-zone routing across Krishnanagar, Kalyani and Ranaghat",
      "Same-day delivery available as a practical default, not just next-day",
      "Proximity to Kolkata hub keeps regional delivery times competitive",
    ],
  },
];

export function getAreaBySlug(slug: string) {
  return areasContent.find((a) => a.slug === slug);
}
