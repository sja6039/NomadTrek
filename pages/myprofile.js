import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import React from 'react';

export default function Home() {
  
  
    return (
      <Container>
        <Navbar />
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