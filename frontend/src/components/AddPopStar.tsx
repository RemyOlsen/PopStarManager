import {useState, ChangeEvent, FC } from 'react';

import { usePopStarContext } from '../contexts/PopStarContext';
import ImageUploadService from '../services/ImageUploadService';
import PopStarService from '../services/PopStarService';

import IPopStar from '../interfaces/IPopStar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AddPopStar() {
    const { onAddPopStar } = usePopStarContext();

    enum UploadStatus {
        IDLE = "Idle",
        UPLOADING = "Uploading",
        COMPLETE = "Upload Complete",
        ERROR = "ERROR",

    }

    const [image, setImage] = useState<File | null>(null);

    const [newPopStar, setNewPopStar] = useState<IPopStar>({
        id: 0,
        name: "",
        category: "",
        pricePerHour: 0,
        image: ""
    });

    const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);

    // Handle image file changes
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files != null) {
            const file = files[0];
            setImage(file);
        }
    }

    // Input changers for controlled inputs
    const changePopStarId = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPopStar({ ...newPopStar, id: parseInt(e.target.value) });
    }

    const changePopStarName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPopStar({ ...newPopStar, name: e.target.value });
    }

    const changePopStarCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPopStar({ ...newPopStar, category: e.target.value });
    }

    const changePopStarPricePerHour = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPopStar({ ...newPopStar, pricePerHour: parseInt(e.target.value) });
    }

    // Handle adding a new pop star with image upload
    const handleAddNewPopStar = async () => {
        setStatus(UploadStatus.UPLOADING);

        try {
            if (image != null) {
                const response = await ImageUploadService.uploadImage(image);

                const popStar = {
                    ...newPopStar,
                    image: response.data.fileName,
                };

                console.log("Pop Star: ", popStar);
                await PopStarService.addPopStar(popStar);

                onAddPopStar(popStar);
                setNewPopStar({
                    id: 0,
                    name: "",
                    category: "",
                    pricePerHour: 0,
                    image: ""
                });
                setStatus(UploadStatus.COMPLETE);
            } else {
                setStatus(UploadStatus.ERROR);
                console.error("No image selected");
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
            setStatus(UploadStatus.ERROR);
        }
    }

    // Changes the style of the input fields, it's down here so less scrolling is needed
    const inputStyle = 'border-2 my-1 p-1 border-music-green rounded bg-music-black text-center text-white';
    return(
        <div>
            
            <h1 className="text-white text-xl">Add a new Pop Star</h1>
            <div>
                {/* <label className="text-white">Pop Star ID: </label> */}
                <input 
                type="number"
                placeholder="Id"
                value = {newPopStar.id || ""}
                onChange={changePopStarId} 
                className={inputStyle}
                />
            </div>
            <div>
                {/* <label className="text-white">Name: </label> */}
                <input 
                type="text"
                placeholder="Name"
                value={newPopStar.name}
                onChange={changePopStarName} 
                className = {inputStyle}
                />
            </div>
            <div>
                {/* <label className="text-white">Category: </label> */}
                <input 
                type = "text"
                placeholder = "Category"
                value = {newPopStar.category}
                onChange = {changePopStarCategory} 
                className = {inputStyle}
                />
            </div>
            <div>
                {/* <label className="text-white">Price per hour: </label> */}
                <input 
                type = "number"
                value = {newPopStar.pricePerHour || ""}
                placeholder = "Price per hour"
                onChange = {changePopStarPricePerHour} 
                className = {inputStyle}
                />
            </div>
            <p className="text-sm text-yellow-500">Price in Thousands</p>
            <div>
                <input 
                type = "file"
                placeholder = 'Image'
                onChange = {handleImageChange}
                className = 'text-white my-3'
                />
            </div>
            <div>
                <button
                    onClick={handleAddNewPopStar}
                    className='bg-music-green hover:bg-music-darkgreen font-bold text-black rounded p-2 hover:scale-105 transition-transform my-1 w-52'>
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp; Add
                </button>
            </div>
            <div>
                <p className='text-white'>{status}</p>
            </div>
            
        </div>

    )
}

export default AddPopStar;