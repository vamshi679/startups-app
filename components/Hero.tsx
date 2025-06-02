export default function HeroSection() {
  return (
    <section className="w-full pt-24">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-8">
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Empower your startup with <span className="text-blue-600">fast, reliable</span> tools
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Pitch your startup idea, connect with investors, and build a community of like-minded entrepreneurs.
          </p>
        </div>
      </div>
    </section>
  );
}