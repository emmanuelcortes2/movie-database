import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import MovieGrid from "../components/movie-grid";

export default function Upcoming({
  upcomingMoviesData,
}: {
  upcomingMoviesData: {
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
       <h2>Upcoming</h2>
      </section>
      <MovieGrid moviesData={upcomingMoviesData}/>
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
    "https://api.themoviedb.org/3/movie/upcoming?api_key=f1d951a886af6d1ecdc8225b592155f9",
    options
  );
  const upcomingMoviesData = await res.json();
  return {
    props: {
      upcomingMoviesData,
    },
  };
};
