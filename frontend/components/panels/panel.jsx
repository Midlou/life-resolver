import React from "react";

const PanelHeader = ({ children }) => {
    return <div className="p-4">
        {children}
    </div>
}

const PanelBody = ({ children }) => {
    return <div className="p-4 pb-0">
        {children}
    </div>
}

const PanelFooter = ({ children }) => {
    return <div className="p-4">
        {children}
    </div>
}

const Panel = ({ Body = null, Header = null, Footer = null, children = null, className = "" }) => {
    if (!children) return null;
    return <div className={`shadow-sm rounded border border-gray-200 ${className}`}>
        {Header ? <PanelHeader children={Header} /> : null}
        {!Body && children ? children : null}
        {Body ? <PanelBody children={Body} /> : null}
        {Footer ? <PanelFooter children={Footer} /> : null}
    </div>
}

export default Panel;
