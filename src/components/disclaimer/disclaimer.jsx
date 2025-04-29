import React, { useState, useEffect } from 'react';
import './Disclaimer.css';
import { motion } from "framer-motion";

const Disclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    setShowDisclaimer(true);
  }, []);

  const handleAgree = () => {
    setShowDisclaimer(false);
  };

  return (
    <>
      {showDisclaimer && (
        <div className="disclaimerOverlay">
          <motion.div
            className="disclaimerModal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="disclaimerHeading">Disclaimer</h1>

            <p className="disclaimerText">
              Thank you for visiting the official website of our group. <strong>www.bhartiyacapitals.in</strong> is the only official website of Bhartiya Capitals and its group companies. By using or accessing the website, you agree to the terms and conditions outlined in this disclaimer without any qualification or limitation.
              <br /><br />
              We strongly recommend you refrain from relying on information from other websites that may appear similar to this official website, as they could be misleading and potentially cause you loss. If you encounter similar websites, please inform us at <strong>bhartiyacapitals@gmail.com</strong>.
              <br /><br />
              Please deal only with RERA-registered real estate agents and confirm all details with our authorized sales team. Content here is creative and may not represent the actual project.
              <br /><br />
              We reserve the right to modify website content without prior notice. Your use of this site provides consent for the collection of your personal data as outlined in our privacy policy.
              <br /><br />
              We appreciate your understanding and support.
            </p>

            <button className="agreeButton" onClick={handleAgree}>
              I Agree
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Disclaimer;
