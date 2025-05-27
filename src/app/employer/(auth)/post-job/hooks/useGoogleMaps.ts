// app/job-application/hooks/useGoogleMaps.ts
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  const initMap = (
    inputId: string,
    mapId: string,
    latId: string,
    lngId: string
  ) => {
    const map = new window.google.maps.Map(document.getElementById(mapId), {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    });

    const input = document.getElementById(inputId) as HTMLInputElement;
    const autocomplete = new window.google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);

    const marker = new window.google.maps.Marker({
      map,
      anchorPoint: new window.google.maps.Point(0, -29),
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        alert("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);

      (document.getElementById(latId) as HTMLInputElement).value =
        place.geometry.location.lat();
      (document.getElementById(lngId) as HTMLInputElement).value =
        place.geometry.location.lng();
    });
  };

  return { isLoaded, initMap };
};