import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Section - About */}
                    <div>
                        <h2 className="text-xl font-semibold">About Bhartiya Capitals</h2>
                        <p className="text-gray-400 mt-2">
                        Bhartiya Capitals is a privately managed real estate investment firm, founded with a vision to create profitable real estate opportunities for investors. Unlike traditional real estate firms, we enable direct participation in property development, ensuring transparent investments and high ROI.

                        </p>
                    </div>

                    {/* Center Section - Quick Links */}
                    <div>
                        <h2 className="text-xl font-semibold">Quick Links</h2>
                        <ul className="mt-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                            <li><Link to="/properties" className="text-gray-400 hover:text-white">Properties</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            <li><Link to="/faqs" className="text-gray-400 hover:text-white">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Right Section - Social Media */}
                    <div>
                        <h2 className="text-xl font-semibold">Follow Me</h2>
                        <div className="flex space-x-4 mt-2">
                            <a href={`${import.meta.env.VITE_DEVELOPER_LINKEDLIN}`} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="text-gray-400 hover:text-white text-2xl" />
                            </a>
                            <a href={`${import.meta.env.VITE_DEVELOPER_GITHUB}`} target="_blank" rel="noopener noreferrer">
                                <FaGithub className="text-gray-400 hover:text-white text-2xl" />
                            </a>
                            <a href={`${import.meta.env.VITE_DEVELOPER_TWITTER}`} target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-gray-400 hover:text-white text-2xl" />
                            </a>

                            <a href={`${import.meta.env.VITE_DEVELOPER_INSTAGRAM}`} target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-gray-400 hover:text-white text-2xl" />
                            </a>
                        </div>
                        <br />
                        <div className=" address text-gray-400 hover:text-white text-1xl">{import.meta.env.VITE_OFFICE_ADDRESS}</div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500">
                    © {new Date().getFullYear()} Bhartiya Capitals. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
