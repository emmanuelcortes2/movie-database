import Link from "next/link";
import { nowPlaying } from "@/app/lib/load-movies";

type Movie = {
  original_title: string;
  poster_path: string;
  release_date: string;
  id: string | number
};

export default async function MovieCard() {
  const data = await nowPlaying();

  return (
    <>
      <section className="grid grid-cols-4 gap-4 p-10 ">
        {data.results.map((movie: Movie) => {
          return (
            <Link href={{
              pathname: `/movie`,
              query: {
                search: `${movie.id}`
              }
            }}>
              <div 
                  className="flex flex-col h-80 w-46 rounded shadow-md bg-slate-200 bg-opacity-20 justify-center items-center cursor-pointer "
  
                >
                <p className="mb-4 p-2 text-center text-sm font-semibold">
                  {movie.original_title}
                </p>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  className="h-40 rounded-md shadow-md shadow-blue-700/50"
                />
                <p className="text-left text-sm mt-4">{movie.release_date}</p>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
