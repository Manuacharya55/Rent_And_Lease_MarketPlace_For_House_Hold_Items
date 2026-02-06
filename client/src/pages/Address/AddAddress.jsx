import { useState } from "react";
import { postData } from "../../API/axios";
import { useAuth } from "../../context/Auth";
import AddressForm from "../../Forms/AddressForm";
import { useNavigate } from "react-router-dom";


const AddAddress = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const values = {
        address: "",
        lat: 0,
        lng: 0,
        country: "",
        state: "",
        district: "",
    }

    const handleSubmit = async (data) => {
        setIsProcessing(true);
        const response = await postData("profile/address", data, user?.token);
        if(response.success){
            navigate("/")
        }
        setIsProcessing(false);
    }

    return (
        <AddressForm data={values} handleSubmit={handleSubmit} isProcessing={isProcessing}/>
    );
};

export default AddAddress;