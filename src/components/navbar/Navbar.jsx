import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo1.JPG"
import './navbar.css';
import { GlobalContext } from '../..';
import Avatar from 'react-avatar';

const Navbar = () => {
  const { loggedIn, setLoggedIn, setAccessToken, setUserInfo, setRedirectionPath, userInfo } = useContext(GlobalContext);
  const [displayNavbar, setDisplayNavbar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    const message = import.meta.env.VITE_WHATSAPP_MESSAGE;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = displayNavbar ? 'hidden' : 'auto';
  }, [displayNavbar]);

  const handleNavbarClosing = () => setDisplayNavbar(false);
  const handleNavBarOpening = () => setDisplayNavbar(true);

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_IDENTITY_SERVICE_URL}/api/user/logout`, {
      method: 'POST',
      credentials: "include"
    });

    if (userInfo.authProvider === 'google') {
      window.google.accounts.id.revoke(userInfo.email, () => {
        console.log("User Signed out from Google");
      });
    }

    sessionStorage.clear();
    setAccessToken(null);
    setLoggedIn(false);
    setUserInfo(null);
    navigate('/');
  };

  const handleLogin = () => setRedirectionPath("properties");

  const profileURL = userInfo?.userData?.profilePic?.[0]?.profileURL;

  return (
    <div className={`navbar fixed flex justify-between h-[60px] m-[1%] p-3 ${!scrolled ? '!bg-transparent !text-black font-bold' : '!bg-black text-white font-bold'} text-white`}>
      
      {/* Mobile Navbar */}
      <div className={`fixed top-0 left-0 w-[70%] h-screen bg-black opacity-95 flex flex-col p-6 gap-8 transform transition-transform duration-300 ease-in-out z-50 ${displayNavbar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end">
          <i
            onClick={handleNavbarClosing}
            className="fa-solid fa-xmark text-white text-3xl cursor-pointer"
          ></i>
        </div>
        <ul className="text-white text-2xl flex flex-col gap-8">
          <i onClick={handleWhatsAppClick} className="fa-brands fa-whatsapp text-4xl font-bold text-green-500"></i>
          <li><Link onClick={handleNavbarClosing} to="/home">Home</Link></li>
          <li><Link onClick={handleNavbarClosing} to="/about">About</Link></li>
          <li><Link onClick={handleNavbarClosing} to="/properties">Properties</Link></li>
          <li><Link onClick={handleNavbarClosing} to="/faqs">FAQs</Link></li>
          <li><Link onClick={handleNavbarClosing} to="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* Desktop Navbar */}
      <div className="logo flex items-center">
        <Link to="/"><img src={logo} alt="Logo" className="logo w-[100px]" /></Link>
      </div>

      <div className="rightNav flex gap-[15%] w-[50%] items-center">
        <div className="navlinks hidden md:flex justify-between items-center w-[80%]">
          <ul><li><Link to="/home">Home</Link></li></ul>
          <ul><li><Link to="/about">About</Link></li></ul>
          <ul><li><Link to="/properties">Properties</Link></li></ul>
          <ul><li><Link to="/faqs">FAQs</Link></li></ul>
          <ul><li><Link to="/contact">Contact</Link></li></ul>
          <i onClick={handleWhatsAppClick} className="fa-brands fa-whatsapp text-4xl font-bold text-green-500"></i>
        </div>

        {/* Mobile Hamburger */}
        <div onClick={handleNavBarOpening} className="mobileViewBar flex md:hidden text-3xl cursor-pointer">
          <i className={`fas fa-bars ${!scrolled ? '!bg-transparent !text-white font-bold' : '!bg-black text-white font-bold'}`}></i>
        </div>

        {/* Login/Register or Avatar */}
        <div className="buttonClass w-[30%] flex justify-evenly items-center">
          {loggedIn ? (
            <div className="flex gap-5 items-center">
              <button className="login" onClick={handleLogout}>Log out</button>
              {profileURL ? (
                <img
                  src={profileURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              ) : (
                <Avatar
                  name={userInfo?.userData?.username}
                  size="32"
                  round
                  className="cursor-pointer"
                />
              )}
            </div>
          ) : (
            <>
              <button className="login"><Link onClick={handleLogin} to="/login">Login</Link></button>
              <button className="register"><Link to="/register">Register</Link></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
