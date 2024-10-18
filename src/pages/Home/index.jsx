import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { useSearchParams } from "react-router-dom";
import RecipeItem from "../../components/RecipeItem";

export default function Home() {
  const { setSearchParam, searchResults, setSearchResults } =
    useContext(GlobalContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search");

    if (query) {
      setSearchParam(query);
      async function fetchResults() {
        try {
          const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
          );
          const data = await res.json();
          setSearchResults(data?.data?.recipes);
        } catch (error) {
          console.log(error);
        }
      }
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchParams]);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-5 lg:gap-8">
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((recipe, index) => (
          <RecipeItem item={recipe} key={index} />
        ))
      ) : (
        <div className="sm:py-0">
          <p className="lg:text-3xl text-xl text-center text-grey font-extrabold">
            Search up a recipe to start cooking!
          </p>
        </div>
      )}
    </div>
  );
}
