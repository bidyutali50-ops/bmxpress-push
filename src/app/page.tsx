import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Services } from "@/components/sections/Services";
import { DeliveryProcess } from "@/components/sections/DeliveryProcess";
import { LiveTracking } from "@/components/sections/LiveTracking";
import { Coverage } from "@/components/sections/Coverage";
import { Features } from "@/components/sections/Features";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Numbers } from "@/components/sections/Numbers";
import { DeliveryPartner } from "@/components/sections/DeliveryPartner";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <DeliveryProcess />
      <LiveTracking />
      <Coverage />
      <Features />
      <WhyChooseUs />
      <Numbers />
      <DeliveryPartner />
      <Testimonials />
      <Contact />
    </>
  );
}
