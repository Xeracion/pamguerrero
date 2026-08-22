import { SectionHeader } from "@/components/section-header";
import { TravelCard } from "@/components/travel-card";
import { Cta } from "@/components/cta";
import { getTrips } from "@/lib/sanity/queries";

export async function GroupTripsTeaser() {
  const trips = await getTrips();
  const openTrips = trips.filter((t) => t.status !== "cerrado").slice(0, 3);

  if (openTrips.length === 0) {
    return (
      <Cta
        eyebrow="Viajes grupales"
        title="El próximo viaje se anuncia pronto."
        description="Suscríbete al newsletter para enterarte primero."
        primaryHref="/newsletter"
        primaryLabel="Avísame"
      />
    );
  }

  return (
    <section className="bg-sun py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Vívelo conmigo"
          title="Viajes grupales abiertos ahora mismo"
          description="No son paquetes: son experiencias que diseño y acompaño de principio a fin."
          tone="onWarm"
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {openTrips.map((trip) => (
            <div key={trip.slug} className="rounded-2xl bg-white p-5 shadow-[0_16px_36px_-20px_rgba(23,32,51,0.35)]">
              <TravelCard trip={trip} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
