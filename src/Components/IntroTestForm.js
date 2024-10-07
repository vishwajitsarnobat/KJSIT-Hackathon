// IntroTestForm.js
import React, { useState } from 'react';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const IntroTestForm = () => {
  const history = useHistory();

  // Step and formData state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: [],
    email: [],
    address: [],
    city: [],
    dynamicFields: []
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleSelection = (field, value) => {
    setFormData(prevData => {
      const currentSelections = prevData[field];
      const isSelected = currentSelections.includes(value);

      if (isSelected) {
        return { ...prevData, [field]: currentSelections.filter(item => item !== value) };
      } else {
        return { ...prevData, [field]: [...currentSelections, value] };
      }
    });
  };

  const hasSelectedOption = () => {
    switch (step) {
      case 1: return formData.name.length > 0;
      case 2: return formData.email.length > 0;
      case 3: return formData.address.length > 0;
      case 4: return formData.city.length > 0;
      case 5: return formData.city.length > 0;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(prevStep => prevStep + 1);
    } else {
      // Submit data to Firebase
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, formData);

        // Redirect to the Navbar and Hackathons page after submission
        history.push('/hackathons');
      }
    }
  };

  const handlePrev = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const renderStep = () => {
    switch (step) {
      case 1: return (
        <Box>
          <Typography variant="h6">Tell Us your Goals</Typography>
          {['Professional Growth', 'Staying Sharp', 'Academic Excellence', 'Others..'].map((goal) => (
            <Button key={goal} variant={formData.name.includes(goal) ? "contained" : "outlined"} fullWidth onClick={() => handleSelection('name', goal)}>
              {goal}
            </Button>
          ))}
        </Box>
      );
      // Add the other cases similarly for steps 2-5
      // ...
    }
  };

  return (
    <Box width="100%" maxWidth="600px" mx="auto" my={4}>
      <LinearProgress variant="determinate" value={progress} />
      <Box mt={4}>{renderStep()}</Box>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button onClick={handlePrev}>Back</Button>
        <Button onClick={handleNext} disabled={!hasSelectedOption()}>
          {step === totalSteps ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default IntroTestForm;
