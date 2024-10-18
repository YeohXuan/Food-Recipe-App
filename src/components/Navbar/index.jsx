import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Navbar() {
  const { searchParam, setSearchParam } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/home?search=${searchParam}`);
  };

  return (
    <nav className="flex justify-between items-center p-4 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
      <NavLink to={"/"} className="text-black text-3xl font-semibold">
        FoodRecipe
      </NavLink>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
          placeholder="Enter items..."
          className="text-black bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-200 focus:shadow-red-300"
        />
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-black hover:text-gray-500 duration 300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favourites"}
            className="text-black hover:text-gray-500 duration 300"
          >
            Favourites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
