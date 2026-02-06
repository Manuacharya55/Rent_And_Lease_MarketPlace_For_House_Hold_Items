import React, { useState, useEffect } from 'react';
import '../../style/profile-modern.css';
import { getData } from '../../API/axios';
import { useAuth } from '../../context/Auth';

// Components
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileAddress from '../../components/Profile/ProfileAddress';
import ProfileActions from '../../components/Profile/ProfileActions';
import Loader from '../../components/Shared/Loader';

const Profile = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchProfile = async () => {
        if (!user?.token) return;
        setLoading(true);
        const response = await getData("profile/my-profile", {}, user?.token);
        if (response?.success) {
            setData(response?.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (user?.token) {
            fetchProfile();
        }
    }, [user?.token]);

    if (loading) return <Loader />;

    return (
        <div className="profile-container">
            {/* Header Section */}
            <ProfileHeader data={data} />

            <div className="profile-content-grid">
                {/* Personal Details */}
                <ProfileInfo user={data?.user} />

                {/* Address */}
                <ProfileAddress address={data?.addresses} />
            </div>

            {/* Quick Actions */}
            <ProfileActions />
        </div>
    );
};

export default Profile;
