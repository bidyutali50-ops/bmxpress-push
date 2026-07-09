"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bike, CheckCircle2, IndianRupee, MapPinned, PackageCheck, PackageX, RotateCcw, Truck,
} from "lucide-react";
import { dispatchSupabase, type LiveStats } from "@/lib/supabase-dispatch";

const tiles: {
  key: keyof LiveStats;
  label: string;
  icon: typeof Bike;
  format?: (v: number) => string;
}[] = [
  { key: "deliveries_today", label: "Deliveries Today", icon: PackageCheck },
  { key: "picked_today", label: "Orders Picked", icon: CheckCircle2 },
  { key: "delivered_today", label: "Orders Delivered", icon: Truck },
  { key: "orders_in_transit", label: "In Transit", icon: MapPinned },
  { key: "failed_today", label: "Failed Attempts", icon: PackageX },
  { key: "returned_today", label: "Returned (RTO)", icon: RotateCcw },
  {
    key: "cod_collected_today",
    label: "COD Collected",
    icon: IndianRupee,
    format: (v) => `₹${v.toLocaleString("en-IN")}`,
  },
  { key: "riders_online", label: "Riders Online", icon: Bike },
];

export function LiveCounter() {
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [connected, setConnected] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let mounted = true;

    dispatchSupabase
      .from("public_live_stats")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error || !data) {
          setUnavailable(true);
          return;
        }
        setStats(data as LiveStats);
      });

    // If neither the fetch nor the realtime channel has produced data in
    // 10 seconds, say so plainly rather than spinning forever.
    const timeout = setTimeout(() => {
      if (mounted) {
        setStats((current) => {
          if (!current) setUnavailable(true);
          return current;
        });
      }
    }, 10000);

    const channel = dispatchSupabase
      .channel("public_live_stats_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "public_live_stats" },
        (payload) => {
          if (mounted) {
            setStats(payload.new as LiveStats);
            setUnavailable(false);
          }
        }
      )
      .subscribe((status) => {
        if (mounted) setConnected(status === "SUBSCRIBED");
      });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      dispatchSupabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="relative py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass glow-red mx-auto max-w-5xl rounded-3xl px-6 py-10 sm:px-10"
        >
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Live from our dispatch network
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pulled straight from the BMX Dispatch database — updates the instant an order changes.
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-primary">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-primary ${connected && !unavailable ? "animate-pulse-glow" : "opacity-40"}`}
              />
              {unavailable ? "Offline" : connected ? "Live" : "Connecting…"}
            </span>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {tiles.map((tile, i) => {
              const Icon = tile.icon;
              const raw = stats ? stats[tile.key] : null;
              const value = typeof raw === "number" ? raw : Number(raw ?? 0);
              return (
                <motion.div
                  key={tile.key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="rounded-2xl border border-border bg-card p-4 text-center"
                >
                  <Icon size={16} className="mx-auto text-primary" />
                  <p className="font-display mt-2 text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">
                    {stats ? (tile.format ? tile.format(value) : value.toLocaleString("en-IN")) : "—"}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{tile.label}</p>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            {stats
              ? `Last updated ${new Date(stats.updated_at).toLocaleTimeString("en-IN")}`
              : unavailable
                ? "Live data is temporarily unavailable. Please check back shortly."
                : "Loading live data…"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
