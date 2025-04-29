import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerIllustration from "../../assets/undraw_secure-login_m11a.svg";
import { GlobalContext } from "../..";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import loadingGif from "../../assets/loading.gif"
export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();
  const { setLoggedIn, loggedIn, setAccessToken, setUserInfo } = useContext(GlobalContext);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (loggedIn) {
        alert("You are already logged in!");
        return;
      }
      console.log(tokenResponse)
      const fetchUserInfo = await fetch(`${import.meta.env.VITE_GOOGLE_AUTH_API}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${tokenResponse.access_token}` }
      })
      const userInfo = await fetchUserInfo.json()
      console.log(userInfo);
      
      const username = userInfo.email.split('@')[0];
      console.log(username);
      setEmail(userInfo.email);
      setPassword(userInfo.sub);
      const response = await fetch(`${import.meta.env.VITE_IDENTITY_SERVICE_URL}/api/user/googlelogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          username,
          name: userInfo.given_name,
          email: userInfo.email,
          googleId: userInfo.googleId,
          profilePic: [
            {
              profileURL: userInfo.picture,
              publicId: ""
            }
          ],
          authProvider: 'google',
        })
      });
      if (response.ok) {
        console.log("response ok")
        const data = await response.json();
        console.log(data);
        setLoggedIn(true);
        setAccessToken(data.token.accessToken);
        setUserInfo({ userData: data?.data })
        navigate('/home');
      }
    },
    onError: (error) => {
      console.log('Error occured', error)
    },
    scope: "openid email profile"
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log("handle register user frontend endpoint hit")
    try {
      const url = `${import.meta.env.VITE_IDENTITY_SERVICE_URL}/api/user/registerUser`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({
          name: fullName,
          username,
          email,
          password
        })
      })
      if (res.ok) {
        setLoggedIn(true);
        const data = await res.json();
        setAccessToken(data.data.accessToken);
        setUserInfo({ userData: data.userInfo })
        navigate('/home');
        console.log(data);
      }
    }
    catch (e) {
      console.log(e);
      alert("error occured while registering the user");
    }
    finally{
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 mt-10">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center">
        <img src={registerIllustration} alt="Register Illustration" width={250} height={250} className="mb-6" />
        <h2 className="text-gray-900 text-3xl font-bold text-center mb-6 relative">
          Create Your Account
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full"></span>
        </h2>

        <form className="w-full flex flex-col space-y-5">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            onClick={(e) => handleRegister(e)}
            className="w-full bg-gradient-to-r flex justify-center from-orange-600 to-orange-800 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-700 hover:to-orange-900 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
             {loading? <img src={loadingGif} alt="loading" className='w-[40px]' />:"Login" }
          </button>
        </form>
        
        <p className="text-gray-600 text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-orange-600 font-medium hover:text-orange-800">Sign In</Link>
        </p>
        
        <div className="w-full mt-6">
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            <FaGoogle className="text-orange-600" />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}