"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useThrottle } from 'use-throttle';
declare module 'use-throttle';
// Define a type for the suggestion
type Suggestion = {
    name: string;
};

interface seachPropData {
    cou_name_en: string;
    geoname_id: string;
    loading: boolean;
    setLoading: boolean;
    onChange: () => void;
    suggestion: string[];
}

const SearchBar: React.FC<seachPropData> = ({ loading, setLoading, suggestion, onChange }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    // // Fetch suggestions from an API
    // const fetchSuggestions = (inputinputValue: string) => {
    //     fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&q=${inputinputValue}`).
    //         then((res) => res.json())
    //         .then((data) => console.log("data", data.results))
    //         .catch((err) => console.log("error", err))
    // }
    // fetchSuggestions(inputValue);
    // console.log("inputValue", inputValue)

    const [inputText, setInputText] = useState("");

    const [active, setActive] = useState(0);
    const scrollRef = useRef();
    const thorttledText = useThrottle(inputText, 1000);


    useEffect(() => {
        onChange(thorttledText);

    }, [thorttledText, onChange])
    const handleInputChange = (e: string) => {
        console.log("e", e.target.value)
        setInputText(e.target.value)
        // onChange(e.target.value);
        setLoading(true)
    }
    const handleClear = () => {
        setInputText("");
        onChange("");
        setLoading(false)
    }

    const haqndeAcitveSuggestion = (e) => {
        switch (e.keyCode) {
            // ArrowDown Key 
            case 40:
                if (active >= 5) {
                    setActive((prev) => prev + 1);
                    scrollRef.current.scrollTop += 38.05;
                }
                else {
                    setActive((prev) => prev + 1)
                }
                break;
            // for ArrowUp key
            case 38:
                if (active <= 0) {
                    setActive((prev) => prev - 1)
                    scrollRef.current.scrollTop -= 38.05;

                }
                else {
                    setActive((prev) => prev - 1)
                }
                break;
            // Enter key 
            case 13:
                break;

            default: return;
        }
    }

    return (
        <>
            {/* <form className='max-w-md mx-auto relative'>
                <div className='relative'>
                    <input
                        type='search'
                        className='w-full p-4 rounded-full bg-slate-800 text-white'
                        placeholder='Type to search..'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.inputValue)}
                    />
                    <button className='absolute right-1 top-1/2 transform -translate-y-1/2 p-3 bg-slate-900 rounded-full'>
                        <CiSearch style={{ color: 'white', fontSize: '20px' }} />
                    </button>
                    <div className='absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2'>
                        <span>Text 1</span>
                    </div>
                </div>
            </form> */}
            {/* ................................................................. */}

            <div className='search-bar-wrapper'
                len={suggestion.length}
                onKeyUp={haqndeAcitveSuggestion}
            >
                <img className='image' src='https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/search.png' alt='Search_icon' />
                <input className='input' value={inputValue}
                    onChange={handleInputChange}
                />
                <div>
                    {inputValue && (
                        <img className='image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ArR-OqjOE4CoIW3fsFn7N2ZTqJfrPXHwQYiTVg7sZihJeaj0PWOYqq7d2yJvzzEl51k&usqp=CAU' alt='close_icon' style={{
                            cursor:
                                "pointer"
                        }}
                            onClick={handleClear}
                        />
                    )}
                    {loading && (
                        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
                    )}
                </div>
            </div>
            {!loading && suggestion.length > 0 && (
                <div className='suggestion-box' len={suggestion.length} limit={5} active={active}>
                    {suggestion.map((item, index) => (
                        <div key={item} onMouseOver={() => setActive(index + 1)}>{item}</div>
                    ))}
                </div>
            )}
        </>
    );
};

export default SearchBar;





