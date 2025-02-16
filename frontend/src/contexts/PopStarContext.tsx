import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import PopStarService from '../services/PopStarService';
import IPopStar from '../interfaces/IPopStar';

const PopStarContext = createContext<any>(null);

export const PopStarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [popStars, setPopStars] = useState<IPopStar[]>([]);
    const [filteredPopStars, setFilteredPopStars] = useState<IPopStar[]>([]); // For search functionality


    // Fetch all pop stars on start
    useEffect(() => {
        fetchAllPopStars();
    }, []);

    // Reset filtered pop stars when changing pages
    useEffect(() => {
        setFilteredPopStars(popStars);
        console.log("Context; filtered pop stars: ", filteredPopStars);
    }, [popStars]);


    const onAddPopStar = (newPopStar: IPopStar) => {
        setPopStars([...popStars, newPopStar]);
    }

    const fetchAllPopStars = async () => {
        try {
            const response = await PopStarService.getAllPopStars();

            if (response.length === 0) {
                setPopStars([]);
            }
            setPopStars(response);
        } catch (error) {
            console.error("Error fetching all pop stars: ", error);
        }
    }
    
    const onUpdatePopStar = (editedPopStar: IPopStar) => {
        const updatedPopStars = popStars.map((popStar: IPopStar) => 
            popStar.id === editedPopStar.id ? editedPopStar : popStar
        );
        setPopStars(updatedPopStars);
    }

    // #Database operations

    // #Deleting
    const onDeletePopStar = (id: number) => {
        const popStarAfterDelete = popStars.filter((popStar: IPopStar) => popStar.id !== id);
        setPopStars(popStarAfterDelete);
    }

    // #Fetching
    const fetchPopStarsByName = async (name: string) => {
        console.log("Fetching pop stars by name: ", name);
        try {
            const response = await PopStarService.getPopStarByName(name);
            setPopStars(response);
        } catch (error) {
            console.error("Error fetching pop stars by name: ", error);
            setPopStars([]);
        }
    }

    const fetchPopStarsById = async (id: number) => {
        console.log("Context, Fetching pop stars by id: ", id);
        try {
            const response = await PopStarService.getPopStarById(id);

            if (!response) { // If no response, set pop stars to empty array
                setPopStars([]);
                return;
            }
            
            setPopStars([response]);
        } catch (error) {
            console.error("Error fetching pop stars by id: ", error);
            setPopStars([]);
        }
    }

    const fetchPopStarsByCategory = async (category: string) => {
        console.log("Fetching pop stars by category: ", category);
        try {
            const response = await PopStarService.getPopStarByCategory(category);
            setPopStars(response);
        } catch (error) {
            console.error("Error fetching pop stars by category: ", error);
            setPopStars([]);
        }
    }

    const fetchPopStarsByPrice = async (price: number) => {
        console.log("Fetching pop stars by price: ", price);
        try {
            const response = await PopStarService.getPopStarByPrice(price);
            setPopStars(response);
        } catch (error) {
            console.error("Error fetching pop stars by price: ", error);
            setPopStars([]);
        }
    }

    // #Filtering locally
    // const filterPopStarsLocallyByCategory = (searchTerm: string) => {
    //     if (!searchTerm) {
    //         setFilteredPopStars(popStars);
    //         return;
    //     }

    //     const filtering = popStars.filter((p) => 
    //         p.category.toLowerCase().includes(searchTerm.toLowerCase())
    //     );

    //     setFilteredPopStars(filtering);
    // }

    const filterPopStarsLocallyByAny = (searchTerm: string) => {
        if (!searchTerm) {
            setFilteredPopStars(popStars);
            return;
        }

        const searchLowerTrim = searchTerm.toLowerCase().trim();
        const checkIfNumber = !isNaN(Number(searchTerm));

        const filtering = popStars.filter((p) => 
            // p.id.toString().toLowerCase().includes(searchLower) ||
            p.name.toLowerCase().includes(searchLowerTrim) ||
            p.category.toLowerCase().includes(searchLowerTrim) ||
            (checkIfNumber && p.pricePerHour <= Number(searchTerm))
    
        );
        setFilteredPopStars(filtering);
    }

    return (
        <PopStarContext.Provider value={{
            popStars, setPopStars, onAddPopStar, onUpdatePopStar, onDeletePopStar, fetchAllPopStars, fetchPopStarsById, fetchPopStarsByName, fetchPopStarsByCategory, fetchPopStarsByPrice,
            filteredPopStars, setFilteredPopStars, filterPopStarsLocallyByAny
        }}>
            {children}
        </PopStarContext.Provider>
    )
}

export const usePopStarContext = () => {
    return useContext(PopStarContext);
}