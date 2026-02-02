import { NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";

const ProductOverview = ({ description, user, address }) => (
    <div className="info-card overview-card">
        <h3>Overview</h3>
        <p className="desc-text">{description}</p>

        <div className="divider"></div>

        <div className="owner-section">
            <span className="section-label">Listed By</span>
            <div className="owner-row">
                <img src={user?.avatar} />
                <div>
                    <h4>{user?.name}</h4>
                    <span className="owner-sub">{user?.phonenumber}</span>
                </div>
            </div>
        </div>

        <div className="divider"></div>

        <NavLink
            to={`https://www.google.com/maps?q=${address?.lat},${address?.lng}`}
            target="_blank"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "inherit" }}
        >
            <MapPin size={18} />
            {address?.address}
        </NavLink>
    </div>
);

export default ProductOverview;
