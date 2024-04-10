"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
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

const Table = () => {
  const [cityData, setCityData] = useState<CityData[]>([]);
  useEffect(() => {
    fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20').
      then((res) => res.json())
      .then((data) => setCityData(data.results))
      .catch((err) => console.log("error", err))
  }, []);

  console.log("cityData", cityData)

  // sort funtion ......

  const handleSort = (head) => {
    // const sortData = cityData.sort((el)=>  );

  }


  const TABLE_HEAD = ["Country Code", "Cuntries", "City Name", "TimeZone", "Poulation"];
  return (
    <Card className="h-full w-full " style={{ marginTop: "100px " }}>
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
                    {index !== TABLE_HEAD.length - 1 && (
                      <>
                        {/* <ChevronUpDownIcon strokeWidth={1} className="h-4 w-4" onClick={() => handleSort(head)} /> */}
                        <ChevronUpIcon className="h-4 w-4" />
                        <ChevronDownIcon className="h-4 w-4" />
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
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Table;



