import { useState } from 'react';
import { styled } from 'styled-components';
import Navbar from '@/components/Dashboard/Navbar';

const parks = ['Yellowstone', 'Yosemite', 'Grand Canyon', 'Great Smoky Mountains'];

export default function GalleryPage() {
  const [selectedPark, setSelectedPark] = useState('All');

  const images = [
    { src: '/images/sample1.jpg', caption: 'Beautiful sunrise at Yellowstone', park: 'Yellowstone' },
    { src: '/images/sample2.jpg', caption: 'Yosemite Falls in spring', park: 'Yosemite' },
    { src: '/images/sample3.jpg', caption: 'Sunset over the Grand Canyon', park: 'Grand Canyon' },
    { src: '/images/sample4.jpg', caption: 'Hiking trails in the Smokies', park: 'Great Smoky Mountains' },
  ];

  const filteredImages = selectedPark === 'All' ? images : images.filter(img => img.park === selectedPark);

  return (
    <Container>
      <Navbar />
      <MainContent>
        <h1>Park Gallery</h1>
        <FilterContainer>
          <select onChange={(e) => setSelectedPark(e.target.value)}>
            <option value="All">All Parks</option>
            {parks.map((park) => (
              <option key={park} value={park}>{park}</option>
            ))}
          </select>
        </FilterContainer>
        <GalleryGrid>
          {filteredImages.map((img, index) => (
            <ImageCard key={index}>
              <img src={img.src} alt={img.caption} />
              <Caption>{img.caption}</Caption>
            </ImageCard>
          ))}
        </GalleryGrid>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  padding: 20px;
  text-align: center;
  
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  select {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ImageCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const Caption = styled.p`
  padding: 10px;
  font-size: 14px;
  color: #333;
  background: #fff;
`;
