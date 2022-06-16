import React from "react";
import '../App.css';
import packageJson from '../../package.json';

const FooterComponent = () => {   

    return (
        <footer className='footer-container'>                  
            React.js version = {React.version} ~ App version = {packageJson.version}          
        </footer>
    );
}

export default FooterComponent;