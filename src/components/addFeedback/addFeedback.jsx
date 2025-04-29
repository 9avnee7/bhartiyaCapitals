import { useState, useContext } from "react";
import { GlobalContext } from '../../index';

const AddFeedback = () => {
  const { userInfo } = useContext(GlobalContext);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMessageChange = (e) => {
    const words = e.target.value;
    if (words.length <= 200) {
      setMessage(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_IDENTITY_SERVICE_URL}/api/feedback/post-feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo?.userData.username,
          profilePic: userInfo?.userData.profilePic[0].profileURL,
          content: message,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit feedback");
      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center relative">
          Share Your Feedback
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full"></span>
        </h2>
        
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={userInfo?.userData.profilePic[0].profileURL || "https://wallpaper.forfun.com/fetch/9f/9f7ec92717771b778f66961f58cf1e6e.jpeg"} 
            alt="Profile" 
            className="w-12 h-12 rounded-full border-2 border-orange-500" 
          />
          <span className="text-lg font-medium">{userInfo?.userData.username || "Guest"}</span>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            rows="4"
            placeholder="Write your feedback here... (Max 40 words)"
            value={message}
            onChange={handleMessageChange}
          ></textarea>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-800 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-700 hover:to-orange-900 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFeedback;