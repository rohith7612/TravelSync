import HeroSection from "@/components/landing/HeroSection";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import SafetySection from "@/components/landing/SafetySection";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden selection:bg-indigo-500/30">
      <HeroSection />
      <HowItWorks />
      <Features />
      <SafetySection />
      <Testimonials />
    </main>
  );
}
