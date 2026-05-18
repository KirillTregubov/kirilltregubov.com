import { createFileRoute, useHydrated } from "@tanstack/react-router"

import Saturn from "#/components/Saturn"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  const hydrated = useHydrated()
  const entranceClass = hydrated
    ? "motion-safe:translate-y-0 motion-safe:opacity-100"
    : "motion-safe:translate-y-2 motion-safe:opacity-0"

  return (
    <main
      className={`xs:px-6 xs:py-6 mx-auto max-w-360 space-y-8 px-4 py-4 transition duration-600 md:space-y-12 md:px-12 md:pt-12 md:pb-6 ${entranceClass}`}
    >
      <section className="flex flex-col justify-center lg:flex-row lg:items-center lg:gap-6 xl:gap-0 2xl:-mt-6">
        <div
          className={`text-lg text-pretty opacity-100 ease-out motion-reduce:transition-none lg:text-balance`}
        >
          <p>
            Hey! I'm <span className="font-medium text-neutral-50">Kirill Tregubov</span>, a{" "}
            <span className="font-medium text-neutral-50">software developer</span> based in Canada.
            I specialize in TypeScript and spend most of my time building CLI tools and modern web,
            mobile, and desktop apps using React.
          </p>
          <p className="mt-4">
            I also graduated from the University of Toronto with an{" "}
            <span className="font-medium text-neutral-50">
              Honours Bachelor of Science in Computer Science
            </span>
            . I'm passionate about open-source software, interface design, science fiction, and
            astronomy.
          </p>
        </div>

        <figure
          className="saturn relative box-content h-[calc(100vw-9rem)] max-h-75 w-full lg:min-w-100 xl:max-h-100 xl:min-w-150 2xl:min-w-175"
          title="My favourite planet, Saturn."
        >
          <Saturn fallbackClass="max-h-[300px] xl:max-h-[400px]" />
          <figcaption
            className={`absolute bottom-0 w-full pb-2 text-center text-sm font-medium text-neutral-400/80 xl:pb-4 2xl:pb-6 ${entranceClass}`}
          >
            My favourite planet, Saturn.{" "}
            <a
              className="-m-0.5 rounded-sm p-0.5 underline transition select-none hover:text-neutral-200 focus-visible:outline-hidden active:text-neutral-50"
              href="https://science.nasa.gov/resource/saturn-3d-model/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </figcaption>
        </figure>
      </section>
    </main>
  )
}
