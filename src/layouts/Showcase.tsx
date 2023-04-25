import MoviesList from "../components/MoviesList";

const Showcase = () => (
  <>
    <section className="bg-gray-900 flex flex-col items-center py-10 min-h-screen">
      <header className="flex justify-center">
        <h1 className="text-gray-300 text-2xl md:text-3xl lg:text-4xl mb-20 text-center">
          MARVEL & DC Movies Showcase
        </h1>
      </header>

      <main>
        <MoviesList />
      </main>
    </section>
  </>
);

export default Showcase;
