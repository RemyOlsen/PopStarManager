import { usePopStarContext } from "../../contexts/PopStarContext";
import React, { useEffect, useRef, useState } from "react";
import IPopStar from "../../interfaces/IPopStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";


function SearchbarDbAdmin() {
    const { popStars, setPopStars, fetchPopStarsById, fetchPopStarsByName, fetchPopStarsByCategory, fetchAllPopStars, filterPopStarsLocallyByCategory } = usePopStarContext();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [databaseSearchTerm, setDatabaseSearchTerm] = useState<string>("");

    const initialPopStarsRef = useRef<IPopStar[] | null>(null);

    useEffect(() => {
        if (initialPopStarsRef.current === null && popStars !== null && popStars.length > 0) {
            initialPopStarsRef.current = popStars;
        }
    }, [popStars]);

    const handleDatabaseSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDatabaseSearchTerm(e.target.value);
    }

    const getPopStarsById = async (databaseSearchTerm: string) => {
        console.log("SearchbarDb, Fetching pop stars by ID: ", databaseSearchTerm);
        const id = Number(databaseSearchTerm);
        if (isNaN(id) || !id) {
            setError("SearchbarDb, Please enter a valid number");
            return;
        }
        console.log("SearchbarDb, Fetching pop stars by ID: ", id);
        await fetchPopStarsById(id); 
        setDatabaseSearchTerm("");
    }


    const getPopStarByName = async (databaseSearchTerm: string) => {
        await fetchPopStarsByName(databaseSearchTerm); 
        setDatabaseSearchTerm("");
    }

    const getPopStarsByCategory = async (databaseSearchTerm: string) => {
        const capitalizedSearchTerm = databaseSearchTerm.charAt(0).toUpperCase() + databaseSearchTerm.slice(1).toLowerCase(); // First letter needs to be uppercase for the backend, rest lowercase
        await fetchPopStarsByCategory(capitalizedSearchTerm); 
        setDatabaseSearchTerm("");
    }


    const resetPopStars = () => {
        setSearchTerm("");
        setDatabaseSearchTerm("");

        fetchAllPopStars();

        if (initialPopStarsRef.current !== null) {
            setPopStars([...initialPopStarsRef.current]);
        }
    }

    const buttonStyle = "bg-music-green hover:bg-music-darkgreen text-music-black font-bold py-2 px-4 rounded";
    return (
        <div className="flex flex-col mx-4 mb-4 sm:mx-0 ">
            <div className="flex flex-col sm:flex-row items-center mb-4">
                <label className=" text-white mt-4 sm:mt-0 sm:mr-2 text-lg">
                    <FontAwesomeIcon className="size-[18px]" icon={faDatabase} />
                </label>
                <input 
                    type="text"
                    placeholder="Query the database. Name is case sensitive."
                    value={databaseSearchTerm}
                    onChange={handleDatabaseSearchChange}
                    className="mt-4 sm:mt-0 p-2 border-2 w-full sm:w-96 md:w-96 lg:w-96 rounded text-center border-music-green bg-music-black text-white"
                />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                    onClick={() => getPopStarsById(databaseSearchTerm)}
                    className={buttonStyle}
                >
                    Search by ID
                </button>
                <button
                    onClick={() => getPopStarByName(databaseSearchTerm)}
                    className={buttonStyle}
                >
                    Search by Name
                </button>
                <button 
                    onClick={() => getPopStarsByCategory(databaseSearchTerm)}
                    className={buttonStyle}
                >
                    Search by Category
                </button>
                <button 
                    onClick={() => resetPopStars()}
                    className={buttonStyle}
                >
                    Reset
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>    
    );
}

export default SearchbarDbAdmin;