import { createClient } from "@supabase/supabase-js";

// This connects to the REAL BMX Dispatch operational database (a separate
// Supabase project from the marketing site's own contact/partner data).
// Only two things are exposed to this anon key on that project:
//   1. public_live_stats  — an aggregate counters table (no PII), realtime-enabled
//   2. track_shipment()   — a SECURITY DEFINER function that returns one
//                            order's safe fields when queried by exact
//                            tracking number or phone match
// Every other table in BMX Dispatch remains deny-all to this key.
const dispatchUrl =
  process.env.NEXT_PUBLIC_DISPATCH_SUPABASE_URL ?? "https://azcuzqpmfobseskstteo.supabase.co";
const dispatchAnonKey =
  process.env.NEXT_PUBLIC_DISPATCH_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6Y3V6cXBtZm9ic2Vza3N0dGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4OTk1OTcsImV4cCI6MjA5ODQ3NTU5N30.Cxlcs846GpY-x_CSD69sFGDhU1WeU_hLfkYuOAlXo88";

export const dispatchSupabase = createClient(dispatchUrl, dispatchAnonKey, {
  realtime: { params: { eventsPerSecond: 5 } },
});

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

export type TrackedShipment = {
  found: boolean;
  tracking_number?: string;
  category?: string;
  status?: string;
  payment_mode?: string;
  cod_amount?: number;
  pickup_address?: string;
  drop_address?: string;
  customer_name?: string;
  rider_name?: string | null;
  hub_name?: string | null;
  sla_deadline?: string | null;
  picked_up_at?: string | null;
  delivered_at?: string | null;
  failed_reason?: string | null;
  created_at?: string;
  updated_at?: string;
  events?: { from_status: string | null; to_status: string; at: string }[];
};
