import Image from "next/image";
import { trustedBy } from "@/lib/data";

export function TrustedBy() {
  // The marquee keyframe translates -50%, so the list is duplicated exactly
  // once to make the loop seamless. The second copy is hidden from screen
  // readers so each client is announced only a single time.
  const doubled = [...trustedBy, ...trustedBy];

  return (
    <section className="border-y border-border/70 bg-ink-950/60 py-12">
      <div className="container">
        <p className="mb-8 text-center text-[11px] uppercase tracking-widest text-muted-foreground">
          Trusted by teams shipping at scale
        </p>
      </div>

      <div className="marquee-wrap relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="marquee-track py-3">
          {doubled.map((client, i) => {
            const isDuplicate = i >= trustedBy.length;
            return (
              <li
                key={`${client.name}-${i}`}
                aria-hidden={isDuplicate || undefined}
                data-cursor-hover
                tabIndex={isDuplicate ? -1 : 0}
                className="group mr-5 flex h-[72px] w-44 shrink-0 items-center justify-center rounded-2xl border border-border bg-card/70 backdrop-blur-md transition-all duration-500 ease-out will-change-transform hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_12px_36px_-10px_rgba(229,57,53,0.45)] hover:[transform:perspective(700px)_rotateX(7deg)_translateY(-6px)_scale(1.04)] focus-visible:border-primary/40"
              >
                {client.src ? (
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={120}
                    height={36}
                    className="h-9 w-auto object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="font-display text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors duration-500 group-hover:text-primary">
                    {client.name}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
