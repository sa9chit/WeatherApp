import wind from "./weather/wind.png";
import thunderstorm from "./weather/thunderstorm.png";
import sun from "./weather/sun.png";
import windCard from "./weather/windCard.png";
import { Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { Contextt } from "./contextContainer/context";

export const UiComponent = () => {
  let arr = [wind, sun, thunderstorm];
  let inpValue = useContext(Contextt);
  let [apiData, setApi] = useState([]);
  let [dateValue, setDateValue] = useState(null);
  let [temValue, setTemp] = useState(null);
  let [Visibility, setVisible] = useState(null);
  let [img, setImg] = useState(null);
  let contextProvider = useContext(Contextt);
  useEffect(() => {
    fetchData(inpValue.value);
  }, [inpValue.value]);

  useEffect(() => {
    if (apiData?.current_observation?.condition?.text === "Clear") {
      setImg(arr[1]);
    } else if (apiData?.current_observation?.condition?.text === "Cloudy") {
      setImg(arr[0]);
    }

    if (apiData?.current_observation?.pubDate) {
      const date = new Date(apiData.current_observation.pubDate * 1000);
      const formattedDate = date.toISOString().split("T")[0];
      setDateValue(formattedDate);
    }
    if (apiData?.current_observation?.atmosphere?.humidity >= 10) {
      setVisible("clear");
    } else if (
      apiData?.current_observation?.atmosphere?.humidity <= 10 &&
      apiData?.current_observation?.atmosphere?.humidity >= 5
    ) {
      setVisible("slightly Haze");
    } else if (
      apiData?.current_observation?.atmosphere?.humidity <= 2 &&
      apiData?.current_observation?.atmosphere?.humidity >= 1
    ) {
      setVisible("Moderate Fog");
    } else if (apiData?.current_observation?.atmosphere?.humidity <= 1) {
      setVisible("Dense Fog");
    }
    let temp = apiData?.current_observation?.condition?.temperature;
    let temperature = ((temp - 32) * 5) / 9;
    setTemp(temperature);
  }, [apiData]);

  let fetchData = async (data) => {
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${data}&format=json&u=f`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "bd4b73ff14msh421ee859be2112dp1e8d06jsn9a2219b6a18c",
        "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      setApi(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-[70vh] w-[80vw] bg-amber-100 overflow-hidden ">
      <header className="bg-amber-600 px-5 py-2 flex justify-between items-center w-full">
        <div className="text-[#f0ececf7] font-extralight tracking-tighter">
          <span className="font-bold tracking-tighter text-white">
            {" "}
            City / Town{" "}
          </span>
          : {apiData?.location?.city || ""}
        </div>
        <div className="text-[#f0ececf7] font-extralight tracking-tighter">
          📍 {apiData?.location?.country || ""} {}
        </div>
      </header>

      <div className=" h-[65vh] flex items-center justify-around">
        <div className="h-[50vh] w-[23vw] bg-white rounded-2xl p-3 flex flex-col justify-between ">
          <h3 className="text-center tracking-tighter   text-amber-900 text-xl">
            Temperature
          </h3>
          <div className="bg-amber-100 px-5 h-[40vh] rounded-xl ">
            <div className="w-full flex justify-between px-3 py-6">
              <span className="tracking-tighter text-amber-800">
                {apiData?.location?.city || ""}
              </span>
              <span className="tracking-tighter text-amber-800">
                Date : {dateValue}
              </span>
            </div>
            <div className=" h-[20vh] px-3 flex items-center">
              <img src={img} className="w-25"></img>
              <div className="flex flex-col  h-[12vh] w-full items-end">
                <span className="text-amber-800 font-bold">
                  Temp : {Math.floor(temValue)} C°
                </span>
                <span className="text-amber-800 font-bold ext-[13px]">
                  {apiData?.current_observation?.condition?.text}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[50vh] w-[30vw] bg-white rounded-2xl p-3 flex flex-col justify-between ">
          <h3 className="text-center tracking-tighter   text-amber-900 text-xl">
            Wind
          </h3>
          <div className="flex items-center px-8 bg-amber-100 h-[40vh] rounded-xl ">
            <img src={windCard} className="w-30"></img>
            <div className="flex flex-col gap-1 items-end py-5 h-30 w-full">
              <span className="text-amber-800 font-bold">
                Wind : {apiData?.current_observation?.wind?.chill} kmph
              </span>
              <span className="text-amber-800 font-bold text-[13px]">
                Direction : {apiData?.current_observation?.wind?.direction}
              </span>
            </div>
          </div>
        </div>
        <div className="atmosphere flex flex-col justify-between h-[50vh]">
          <div className="h-[30vh] w-[23vw] bg-white rounded-2xl p-3 flex flex-col justify-between ">
            <h3 className="text-center tracking-tighter   text-amber-900 text-xl">
              Atmosphere
            </h3>
            <div className="bg-black h-[40vh] rounded-xl p-2 ">
              <div className="flex justify-between flex-col gap-4 px-3">
                <div className="flex justify-between">
                  <span className="text-[#ffffffaf] font-bold text-[13px]">
                    Sunset : {apiData?.current_observation?.astronomy?.sunset}{" "}
                    pm
                  </span>
                  <span className="text-[#ffffffaf] font-bold text-[13px]">
                    Sunrise : {apiData?.current_observation?.astronomy?.sunrise}{" "}
                    am
                  </span>
                </div>

                <div className="text-[1vmax] tracking-tight font-bold text-white">
                  According to DD-ForCast Humidity in this Area will be{" "}
                  <span className="text-[15px] text-amber-300">
                    {apiData?.current_observation?.atmosphere?.humidity}%
                  </span>
                </div>
                <div className="text-[1vmax] tracking-tight font-bold text-white">
                  According to DD-ForCast Area Visibility
                  <span className="text-[15px] text-amber-300">
                    {" "}
                    {Visibility}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="h-[18vh] w-[23vw] bg-white rounded-2xl p-3 flex flex-col justify-between ">
              <h3 className="text-center tracking-tighter   text-amber-900 text-xl">
                Forecast
              </h3>
              <div className="bg-amber-100 h-[40vh] rounded-xl flex items-center justify-center">
                <Button className="bg-amber-600 cursor-pointer tracking-tighter text-white font-bold px-5 py-1 rounded-[5px]">
                  10 days
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
