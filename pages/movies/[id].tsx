import Layout from "../../components/layout";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Post({
  movieData,
}: {
  movieData: {
    homepage: string;
    genres: any;
    production_companies: any;
    production_countries: any;
    title: string;
    release_date: string;
    tagline: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    name: string;
    iso_3166_1: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{movieData.title}</title>
      </Head>
      <div className="flex justify-center items-center mt-24">
        <div className="flex bg-slate-200 bg-opacity-20 mx-4 p-4 h-[30rem]">
          <img
            src={"https://image.tmdb.org/t/p/w500" + movieData.poster_path}
            className="p4 rounded align-center justify-center"
          />
          <div className="p-4">
            <p className="text-center font-bold text-2xl">
              {movieData.title} ({movieData.release_date.slice(0, 4)})
            </p>
            <p className="text-center font-semibold italic">
              '{movieData.tagline}'
            </p>
            <h4 className="text-lg font-bold">Sinospsis:</h4>
            <p>{movieData.overview}</p>
            <p className="text-lg font-bold">Public rating: </p>
            <p className="indent-8">
              {Math.round(movieData.vote_average * 10) / 10}
            </p>
            <p className="text-lg font-bold">Genres:</p>
            <ul className="flex gap-4">
              {movieData.genres.map((genre: { name: string }, index) => (
                <li className="border rounded-md px-2 py-0.5 ml-4" key={index}>
                  {genre.name}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-lg font-bold">Country of origin: </p>
            <ul className="flex gap-4 indent-8">
              {movieData.production_countries.map(
                (country: { iso_3166_1: string; name: string }, index) => (
                  <li key={index}>{country.iso_3166_1}</li>
                )
              )}
            </ul>
            <p className="text-lg mt-10 text-zinc-600 underline">
              <a href={movieData.homepage} target="_blank">
                {movieData.homepage}
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWQ5NTFhODg2YWY2ZDFlY2RjODIyNWI1OTIxNTVmOSIsInN1YiI6IjY0YjJkYjNkYzhhMmQ0MDEwMDFlNmVjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B04AVdWtY9TeKPLZj_nQ1R8rQlGcU-5oEfKR-1wYXr",
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=f1d951a886af6d1ecdc8225b592155f9",
    options
  );
  const paths: any[] = [];
  const data = await res.json();

  data.results.map((movie) => {
    return paths.push({ params: { id: movie.id.toString() } });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWQ5NTFhODg2YWY2ZDFlY2RjODIyNWI1OTIxNTVmOSIsInN1YiI6IjY0YjJkYjNkYzhhMmQ0MDEwMDFlNmVjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B04AVdWtY9TeKPLZj_nQ1R8rQlGcU-5oEfKR-1wYXr",
    },
  };

  const url = `https://api.themoviedb.org/3/movie/${context.params.id}?api_key=f1d951a886af6d1ecdc8225b592155f9`;

  const res = await fetch(url, options);
  const movieData = await res.json();

  return {
    props: {
      movieData,
    },
  };
};
