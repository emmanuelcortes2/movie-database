import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";

export default function Home({
  allMoviesData,
}: {
  allMoviesData: {
    results: {
      release_date: string;
      title: string;
      id: string;
    }[];
  };
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className="text-3xl font-bold underline">
          Checkout the latest movies releases{" "}
          {/* <a href="https://github.com/emmanuelcortes2" target='_blank'>@emmanuelcortes2</a> */}
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Latest releases</h2>
        <ul className={utilStyles.list}>
          {allMoviesData.results.map(({ id, release_date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/movies/[id]" as={`/movies/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={release_date} />
              </small>
            </li>
          ))}
        </ul>
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
    "https://api.themoviedb.org/3/movie/now_playing?api_key=f1d951a886af6d1ecdc8225b592155f9",
    options
  );
  const allMoviesData = await res.json();
  return {
    props: {
      allMoviesData,
    },
  };
};
