import { useContext } from "react";
import './hero.css';
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../index"; 
import videoFile from "../../assets/dashboardVideo.mp4"
import buildingImage from "../../assets/building.jpg";
import { motion } from "framer-motion";
import Disclaimer from "../disclaimer/disclaimer";

const Hero = () => {
    const { loggedIn, setRedirectionPath } = useContext(GlobalContext);  
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (loggedIn) {
            navigate("/properties");
            setRedirectionPath('properties');
        } else {
            navigate("/login");
            setRedirectionPath('properties');
        }
    };

    return (
        <>
        {!loggedIn? <Disclaimer/>: null}
        <div className="parentHeroWrapper">
        <div className="heroWrapper">
            {/* Background Video */}
            <video
                src={videoFile}
                autoPlay
                loop
                muted
                playsInline
                className="backgroundVideo"
            >
                {/* Fallback */}
                Your browser does not support the video tag.
            </video>

            {/* Foreground Content */}
            <div className="heroContent">
                <motion.img
                    src={buildingImage}
                    alt="Building"
                    className="foregroundImage"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                />

                <motion.div
                    className="textOverlay"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h1 className="heading">
                        Build Your Real Estate Portfolio
                    </h1>
                    <p className="subheading">
                        Empowering Your Wealth, One Smart Property at a Time.
                    </p>
                    <div className="buttonWrapper">
                        <motion.button
                            onClick={handleGetStarted}
                            className="getStartedButton"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
            {/* <div className="newWrapper z-20">
                <div className="text-8xl">my name is navneet</div>
            </div> */}
        </div>
            </>
    );
};

export default Hero;
