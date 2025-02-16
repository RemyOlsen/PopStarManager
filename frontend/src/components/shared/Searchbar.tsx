import { usePopStarContext } from "../../contexts/PopStarContext";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// This component is used to search for pop stars by name, genre or hourly rate
function Searchbar() {
    const {filterPopStarsLocallyByAny } = usePopStarContext();
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleLocalSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        filterPopStarsLocallyByAny(searchTerm);
    }

    return (
        <div className="flex flex-col sm:flex-row mx-4 sm:mx-0 items-center mb-4">
            <label className="text-white mt-4 sm:mt-0 sm:mr-2 text-lg">
                <FontAwesomeIcon icon={faSearch} />
            </label>
            <input 
                type="text"
                placeholder={"Search by name, genre or price in thousands"}
                value={searchTerm}
                onChange={handleLocalSearchChange}
                className="mt-4 sm:mt-0 p-2 border-2 w-full sm:w-96 md:w-96 lg:w-96 rounded text-center border-music-green bg-music-black text-white"
                
            />
        </div>    
    );
}

export default Searchbar;