import React, { useState } from 'react';
import styles from './Events.module.css'; // Importing the CSS module


const generate_problem = async (interactions) => {
  try {
    console.log("In generate_problem");

    const response = await fetch('http://192.168.5.153:8000/generate-problem', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ interactions }),
    });

    const data = await response.json();
    console.log("Response from server:", data);

    return data; // Return the data for further use
  } catch (error) {
    console.error('Error:', error);
    throw error; // Throw the error so it can be handled where the function is called
  }
};


const Events = (props) => {
  const [question, setQuestion] = useState('');
  const [code, setCode] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const generate_problem = async (interactions) => {
    try {
      console.log("In generate_problem");
  
      const response = await fetch('http://192.168.5.153:8000/generate-problem', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interactions }),
      });
  
      const data = await response.json();
      console.log("Response from server:", data);
      console.log(data)
      return data; // Return the data for further use
    } catch (error) {
      console.error('Error:', error);
      throw error; // Throw the error so it can be handled where the function is called
    }
  };

  // Function to handle generating the problem
  const handleGenerate = async () => {
    console.log("In handleGenerate");

    try {
      // Call the generate_problem function and await the result
      const generatedQuestion = await generate_problem({ react: "react" });
      
      // Set the generated question in the state
      setQuestion(generatedQuestion);
      
      console.log("Generated question data:", generatedQuestion);
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error in generating question:", error);
    }
  };

  const handleSubmit = () => {
    // Simulate suggestions or corrections from the ML model for the code input
    const mlSuggestions = `Suggestion: Your solution works, but consider optimizing for space complexity by using an iterative approach instead of recursion.`;
    
    setSuggestions(mlSuggestions);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Daily Concept Challenge</h1>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Generated Question</h2>
          <textarea
            className={styles.textarea}
            value={question}
            readOnly
            placeholder="Generated question will appear here..."
          />
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Your Code</h2>
          <textarea
            className={styles.textarea}
            rows="10" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Suggestions</h2>
          <textarea
            className={styles.textarea}
            value={suggestions}
            readOnly
            placeholder="Suggestions will appear here..."
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button 
          onClick={handleGenerate}
          className={`${styles.button} ${styles.buttonGenerate}`}
        >
          Generate Question
        </button>
        <button 
          onClick={handleSubmit}
          className={`${styles.button} ${styles.buttonSubmit}`}
        >
          Submit Code
        </button>
      </div>
    </div>
  );
};

export default Events;
