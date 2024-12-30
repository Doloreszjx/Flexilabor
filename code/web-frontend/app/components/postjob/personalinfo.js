import React, { useState } from 'react';
import { useFormContext } from '../../../context/formContext';
import Image from 'next/image';

export default function PersonalInfo({ onNext }) {
  const { formData, updateFormData } = useFormContext();
  const [image, setImage] = useState(formData.image);
  const [title, setTitle] = useState(formData.title);
  const [description, setDescription] = useState(formData.description);
  const [jobType, setJobType] = useState(formData.jobType);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
        updateFormData({ image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    updateFormData({image, title, description, jobType });
    onNext();
  };


  return (
    <div>
      <h2 className="text-2xl mb-6 font-bold">Title and Description</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="items-start flex flex-col">
          <div className="w-64 h-64 border flex border-dashed border-gray-400 rounded-md items-center justify-center overflow-hidden">
            {image ? (
              <Image src={image} width={100} height={100} alt="Uploaded" className="object-cover w-full h-full" />
            ) : (
              <label className="text-gray-500 cursor-pointer">
                <span>Upload Images</span>
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter job title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter job description"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-[#01ABF0] text-white rounded-lg hover:bg-blue-700"
          disabled={!(title && description && jobType && image)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
