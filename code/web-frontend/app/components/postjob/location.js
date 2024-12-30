import React, { useState } from 'react';
import { useFormContext } from '../../../context/formContext';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const mapboxClient = mbxGeocoding({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN});
// Location suggestions from mapbox
export default function Step3({ onNext }) {
  const { formData, updateFormData } = useFormContext();
  const [address, setAddress] = useState({
    unit: formData.address?.unit || '',
    street: formData.address?.street || '',
    city: formData.address?.city || '',
    state: formData.address?.state || '',
    country: formData.address?.country || '',
    pin: formData.address?.pin || '',
  });
  const [suggestions, setSuggestions] = useState([]);

  const handleStreetInput = async (e) => {
    const value = e.target.value;
    setAddress({ ...address, street: value });

    if (value.length > 2) {
      const response = await mapboxClient.forwardGeocode({
        query: value,
        limit: 5,
        countries: ['AUS'],
      }).send();

      if (response && response.body && response.body.features) {
        setSuggestions(response.body.features);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (feature) => {
    const { address, text, context } = feature;
    const newAddress = {
      unit: address || '',
      street: text || '',
      city: context?.find((el) => el.id.includes('place'))?.text || '',
      state: context?.find((el) => el.id.includes('region'))?.text || '',
      country: context?.find((el) => el.id.includes('country'))?.text || '',
      pin: context?.find((el) => el.id.includes('postcode'))?.text || '',
    };

    setAddress(newAddress);
    setSuggestions([]);
    updateFormData({ address: newAddress });
  };

  const handleNext = () => {
    updateFormData({ address });
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Location</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Unit / Apartment Number</label>
          <input
            type="text"
            value={address.unit}
            onChange={(e) => setAddress({ ...address, unit: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Street</label>
          <input
            type="text"
            value={address.street}
            onChange={handleStreetInput}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {suggestions.length > 0 && (
            <ul className="border rounded-lg mt-2 bg-white shadow-lg max-h-40 overflow-auto">
              {suggestions.map((feature) => (
                <li
                  key={feature.id}
                  onClick={() => handleSuggestionSelect(feature)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {feature.place_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">State</label>
          <input
            type="text"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Country</label>
          <input
            type="text"
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">PIN Code</label>
          <input
            type="text"
            value={address.pin}
            onChange={(e) => setAddress({ ...address, pin: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-[#01ABF0] text-white rounded-lg hover:bg-blue-700"
          disabled={!(address.unit && address.street && address.city && address.state && address.country && address.pin)} 
        >
          Next
        </button>
      </div>
    </div>
  );
}
