"use client";

import { useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  CheckCircle2, Circle, Loader2, MapPin, Package, Phone, RefreshCw, Search, Truck, User, Warehouse,
} from "lucide-react";
import { findDemoShipment, DEMO_TRACKING_NUMBERS, type TrackedShipment } from "@/lib/demo-data";

const TIMELINE_STEPS = [
  { status: "CREATED", label: "Order Confirmed" },
  { status: "PENDING_ASSIGNMENT", label: "Pickup Assigned" },
  { status: "ASSIGNED", label: "Rider Assigned" },
  { status: "PICKED_UP", label: "Picked Up" },
  { status: "AT_ORIGIN_HUB", label: "Reached Hub" },
  { status: "OUT_FOR_DELIVERY", label: "Out For Delivery" },
  { status: "DELIVERED", label: "Delivered" },
];

const RTO_STATUSES = ["RTO_INITIATED", "RTO_DELIVERED", "RTO_REJECTED"];

function statusLabel(status?: string) {
  if (!status) return "";
  return status.replaceAll("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

function reachedIndexFor(shipment: TrackedShipment) {
  const statuses = (shipment.events ?? []).map((e) => e.to_status);
  statuses.push(shipment.status ?? "");
  let maxIndex = 0;
  for (const s of statuses) {
    const idx = TIMELINE_STEPS.findIndex((step) => step.status === s);
    if (idx > maxIndex) maxIndex = idx;
  }
  return maxIndex;
}

export function TrackingSearch() {
  const root = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [shipment, setShipment] = useState<TrackedShipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const runSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    // Brief delay so the loading state is perceptible rather than flashing.
    await new Promise((resolve) => setTimeout(resolve, 350));
    setLoading(false);
    setSearched(true);
    setShipment(findDemoShipment(q));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    runSearch(query);
  };

  const isRTO = shipment?.status ? RTO_STATUSES.includes(shipment.status) : false;
  const activeIndex = shipment?.found ? reachedIndexFor(shipment) : 0;

  // Fires each time a search resolves, so every result animates in.
  useGSAP(
    () => {
      if (!searched || loading) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".js-result", { opacity: 0, y: 14, duration: 0.5 });
    },
    { scope: root, dependencies: [searched, loading, shipment?.tracking_number], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="mx-auto max-w-3xl">
      <form onSubmit={onSubmit} className="glass flex flex-col gap-3 rounded-2xl p-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background/50 px-4">
          <Search size={16} className="shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tracking ID, Order ID, or phone number"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          Track
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>Try a sample:</span>
        {DEMO_TRACKING_NUMBERS.map((tn) => (
          <button
            key={tn}
            type="button"
            onClick={() => {
              setQuery(tn);
              runSearch(tn);
            }}
            data-cursor-hover
            className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] transition-colors hover:border-primary/50 hover:text-primary"
          >
            {tn}
          </button>
        ))}
      </div>

      <>
        {searched && !loading && (
          <div className="js-result mt-8">
            {!shipment?.found ? (
              <div className="glass rounded-2xl p-8 text-center">
                <Package className="mx-auto text-muted-foreground" size={32} />
                <p className="font-display mt-4 text-lg font-semibold">No shipment found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Double-check the tracking ID or phone number and try again.
                </p>
              </div>
            ) : (
              <div className="glass overflow-hidden rounded-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Tracking number</p>
                    <p className="font-display text-xl font-semibold">{shipment.tracking_number}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${
                      isRTO
                        ? "bg-primary/10 text-primary"
                        : shipment.status === "DELIVERED"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-foreground/5 text-foreground"
                    }`}
                  >
                    {statusLabel(shipment.status)}
                  </span>
                </div>

                {/* Timeline */}
                <div className="p-6">
                  {!isRTO ? (
                    <ol className="space-y-0">
                      {TIMELINE_STEPS.map((step, i) => {
                        const done = i <= activeIndex;
                        const isLast = i === TIMELINE_STEPS.length - 1;
                        return (
                          <li key={step.status} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div
                                className={`transition-transform duration-300 ${
                                  done ? "scale-100 text-primary" : "scale-90 text-muted-foreground"
                                }`}
                              >
                                {done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                              </div>
                              {!isLast && (
                                <span className={`my-1 h-8 w-[2px] ${i < activeIndex ? "bg-primary" : "bg-border"}`} />
                              )}
                            </div>
                            <div className="pb-6">
                              <p className={`text-sm font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>
                                {step.label}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
                      <RefreshCw size={20} className="text-primary" />
                      <div>
                        <p className="text-sm font-semibold">Return to Origin</p>
                        <p className="text-xs text-muted-foreground">
                          {shipment.status === "RTO_DELIVERED"
                            ? "This shipment has been returned successfully."
                            : "This shipment is being routed back to origin."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-4 border-t border-border p-6 sm:grid-cols-4">
                  <Detail icon={User} label="Customer" value={shipment.customer_name} />
                  <Detail icon={Truck} label="Rider" value={shipment.rider_name ?? "Not yet assigned"} />
                  <Detail icon={Warehouse} label="Hub" value={shipment.hub_name ?? "—"} />
                  <Detail icon={Phone} label="Payment" value={shipment.payment_mode} />
                </div>

                <div className="border-t border-border p-6 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                    <span>{shipment.drop_address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end border-t border-border px-6 py-3 text-[11px] text-muted-foreground">
                  <span>
                    {shipment.updated_at && `Last updated ${new Date(shipment.updated_at).toLocaleTimeString("en-IN")}`}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
}

function Detail({
  icon: Icon, label, value,
}: { icon: typeof User; label: string; value?: string | null }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
        <Icon size={12} /> {label}
      </div>
      <p className="mt-1 text-sm font-medium">{value || "—"}</p>
    </div>
  );
}
