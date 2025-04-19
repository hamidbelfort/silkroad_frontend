// components/landing/ServicesOverview.tsx
"use client";
const services = [
  { title: "Hotel Booking", targetId: "hotel" },
  { title: "Currency Exchange", targetId: "exchange" },
  { title: "Tour Guides", targetId: "tours" },
  { title: "Local Support", targetId: "support" },
];

export const ServicesOverview = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-10">Our Services</h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {services.map((s) => (
          <div
            key={s.title}
            onClick={() => scrollTo(s.targetId)}
            className="cursor-pointer bg-white shadow-md p-6 rounded-lg w-64 hover:bg-gray-50 transition"
          >
            <h3 className="text-xl font-semibold">{s.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
