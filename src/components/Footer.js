import React from "react";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="credits">
                    <p>
                        Developed by <a href="/">Rabin Kaspal</a>
                    </p>
                    <a
                        href="https://github.com/rabinkaspal/react-wordle"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="github">
                            <AiFillGithub size="20px" className="icon" /> Github
                        </div>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
