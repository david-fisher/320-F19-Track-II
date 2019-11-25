import React from "react";
import Cookies from "universal-cookie";

export default function Profile() {
    const cookies = new Cookies();
    return (
        <div>
            <h2>This is the profile page.</h2>
    <h3>Name: {cookies.get('name')}</h3>
        </div>
    );

}