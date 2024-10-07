import React, { useState } from 'react';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        formComplete: false, // Mark form as incomplete
      });
      
      navigate('/userform'); // Navigate to form after signup
    } catch (error) {
      setError("Failed to create an account. Please try again.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Sign Up</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form className={styles.signupForm} onSubmit={handleSignup}>
        <input 
          className={styles.inputField}
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          className={styles.inputField}
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button className={styles.signupButton} type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
};

export default Signup;
