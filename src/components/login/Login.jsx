import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import loginIllustration from "../../assets/undraw_access-account_aydp.svg";
import { GlobalContext } from "../..";
import { useGoogleLogin } from "@react-oauth/google";
import loadingGif from "../../assets/loading.gif"
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const { loggedIn, setLoggedIn, setAccessToken, userInfo, setUserInfo, redirectionPath } = useContext(GlobalContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

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
            console.log(response)
            if (response.ok) {
                console.log("response ok")
                const data = await response.json();
                console.log(data);
                setLoggedIn(true);
                setAccessToken(data.token.accessToken);
                setUserInfo({ userData: data?.data })
                navigate('/');
            }
        },
        onError: (error) => {
            console.log('Error occured', error)
        },
        scope: "openid email profile"
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (loggedIn) {
                alert('you are already logged in');
                navigate('/');
                return;
            }
            console.log("Logging in with:", email, password);

            const response = await fetch(`${import.meta.env.VITE_IDENTITY_SERVICE_URL}/api/user/loginUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
            console.log(response);
            const data = await response.json();
            if (!response.ok) {
                alert('some trouble occured logging you in you are not registered')
                return
            }
            console.log("Server Response:", data.data.accessToken);

            const userDataResponse = await fetch(`${import.meta.env.VITE_IDENTITY_SERVICE_URL}/api/user/fetchuserdata`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'x-user-id': data.data.userId,
                    'Authorization': `Bearer ${data.data.accessToken}`,
                    'Content-Type': "application/json"
                }
            });


            const userData = await userDataResponse.json();
            console.log("only data on login", userData)
            console.log("userdata on login", userData)
            setUserInfo(userData);
            console.log("user info in login", userInfo)
            setAccessToken(data.accessToken);

            if (response.ok) {
                alert("Login Successful!");

            } else {
                alert(data.message || "Login failed. Please try again.");
            }

            localStorage.setItem('loggedInStatus', JSON.stringify(true));
            setLoggedIn(JSON.parse(localStorage.getItem('loggedInStatus')));
            navigate(`/${redirectionPath}`);


        } catch (error) {
            console.error("Login Error:", error);
            alert("Something went wrong. Please try again later.");
        }
        finally{
        setLoading(false);}
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center">
                <img src={loginIllustration} alt="Login Illustration" width={250} height={250} className="mb-6" />
                <h2 className="text-gray-900 text-3xl font-bold text-center mb-6 relative">
                    Welcome Back
                    <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full"></span>
                </h2>
                <form className="w-full flex flex-col space-y-5" onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    <div className="form-group relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-orange-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center bg-gradient-to-r from-orange-600 to-orange-800 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-700 hover:to-orange-900 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                       {loading? <img src={loadingGif} alt="loading" className='w-[40px]' />:"Login" }
                    </button>
                </form>
                <p className="text-gray-600 text-center mt-4 text-sm">
                    Don't have an account? <Link to="/register" className="text-orange-600 font-medium hover:text-orange-800">Sign Up</Link>
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