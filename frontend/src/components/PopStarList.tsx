import PopStarCard from "./PopStarCard";
import IPopStar from "../interfaces/IPopStar";
import { usePopStarContext } from "../contexts/PopStarContext";

const PopStarList = () => {
    const { filteredPopStars } = usePopStarContext();

    return (
        <div>
            <div className="bg-music-black  rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                
                {filteredPopStars.length > 0 ? (
                filteredPopStars.map((popStar: IPopStar) => (
                    <div key={popStar.id}>
                        <PopStarCard popStar={popStar} />
                    </div>
                ))
                ) : (
                    <p className="text-white text-lg col-span-full text-center">
                        No pop stars found. <br />
                        Try searching for something else.
                    </p>
                )}
            </div>
        </div>
    )
}

export default PopStarList;