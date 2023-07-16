import NavBar from "@/components/navbar";

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

  return (
    <>
      <div>
        {data.results.map((movie) => (
          <p>{movie.original_title}</p>
        ))}
      </div>
    </>
  );
}
