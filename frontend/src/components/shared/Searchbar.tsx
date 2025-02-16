import { usePopStarContext } from "../../contexts/PopStarContext";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Searchbar() {
    const { popStars, setPopStars, fetchPopStarsByCategory, filterPopStarsLocallyByCategory, filterPopStarsLocallyByAny } = usePopStarContext();
    const [searchTerm, setSearchTerm] = useState<string>("");
    // const [databaseSearchTerm, setDatabaseSearchTerm] = useState<string>("");

    // const initialPopStarsRef = useRef<IPopStar[] | null>(null);

    // useEffect(() => {
    //     if (initialPopStarsRef.current === null && popStars !== null && popStars.length > 0) {
    //         initialPopStarsRef.current = popStars;
    //         console.log("Searchbar, Setting initialPopStarsRef to ", popStars);
    //     }
    // }, [popStars]);
    

    // console.log("Searchbar, Pop stars: ", popStars);
    // console.log("Searchbar, Initial pop stars: ", initialPopStarsRef.current);

    const handleLocalSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        // filterPopStarsLocallyByCategory(searchTerm);
        filterPopStarsLocallyByAny(searchTerm);
    }

    // const handleDatabaseSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setDatabaseSearchTerm(e.target.value);
    // }

    // const getPopStarsByCategory = async (databaseSearchTerm: string) => {
    //     const capitalizedSearchTerm = databaseSearchTerm.charAt(0).toUpperCase() + databaseSearchTerm.slice(1).toLowerCase(); // First letter needs to be uppercase for the backend, rest lowercase
    //     await fetchPopStarsByCategory(capitalizedSearchTerm); 
    //     setDatabaseSearchTerm("");
    // }

    // const resetPopStars = () => {
    //     setSearchTerm("");
    //     setDatabaseSearchTerm("");

    //     filterPopStarsLocallyByCategory("");
    //     console.log("Searchbar, Initial pop stars ref: ", initialPopStarsRef.current);
    //     if (initialPopStarsRef.current !== null) {
    //         setPopStars([...initialPopStarsRef.current]);
    //         console.log("Searchbar, Initial pop stars ref: ", initialPopStarsRef.current);
    //     }
    // }

    return (
        <div className="flex items-center mb-4">
            <label className="text-white mt-4 mr-2 text-lg">
                <FontAwesomeIcon icon={faSearch} />
            </label>
            <input 
                type="text"
                placeholder={"Search by name, genre or your highest hourly rate"}
                value={searchTerm}
                onChange={handleLocalSearchChange}
                className="mt-4 p-2 border-2 w-96 rounded text-center border-music-green bg-music-black text-white"
                
            />
            {/* <input 
                type="text"
                placeholder="Search database by category (you need to click Search button)"
                value={databaseSearchTerm}
                onChange={handleDatabaseSearchChange}
                className="mb-4 p-2 border rounded"
            /> */}
            {/* <div className="container mx-auto mt-8 flex flex-row space-x-4">
                <button 
                    onClick={() => getPopStarsByCategory(databaseSearchTerm)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Search
                </button> }
                {/<button 
                    onClick={() => resetPopStars()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Reset
                </button>
            </div> */}
        </div>    
    );
}

export default Searchbar;