import * as React from "react"

const ContainerGrid = ({ children, className = '' }) => {
    return <div className={`${className} container grid mx-auto py-3`}>
        {children}
    </div>
}


export default ContainerGrid;
