import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ profileData }) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img 
          src={profileData.gravatarImage} 
          alt={profileData.fullName}
          className="profile-image"
          onError={(e) => {
            e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
          }}
        />
        <h2 className="profile-name">{profileData.fullName}</h2>
        <p className="profile-username">@{profileData.gravatarUsername || profileData.username}</p>
      </div>

      <div className="profile-info">
        <div className="info-section">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Location
          </h3>
          <p>{profileData.gravatarLocation || profileData.location || 'Not specified'}</p>
        </div>

        <div className="info-section">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Contact
          </h3>
          <p>Email: {profileData.email}</p>
          {profileData.phoneNumber && <p>Phone: {profileData.phoneNumber}</p>}
        </div>

        {profileData.website && (
          <div className="info-section">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Website
            </h3>
            <a href={profileData.website} target="_blank" rel="noopener noreferrer">
              {profileData.website}
            </a>
          </div>
        )}

        <div className="info-section">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Bio
          </h3>
          <p>{profileData.gravatarBio || profileData.bio || 'No bio available'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;