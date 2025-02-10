interface HeroSectionProps {
  title: string;
  description: string;
}

export default function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <div className="h-full w-full text-center text-white">
      <p className="text-2xl p-2">{description}</p>
      <h1 className="text-6xl font-bold p-2">{title}</h1>
    </div>
  );
}
