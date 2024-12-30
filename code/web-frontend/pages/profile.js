'use client'
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import ErrorPage from './errorPage';

export default function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    abn: ""
  });
  const [image, setImage] = useState('/avatar.svg');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggedUser] = useAuthState(auth)

  useEffect(() => {
    if (loggedUser) {
      const emailId = JSON.parse(sessionStorage.getItem('userInfo')).email;
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
      }
      const getData = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/${emailId}`, config);
          setUser(response.data.data[0]);
          if (response.data.data[0]?.profilePicture) {
            setImage(response.data.data[0]?.profilePicture);
          }
        } catch (error) {
          console.error("Error getting user:", error);
        }
      }


      getData()
    }
  }, [loggedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setUser({ ...user, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/${user.email}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        abn: user.abn,
        profilePicture: user.profilePicture,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
      });

      if (response.status === 200) {
        sessionStorage.setItem('userInfo', JSON.stringify(response.data.data));
        setUser(response.data.data);
        setIsEditing(false);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
    setLoading(false);
  };

  if (!loggedUser) return <ErrorPage />;

  return (
    <>
      <Header />
      {loggedUser && <div className='bg-blue-50 p-8'>
        <div className="mx-auto bg-white p-6 border rounded-2xl shadow-lg max-w-lg">
          <h2 className="text-2xl font-bold text-center my-4">Profile</h2>

          <div className="flex justify-center mb-4">
            <label htmlFor="profilePicture" className="cursor-pointer">
              <Image
                src={image}
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#1D90F1]"
              />
              <input
                type="file"
                disabled={!isEditing}
                id="profilePicture"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${isEditing ? "border-[#1D90F1]" : "border-gray-300"}`}
              />
            </div>

            <div>
              <label className="block font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${isEditing ? "border-[#1D90F1]" : "border-gray-300"}`}
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                disabled={true}
                className="w-full p-2 border rounded-lg border-gray-300"
              />
            </div>

            <div>
              <label className="block font-medium">ABN</label>
              <input
                type="text"
                name="abn"
                value={user.abn || ""}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${isEditing ? "border-[#1D90F1]" : "border-gray-300"}`}
              />
            </div>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="mt-6 flex justify-between">
            <button
              onClick={toggleEditing}
              className="rounded-md bg-white border px-5 py-2.5 text-base font-medium text-black"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            {isEditing && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-md bg-[#1D90F1] px-5 py-2.5 text-base font-medium text-white"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </div>}
      <Footer />
    </>
  );
}
