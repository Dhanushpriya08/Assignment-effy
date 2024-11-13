import React, { useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import './ProfileForm.css';
import { ArrowLeft, Loader2, User, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';

const ProfileForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    phoneNumber: '',
    location: '',
    website: '',
    bio: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [gravatarPreview, setGravatarPreview] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchGravatarData = async (email) => {
    const hash = md5(email.trim().toLowerCase());
    try {
      const response = await axios.get(`https://en.gravatar.com/${hash}.json`);
      return response.data.entry[0];
    } catch (error) {
      console.log('No Gravatar profile found');
      return null;
    }
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    handleChange(e);
    if (email && /\S+@\S+\.\S+/.test(email)) {
      const hash = md5(email.trim().toLowerCase());
      setGravatarPreview(`https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const gravatarData = await fetchGravatarData(formData.email);
      const profileData = {
        ...formData,
        gravatarImage: `https://www.gravatar.com/avatar/${md5(formData.email.trim().toLowerCase())}?s=200`,
        gravatarUsername: gravatarData?.preferredUsername || formData.username,
        gravatarLocation: gravatarData?.currentLocation || formData.location,
        gravatarBio: gravatarData?.aboutMe || formData.bio
      };
      await onSubmit(profileData);
    } catch (error) {
      console.error('Error submitting profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="header-content">
          {gravatarPreview && (
            <img
              src={gravatarPreview}
              alt="Profile preview"
              className="avatar-preview"
            />
          )}
          <h2 className="form-title">Create Your Profile</h2>
          <p className="form-subtitle">Fill in your information to get started</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-group">
            <label className="form-label required">
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label required">
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className={`form-input ${errors.fullName ? 'error' : ''}`}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <div className="error-message">{errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label required">
              <FileText size={16} />
              Username
            </label>
            <input
              type="text"
              name="username"
              className={`form-input ${errors.username ? 'error' : ''}`}
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Phone size={16} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              className="form-input"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <MapPin size={16} />
              Location
            </label>
            <input
              type="text"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Globe size={16} />
              Website
            </label>
            <input
              type="url"
              name="website"
              className="form-input"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://your-website.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FileText size={16} />
              Bio
            </label>
            <textarea
              name="bio"
              className="form-input"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div className="form-footer">
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="loading-spinner" size={16} />
                Creating Profile...
              </>
            ) : (
              'Create Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;