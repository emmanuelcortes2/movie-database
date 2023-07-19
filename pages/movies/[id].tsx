import Layout from "../../components/layout";
// import { getAllPostIds, getmovieData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Post({
  movieData,
}: {
  movieData: {
    title: string;
    release_date: string;
    tagline: string;
    poster_path: string;
    overview: string;
    vote_average: string;
    name: string;
    iso_3166_1: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{movieData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{movieData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={movieData.release_date} />
        </div>
        <div>
          <img src={"https://image.tmdb.org/t/p/w500" + movieData.poster_path}/>
        </div>
      </article>
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
  const paths = []
  const data = await res.json();
  data.results.map((movie) => {
    paths.push({ params: {id: movie.id.toString()}});
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
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
