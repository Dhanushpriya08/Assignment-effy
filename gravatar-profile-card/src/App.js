import React, { useState } from 'react';
import ProfileCard from './components/ProfileCard';
import ProfileForm from './components/ProfileForm';

const App = () => {
  const [profileData, setProfileData] = useState(null);

  const handleProfileSubmit = (formData) => {
    setProfileData(formData);
  };

  const handleBack = () => {
    setProfileData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          {!profileData ? (
            <ProfileForm onSubmit={handleProfileSubmit} />
          ) : (
            <div className="space-y-8">
              <ProfileCard profileData={profileData} />
              <div className="flex justify-center">
                <button
                  onClick={handleBack}
                  className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 ease-out hover:shadow-xl"
                >
                  <span className="absolute inset-0 bg-white/20 group-hover:scale-x-100 scale-x-0 origin-left transition-transform duration-200 ease-out" />
                  <div className="relative flex items-center space-x-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-semibold">Back to Form</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;