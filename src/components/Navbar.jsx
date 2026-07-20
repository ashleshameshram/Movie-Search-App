import React, { useState } from 'react';
import './Navbar.css'

export default function Navbar({goHome}) {
    return(
        <>
           <div className="navbarContainer">
                <h1 onClick={goHome}>CineFind</h1>
                <h3>Find any movie in seconds</h3>
            </div>
        </>
    )
}