import React from 'react';
import '../../style/loader.css';

const Loader = ({ fullScreen = true }) => {
    return (
        <div className={`loader-container ${!fullScreen ? 'relative' : ''}`}>
            <span className="loader-spinner"></span>
        </div>
    );
};

export default Loader;
