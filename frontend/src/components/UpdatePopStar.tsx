import { useState, ChangeEvent } from "react";

import { usePopStarContext } from "../contexts/PopStarContext";
import ImageUploadService from "../services/ImageUploadService";
import PopStarService from "../services/PopStarService";

import IPopStar from "../interfaces/IPopStar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-solid-svg-icons";

const UpdatePopStars = () => {
    const { onUpdatePopStar } = usePopStarContext();

    const [ popStarId, setPopStarId ] = useState<number | null>(null);
    const [ updatedPopStar, setUpdatedPopStar] = useState<IPopStar>({
        id: 0,
        name: "",
        category: "",
        pricePerHour: 0,
        image: ""
    });
    
    const [ updatedImage, setUpdatedImage] = useState<File | null>(null);
    const [ isUpdateVisible, setIsUpdateVisible ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files != null) {
            const file = files[0];
            setUpdatedImage(file);
        }
    }

    const toTitleCase = (string: string) => {
        return string
            .split(" ")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    // Event handlers for inputs
    const changePopStarId = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedPopStar({...updatedPopStar, id: parseInt(e.target.value) });
    }

    const changePopStarName = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedPopStar({...updatedPopStar, name: toTitleCase(e.target.value)});
        
    }

    const changePopStarCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedPopStar({...updatedPopStar, category: toTitleCase(e.target.value)});
    }

    const changePopStarPricePerHour = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedPopStar({...updatedPopStar, pricePerHour: parseInt(e.target.value)});
    }

    const handleGetPopStarById = async () => {
        setError(null);

        if (!popStarId) {
            setError("Please enter a Pop Star ID");
            setIsUpdateVisible(false);
            return;
        }

        try {
            const response = await PopStarService.getPopStarById(popStarId);
            console.log("PopStarService response:", response);
            
            if (response.status === 404) {
                setError("Pop Star not found. Please check the ID and try again.");
                setIsUpdateVisible(false);
            } else {
                setIsUpdateVisible(true);
                setUpdatedPopStar(response);
            }
        } catch (error) {
            setError("Error fetching the Pop Star. Try again.");
            setIsUpdateVisible(false);
        } 
        finally {
            setPopStarId(null);
        }
    }

    const handleUpdatePopStar = async () => {

        let newImage = updatedPopStar.image;
        try {
            if (updatedImage != null) {
                const response = await ImageUploadService.uploadImage(updatedImage);
                newImage = response.data.fileName;
            }
            const editedPopStar = {
                ...updatedPopStar,
                image: newImage,
            }
            await PopStarService.updatePopStar(editedPopStar);
            onUpdatePopStar(editedPopStar);
            setIsUpdateVisible(false);
        } catch (error) {
            console.error("Error updating Pop Star: ", error);
        }
    }

    const inputStyle = 'border-2 my-1 p-1 border-music-green rounded bg-music-black text-center text-white';

    return (
        <div>
            <h1 className="text-white text-xl">Update Pop Star</h1>
            <input
                type="number"
                placeholder="Enter Pop Star ID"
                value={popStarId ?? ""}
                onChange={(e) => setPopStarId(parseInt(e.target.value))}
                className = {inputStyle}/>
                <br />
                <button
                    className="bg-music-green hover:bg-music-green font-bold text-black rounded p-2 hover:scale-105 transition-transform w-52 my-1"
                    onClick={handleGetPopStarById}
                >
                    <FontAwesomeIcon icon={faHand} />
                    &nbsp; Get
                </button>

            {error && <p className="text-red-500">{error}</p>}
        

            {isUpdateVisible && (
                <div>
                    <label className="text-white">ID:  </label>
                    <br />
                    <input
                        type="number"
                        placeholder="ID"
                        value={updatedPopStar.id}
                        onChange={changePopStarId}
                        className = {inputStyle}
                    />
                    <p className="text-sm text-yellow-500">ID change can only overwrite existing ID's</p>
                    <label className="text-white">Name: </label>
                    <br />
                    <input
                        type="text"
                        placeholder="Name"
                        value={updatedPopStar.name}
                        onChange={changePopStarName}
                        className = {inputStyle}
                    />
                    <br />
                    <label className="text-white">Category: </label>
                    <br />
                    <input
                        type="text"
                        placeholder="Category"
                        value={updatedPopStar.category}
                        onChange={changePopStarCategory}
                        className = {inputStyle}
                    />
                    <br />
                    <label className="text-white">Price per hour: </label>
                    <br />
                    <input
                        type="number"
                        placeholder="Price per hour"
                        value={updatedPopStar.pricePerHour}
                        onChange={changePopStarPricePerHour}
                        className = {inputStyle}
                    />
                    <p className="text-sm text-yellow-500">Price in Thousands</p>

                    <br />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="text-white my-3"
                    />
                    <br />
                    <button 
                        className="bg-music-green hover:bg-music-darkgreen font-bold text-black rounded p-2 hover:scale-105 transition-transform my-2 w-52"
                        onClick={handleUpdatePopStar}>
                        <FontAwesomeIcon icon={faPenSquare} />
                        &nbsp; Update
                    </button>
                </div>
            )}
        </div>
    )

}


export default UpdatePopStars;