import { useState } from "react";
import PopStarService from "../services/PopStarService";
import { usePopStarContext } from "../contexts/PopStarContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeletePopStar = () => {
    const { onDeletePopStar } = usePopStarContext();
    const [popStarId, setPopStarId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDeletePopStarById = async () => {

        try {
            if (popStarId !== null) {
                await PopStarService.deletePopStarById(popStarId);
            } else {
                setError("Pop Star ID cannot be null");
            }
            onDeletePopStar(popStarId);
            setPopStarId(null);
        } catch (error) {
            setError(`Error deleting Pop Star: ${error}`);
            console.error(error);
        }
    }

    const inputStyle = 'border-2 my-1 p-1 border-music-green rounded bg-music-black text-center text-white';

    return(
        <div className="w-[300px]">
            <h1 className='text-white'>Delete a Pop Star</h1>
            <div>
                <input 
                type="number"
                placeholder="Pop Star ID"
                onChange={(e) => setPopStarId(parseInt(e.target.value))}
                className = {inputStyle}
                />
            </div>
            <button 
                onClick={handleDeletePopStarById}
                className='bg-music-green text-black rounded p-2 hover:scale-105 transition-transform mt-2'>
                    <FontAwesomeIcon icon={faTrash} />
                    &nbsp; Delete
            </button>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    )

}

export default DeletePopStar;