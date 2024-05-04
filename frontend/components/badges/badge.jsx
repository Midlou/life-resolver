import React from "react";

const Badge = ({ children = '', className = '', label = '' }) => {
    return <div className={`${className} text-xs font-bold uppercase px-2 py-2 rounded-lg border text-center`}>
        {
            children || label
        }
    </div>
}

export default Badge;
