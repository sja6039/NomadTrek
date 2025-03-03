import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { storage, db } from '@/backend/Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from '@/components/Dashboard/Navbar';

const parks = ['Yellowstone', 'Yosemite', 'Grand Canyon', 'Great Smoky Mountains'];

export default function GalleryPage() {
  const [selectedPark, setSelectedPark] = useState('All');

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState([]);


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
`;
