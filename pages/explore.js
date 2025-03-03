import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';
import { googleMapsApiKey } from './api/apiref'; 
import { NPSApiKey } from './api/apiref';

export default function Explore() {
    const [parks, setParks] = useState({});
    const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
    const [zoom, setZoom] = useState(4);
    const [selectedPark, setSelectedPark] = useState(null);
    const [parkActivities, setParkActivities] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setParks({
        "Alaska": [
          { name: "Denali National Park", location: { lat: 63.33, lng: -150.50 }, parkCode: "dena" },
          { name: "Gates of the Arctic National Park", location: { lat: 67.78, lng: -153.30 }, parkCode: "gaar" },
          { name: "Glacier Bay National Park", location: { lat: 58.50, lng: -137.00 }, parkCode: "glba" },
          { name: "Katmai National Park", location: { lat: 58.50, lng: -155.00 }, parkCode: "katm" },
          { name: "Kenai Fjords National Park", location: { lat: 59.92, lng: -149.65 }, parkCode: "kefj" },
          { name: "Kobuk Valley National Park", location: { lat: 67.33, lng: -159.12 }, parkCode: "kova" },
          { name: "Lake Clark National Park", location: { lat: 60.97, lng: -153.42 }, parkCode: "lacl" },
        ],
        "Arizona": [
          { name: "Grand Canyon National Park", location: { lat: 36.06, lng: -112.14 }, parkCode: "grca" },
          { name: "Petrified Forest National Park", location: { lat: 35.07, lng: -109.78 }, parkCode: "pefo" },
          { name: "Saguaro National Park", location: { lat: 32.25, lng: -110.50 }, parkCode: "sagu" },
        ],
        "Arkansas": [
          { name: "Hot Springs National Park", location: { lat: 34.51, lng: -93.05 }, parkCode: "hosp" },
        ],
        "California": [
          { name: "Channel Islands National Park", location: { lat: 34.01, lng: -119.42 }, parkCode: "chis" },
          { name: "Death Valley National Park", location: { lat: 36.24, lng: -116.82 }, parkCode: "deva" },
          { name: "Joshua Tree National Park", location: { lat: 33.79, lng: -115.90 }, parkCode: "jotr" },
          { name: "Kings Canyon National Park", location: { lat: 36.80, lng: -118.55 }, parkCode: "kica" },
          { name: "Lassen Volcanic National Park", location: { lat: 40.49, lng: -121.51 }, parkCode: "lavo" },
          { name: "Pinnacles National Park", location: { lat: 36.48, lng: -121.16 }, parkCode: "pinn" },
          { name: "Redwood National Park", location: { lat: 41.30, lng: -124.00 }, parkCode: "redw" },
          { name: "Sequoia National Park", location: { lat: 36.43, lng: -118.68 }, parkCode: "sequ" },
          { name: "Yosemite National Park", location: { lat: 37.86, lng: -119.53 }, parkCode: "yose" },
        ],
        "Colorado": [
          { name: "Black Canyon of the Gunnison National Park", location: { lat: 38.57, lng: -107.72 }, parkCode: "blca" },
          { name: "Great Sand Dunes National Park", location: { lat: 37.73, lng: -105.51 }, parkCode: "grsa" },
          { name: "Mesa Verde National Park", location: { lat: 37.18, lng: -108.49 }, parkCode: "meve" },
          { name: "Rocky Mountain National Park", location: { lat: 40.40, lng: -105.58 }, parkCode: "romo" },
        ],
        "Florida": [
          { name: "Biscayne National Park", location: { lat: 25.65, lng: -80.08 }, parkCode: "bisc" },
          { name: "Dry Tortugas National Park", location: { lat: 24.63, lng: -82.87 }, parkCode: "drto" },
          { name: "Everglades National Park", location: { lat: 25.32, lng: -80.93 }, parkCode: "ever" },
        ],
        "Hawaii": [
          { name: "Haleakalā National Park", location: { lat: 20.72, lng: -156.17 }, parkCode: "hale" },
          { name: "Hawaiʻi Volcanoes National Park", location: { lat: 19.38, lng: -155.20 }, parkCode: "havo" },
        ],
        "Kentucky": [
          { name: "Mammoth Cave National Park", location: { lat: 37.18, lng: -86.10 }, parkCode: "maca" },
        ],
        "Maine": [
          { name: "Acadia National Park", location: { lat: 44.35, lng: -68.21 }, parkCode: "acad" },
        ],
        "Michigan": [
          { name: "Isle Royale National Park", location: { lat: 48.10, lng: -88.55 }, parkCode: "isro" },
        ],
        "Montana": [
          { name: "Glacier National Park", location: { lat: 48.80, lng: -114.00 }, parkCode: "glac" },
        ],
        "Nevada": [
          { name: "Great Basin National Park", location: { lat: 38.98, lng: -114.30 }, parkCode: "grba" },
        ],
        "New Mexico": [
          { name: "Carlsbad Caverns National Park", location: { lat: 32.17, lng: -104.44 }, parkCode: "cave" },
        ],
        "North Carolina / Tennessee": [
          { name: "Great Smoky Mountains National Park", location: { lat: 35.68, lng: -83.53 }, parkCode: "grsm" },
        ],
        "North Dakota": [
          { name: "Theodore Roosevelt National Park", location: { lat: 46.97, lng: -103.00 }, parkCode: "thro" },
        ],
        "Ohio": [
          { name: "Cuyahoga Valley National Park", location: { lat: 41.24, lng: -81.55 }, parkCode: "cuva" },
        ],
        "Oregon": [
          { name: "Crater Lake National Park", location: { lat: 42.94, lng: -122.10 }, parkCode: "crla" },
        ],
        "South Carolina": [
          { name: "Congaree National Park", location: { lat: 33.78, lng: -80.78 }, parkCode: "cong" },
        ],
        "South Dakota": [
          { name: "Badlands National Park", location: { lat: 43.75, lng: -102.50 }, parkCode: "badl" },
        ],
        "Texas": [
          { name: "Big Bend National Park", location: { lat: 29.25, lng: -103.25 }, parkCode: "bibe" },
          { name: "Guadalupe Mountains National Park", location: { lat: 31.92, lng: -104.87 }, parkCode: "gumo" },
        ],
        "Utah": [
          { name: "Arches National Park", location: { lat: 38.68, lng: -109.57 }, parkCode: "arch" },
          { name: "Bryce Canyon National Park", location: { lat: 37.57, lng: -112.18 }, parkCode: "brca" },
          { name: "Canyonlands National Park", location: { lat: 38.20, lng: -109.93 }, parkCode: "cany" },
          { name: "Capitol Reef National Park", location: { lat: 38.20, lng: -111.17 }, parkCode: "care" },
          { name: "Zion National Park", location: { lat: 37.30, lng: -113.05 }, parkCode: "zion" },
        ],
        "Virginia": [
          { name: "Shenandoah National Park", location: { lat: 38.53, lng: -78.35 }, parkCode: "shen" },
        ],
        "Washington": [
          { name: "Mount Rainier National Park", location: { lat: 46.85, lng: -121.75 }, parkCode: "mora" },
          { name: "North Cascades National Park", location: { lat: 48.70, lng: -121.20 }, parkCode: "noca" },
          { name: "Olympic National Park", location: { lat: 47.97, lng: -123.50 }, parkCode: "olym" },
        ],
        "Wyoming": [
          { name: "Grand Teton National Park", location: { lat: 43.73, lng: -110.80 }, parkCode: "grte" },
          { name: "Yellowstone National Park", location: { lat: 44.60, lng: -110.50 }, parkCode: "yell" },
        ]
      });
    }, []);

    const fetchParkActivities = async (parkCode) => {
      setLoading(true);
      try {
        const response = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${NPSApiKey}`);
        const data = await response.json();
        setParkActivities(data.data[0].activities || []);
      } catch (error) {
        console.error("Error fetching park activities:", error);
        setParkActivities([]);
      } finally {
        setLoading(false);
      }
    };

    function clickPark(park) {
      setMapCenter(park.location);
      setZoom(7.5);
      setSelectedPark(park);
      
      if (park.parkCode) {
        fetchParkActivities(park.parkCode);
      }
    }
  
    return (
      <Container>
        <Navbar /> 
        <MainContent>
          <Sidebar>
            <StateList>
              {Object.keys(parks).length > 0 && 
                Object.keys(parks).sort().map((state) => (
                  <StateGroup key={state}>
                    <StateHeader>{state}</StateHeader>
                    <StateParks>
                      {parks[state].map((park, idx) => (
                        <ParkItem 
                          key={idx} 
                          onClick={() => clickPark(park)}
                          className={selectedPark && selectedPark.name === park.name ? 'selected' : ''}
                        >
                          {park.name}
                        </ParkItem>
                      ))}
                    </StateParks>
                  </StateGroup>
                ))
              }
            </StateList>
          </Sidebar>
  
          <MapContainer>
            <LoadScript googleMapsApiKey={googleMapsApiKey}> 
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={zoom}
                options={{
                  mapTypeControl: true,
                  streetViewControl: true,
                  fullscreenControl: true
                }}
              >
                {Object.keys(parks).length > 0 && Object.values(parks).flat().map((park, idx) => (
                    <Marker 
                      key={idx} 
                      position={park.location} 
                      title={park.name}
                      animation={selectedPark && selectedPark.name === park.name ? 2 : 0}
                      onClick={() => clickPark(park)}
                    />
                  ))
                }
                
                {selectedPark && (
                  <InfoWindow
                    position={selectedPark.location}
                    onCloseClick={() => setSelectedPark(null)}
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -10),
                      disableAutoPan: false,
                      maxWidth: 400
                    }}
                  >
                    <EnhancedInfoContent>
                      <ParkTitle>{selectedPark.name}</ParkTitle>
                      <ButtonContainer>
                        <NPSButton 
                          href={`https://www.nps.gov/${selectedPark.parkCode}`} 
                        >
                          Visit Official Park Website
                        </NPSButton>
                        <DirectionsButton
                          href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPark.location.lat},${selectedPark.location.lng}`}
                        >
                          Get Directions
                        </DirectionsButton>
                      </ButtonContainer>
                    </EnhancedInfoContent>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </MapContainer>

          {selectedPark && (
            <ActivitiesPanel>
              <ActivitiesHeader>
                <h2>{selectedPark.name}</h2>
              </ActivitiesHeader>
              <ActivitiesList>
                <h3>Available Activities</h3>
                    {parkActivities.length > 0 ? (
                  <ul>
                    {parkActivities.map((activity, idx) => (
                      <ActivityItem key={idx}>
                        {activity.name}
                      </ActivityItem>
                    ))}
                  </ul>
                ) : (
                  <NoActivitiesMessage>No activities found for this park.</NoActivitiesMessage>
                )}
              </ActivitiesList>
            </ActivitiesPanel>
          )}
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
    display: flex;
    flex-grow: 1;
  `;
  
  const Sidebar = styled.div`
    width: 300px;
    font: 1rem 'Roboto', sans-serif;
    background-color: #A3D1C6;
    padding: 20px;
    overflow-y: auto;
    height: calc(100vh - 60px);
    color: #FBFFE4;
  `;
  
  const StateList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `;

  const StateGroup = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    background-color: rgba(251, 255, 228, 0.1);
  `;

  const StateHeader = styled.div`
    background-color: #003D2E;
    color: #FBFFE4;
    padding: 10px 12px;
    font-weight: bold;
  `;

  const StateParks = styled.ul`
    list-style-type: none;
    padding: 7px 0;
    margin: 0;
  `;
  
  const ParkItem = styled.li`
    padding: 6px 12px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: rgba(251, 255, 228, 0.2);
    }

    &.selected {
      background-color: #005D4B;
      font-weight: bold;
    }
  `;
  
  const MapContainer = styled.div`
    flex-grow: 1;
    position: relative;
    height: 100%;
  `;

  const EnhancedInfoContent = styled.div`
    width: 300px;
    background-color: #FBFFE4;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 61, 46, 0.2);
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
    border: none;
  `;

  const ParkTitle = styled.h3`
    margin: 0;
    padding: 16px;
    background-color: #003D2E;
    color: #FBFFE4;
    font-size: 16px;
    text-align: center;
  `;

  const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
  `;

  const NPSButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #003D2E;
    color: #FBFFE4;
    text-decoration: none;
    font-weight: bold;
    padding: 12px 16px;
    border-radius: 6px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #005D4B;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  `;

  const DirectionsButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #A3D1C6;
    color: #003D2E;
    text-decoration: none;
    font-weight: bold;
    padding: 10px;
    border-radius: 6px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #8DC1B6;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `;

  const ActivitiesPanel = styled.div`
    width: 280px;
    background-color: #A3D1C6;
    color: #003D2E;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #003D2E;
    overflow-y: auto;
    height: calc(100vh - 60px);
  `;

  const ActivitiesHeader = styled.div`
    background-color: #003D2E;
    color: #FBFFE4;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h2 {
      margin: 0;
      font-size: 18px;
    }
  `;

  const CloseButton = styled.button`
    background: none;
    border: none;
    color: #FBFFE4;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  `;

  const ActivitiesList = styled.div`
    padding: 15px;
    
    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      border-bottom: 2px solid #A3D1C6;
      padding-bottom: 8px;
      color: #003D2E;
    }
    
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
  `;

  const ActivityItem = styled.li`
    padding: 8px 12px;
    margin-bottom: 6px;
    color: #003D2E;
    &:last-child {
      margin-bottom: 0;
    }
  `;

  const NoActivitiesMessage = styled.p`
    color: #003D2E;
    padding: 10px;
    background-color: rgba(163, 209, 198, 0.2);
    border-radius: 4px;
    text-align: center;
  `;

  const LoadingMessage = styled.div`
    color: #003D2E;
    padding: 15px;
    background-color: rgba(163, 209, 198, 0.2);
    border-radius: 4px;
    text-align: center;
    font-style: italic;
  `;