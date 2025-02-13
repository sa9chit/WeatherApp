import { useContext } from "react";
import { Contextt } from "./contextContainer/context";
export const Forecast = () => {
  let data = useContext(Contextt);
  console.log(data);
  return (
    <div className="h-[70vh] w-[80vw] bg-amber-100 flex flex-col  items-center gap-2  p-4 overflow-auto">
      {/* {data.value.map((val) => {
        return (
          <div
            key={val + 1}
            className="w-full bg-amber-600 rounded-r-xl p-5 flex justify-between text-xl tracking-tight font-extralight text-white"
          >
            <div>
              <span>
                {val.high}C° to {val.low}C°{" "}
              </span>
            </div>
            <div>{val.text}</div>
            <div>{val.day}</div>
            <div>{val.date}</div>
          </div>
        );
      })} */}
      {console.log(data.value)}
    </div>
  );
};
{
  /*  */
}
