export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "same-day-vs-next-day-delivery",
    title: "Same-Day vs Next-Day Delivery: What Quick-Commerce Brands Should Actually Choose",
    excerpt:
      "Same-day delivery isn't always the better choice — here's how to decide which tier fits your order profile, margins and customer expectations.",
    metaDescription:
      "Same-day vs next-day delivery for quick-commerce and D2C brands in West Bengal — how to choose the right tier based on order profile, cost and customer expectations.",
    publishedAt: "2026-05-04",
    readingMinutes: 6,
    sections: [
      {
        heading: "The real difference isn't speed — it's how orders get batched",
        paragraphs: [
          "It's tempting to think of same-day and next-day delivery as just two points on a speed dial — one fast, one slower. But the operational difference underneath matters more than the label: same-day orders are typically dispatched close to individually, while next-day orders are consolidated into overnight, route-optimised batches.",
          "That batching is exactly why next-day delivery costs less per shipment. A rider covering a next-day route might carry fifteen to twenty parcels along an optimised path; a same-day rider is often covering a much smaller, more urgent set of drops. You're not just paying for speed — you're paying for the loss of batching efficiency that speed requires.",
        ],
      },
      {
        heading: "When same-day is worth the premium",
        paragraphs: [
          "Same-day makes sense when the order itself is time-sensitive in a way the customer will actually notice and value — a same-city gift order placed in the morning for an evening event, a pharmacy refill, a business document that needs to be signed today. In these cases, the customer's willingness to pay (or your willingness to absorb the cost as a competitive differentiator) usually justifies the higher per-shipment cost.",
          "It's a weaker choice when applied indiscriminately as a default checkout option 'because customers like fast shipping.' Most customers say they want same-day delivery in a survey; far fewer actually notice or care about the difference between same-day and next-day for a routine online order that isn't time-critical.",
        ],
      },
      {
        heading: "A practical way to decide",
        paragraphs: [
          "Look at your actual order data rather than guessing: what share of your orders are placed with genuine urgency (event-driven, replacement, refill) versus routine restocking or non-urgent purchases? If it's a small minority, offering same-day as a paid upgrade rather than the default checkout tier usually protects your margins without hurting conversion.",
          "For most D2C and marketplace sellers, the highest-leverage move is making next-day delivery reliable and well-communicated — a customer who's told 'delivered by tomorrow' and receives exactly that is often just as satisfied as one who paid extra for same-day and got it. Reliability, more than raw speed, tends to be what actually drives repeat purchase behaviour.",
        ],
      },
    ],
  },
  {
    slug: "how-cod-reconciliation-works",
    title: "How COD Reconciliation Actually Works (And Why It's Usually Where Delivery Partnerships Break Down)",
    excerpt:
      "Cash on delivery sounds simple until you're the one reconciling it across hundreds of orders a week. Here's what a working COD process looks like.",
    metaDescription:
      "How cash-on-delivery (COD) reconciliation works in last-mile logistics, and what to look for in a delivery partner's COD process to avoid settlement delays.",
    publishedAt: "2026-04-18",
    readingMinutes: 5,
    sections: [
      {
        heading: "Why COD reconciliation is harder than it looks",
        paragraphs: [
          "Cash on delivery is operationally simple from the customer's side — pay when it arrives — but it pushes real complexity onto whoever's managing the delivery. Every COD order means a rider is physically holding your business's money until it's collected, counted, deposited and matched back against the specific order it belongs to.",
          "At small volume, this is manageable with a spreadsheet and some trust. At scale — hundreds of COD orders a week across multiple riders — the gap between 'cash collected' and 'cash reconciled against the right order and settled to your account' is where most delivery partnerships quietly start failing customers and sellers alike.",
        ],
      },
      {
        heading: "What a working COD process actually requires",
        paragraphs: [
          "Three things need to happen reliably: the rider needs to collect the correct amount and record it against the correct order at the point of delivery, that collection needs to be deposited (not carried indefinitely), and the deposited amount needs to be matched and settled back to the seller on a predictable cycle — weekly, for most B2B relationships.",
          "The failure points are almost always at the edges: partial payments, refused deliveries where cash still needs accounting for, and mismatches between what a rider reports and what actually gets deposited. A delivery partner without a systematic process for these edge cases will eventually produce a reconciliation gap that someone has to manually chase down.",
        ],
      },
      {
        heading: "What to ask a delivery partner about their COD process",
        paragraphs: [
          "Before committing volume to a courier or logistics partner, ask specifically how COD is tracked per order (not just per rider per day), what the settlement cycle is, and how disputes or shortfalls are handled. A partner who can answer these precisely — rather than in general terms — is far more likely to have a system built for it rather than a process improvised around trust.",
          "This is also worth checking even with partners you already work with: ask to see a reconciliation report for a recent settlement cycle. If it takes more than a day or two to produce, that's usually a sign the underlying process is manual rather than systematic.",
        ],
      },
    ],
  },
  {
    slug: "choosing-a-last-mile-delivery-partner-west-bengal",
    title: "Choosing a Last-Mile Delivery Partner in West Bengal: What Actually Matters",
    excerpt:
      "Beyond price per delivery, here's what separates a delivery partner that scales with you from one that becomes a bottleneck.",
    metaDescription:
      "How to choose a last-mile delivery partner in West Bengal — coverage, SLA reliability, COD handling and technology integration explained for retail and D2C businesses.",
    publishedAt: "2026-03-22",
    readingMinutes: 6,
    sections: [
      {
        heading: "Price per delivery is the least useful comparison metric",
        paragraphs: [
          "It's the easiest number to compare across quotes, which is exactly why it's the least reliable one to decide on. A lower per-delivery rate that comes with inconsistent pickup times, unreliable COD settlement, or coverage gaps in half your delivery pincodes will cost you far more in lost customers and manual firefighting than a slightly higher rate from a partner who's actually reliable.",
          "The more useful comparison is cost per successfully delivered order within your promised SLA — which factors in failed delivery attempts, redelivery costs, and the customer service time spent chasing delayed shipments.",
        ],
      },
      {
        heading: "Coverage depth, not just coverage breadth",
        paragraphs: [
          "Many logistics providers will claim coverage across a wide list of pincodes, but there's a real difference between a pincode that's technically served (occasionally, with long delivery windows) and one that's actively staffed with reliable rider capacity. If you're shipping into specific districts regularly — say, Murshidabad or Hooghly — ask about actual hub presence in those areas, not just whether the pincode appears on a coverage map.",
          "This matters even more for businesses operating outside Kolkata: many delivery networks are built Kolkata-first and treat surrounding districts as an afterthought, which shows up as longer delivery windows and less reliable SLAs the further you get from the metro core.",
        ],
      },
      {
        heading: "Technology and visibility aren't optional extras anymore",
        paragraphs: [
          "Live tracking, a business dashboard for order and payout visibility, and API integration for automated order creation used to be differentiators. At this point, they're baseline expectations — a delivery partner without them is asking you to run your operations blind, chasing status updates over phone calls instead of checking a dashboard.",
          "The businesses that scale smoothly with a delivery partner are usually the ones that treated the evaluation as a long-term operational fit question — coverage, SLA consistency, COD process, and technology — rather than a single-line price comparison.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
