import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { storage, db } from '@/backend/Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Navbar from '@/components/Dashboard/Navbar';
import { getAuth } from 'firebase/auth';

const parks = [
  "Acadia",
  "American Samoa",
  "Arches",
  "Badlands",
  "Big Bend",
  "Biscayne",
  "Black Canyon of the Gunnison",
  "Bryce Canyon",
  "Canyonlands",
  "Capitol Reef",
  "Carlsbad Caverns",
  "Channel Islands",
  "Congaree",
  "Crater Lake",
  "Cuyahoga Valley",
  "Death Valley",
  "Denali",
  "Dry Tortugas",
  "Everglades",
  "Gates of the Arctic",
  "Gateway Arch",
  "Glacier",
  "Glacier Bay",
  "Grand Canyon",
  "Grand Teton",
  "Great Basin",
  "Great Sand Dunes",
  "Great Smoky Mountains",
  "Guadalupe Mountains",
  "Haleakalā",
  "Hawaiʻi Volcanoes",
  "Hot Springs",
  "Indiana Dunes",
  "Isle Royale",
  "Joshua Tree",
  "Katmai",
  "Kenai Fjords",
  "Kings Canyon",
  "Kobuk Valley",
  "Lake Clark",
  "Lassen Volcanic",
  "Mammoth Cave",
  "Mesa Verde",
  "Mount Rainier",
  "New River Gorge",
  "North Cascades",
  "Olympic",
  "Petrified Forest",
  "Pinnacles",
  "Redwood",
  "Rocky Mountain",
  "Saguaro",
  "Sequoia",
  "Shenandoah",
  "Theodore Roosevelt",
  "Virgin Islands",
  "Voyageurs",
  "White Sands",
  "Wind Cave",
  "Wrangell-St. Elias",
  "Yellowstone",
  "Yosemite",
  "Zion"
];

export default function GalleryPage() {
  const [selectedPark, setSelectedPark] = useState('All');
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    fetchImages();
    return () => unsubscribe();
  }, [selectedPark]);
  
  const fetchImages = async () => {
    try {
      const imagesCollection = collection(db, 'gallery');
      const imagesSnapshot = await getDocs(imagesCollection);
      let imagesData = [];
      imagesSnapshot.forEach(doc => {
        imagesData.push({ id: doc.id, ...doc.data() });
      });
      if (selectedPark !== 'All') {
        imagesData = imagesData.filter(img => img.park === selectedPark);
      }
      imagesData.sort((a, b) => b.timestamp - a.timestamp);
      setImages(imagesData);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!image || !caption || !selectedPark || selectedPark === 'All') {
      alert('Please select an image, enter a caption, and choose a specific park');
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const fileName = `${Date.now()}_${image.name}`;
      const storageRef = ref(storage, `gallery/${fileName}`);
      
      const uploadTask = uploadBytesResumable(storageRef, image);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading image:', error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'gallery'), {
            imageUrl: downloadURL,
            caption: caption,
            park: selectedPark,
            uploadedBy: user.uid,
            uploaderName: user.displayName || 'Anonymous',
            timestamp: Date.now()
          });
          
          setImage(null);
          setCaption('');
          setUploading(false);
          setShowUploadForm(false);
          
          fetchImages();
        }
      );
    } catch (error) {
      console.error('Error in upload process:', error);
      setUploading(false);
    }
  };
  
  return (
    <Container>
      <Navbar />
      <Content>
        <Header>
          <h1>National Parks Gallery</h1>
          <FilterContainer>
            <label htmlFor="parkFilter">Filter by Park: </label>
            <Select 
              id="parkFilter" 
              value={selectedPark} 
              onChange={(e) => setSelectedPark(e.target.value)}
            >
              <option value="All">All Parks</option>
              {parks.map(park => (
                <option key={park} value={park}>{park}</option>
              ))}
            </Select>
          </FilterContainer>
        </Header>
        
        {user && (
          <UploadContainer>
            {!showUploadForm ? (
              <UploadButton onClick={() => setShowUploadForm(true)}>
                + Add Photo
              </UploadButton>
            ) : (
              <UploadForm>
                <h3>Upload a new photo</h3>
                <FormGroup>
                  <label>Select Park:</label>
                  <Select 
                    value={selectedPark === 'All' ? '' : selectedPark} 
                    onChange={(e) => setSelectedPark(e.target.value)}
                  >
                    <option value="">Select a park</option>
                    {parks.map(park => (
                      <option key={park} value={park}>{park}</option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <label>Image:</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                  />
                </FormGroup>
                <FormGroup>
                  <label>Caption:</label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Enter a caption"
                  />
                </FormGroup>
                
                {uploading ? (
                  <ProgressContainer>
                    <ProgressBar progress={uploadProgress} />
                    <span>{uploadProgress}%</span>
                  </ProgressContainer>
                ) : (
                  <ButtonGroup>
                    <Button onClick={handleUpload}>Upload</Button>
                    <CancelButton onClick={() => setShowUploadForm(false)}>
                      Cancel
                    </CancelButton>
                  </ButtonGroup>
                )}
              </UploadForm>
            )}
          </UploadContainer>
        )}
        
        {images.length > 0 ? (
          <Gallery>
            {images.map(img => (
              <ImageCard key={img.id}>
                <img src={img.imageUrl} alt={img.caption} />
                <ImageCaption>
                  <p>{img.caption}</p>
                  <small>{img.park}</small>
                </ImageCaption>
              </ImageCard>
            ))}
          </Gallery>
        ) : (
          <NoImages>
            {selectedPark === 'All' 
              ? 'No images have been uploaded yet.' 
              : `No images for ${selectedPark} have been uploaded yet.`}
          </NoImages>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.main`
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ImageCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const ImageCaption = styled.div`
  padding: 1rem;
  background: white;
  
  p {
    margin: 0 0 0.5rem 0;
  }
  
  small {
    color: #666;
  }
`;

const NoImages = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const UploadContainer = styled.div`
  margin-bottom: 2rem;
`;

const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #388e3c;
  }
`;

const UploadForm = styled.div`
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const ProgressContainer = styled.div`
  margin-top: 1rem;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: #4caf50;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;