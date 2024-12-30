import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useEffect, useState } from 'react';
import getCenter from 'geolib/es/getCenter';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

export const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [geocodes, setGeoCodes] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [viewport, setViewport] = useState(null);

  const formattedSearchResults = searchResults.map((el) => ({
    address_number: el.unit,
    place: el.city,
    region: el.state,
    postcode: el.pin,
    country: el.country,
    street: el.street,
  }));

  useEffect(() => {
    const geoCoding = async () => {
      try {
        const response = await axios.post(
          `https://api.mapbox.com/search/geocode/v6/batch?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
          formattedSearchResults,
          {
            headers: {
              ContentType: 'application/json',
            },
          }
        );

        const fetchedGeocodes = response.data.batch;
        setGeoCodes(fetchedGeocodes);
        const newCoordinates = fetchedGeocodes.map((result) => ({
          longitude: result.features[0].geometry.coordinates[0],
          latitude: result.features[0].geometry.coordinates[1],
        }));
        setCoordinates(newCoordinates);

        const center = getCenter(newCoordinates);
        setViewport({
          width: '100%',
          height: '100%',
          latitude: center.latitude,
          longitude: center.longitude,
          zoom: 11,
        });
      } catch (err) {
        console.error("Error fetching geocode data:", err);
      }
    };

    geoCoding();
  }, [formattedSearchResults]);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/hardiquedasore/cm20i2nb0003301r44rhrabjx"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {geocodes.map((result, index) => (
        <div key={index}>
          <Marker
            longitude={result.features[0].geometry.coordinates[0]}
            latitude={result.features[0].geometry.coordinates[1]}
            offsetLeft={-20}
            offsetTop={-10}
            onClick={() =>
              setSelectedLocation(result.features[0].properties.full_address)
            }
            className="cursor-pointer"
          />

          {selectedLocation === result.features[0].properties.full_address && (
            <Popup
              className="z-20"
              closeOnClick={true}
              onClose={() => setSelectedLocation(null)}
              latitude={result.features[0].geometry.coordinates[1]}
              longitude={result.features[0].geometry.coordinates[0]}
            >
              {result.features[0].properties.place_formatted}
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
