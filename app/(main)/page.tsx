// app/(main)/page.tsx
export default function HomePage() {
  const app_title = process.env.APP_TITLE || "Silk Road Services";
  return (
    <section className="text-center py-10">
      <h1 className="lg:text-6xl md:text-5xl sm:text-4xl bg-gradient-to-tl from-primary to-secondary bg-clip-text text-transparent font-bold mb-4">
        Welcome to {app_title}
      </h1>
      <p className="text-muted-foreground text-lg">
        Your gateway to smart tourism and services.
      </p>
    </section>
  );
}
