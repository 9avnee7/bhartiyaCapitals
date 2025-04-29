import React from "react";
import styled from "styled-components";

const WhyInvest = () => {
  const benefits = [
    {
      title: "Passive Income",
      description: "Receive a passive and consistent income against each investment."
    },
    {
      title: "Low Barrier to Entry",
      description: "Invest in real estate in India starting with Rs. 1 lakh only (approx $1,200)"
    },
    {
      title: "Access to Real Estate",
      description: "Traditionally, the real estate asset class was only accessible to High Net Worth Individuals, not anymore!"
    },
    {
      title: "Diversified Portfolio",
      description: "Add real estate to your investment portfolio."
    },
    {
      title: "Steady Returns",
      description: "Unlike the stock market, we offer steady annual returns on your investment."
    },
    {
      title: "Digital Experience",
      description: "The entire investment process is digital so that you can invest in our properties from any part of the world."
    }
  ];

  return (
    <Container>
      <Header>Why Invest with Bhartiya Capitals?</Header>
      <BenefitsGrid>
        {benefits.map((benefit, index) => (
          <BenefitCard key={index}>
            <BenefitTitle>{benefit.title}</BenefitTitle>
            <BenefitDescription>{benefit.description}</BenefitDescription>
          </BenefitCard>
        ))}
      </BenefitsGrid>

    </Container>
  );
};

export default WhyInvest;

// Styled components with orange gradient theme
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
  background-color: #fff;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #333;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #FF7A00, #FF9E00);
    border-radius: 2px;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const BenefitCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: left;
  border: 1px solid #f0f0f0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255, 122, 0, 0.1);
    border-color: #FF7A00;
  }
`;

const BenefitTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const BenefitDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
`;

const GetStartedButton = styled.button`
  background: linear-gradient(90deg, #FF7A00, #FF9E00);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 122, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 122, 0, 0.3);
    background: linear-gradient(90deg, #FF6A00, #FF8E00);
  }
  
  &:active {
    transform: translateY(0);
  }
`;