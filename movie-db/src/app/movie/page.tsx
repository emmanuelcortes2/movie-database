import Link from "next/link";
import { movieDetails } from "../lib/movie-details";

export default async function MovieDetails(){
  const result = await movieDetails();

  return (
    <div className="flex justify-center items-center h-[calc(100vh-74px)]">
      <Link href={"/"} className="absolute top-20 left-10 text-white">
        ← Back Home
      </Link>
      <div className="flex bg-slate-200 bg-opacity-20 mx-4 p-4 h-96 md:max-h-screen text-whitemx-4">
        <img
          src={"https://image.tmdb.org/t/p/w500" + result.poster_path}
          className="p4 rounded align-center justify-center"
        />
        <div className="p-4 text-white">
          <p className="text-center font-bold text-2xl">
            {result.title} ({result.release_date.slice(0, 4)})
          </p>
          <p className="text-center font-semibold italic">'{result.tagline}'</p>
          <h5>Sinospsis:</h5>
          <p className="indent-8">{result.overview}</p>
          <p></p>
          <p>{result.vote_average}</p>
          <p className="mt-4">Genres:</p>
          <ul className="flex gap-4">
            {result.genres.map((genre: { name: string }) => (
              <li className="border rounded-md px-2 py-0.5">{genre.name}</li>
            ))}
          </ul>
          <p className="mt-4">Origen: </p>
          <ul className="flex gap-4 indent-8">
            {result.production_countries.map(
              (country: { iso_3166_1: string; name: string }) => (
                <li>{country.iso_3166_1}</li>
              )
            )}
          </ul>
          <ul className="flex gap-4 mt-4">
            {result.production_companies.map(
              (company: { logo_path: string; name: string }) => (
                <>
                  <li>
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" + company.logo_path
                      }
                      className="h-4"
                    />
                  </li>
                </>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
