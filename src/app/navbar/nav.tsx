import { CiSearch } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";

const Nav = () => {
    return (
        <>
            <nav className="bg-gray-700 fixed top-0 w-full z-10">
                <div className="container mx-auto py-4 flex flex-wrap justify-center lg:justify-between items-center">
                    <div className="w-full lg:w-auto mb-3 lg:mb-0 lg:flex-grow">
                        <div className="flex items-center space-x-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </span>
                            <h1 className="text-2xl font-bold text-gray-50">Weather App</h1>
                        </div>
                    </div>
                    <div className="flex  items-center justify-end " style={{ position: "fixed", top: 22, justifyItems: "flex-end", right: 0 }}>
                        <span> <MdMyLocation size={25} color="white" /></span> <span>  <FaLocationDot style={{ margin: "0 10px" }} size={25} color="white" /></span>
                    </div>
                    <div className="w-full lg:w-auto lg:flex-grow flex justify-center">
                        <form className="max-w-md w-full mx-auto relative">
                            <div className="relative">
                                <input
                                    type="search"
                                    className="w-full p-3 rounded-full bg-slate-800 text-white"
                                    placeholder="Type to search.."
                                    value={"inputValue"}
                                />
                                <button className="absolute right-1 top-1/2 transform -translate-y-1/2 p-3 bg-slate-900 rounded-full">
                                    <CiSearch style={{ color: 'white', fontSize: '20px' }} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Nav;

