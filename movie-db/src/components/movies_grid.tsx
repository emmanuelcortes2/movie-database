import Link from "next/link";

type Movie = {
  original_title: string;
  poster_path: string;
  release_date: string;
};

export default async function MovieCard() {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=f1d951a886af6d1ecdc8225b592155f9";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWQ5NTFhODg2YWY2ZDFlY2RjODIyNWI1OTIxNTVmOSIsInN1YiI6IjY0YjJkYjNkYzhhMmQ0MDEwMDFlNmVjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B04AVdWtY9TeKPLZj_nQ1R8rQlGcU-5oEfKR-1wYXr",
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  console.log('Data: ', data.results);

  return (
    <>
      <section className="grid grid-cols-4 gap-4 p-10 ">
        {data.results.map((movie: Movie) => {
          return (
            <Link href={"/movie"}>
              <div className="flex flex-col h-80 w-46 rounded shadow-md bg-slate-200 bg-opacity-20 justify-center items-center cursor-pointer ">
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
