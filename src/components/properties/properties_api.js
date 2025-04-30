
import property1Image from "../../assets/property1.jpeg"

import property2Image from "../../assets/property2.jpeg"


import property3Image from "../../assets/property3.jpeg"

let propertyData= [
      {
        "id": 1,
        "name": "Lonavala",
        "status": "Coming Soon!",
        "location": "Lonavala, Maharashtra",
        "projectedReturns": "14% +",
        "minInvestment": "Rs 20 lakhs",
        "propertyType": "Luxury Villa",
        "ctaText": "View Details",
        "imageUrl": property1Image,
        "detailedDesc":
            {
            images:[property1Image,property2Image,property3Image],
            desc:"hi my name is navneet this property belongs to me"
            }
        ,
        "isComingSoon": true
      },
      {
        "id": 2,
        "name": "Ikigai",
        "status": "Available",
        "location": "Parwel, Navi Mumbai",
        "projectedReturns": "13% +",
        "minInvestment": "Rs 3 lakh",
        "propertyType": "2 BHK",
        "ctaText": "View Details",
        "imageUrl": property2Image,
        "detailedDesc":
            {
            images:[property1Image,property2Image,property3Image],
            desc:"hi my name is navneet this property belongs to me"
            }
        ,
        "isComingSoon": false
      },
      {
        "id": 3,
        "name": "Serenity Heights",
        "status": "Available",
        "location": "Goa",
        "projectedReturns": "12% +",
        "minInvestment": "Rs 15 lakh",
        "propertyType": "Beach Villa",
        "ctaText": "View Details",
        "imageUrl": property3Image,
        "detailedDesc":
            {
            images:[property1Image,property2Image,property3Image],
            desc:"hi my name is navneet this property belongs to me"
            }
        ,
        "isComingSoon": false
      },
      {
        "id": 4,
        "name": "Urban Nest",
        "status": "Coming Soon!",
        "location": "Bangalore",
        "projectedReturns": "15% +",
        "minInvestment": "Rs 25 lakh",
        "propertyType": "Penthouse",
        "ctaText": "View Details",
        "imageUrl": "/images/bangalore-penthouse.jpg",
        "detailedDesc":
            {
            images:[property1Image,property2Image,property3Image],
            desc:"hi my name is navneet this property belongs to me"
            }
        ,
        "isComingSoon": true
      }   
 ];

 export default propertyData;