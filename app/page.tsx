"use client";

import React from "react";
import HeaderComponent from "@/components/ui/HeaderComponent";
import HeroSection from "@/components/home/HeroSection";
import CardList from "@/components/home/CardList";
import FooterSection from "@/components/ui/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#09090b] text-white">
      <HeaderComponent />

      <div className="flex-1">
        <section className="flex items-center justify-center px-6 py-20">
          <HeroSection
            title="Hackathon Management System"
            description="IEEE Computer Society, VIT Chennai"
          />
        </section>

        <section className="flex justify-center w-full px-8 mb-12">
          <CardList />
        </section>
      </div>

      <FooterSection />
    </main>
  );
}
