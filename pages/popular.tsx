import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";

export default function Popular({
  allMoviesData,
}: {
  allMoviesData: {
    results: {
      release_date: string;
      title: string;
      id: string;
      poster_path: string;
    }[];
  };
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="">
        <h2>Popular</h2>
      </section>
      <section className="grid grid-cols-7 p-2">
        {allMoviesData.results.map(
          ({ id, release_date, title, poster_path }) => (
            <Link href="/movies/[id]" as={`/movies/${id}`}>
              <div className="flex flex-col h-80 w-46 justify-center items-center cursor-pointer">
                <p className="mb-4 p-2 text-center text-sm font-semibold">
                  {title}
                </p>
                <img src={"https://image.tmdb.org/t/p/w500" + poster_path}  className="h-40 rounded-md shadow-lg shadow-blue-700/50"/>
                <p className="text-left text-sm mt-4" key={id}>
                  <Date dateString={release_date} />
                </p>
              </div>
            </Link>
          )
        )}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWQ5NTFhODg2YWY2ZDFlY2RjODIyNWI1OTIxNTVmOSIsInN1YiI6IjY0YjJkYjNkYzhhMmQ0MDEwMDFlNmVjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B04AVdWtY9TeKPLZj_nQ1R8rQlGcU-5oEfKR-1wYXr",
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=f1d951a886af6d1ecdc8225b592155f9",
    options
  );
  const allMoviesData = await res.json();
  return {
    props: {
      allMoviesData,
    },
  };
};
