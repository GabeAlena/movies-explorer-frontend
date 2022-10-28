import React from 'react'

const Preloader = ({ isLoading }) => {
    return (
        <div className={`${isLoading ? 'preloader' : 'preloader_inactive'}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
