import { Outlet } from "react-router-dom";
export const Hero = () => {
  return (
    <div className="h-[90.8vh] bg-amber-500 w-full flex justify-center items-center">
      <Outlet></Outlet>
    </div>
  );
};
