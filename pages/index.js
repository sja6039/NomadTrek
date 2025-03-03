/*
Dashboad/Landing page for the application, this is where users will first be introduced to the application and its features.
This pages displays the title and a little slogan as well as a few statements on what the application can do.
*/
import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import React from 'react';

export default function Home() {
  
  return (
    <Container>
      <Navbar />
      <MainContent>
        <WelcomeInfo>
          <h1>Welcome to NomadTrek!</h1>
          <p>Track your Naitonal Park visits and share with the world!</p>
        </WelcomeInfo>
        <FeatureSection>
          <Feature>
            <h2>Track Visits</h2>
            <p>Keep a record of all the National Parks you've visited</p>
          </Feature>
          <Feature>
            <h2>Share Experiences</h2>
            <p>Share your pictures, trails, and stories with other users</p>
          </Feature>
          <Feature>
            <h2>Explore Parks</h2>
            <p>Find new parks to visit and plan your next adventure</p>
          </Feature>
        </FeatureSection>
      </MainContent>
    </Container>
    
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  background-image: url('/images/mainback.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const WelcomeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  color: #FBFFE4;
  font: 2rem 'Roboto', sans-serif;
`;

const FeatureSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 7.5rem;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #FBFFE4;
  font: 1.5rem 'Roboto', sans-serif;
  padding: 1rem;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.7);
  }
`;