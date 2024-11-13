import React, { useState } from 'react';
import ProfileForm from './components/ProfileForm';
import ProfileCard from './components/ProfileCard';
import './App.css';

function App() {
  const [profileData, setProfileData] = useState(null);

  const handleProfileSubmit = (formData) => {
    setProfileData(formData);
  };

  const handleBack = () => {
    setProfileData(null);
  };

  return (
    <div className="app">
      <h1 className="app-title">Enhanced Gravatar Profile Card</h1>
      <div className="container">
        {!profileData ? (
          <ProfileForm onSubmit={handleProfileSubmit} />
        ) : (
          <>
            <ProfileCard profileData={profileData} />
            <button onClick={handleBack} className="back-button">
              Back to Form
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;