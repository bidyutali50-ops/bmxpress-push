/**
 * Demo data for the marketing site.
 *
 * The live counter and shipment tracking page run on this module instead of
 * querying the operational dispatch database. Swap `USE_DEMO_DATA` to false
 * (and restore the dispatch client) when you want to wire these back to real
 * orders.
 *
 * Nothing here touches Supabase. The contact form, delivery partner
 * application and admin dashboard remain backed by real Supabase tables.
 */

export const USE_DEMO_DATA = true;

/* ------------------------------------------------------------------ */
/* Live counter                                                        */
/* ------------------------------------------------------------------ */

export type LiveStats = {
  deliveries_today: number;
  picked_today: number;
  delivered_today: number;
  failed_today: number;
  returned_today: number;
  cod_collected_today: number;
  orders_in_transit: number;
  riders_online: number;
  riders_offline: number;
  active_riders_total: number;
  cities_covered: number;
  updated_at: string;
};

const DAILY_TARGET = 3200;
const TOTAL_RIDERS = 500;

/**
 * Derives a plausible "so far today" figure from the current time of day,
 * so the numbers are consistent for everyone viewing the page at the same
 * moment and reset naturally at midnight (rather than being random noise).
 */
export function getDemoStats(): LiveStats {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const fractionOfDay = Math.min(
    1,
    (now.getTime() - startOfDay.getTime()) / (24 * 60 * 60 * 1000)
  );

  // Deliveries ramp through the day rather than accruing linearly:
  // quiet overnight, busiest late morning through evening.
  const eased = Math.sin((fractionOfDay * Math.PI) / 2);

  const delivered = Math.max(4, Math.round(DAILY_TARGET * eased));
  const inTransit = Math.round(Math.max(8, delivered * 0.06));
  const picked = delivered + inTransit;
  const created = picked + Math.round(inTransit * 0.4);
  const failed = Math.round(delivered * 0.008);
  const returned = Math.round(delivered * 0.004);

  // Rider availability also tracks time of day.
  const onlineRatio = 0.35 + 0.5 * eased;
  const ridersOnline = Math.round(TOTAL_RIDERS * Math.min(0.88, onlineRatio));

  return {
    deliveries_today: created,
    picked_today: picked,
    delivered_today: delivered,
    failed_today: failed,
    returned_today: returned,
    cod_collected_today: delivered * 412,
    orders_in_transit: inTransit,
    riders_online: ridersOnline,
    riders_offline: TOTAL_RIDERS - ridersOnline,
    active_riders_total: TOTAL_RIDERS,
    cities_covered: 30,
    updated_at: now.toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* Shipment tracking                                                   */
/* ------------------------------------------------------------------ */

export type TrackedShipment = {
  found: boolean;
  tracking_number?: string;
  status?: string;
  payment_mode?: string;
  cod_amount?: number;
  drop_address?: string;
  customer_name?: string;
  rider_name?: string | null;
  hub_name?: string | null;
  picked_up_at?: string | null;
  delivered_at?: string | null;
  created_at?: string;
  updated_at?: string;
  events?: { to_status: string; at: string }[];
};

function hoursAgo(h: number) {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
}

const DEMO_SHIPMENTS: TrackedShipment[] = [
  {
    found: true,
    tracking_number: "BMX100000001",
    status: "OUT_FOR_DELIVERY",
    payment_mode: "COD",
    cod_amount: 1249,
    drop_address: "14/2 Lalbagh Road, Berhampore, Murshidabad 742101",
    customer_name: "Ananya Ghosh",
    rider_name: "Anup Karmakar",
    hub_name: "Berhampore Hub",
    picked_up_at: hoursAgo(2.5),
    delivered_at: null,
    created_at: hoursAgo(5),
    updated_at: hoursAgo(0.4),
    events: [
      { to_status: "CREATED", at: hoursAgo(5) },
      { to_status: "PENDING_ASSIGNMENT", at: hoursAgo(4.6) },
      { to_status: "ASSIGNED", at: hoursAgo(3.4) },
      { to_status: "PICKED_UP", at: hoursAgo(2.5) },
      { to_status: "AT_ORIGIN_HUB", at: hoursAgo(1.6) },
      { to_status: "OUT_FOR_DELIVERY", at: hoursAgo(0.4) },
    ],
  },
  {
    found: true,
    tracking_number: "BMX100000002",
    status: "DELIVERED",
    payment_mode: "PREPAID",
    cod_amount: 0,
    drop_address: "Flat 3B, Salt Lake Sector V, Kolkata 700091",
    customer_name: "Rahul Sen",
    rider_name: "Sujoy Mondal",
    hub_name: "Kolkata Hub 04",
    picked_up_at: hoursAgo(7),
    delivered_at: hoursAgo(3),
    created_at: hoursAgo(9),
    updated_at: hoursAgo(3),
    events: [
      { to_status: "CREATED", at: hoursAgo(9) },
      { to_status: "PENDING_ASSIGNMENT", at: hoursAgo(8.5) },
      { to_status: "ASSIGNED", at: hoursAgo(7.8) },
      { to_status: "PICKED_UP", at: hoursAgo(7) },
      { to_status: "AT_ORIGIN_HUB", at: hoursAgo(6) },
      { to_status: "OUT_FOR_DELIVERY", at: hoursAgo(4.5) },
      { to_status: "DELIVERED", at: hoursAgo(3) },
    ],
  },
  {
    found: true,
    tracking_number: "BMX100000003",
    status: "RTO_INITIATED",
    payment_mode: "COD",
    cod_amount: 899,
    drop_address: "22 Netaji Sarani, Howrah 711101",
    customer_name: "Priya Dutta",
    rider_name: "Imran Sheikh",
    hub_name: "Howrah Hub",
    picked_up_at: hoursAgo(28),
    delivered_at: null,
    created_at: hoursAgo(32),
    updated_at: hoursAgo(6),
    events: [
      { to_status: "CREATED", at: hoursAgo(32) },
      { to_status: "ASSIGNED", at: hoursAgo(30) },
      { to_status: "PICKED_UP", at: hoursAgo(28) },
      { to_status: "OUT_FOR_DELIVERY", at: hoursAgo(24) },
      { to_status: "FAILED_DELIVERY_ATTEMPT", at: hoursAgo(22) },
      { to_status: "RTO_INITIATED", at: hoursAgo(6) },
    ],
  },
  {
    found: true,
    tracking_number: "BMX100000004",
    status: "ASSIGNED",
    payment_mode: "PREPAID",
    cod_amount: 0,
    drop_address: "Krishnanagar College Road, Nadia 741101",
    customer_name: "Sourav Biswas",
    rider_name: "Rakesh Das",
    hub_name: "Nadia Hub",
    picked_up_at: null,
    delivered_at: null,
    created_at: hoursAgo(1.2),
    updated_at: hoursAgo(0.3),
    events: [
      { to_status: "CREATED", at: hoursAgo(1.2) },
      { to_status: "PENDING_ASSIGNMENT", at: hoursAgo(0.8) },
      { to_status: "ASSIGNED", at: hoursAgo(0.3) },
    ],
  },
];

/** Sample tracking numbers surfaced in the UI so visitors can try the demo. */
export const DEMO_TRACKING_NUMBERS = DEMO_SHIPMENTS.map((s) => s.tracking_number!);

/**
 * Looks up a demo shipment by tracking number (case-insensitive) or by the
 * demo phone number. Mirrors the shape the real tracking function returned.
 */
export function findDemoShipment(query: string): TrackedShipment {
  const q = query.trim().toLowerCase();
  const match = DEMO_SHIPMENTS.find(
    (s) => s.tracking_number?.toLowerCase() === q
  );
  return match ?? { found: false };
}
