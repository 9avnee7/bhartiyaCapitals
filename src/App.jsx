import { useState,useEffect,useContext } from "react";
import {createBrowserRouter , RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/protectedRoute"
import { GlobalContext } from ".";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar"
import LoginPage from "./components/login/Login";
import { RegisterPage } from "./components/register/Register";
import Footer from "./components/footer/Footer";
import Disclaimer from "./components/disclaimer/disclaimer";
import WhyInvest from "./components/whyInvest/whyInvest";
import ContactUs from "./components/contact/contactUs";
import Faq from "./components/faq/Faq";
import Testimonials from "./components/testimonials/testimonials";
import AddFeedback from "./components/addFeedback/addFeedback";
import AdminPanel from "./adminPage/adminpage";
import Properties from "./components/properties/properties";
import DetailedProperty from "./components/detailedProperty/detailedProperty";
import About from "./components/about/about";

const router=createBrowserRouter(
    [
        {
            path:'/',
            element:
            <div>

              <Navbar/>
              <Hero/>
              <WhyInvest/>
              <Testimonials/>
              <Faq/>
              <ContactUs/>
              <Footer/>
            </div>
            
        },
        {

          path:'/home',
          element:
          <div>
              <Navbar/>
              <Hero/>
              <WhyInvest/>
              <Testimonials/>
              <Faq/>
              <ContactUs/>
              <Footer/>



          </div>
          
      },
     
      {

        path:'/about',
        element:
        <div>
         <Navbar/>
        <About/>
         <Footer/>
        </div>
        
    },
    {
      path:'/detailedProperty',
      element:<ProtectedRoute />,
      children:[
       {
         path:'',
         element:(
           <div>
             <Navbar/>
            <DetailedProperty/>
            <Footer/>
           </div>
         )
       }
      ]
    },
    {
          path:'/faqs',
          element:
          <div>
            <Navbar/>
            <Faq/>
            <Footer/>

          </div>
          
      },
      {
        path:'/contact',
        element:
        <div>
            <Navbar/>
            <ContactUs/>
            <Footer/>
        </div>
        
    },
    {
      path:'/login',
      element:
      <div>
        <Navbar/>
        <LoginPage/>
        <Footer/>

      </div>
      
  },
  {
    path:'/register',
    element:
    <div>
      <Navbar/>
      <RegisterPage/>
      <Footer/>

    </div>
    
},
{
  path:'/admin',
  element:
  <div>
    
    <AdminPanel/>
    <Footer/>

  </div>
  
},

 {
  path:'/addFeedback',
  element:<ProtectedRoute />,
  children:[
   {
     path:'',
     element:(
       <div>
        <Navbar/>
        <AddFeedback/>
        <Footer/>
       </div>
     )
   }
  ]
},
{
  path:'/properties',
  element:<ProtectedRoute />,
  children:[
   {
     path:'',
     element:(
       <div>
         <Navbar/>
        <Properties/>
        <Footer/>
       </div>
     )
   }
  ]
}
  
    ]
)

function App() {
  // const navigate=useNavigate();
   const {setAccessToken,setLoggedIn,setUserInfo,userInfo,setLoading}=useContext(GlobalContext);

  //  useEffect(()=>{
  //       handleStringPost();
  //  },[])
   useEffect(()=>{
      
      console.log(userInfo)
   },[userInfo])



const refresh = async () => {
    try {
        console.log("Refreshing token on refresh");
        const res = await fetch(`${import.meta.env.VITE_IDENTITY_SERVICE_URL}/api/user/refresh`, {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();
        console.log("data logging")
        console.log(data);
        console.log(data.userId);

        const userInfoFromSessionStorage=JSON.parse(sessionStorage.getItem('userInfo'));
        console.log("user infot from session on refresh",userInfoFromSessionStorage)
        if(!userInfoFromSessionStorage){
          console.log("userinfor from session",userInfoFromSessionStorage)

            if (res.ok) {
                const userDataResponse = await fetch(`${import.meta.env.VITE_IDENTITY_SERVICE_URL}/api/user/fetchuserdata`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "x-user-id": data?.userId,
                        "Authorization": `Bearer ${data.accessToken}`,
                        "Content-Type": "application/json"
                    }
                });

                if (userDataResponse.ok) {
                    const userData = await userDataResponse.json();
                    console.log(userData)
                    sessionStorage.setItem('userInfo',JSON.stringify(userData));
                    const updatedUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                    setUserInfo(updatedUserInfo);
                    console.log(JSON.parse(userInfoFromSessionStorage))
                    setAccessToken(data.accessToken);
                    setLoggedIn(true);
                    console.log("User Info Updated:", userInfo);
                } else {
                    setUserInfo(null);
                    console.log("error in fetching user info");
                }
            } 
        
            else {
                  setAccessToken(null);
                  setLoggedIn(false);
              }
        } 
        else{
          console.log("userinfor from else",userInfoFromSessionStorage)

          setUserInfo((userInfoFromSessionStorage));
          setAccessToken(data.accessToken);
          setLoggedIn(true);
          console.log('User info updated from session storage')
        }
} catch (e) {
        console.error("Error occurred on refreshing refreshToken", e);
        setAccessToken(null);
        setLoggedIn(false);
    }finally{
      setLoading(false);
    }
};
  
   useEffect(()=>{
      refresh();
      const interval=setInterval(()=>{
      refresh();
      },14*60*1000)

      return ()=>clearInterval(interval);

   },[])
   useEffect(() => {
    console.log("Updated userInfo:", userInfo);
    sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
}, [userInfo]);

  return (

    <>
    <RouterProvider router={router}/>
    
    </>
  )
}

export default App
