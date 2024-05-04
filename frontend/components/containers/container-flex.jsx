import * as React from "react"

const ContainerFlex = ({ children, className = '' }) => {
    return <div className={`${className} container flex flex-grow flex-col mx-auto p-2`}>
        {children}
    </div>
}


export default ContainerFlex;
