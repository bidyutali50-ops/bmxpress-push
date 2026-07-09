/**
 * Demo data for the shipment tracking page.
 *
 * Tracking runs on these sample shipments instead of querying an operational
 * database. The exported `TrackedShipment` type matches the shape a real
 * backend should return, so wiring this to live orders later means replacing
 * `findDemoShipment` and nothing else.
 *
 * Nothing here touches Supabase. The contact form, delivery partner
 * application and admin dashboard remain backed by real Supabase tables.
 */

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
