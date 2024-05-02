import { useEffect, useState } from "react";

import { Chart, Colors } from "chart.js";
import { defaults } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

import Card from "./Card";

export default function Graph() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});
  const [sigFigs, setSigFigs] = useState({});

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude.toFixed(1);
        const longitude = position.coords.longitude.toFixed(1);
        const url =
          "https://api.open-meteo.com/v1/forecast?" +
          "latitude=" +
          latitude +
          "&" +
          "longitude=" +
          longitude +
          "&" +
          "hourly=rain,showers&timezone=auto&forecast_days=1";
        setLocation({
          latitude: latitude,
          longitude: longitude,
          url: url.toString(),
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function getSigFigs(rain, showers, time) {
    let maxRain = Math.max(...rain);
    let maxRainTime = new Date(time[rain.indexOf(maxRain)]).getHours() % 12;
    let maxShowers = Math.max(...showers);
    let maxShowersTime =
      new Date(time[showers.indexOf(maxShowers)]).getHours() % 12;
    let amOrPm = (t) => t >= 12 ? "Am" : "Pm";
    if (maxRain != 0 || maxShowers != 0) {
      let t = maxRain > maxShowers ? amOrPm(maxRainTime) : amOrPm(maxShowersTime)
      let data =
        maxRain > maxShowers
          ? { display: { data: maxRain, time: maxRainTime, t: t } }
          : { display: { data: maxShowers, time: maxShowersTime, t: t } };
          setSigFigs(data)
    }

    /*setSigFigs({
      maxRain: {
        data: maxRain,
        time: "a",
      },
      maxShowers: {
        data: maxShowers,
        time: maxShowersTime + " " + amOrPm,
      },
    });*/
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location.url != "loading") {
      async function getWeather(url) {
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        setWeatherData(data.hourly);
        getSigFigs(data.hourly.rain, data.hourly.showers, data.hourly.time);
      }
      getWeather(location.url);
    }
  }, [location.url]);

  //Chart.JS config

  defaults.maintainAspectRatio = false;
  defaults.responsive = true;
  defaults.backgroundColor = "#9BD0F5";
  defaults.borderColor = "#fff;";
  defaults.color = "#fff";

  Chart.register(Colors);

  return (
    <div id="graph" className="">
      <div className="items-center text-center h-[250px]">
        <Bar
          options={{
            responsive: true,
            interaction: {
              intersect: false,
              mode: "index",
            },
            scales: {
              y: {
                ticks: {
                  stepSize: 1,
                  values: [0, 1, 2, 3],
                },
              },
            },
            plugins: {
              colors: {
                enabled: true,
              },
            },
          }}
          data={{
            labels: weatherData?.time?.map((date) => {
              const newDate = new Date(date);
              const amOrPm = newDate.getHours() >= 12 ? "PM" : "AM";
              const res = (newDate.getHours() % 12) + " " + amOrPm;
              return res;
            }),
            datasets: [
              {
                label: "Rain (in mm)",
                data: weatherData?.rain?.map((data) => data),
                borderRadius: 5,
              },
              {
                label: "Showers (in mm)",
                data: weatherData?.showers?.map((data) => data),
                borderRadius: 5,
              },
            ],
          }}
        />
      </div>
      <div className="flex flex-col gap-4 items-center">
        {sigFigs?.display?.data >= 0.2 ? (
          <Card
            head="Potential Outages:"
            text={"Today at: " + sigFigs?.display?.time + " " + sigFigs?.display?.t}
            foot={"Amount of rain/shower: " + sigFigs?.display?.data + "mm"}
          />
        ) : (
          <Card head="No Outages" text="At least not due to rain" />
        )}
      </div>
    </div>
  );
}
