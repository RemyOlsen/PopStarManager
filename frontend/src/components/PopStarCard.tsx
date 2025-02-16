import { FC } from 'react';
import IPopStar from '../interfaces/IPopStar';

const imageEndpoint = "http://localhost:5282/images";

const PopStarCard: FC<{ popStar: IPopStar }> = ({ popStar }) => {

    return (

        // Outer wrapper with border and shadow and hover effect
        <div className="relative group rounded-xl p-[3px]
                        hover:bg-gradient-to-tl from-music-black to-music-green 
                        shadow-lg shadow-black
                        hover:scale-[1.02] hover:shadow-xl 
                        transition-transform duration-300 ease-in-out">

            {/* Inner card:
                it has rounded-9px, because "rounded-xl - padding-[3px]" = 9px. So it's exactly 3px around the edges as well
                */}
            <div className="bg-music-black rounded-[9px] p-4 flex flex-col items-center text-white hover:visible shadow-lg shadow-black overflow-hidden">
                {/* Image in the background makes a blur effect on hover, scales a little to make it stronger */}
                <img
                    src={`${imageEndpoint}/${popStar.image}`}
                    alt={popStar.name}
                    className="relative z-10 rounded-md h-64 w-[1000px] object-cover object-top opacity-0
                                px-4 md:px-5 xl:px-10
                                group-hover:blur-3xl group-hover:opacity-100 group-hover:scale-[1.15] 
                                transition-all duration-300 ease-in-out mb-4"
                    />
                {/* Visible Image */}
                <div className="absolute px-4 md:px-5 xl:px-5">
                    <img
                        src={`${imageEndpoint}/${popStar.image}`}
                        alt={popStar.name}
                        className="relative z-20 rounded-md h-64 w-[1000px] object-top object-cover"
                        />
                </div>
                
                <h2 className="z-30 text-2xl font-bold mb-1">{popStar.name}</h2>
                <p className="z-30 text-lg mb-2 text-gray-200">{popStar.category}</p>

                {/* Divider */}
                <div className="z-30 w-full h-px bg-music-green my-2" />

                <p className="z-30 text-lg">
                    <span className="z-30 font-semibold">${popStar.pricePerHour}</span> per hour
                </p>
            </div>
        </div>
        

    );
};

export default PopStarCard;
