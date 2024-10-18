import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import { FaArrowLeft } from "react-icons/fa6";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    handleAddToFavourite,
    favouritesList,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await res.json();

        if (data?.data) {
          setRecipeDetailsData(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getRecipeDetails();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="flex items-center mt-8 mb-3 ml-2 gap-2  cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="text-black size-6" />
        <p className="text-black font-bold">Back</p>
      </div>
      <div className="container mx-auto py-5 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <div>
          <div className="h-96 overflow-hidden rounded-xl group">
            <img
              src={recipeDetailsData?.recipe?.image_url}
              className="w-full h-full object-cover block group-hover:scale-105 duration-300"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 lg:gap-2">
          <span className="text-sm text-cyan-700 font-medium">
            {recipeDetailsData?.recipe?.publisher}
          </span>
          <h3 className="font-bold text-2xl truncate text-black">
            {recipeDetailsData?.recipe?.title}
          </h3>
          <div>
            <button
              onClick={() => handleAddToFavourite(recipeDetailsData?.recipe)}
              className="p-3 px-8 rounded-lg text-sm uppercase font-bold tracking-wide my-4 inline-block shadow-md bg-black text-white cursor-pointer"
            >
              {favouritesList.findIndex(
                (item) => item.id === recipeDetailsData?.recipe?.id
              ) !== -1
                ? "Remove from favourites"
                : "Save to favourites"}
            </button>
          </div>
          <div>
            <span className="text-2xl font-semibold text-black">
              Ingredients:
            </span>
            <ul className="flex flex-col gap-3">
              {recipeDetailsData?.recipe?.ingredients.map(
                (ingredient, index) => (
                  <li key={index}>
                    <span className="text-2xl font-semibold text-black">
                      {ingredient.quantity}
                    </span>
                    <span className="text-2xl font-semibold text-black">
                      {ingredient.description}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
