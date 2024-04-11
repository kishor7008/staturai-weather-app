"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Link from "next/link";
// Define interface for city data
interface CityData {
  recordid: string;
  cou_name_en: string;
  name: string;
  timezone: string;
  population: number;
  geoname_id: string;
  country_code: string;
  fields: {
    city_name: string;
    population: number;
    // Define other fields if needed
  }
  // Add other fields if needed
}

import { useRef } from 'react';
const Table = () => {
  const headingRefs = useRef({});
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [colorUpArraw, setColorUpArraw] = useState(false);
  const [colorDownArrow, setColorDownArrow] = useState(false);
  useEffect(() => {
    fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20').
      then((res) => res.json())
      .then((data) => setCityData(data.results))
      .catch((err) => console.log("error", err))
  }, []);

  console.log("cityData", cityData)

  // sort funtion ......
  var sortData = "";
  const handleAscendingOrder = (head) => {
    console.log("head", head);
    let sortData; // Define sortData variable
    if (head === "Country Code") {
      sortData = [...cityData].sort((a, b) => a.country_code.localeCompare(b.country_code));
    }
    if (head === "Cuntries") {
      sortData = [...cityData].sort((a, b) => a.cou_name_en.localeCompare(b.cou_name_en));
    }
    if (head === "City Name") {
      sortData = [...cityData].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (head === "TimeZone") {
      sortData = [...cityData].sort((a, b) => a.timezone.localeCompare(b.timezone));
    }
    if (head === "Poulation") {
      sortData = [...cityData].sort((a, b) => b.population - a.population);
    }
    // console.log("sortData", sortData);
    headingRefs.current[head].style.color = "black";
    setCityData(sortData);
    setColorUpArraw(true);
    setColorDownArrow(false);
  };

  const handleDescendingOrder = (head) => {
    console.log("head", head);
    let sortData; // Define sortData variable
    if (head === "Country Code") {
      sortData = [...cityData].sort((a, b) => b.country_code.localeCompare(a.country_code));
    }
    if (head === "Cuntries") {
      sortData = [...cityData].sort((a, b) => b.cou_name_en.localeCompare(a.cou_name_en));
    }
    if (head === "City Name") {
      sortData = [...cityData].sort((a, b) => b.name.localeCompare(a.name));
    }
    if (head === "TimeZone") {
      sortData = [...cityData].sort((a, b) => b.timezone.localeCompare(a.timezone));
    }
    if (head === "Poulation") {
      sortData = [...cityData].sort((a, b) => a.population - b.population);
    }
    // console.log("sortData", sortData);
    headingRefs.current[head].style.color = "black";
    setCityData(sortData);
    setColorUpArraw(false);
    setColorDownArrow(true);
  };



  // ...................



  const TABLE_HEAD = ["Country Code", "Cuntries", "City Name", "TimeZone", "Poulation"];
  return (
    <Card className="h-full w-full ">
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full h-600px min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-gray-600 bg-gray-500"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-bold text-white  leading-none opacity-90"

                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length && (
                      <>
                        {/* <span>
                          <ChevronUpIcon className={`h-3 w-4  text-${colorUpArraw ? "black" : "white"}`} onClick={() => handleAscendingOrder(head)} />
                          <ChevronDownIcon className={`h-3 w-4  text-${colorDownArrow ? "black" : "white"}`} onClick={() => handleDescendingOrder(head)} />
                        </span> */}


                        <span>
                          <ChevronUpIcon ref={(el) => headingRefs.current[head] = el}
                            className={"h-3 w-4 text-white"} onClick={() => handleAscendingOrder(head)} />
                          <ChevronDownIcon ref={(el) => headingRefs.current[head] = el} className={"h-3 w-4 text-white"} onClick={() => handleDescendingOrder(head)}
                          />
                        </span>
                      </>
                    )}

                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cityData.map(
              ({ country_code, cou_name_en, name, population, timezone }, index) => {
                const isLast = index === cityData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name} className="hover:bg-gray-300" >
                    <td className={classes} color="blue-gray" >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {country_code}
                      </Typography>
                    </td>

                    <td className={classes} >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {cou_name_en}
                      </Typography>
                    </td>

                    <td className={`${classes} hover:text-blue-700`}>
                      <Link href={`/weather-report?city=${name}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </Link>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {timezone}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {population}
                      </Typography>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>

    </Card>
  );
};

export default Table;

