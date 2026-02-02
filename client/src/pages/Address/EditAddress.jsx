import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import { getData, patchData } from "../../API/axios";
import AddressForm from "../../Forms/AddressForm";

const EditAddress = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [address, setAddress] = useState({});


    useEffect(() => {
        if (user?.token && id) {
            fetchAddress();
        }
    }, [user?.token])

    const fetchAddress = async () => {
        if (!user || !user?.token || !id) return
        setIsProcessing(true);
        const response = await getData(`profile/address/${id}`, {}, user?.token);
        if (response.success) {
            setAddress({
                address: response?.data?.address,
                lat: response?.data?.location?.lat,
                lng: response?.data?.location?.lng,
                country: response?.data?.country,
                state: response?.data?.state,
                district: response?.data?.district,
            })
        }
        setIsProcessing(false);
    }

    const handleSubmit = async (values) => {
        if (!user || !user?.token || !id) return
        setIsProcessing(true);
        const response = await patchData(`profile/address/${id}`, values, user?.token);

        if (response.success) {
            navigate("/myprofile")
        }
        setIsProcessing(false);
    }
    return (
        <AddressForm data={address} handleSubmit={handleSubmit} isProcessing={isProcessing} />
    )
}

export default EditAddress