import React, { useState } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    skills: '',
    interests: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.initials}>{formData.name.charAt(0).toUpperCase()}</div>
        <h1 className={styles.profileTitle}>Profile</h1>
      </div>
      <div className={styles.infoContainer}>
        {isEditing ? (
          <form onSubmit={handleSave} className={styles.form}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Education" required />
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" required />
            <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="Interests" required />
            <button type="submit">Save</button>
          </form>
        ) : (
          <div className={styles.details}>
            <p><strong>Name:</strong> {formData.name || 'N/A'}</p>
            <p><strong>Email:</strong> {formData.email || 'N/A'}</p>
            <p><strong>Education:</strong> {formData.education || 'N/A'}</p>
            <p><strong>Skills:</strong> {formData.skills || 'N/A'}</p>
            <p><strong>Interests:</strong> {formData.interests || 'N/A'}</p>
            <button onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
