import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow, Polygon } from '@react-google-maps/api';
import { googleMapsApiKey } from './api/apiref'; 

export default function Explore() {
    const [parks, setParks] = useState({});
    const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
    const [zoom, setZoom] = useState(4);
    const [selectedPark, setSelectedPark] = useState(null);
  
    useEffect(() => {
      setParks({
        "Alaska": [
          { name: "Denali National Park", location: { lat: 63.33, lng: -150.50 } },
          { name: "Gates of the Arctic National Park", location: { lat: 67.78, lng: -153.30 } },
          { name: "Glacier Bay National Park", location: { lat: 58.50, lng: -137.00 } },
          { name: "Katmai National Park", location: { lat: 58.50, lng: -155.00 } },
          { name: "Kenai Fjords National Park", location: { lat: 59.92, lng: -149.65 } },
          { name: "Kobuk Valley National Park", location: { lat: 67.33, lng: -159.12 } },
          { name: "Lake Clark National Park", location: { lat: 60.97, lng: -153.42 } },
        ],
        "Arizona": [
          { name: "Grand Canyon National Park", location: { lat: 36.06, lng: -112.14 } },
          { name: "Petrified Forest National Park", location: { lat: 35.07, lng: -109.78 } },
          { name: "Saguaro National Park", location: { lat: 32.25, lng: -110.50 } },
        ],
        "Arkansas": [
          { name: "Hot Springs National Park", location: { lat: 34.51, lng: -93.05 } },
        ],
        "California": [
          { name: "Channel Islands National Park", location: { lat: 34.01, lng: -119.42 } },
          { name: "Death Valley National Park", location: { lat: 36.24, lng: -116.82 } },
          { name: "Joshua Tree National Park", location: { lat: 33.79, lng: -115.90 } },
          { name: "Kings Canyon National Park", location: { lat: 36.80, lng: -118.55 } },
          { name: "Lassen Volcanic National Park", location: { lat: 40.49, lng: -121.51 } },
          { name: "Pinnacles National Park", location: { lat: 36.48, lng: -121.16 } },
          { name: "Redwood National Park", location: { lat: 41.30, lng: -124.00 } },
          { name: "Sequoia National Park", location: { lat: 36.43, lng: -118.68 } },
          { name: "Yosemite National Park", location: { lat: 37.86, lng: -119.53 } },
        ],
        "Colorado": [
          { name: "Black Canyon of the Gunnison National Park", location: { lat: 38.57, lng: -107.72 } },
          { name: "Great Sand Dunes National Park", location: { lat: 37.73, lng: -105.51 } },
          { name: "Mesa Verde National Park", location: { lat: 37.18, lng: -108.49 } },
          { name: "Rocky Mountain National Park", location: { lat: 40.40, lng: -105.58 } },
        ],
        "Florida": [
          { name: "Biscayne National Park", location: { lat: 25.65, lng: -80.08 } },
          { name: "Dry Tortugas National Park", location: { lat: 24.63, lng: -82.87 } },
          { name: "Everglades National Park", location: { lat: 25.32, lng: -80.93 } },
        ],
        "Hawaii": [
          { name: "Haleakalā National Park", location: { lat: 20.72, lng: -156.17 } },
          { name: "Hawaiʻi Volcanoes National Park", location: { lat: 19.38, lng: -155.20 } },
        ],
        "Kentucky": [
          { name: "Mammoth Cave National Park", location: { lat: 37.18, lng: -86.10 } },
        ],
        "Maine": [
          { name: "Acadia National Park", location: { lat: 44.35, lng: -68.21 } },
        ],
        "Michigan": [
          { name: "Isle Royale National Park", location: { lat: 48.10, lng: -88.55 } },
        ],
        "Montana": [
          { name: "Glacier National Park", location: { lat: 48.80, lng: -114.00 } },
        ],
        "Nevada": [
          { name: "Great Basin National Park", location: { lat: 38.98, lng: -114.30 } },
        ],
        "New Mexico": [
          { name: "Carlsbad Caverns National Park", location: { lat: 32.17, lng: -104.44 } },
        ],
        "North Carolina / Tennessee": [
          { name: "Great Smoky Mountains National Park", location: { lat: 35.68, lng: -83.53 } },
        ],
        "North Dakota": [
          { name: "Theodore Roosevelt National Park", location: { lat: 46.97, lng: -103.00 } },
        ],
        "Ohio": [
          { name: "Cuyahoga Valley National Park", location: { lat: 41.24, lng: -81.55 } },
        ],
        "Oregon": [
          { name: "Crater Lake National Park", location: { lat: 42.94, lng: -122.10 } },
        ],
        "South Carolina": [
          { name: "Congaree National Park", location: { lat: 33.78, lng: -80.78 } },
        ],
        "South Dakota": [
          { name: "Badlands National Park", location: { lat: 43.75, lng: -102.50 } },
        ],
        "Texas": [
          { name: "Big Bend National Park", location: { lat: 29.25, lng: -103.25 } },
          { name: "Guadalupe Mountains National Park", location: { lat: 31.92, lng: -104.87 } },
        ],
        "Utah": [
          { name: "Arches National Park", location: { lat: 38.68, lng: -109.57 } },
          { name: "Bryce Canyon National Park", location: { lat: 37.57, lng: -112.18 } },
          { name: "Canyonlands National Park", location: { lat: 38.20, lng: -109.93 } },
          { name: "Capitol Reef National Park", location: { lat: 38.20, lng: -111.17 } },
          { name: "Zion National Park", location: { lat: 37.30, lng: -113.05 } },
        ],
        "Virginia": [
          { name: "Shenandoah National Park", location: { lat: 38.53, lng: -78.35 } },
        ],
        "Washington": [
          { name: "Mount Rainier National Park", location: { lat: 46.85, lng: -121.75 } },
          { name: "North Cascades National Park", location: { lat: 48.70, lng: -121.20 } },
          { name: "Olympic National Park", location: { lat: 47.97, lng: -123.50 } },
        ],
        "Wyoming": [
          { name: "Grand Teton National Park", location: { lat: 43.73, lng: -110.80 } },
          { name: "Yellowstone National Park", location: { lat: 44.60, lng: -110.50 } },
        ]
      });
    }, []);

    function clickPark(park) {
      setMapCenter(park.location);
      setZoom(7.5);
      setSelectedPark(park);
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
              </GoogleMap>
            </LoadScript>
          </MapContainer>

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