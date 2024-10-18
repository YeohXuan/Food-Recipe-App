import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [recipeDetailsData, setRecipeDetailsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favouritesList, setFavouritesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    navigate(`/home?search=${searchParam}`);
  }

  function handleAddToFavourite(getCurrentRecipe) {
    const copyFavouritesList = [...favouritesList];
    const index = copyFavouritesList.findIndex(
      (item) => item.id === getCurrentRecipe.id
    );

    if (index === -1) {
      copyFavouritesList.push(getCurrentRecipe);
    } else {
      copyFavouritesList.splice(index, 1);
    }

    setFavouritesList(copyFavouritesList);
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        setLoading,
        recipeDetailsData,
        setRecipeDetailsData,
        searchResults,
        setSearchResults,
        handleAddToFavourite,
        favouritesList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
