import PopStarList from "../components/PopStarList";
import { usePopStarContext } from "../contexts/PopStarContext";
import Searchbar from "../components/shared/Searchbar";
import { useEffect } from "react";

function PopStarPage() {
    const { popStars, filterPopStarsLocallyByAny } = usePopStarContext();

    useEffect(() => {
        filterPopStarsLocallyByAny("");
    }, [])

    return (
        <div className="container mx-auto py-4">

            <h1 className="text-white text-3xl pb-4">Pop Stars</h1>

            <Searchbar />


            <PopStarList/>

            {popStars.length === 0 && <h1 className="text-4xl text-red-500">No Pop Stars Found, check if database is connected</h1>}

        </div>
    );
}

export default PopStarPage;