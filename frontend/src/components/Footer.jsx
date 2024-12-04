import React from 'react';
import {  FaGithub , FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://x.com/isonikrish" target="_blank" rel="noopener noreferrer">
                        <FaXTwitter size={24} />
                    </a>
                    <a href="https://github.com/isonikrish" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/isonikrish/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn size={24} />
                    </a>
                    
                </div>
            </nav>
            <aside>
                <p>Built by <span className="text-blue-500 hover:underline">Krish Soni</span></p>
                <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside>
        </footer>
    );
}

export default Footer;
