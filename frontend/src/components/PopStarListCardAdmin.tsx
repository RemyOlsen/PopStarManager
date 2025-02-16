import { usePopStarContext } from "../contexts/PopStarContext";
import IPopStar from "../interfaces/IPopStar";
import formatPrice from "./util/FormatPrice";

const image_url = "http://localhost:5282/images";

// This is just a modified version of PopStarCard.tsx and PopStarList.tsx without hoved and blur etc.
function PopStarCardAdmin() {
  const { filteredPopStars } = usePopStarContext();

    return (
    <div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 bg-music-black rounded-lg">
        {filteredPopStars.length > 0 ? (
            filteredPopStars.map((popStar: IPopStar) => (
                <div key={popStar.id}>
                <div className="bg-music-black rounded-[9px] p-4 flex flex-col items-center text-white hover:visible shadow-lg shadow-black overflow-hidden">
                    
                    <img
                        src={`${image_url}/${popStar.image}`}
                        alt={`A Picture of ${popStar.name}`}
                        className="relative z-20 rounded-md h-48 w-[1000px] object-top object-cover"
                        />
                    <p className="z-30 text-lg mt-1">ID: {popStar.id}</p>

                    {/* Divider */}
                    <div className="z-30 w-full h-px bg-music-green mb-2" />

                    <h2 className="z-30 text-2xl font-bold mb-1">{popStar.name}</h2>
                    <p className="z-30 text-lg mb-1 text-gray-200">{popStar.category}</p>


                    <p className="z-30 text-lg">
                        <span className="z-30 font-semibold">{formatPrice(popStar.pricePerHour)}</span>
                        {popStar.pricePerHour >= 1 ? " per hour" : ""}
                </p>
                </div>
            </div>

            ))
        ) : (
            <p className="text-lg col-span-full text-center text-white">
                No pop stars found. <br />
                Try searching for something else.
            </p>
        )}
        </div>
    </div>
    );
}

export default PopStarCardAdmin;