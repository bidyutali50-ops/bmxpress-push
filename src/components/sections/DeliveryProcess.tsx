"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Package, PackageCheck, Store, Truck } from "lucide-react";

const steps = [
  { icon: Store, label: "Create Shipment", description: "Order comes in — from checkout, API, or manual entry." },
  { icon: Package, label: "Assign Rider", description: "Nearest available rider is matched from the hub." },
  { icon: MapPin, label: "Pickup", description: "Rider collects the parcel and starts the route." },
  { icon: PackageCheck, label: "Transit", description: "Live location streams to your tracking dashboard." },
  { icon: Truck, label: "Delivery", description: "Rider reaches the drop location and hands it over." },
  { icon: CheckCircle2, label: "Proof of Delivery", description: "Signature or photo captured, order closed out." },
];

export function DeliveryProcess() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % steps.length), 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-28">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">How it works</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            From checkout to doorstep
          </h2>
          <p className="mt-4 text-muted-foreground">
            The same five steps run behind every order, whether it&apos;s a single hyperlocal
            drop or a batch of 200 next-day parcels.
          </p>
        </div>

        <div className="glass mx-auto mt-16 max-w-4xl rounded-3xl p-8 sm:p-12">
          {/* Progress line */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-[2px] bg-border sm:top-7" />
            <motion.div
              className="absolute left-0 top-6 h-[2px] bg-primary sm:top-7"
              animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="relative grid grid-cols-3 gap-y-6 sm:grid-cols-6 sm:gap-y-0">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const done = i <= active;
                return (
                  <div key={step.label} className="flex flex-col items-center text-center">
                    <motion.div
                      animate={{ scale: i === active ? 1.15 : 1 }}
                      transition={{ duration: 0.4 }}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-500 sm:h-14 sm:w-14 ${
                        done ? "border-primary text-white" : "border-border bg-card text-muted-foreground"
                      }`}
                      style={done ? { backgroundColor: "#E30613" } : undefined}
                    >
                      <Icon size={20} />
                    </motion.div>
                    <p className={`mt-3 hidden text-xs font-semibold sm:block ${done ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 text-center"
          >
            <p className="font-display text-lg font-semibold sm:hidden">{steps[active].label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{steps[active].description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
