import Link from "next/link";
import Date from "./date";

export default function MovieGrid({ moviesData }) {
  return (
    <>
      <section className="grid grid-cols-7 p-2">
        {moviesData.results.map(({ id, release_date, title, poster_path }) => (
          <Link href="/movies/[id]" as={`/movies/${id}`}>
            <div className="flex flex-col h-80 w-46 justify-center items-center cursor-pointer">
              <p className="mb-4 p-2 text-center text-sm font-semibold">
                {title}
              </p>
              <img
                src={"https://image.tmdb.org/t/p/w500" + poster_path}
                className="h-40 rounded-md shadow-lg shadow-blue-700/50"
              />
              <p className="text-left text-sm mt-4" key={id}>
                <Date dateString={release_date} />
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
