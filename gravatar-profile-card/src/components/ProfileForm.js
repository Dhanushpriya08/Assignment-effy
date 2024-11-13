import axios from 'axios';
import {
  AlertCircle,
  FileText,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User
} from 'lucide-react';
import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import './ProfileForm.css';

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
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    // Add animation class to form groups sequentially
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
      setTimeout(() => {
        group.style.opacity = '1';
        group.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (formData.website && !/^https?:\/\/.*/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL starting with http:// or https://';
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
    setFormTouched(true);
    
    if (!validateForm()) {
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

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
      
      const form = document.querySelector('.form-container');
      form.style.transform = 'scale(1.02)';
      setTimeout(() => {
        form.style.transform = 'scale(1)';
      }, 200);
      
      await onSubmit(profileData);
    } catch (error) {
      console.error('Error submitting profile:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to create profile. Please try again.'
      }));
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
    setFormTouched(true);
  };

  const renderErrorMessage = (error) => (
    <div className="error-message">
      <AlertCircle size={16} />
      {error}
    </div>
  );

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="header-content">
          {gravatarPreview && (
            <img
              src={gravatarPreview}
              alt="Profile preview"
              className="avatar-preview"
            />
          )}
          <h2 className="form-title">Create Your Profile</h2>
          <p className="form-subtitle">Let's get you set up with a great profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-group" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <label className="form-label">
              <Mail size={16} />
              Email Address <span className="required-star">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="your.email@example.com"
              required
            />
            {errors.email && renderErrorMessage(errors.email)}
          </div>

          <div className="form-group" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <label className="form-label">
              <User size={16} />
              Full Name <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              className={`form-input ${errors.fullName ? 'error' : ''}`}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
            {errors.fullName && renderErrorMessage(errors.fullName)}
          </div>

          <div className="form-group" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <label className="form-label">
              <FileText size={16} />
              Username <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="username"
              className={`form-input ${errors.username ? 'error' : ''}`}
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              required
            />
            {errors.username && renderErrorMessage(errors.username)}
          </div>

          <div className="form-group" style={{ opacity: 0, transform: 'translateY(20px)' }}>
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
              placeholder="+1 (234) 567-8900"
            />
          </div>

          <div className="form-group" style={{ opacity: 0, transform: 'translateY(20px)' }}>
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
              placeholder="New York, USA"
            />
          </div>

          <div className="form-group" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <label className="form-label">
              <Globe size={16} />
              Website
            </label>
            <input
              type="url"
              name="website"
              className={`form-input ${errors.website ? 'error' : ''}`}
              value={formData.website}
              onChange={handleChange}
              placeholder="https://your-website.com"
            />
            {errors.website && renderErrorMessage(errors.website)}
          </div>

          <div className="form-group" style={{ opacity: 0, transform: 'translateY(20px)' }}>
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
              rows="4"
            />
          </div>
        </div>

        <div className="form-footer">
          {errors.submit && renderErrorMessage(errors.submit)}
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading || (!formTouched)}
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

      {/* Bottom positioned back button */}
      {/* <button className="back-to-form" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Form
      </button> */}
    </div>
  );
};

export default ProfileForm;