import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { CallToAction } from "@/components/sections/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Index;
