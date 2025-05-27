'use client';

import { useEffect } from 'react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';

export default function MapInput() {
  const { isLoaded, initMap } = useGoogleMaps();
  
  useEffect(() => {
    if (isLoaded) {
      initMap('pinLocation', 'map', 'latitude', 'longitude');
    }
  }, [isLoaded, initMap]);
  
  return (
    <div className="mb-3">
      <label htmlFor="pinLocation" className="form-label">
        Pin Location
      </label>
      <input
        type="text"
        className="form-control"
        id="pinLocation"
        name="pinLocation"
        required
      />
      <div id="map" style={{ height: '200px', marginTop: '10px' }}></div>
      <input type="hidden" id="latitude" name="latitude" />
      <input type="hidden" id="longitude" name="longitude" />
    </div>
  );
}