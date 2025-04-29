import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import propertyData from './properties_api';
import DetailedProperty from '../detailedProperty/detailedProperty';
import { FaUsersSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PropertyListing = () => {
    const navigate=useNavigate();
    // const [selectedProperty, setSelectedProperty] = useState(null)
    const openDetailedPane=(property)=>{
        // setSelectedProperty(property);
        navigate('/detail',{state:{property}})

    }
  return (
    <div className="mt-30 "> 
    <div className="propertyHead text-5xl font-bold text-center">Our Properties</div>
    <br />
    <p className='text-center'>
Our Properties
Discover exceptional residential properties with high investment potential, carefully selected through thorough market research and due diligence.</p>
    <PropertyGrid >
            
      {propertyData.map((property) => (
        <PropertyCard key={property.id}>
          <PropertyHeader>
            <PropertyName>{property.name}</PropertyName>
            <PropertyStatus isComingSoon={property.isComingSoon}>
              {property.status}
            </PropertyStatus>
          </PropertyHeader>
        
          <DetailItem>
                <img src={property.imageUrl} className='w-[300px] h-[300px]' alt="" />
            </DetailItem>
          {property.location && (
            <PropertyLocation>
              <LocationIcon>📍</LocationIcon> {property.location}
            </PropertyLocation>
          )}
          
          <PropertyDetails>
            
            <DetailItem>
              <DetailLabel>Projected Returns</DetailLabel>
              <DetailValue>{property.projectedReturns}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Min. Investment</DetailLabel>
              <DetailValue>{property.minInvestment}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Property Type</DetailLabel>
              <DetailValue>{property.propertyType}</DetailValue>
            </DetailItem>
          </PropertyDetails>
          
          <PropertyButton 
            onClick={()=>openDetailedPane(property)}
          isComingSoon={property.isComingSoon}>
            {property.ctaText}
          </PropertyButton>
        </PropertyCard>
      ))}
    </PropertyGrid>

    {/* {
        selectedProperty? <DetailedProperty property={selectedProperty}/> :null
    } */}
    </div>
  );
};

export default PropertyListing;

// Styled Components
const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const PropertyCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255, 122, 0, 0.1);
    border-color: #FF7A00;
  }
`;

const PropertyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const PropertyName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const PropertyStatus = styled.span`
  background: ${({ isComingSoon }) => 
    isComingSoon ? 'rgba(255, 122, 0, 0.1)' : 'rgba(0, 200, 83, 0.1)'};
  color: ${({ isComingSoon }) => 
    isComingSoon ? '#FF7A00' : '#00C853'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const PropertyLocation = styled.p`
  color: #666;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const LocationIcon = styled.span`
  margin-right: 0.5rem;
`;

const PropertyDetails = styled.div`
  margin: 1rem 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  padding: 1rem 0;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const DetailValue = styled.span`
  color: #333;
  font-weight: 600;
`;

const PropertyButton = styled.button`
  background: ${({ isComingSoon }) => 
    isComingSoon 
      ? 'linear-gradient(90deg, #FF7A00, #FF9E00)' 
      : 'linear-gradient(90deg, #333, #555)'};
  color: white;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: ${({ isComingSoon }) => 
      isComingSoon 
        ? 'linear-gradient(90deg, #FF6A00, #FF8E00)' 
        : 'linear-gradient(90deg, #222, #444)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;