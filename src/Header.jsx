import { Contextt } from "./contextContainer/context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
export const Header = () => {
  let contextData = useContext(Contextt);
  let [value, setValue1] = useState("");
  const handleSearch = () => {
    contextData.setValue(value);
  };
  
  return (
    <header className="bg-amber-600 h-16 flex items-center gap-7 justify-between px-10">
      <h3 className="font-bold text-2xl tracking-tighter text-amber-50">
        DD-Forcast
      </h3>
      <div className="flex gap-2 rounded-2xl p-2">
        <input
          className="border-2 text-white font-bold tracking-tighter font-mono focus:outline-none px-1 border-white"
          type="text"
          value={value}
          onChange={(e) => {
            setValue1(e.target.value);
          }}
        ></input>

        <Link
          to="weather"
          className="bg-white font-bold tracking-tighter text-amber-700 px-4 py-1 rounded-[2px]"
          onClick={handleSearch}
        >
          Search
        </Link>
      </div>
    </header>
  );
};
