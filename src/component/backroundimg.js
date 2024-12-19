// src/components/Background.js

import React from "react";

const Background = ({ imageUrl, children }) => {
    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${imageUrl})`, // Use imported image in inline style
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height:"100vh",
        overflow:"auto"
    };

    return <div style={backgroundStyle}>{children}</div>;
};

export default Background;
