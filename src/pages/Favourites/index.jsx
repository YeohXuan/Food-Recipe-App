import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/RecipeItem";

export default function Favourites() {
  const { favouritesList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-5 lg:gap-8">
      {favouritesList && favouritesList.length > 0 ? (
        favouritesList.map((recipe, index) => (
          <RecipeItem item={recipe} key={index} />
        ))
      ) : (
        <div className="sm:py-0">
          <p className="lg:text-3xl text-xl text-center text-grey font-extrabold">
            There is no recipe in your favourites...
          </p>
        </div>
      )}
    </div>
  );
}
