// components/landing/ServiceSections.tsx
const services = [
  {
    id: "hotel",
    title: "Hotel Booking",
    desc: "Find and book top-rated hotels across Iran.",
    img: "/images/hotel.jpg",
  },
  {
    id: "exchange",
    title: "Currency Exchange",
    desc: "Check and exchange currencies with real-time rates.",
    img: "/images/exchange.jpg",
  },
  {
    id: "tours",
    title: "Tour Guides",
    desc: "Connect with experienced local tour guides.",
    img: "/images/tour.jpg",
  },
  {
    id: "support",
    title: "Local Support",
    desc: "Get 24/7 assistance and travel support in Iran.",
    img: "/images/support.jpg",
  },
];

export const ServiceSections = () => {
  return (
    <section className="py-20 space-y-24">
      {services.map((s, i) => (
        <div
          key={s.id}
          id={s.id}
          className={`flex flex-col md:flex-row ${
            i % 2 === 1 ? "md:flex-row-reverse" : ""
          } items-center gap-10 max-w-6xl mx-auto px-4`}
        >
          <img
            src={s.img}
            alt={s.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow"
          />
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
