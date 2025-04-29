import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
import loadingGif from "../../assets/loading.gif"
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    
    e.preventDefault();
    setloading(true);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          alert("Email sent successfully!");
          setFormData({ name: '', email: '', message: '' }); // Reset form
          setloading(false);
        },
        (error) => {
          console.error("Failed to send email:", error);
          alert("Failed to send email. Try again!");
          setloading(false);
        }
      );
     
  };

  return (
    <div className="contact-us-container flex justify-center items-center bg-white min-h-screen py-10 px-4">
      <div className="contact-form w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 relative">
          Contact Us
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full"></span>
        </h2>
        
        <form className="flex flex-col gap-5">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <button
            type="submit"
            onClick={sendEmail}
            className="w-full bg-gradient-to-r flex justify-center items-center from-orange-600 to-orange-800 text-white font-semibold py-3 px-4 rounded-md hover:from-orange-700 hover:to-orange-900 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
          {loading? <img src={loadingGif} alt="loading" className='w-[40px]' />:"Send Message" }
          </button>

        </form>
        
        <div className="mt-6 text-center text-gray-600">
          <p>Or reach us directly at <span className="font-semibold text-orange-600">bhartiyacapitals@gmail.com</span></p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;