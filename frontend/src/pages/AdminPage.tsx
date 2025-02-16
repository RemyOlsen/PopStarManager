import AddPopStar from "../components/AddPopStar";
import UpdatePopStars from "../components/UpdatePopStar";
import DeletePopStar from "../components/DeletePopStar";
import { usePopStarContext } from "../contexts/PopStarContext";
import PopStarCardAdmin from "../components/PopStarCardAdmin";
import Searchbar from "../components/shared/Searchbar";
import { useEffect } from "react";
import SearchbarDbAdmin from "../components/shared/SearchbarDbAdmin";

function AdminPage() {

    const { filterPopStarsLocallyByAny } = usePopStarContext();

    useEffect(() => {
        filterPopStarsLocallyByAny("");
    }, [])


    return (
        <div className="container mx-auto py-4">
            <h3 className="text-3xl font-bold mb-4 text-white">Administrate Pop Stars</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                <AddPopStar />
                <UpdatePopStars />
                <DeletePopStar />

                {/* AdminSearchCard here */}
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white">Search</h3>
                <Searchbar />
                <SearchbarDbAdmin />
                <PopStarCardAdmin />
        </div>
    )

}

export default AdminPage;