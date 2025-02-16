import { usePopStarContext } from "../contexts/PopStarContext";
import IPopStar from "../interfaces/IPopStar";

const imageEndpoint = "http://localhost:5282/images";

function PopStarCardAdmin() {
  const { filteredPopStars } = usePopStarContext();

    // The rest is the same as your snippet
    return (
    <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Administrate Pop Stars</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 bg-music-black rounded-lg">
        
        {filteredPopStars.length > 0 ? (
            filteredPopStars.map((popStar: IPopStar) => (
                <div key={popStar.id}>
                <div className="bg-music-black rounded-[9px] p-4 flex flex-col items-center text-white hover:visible shadow-lg shadow-black overflow-hidden">
                    
                    <img
                        src={`${imageEndpoint}/${popStar.image}`}
                        alt={popStar.name}
                        className="relative z-20 rounded-md h-48 w-[400px] object-top object-cover"
                        />
                    <p className="z-30 text-lg mb-1">ID: {popStar.id}</p>

                    {/* Divider */}
                    <div className="z-30 w-full h-px bg-music-green my-2" />

                    <h2 className="z-30 text-2xl font-bold mb-1">{popStar.name}</h2>
                    <p className="z-30 text-lg mb-1 text-gray-200">{popStar.category}</p>


                    <p className="z-30 text-lg">
                        <span className="z-30 font-semibold">${popStar.pricePerHour}</span> per hour
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


// { <div key={popStar.id} className="max-w-sm rounded overflow-hidden shadow-lg text-white bg-music-black">
//                 {popStar.image && (
//                 <img
//                     src={`${imageEndpoint}/${popStar.image}`}
//                     alt={`Product category: ${popStar.image}`}
//                     className="w-full h-48 object-cover object-top"
//                 />
//                 )}
//                 <p className="z-30 text-lg mb-2">ID: {popStar.id}</p>
//                 <h2 className="z-30 text-2xl font-bold mb-1">Name: {popStar.name}</h2>
//                 <p className="z-30 text-lg mb-2">Genre: {popStar.category}</p>

//                 {/* Divider */}
//                 <div className="z-30 w-full h-px bg-music-green my-2" />

//                 <p className="z-30 text-lg">
//                     <span className="z-30 font-semibold">${popStar.pricePerHour}</span> per hour
//                 </p>
//             </div> }