import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, LinearProgress, Button, Typography } from '@mui/material';

// Array of step objects

const Userform = (props) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: [],
    email: [],
    address: [],
    city: [],
    time: []
  });
  const navigate = useNavigate();
  const totalSteps = props.ObjArray.length;

  // Move to next step
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Log all selected options on submission
      props.setFunc(formData)
      console.log("Selected Options: ", formData);
      alert('Form submitted!');
      props.onComplete();
      navigate('/hackathons');
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Calculate progress percentage
  const progress = (step / totalSteps) * 100;

  // Handle user selection for the current step
  const handleSelection = (field, value) => {
    setFormData(prevData => {
      const currentSelections = prevData[field];
      const isSelected = currentSelections.includes(value);

      // Toggle the selection
      if (isSelected) {
        return { ...prevData, [field]: currentSelections.filter(item => item !== value) };
      } else {
        return { ...prevData, [field]: [...currentSelections, value] };
      }
    });
  };

  // Check if the user has selected at least one option in the current step
  const hasSelectedOption = () => {
    const currentField = props.ObjArray[step - 1].field;
    return formData[currentField].length > 0;
  };

  // Dynamically render each step's content
  const renderStep = () => {
    const { titlename, options, field } = props.ObjArray[step - 1];

    return (
      <Box>
        <Typography variant="h6">{titlename}</Typography>
        {options.map((option) => (
          <Button
            key={option}
            variant={formData[field].includes(option) ? "contained" : "outlined"}
            fullWidth
            onClick={() => handleSelection(field, option)}
          >
            {option}
          </Button>
        ))}
      </Box>
    );
  };

  return (
    <Box width="100%" maxWidth="600px" mx="auto" my={4}>
      {/* Progress bar */}
      <LinearProgress variant="determinate" value={progress} />

      {/* Current step form */}
      <Box mt={4}>{renderStep()}</Box>

      {/* Navigation buttons */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={prevStep} disabled={step === 1}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={nextStep} disabled={!hasSelectedOption()}>
          {step === totalSteps ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default Userform;