"use client"
import { useEffect, useState } from 'react';
import SearchBar from './searchbar';

interface CityData {
    fields: {
        city_name: string;
        population: number;
        // Define other fields if needed
    }
    // Add other fields if needed
}

export interface seachPropData {
    cou_name_en: string;
    geoname_id: string;
    loading: boolean;
}
function MainSearch() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [suggestion, setSuggestion] = useState<string[]>([]);
    const [cityData, setCityData] = useState<CityData[]>([]);
    const fetchCityData = () => {
        fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20').
            then((res) => res.json())
            .then((data) => setCityData(data.results))
            .catch((err) => console.log("error", err))
    }
    useEffect(() => {
        fetchCityData();
        // if (query === "") {
        //     setSuggestion([]);
        // }
        // else {
        //     let newListOfSuggestion: string[] = cityData.filter((item) =>
        //         item.cou_name_en.toLowerCase().indexOf(query) !== -1 ? true : false
        //     ).map(item => item.cou_name_en);
        //     setSuggestion(newListOfSuggestion)
        // }
        // setTimeout(() => setLoading(false), 2000)
    }, [query])
    console.log("city data here", cityData)


    return (
        <div className="App">
            <h1 style={{ color: "#ff006d" }}>Search Bar</h1>
            <SearchBar
                loading={loading}
                setLoading={setLoading}
                suggestion={suggestion}
                onChange={(val: string) => setQuery(val)}
            />
        </div>
    );
}

export default MainSearch;