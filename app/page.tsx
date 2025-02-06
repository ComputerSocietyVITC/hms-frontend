"use client";

import React from "react";
import HeaderComponent from "@/components/HeaderComponent";
import HeroSection from "@/components/HeroSection";
import CardList from "@/components/CardList";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <HeaderComponent />

      <div className="flex-1">
        <section className="flex items-center justify-center px-6 py-20">
          <HeroSection title="HMS Title" description="HMS Subtitle" />
        </section>

        <section className="flex justify-center w-full px-8 mb-12">
          <CardList />
        </section>
      </div>

      <FooterSection />
    </main>
  );
}
