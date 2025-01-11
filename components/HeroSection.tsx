interface HeroSectionProps {
  title: string;
  description: string;
}

export default function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <div className="h-full w-full text-center">
      <p className="text-2xl p-4">{description}</p>
      <h1 className="text-6xl p-2">{title}</h1>
    </div>
  );
}
