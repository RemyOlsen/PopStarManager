import axios from "axios";
import IPopStar from "../interfaces/IPopStar";

const PopStarService = (
    () => {
        
        const popStarEndPoint = "http://localhost:5282/api/popstar";

        const addPopStar = async(newPopStar: IPopStar) => {
            try {
                await axios.post(popStarEndPoint, newPopStar);
            } catch (error) {
                console.error(error);
            }
        }

        const updatePopStar = async(updatedPopStar: IPopStar) => {
            try {
                await axios.put(`${popStarEndPoint}/${updatedPopStar.id}`, updatedPopStar);	
            } catch (error) {
                console.error("There was an error updating the Pop Star: ",error);
            }
        }

        const deletePopStarById = async(id: number) => {
            try {
                await axios.delete(`${popStarEndPoint}/${id}`);
            } catch (error) {
                console.error("There was an error deleting the Pop Star: ",error);
            }
        }

        const getAllPopStars = async() => {
            try {
                const response = await axios.get(popStarEndPoint);
                return response.data;
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        const getPopStarById = async(id: number) => {
            try {
                console.log("Service, Getting Pop Star by ID: ", id);
                const response = await axios.get(`${popStarEndPoint}/${id}`);
                return response.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        const getPopStarByName = async(name: string) => {
            try {
                const response = await axios.get(`${popStarEndPoint}/name/${name}`);
                return response.data;
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        const getPopStarByCategory = async(category: string) => {
            try {
                const response = await axios.get(`${popStarEndPoint}/category/${category}`);
                return response.data;
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        const getPopStarByPrice = async(price: number) => {
            try {
                const response = await axios.get(`${popStarEndPoint}/price/${price}`);
                return response.data;
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        return {
            addPopStar,
            updatePopStar,
            deletePopStarById,
            getAllPopStars,
            getPopStarById,
            getPopStarByName,
            getPopStarByCategory,
            getPopStarByPrice

        }

    }
)();

export default PopStarService;