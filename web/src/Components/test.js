export const generate_problem = async (interactions) => {
  try {
    console.log("In generate_problem");
// Set CORS headers
res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow certain methods
res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
    const response = await fetch('http://192.168.5.153:8000/generate-problem', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
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

const generate_questions = async (text) => {
  return fetch('http://192.168.5.153:8003/generate', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      'input_text': text
    })
  })
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error('Error:', error));
}

const check_code = async (question, code) => {
  return fetch(`http://0.0.0.0:8001/check-code?question=${encodeURIComponent(question)}&code=${encodeURIComponent(code)}`, {
    method: 'POST',  // POST request, but sending query parameters in the URL
    headers: {
      'accept': 'application/json',
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: ''
  })
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error('Error:', error));
}

// const recommendHackathons = async (keywordDict) => {
//   const formData = new FormData();
//   formData.append('keyword_dict', JSON.stringify(keywordDict));

//   try {
//     const response = await fetch('http://0.0.0.0:8002/recommend-hackathons', {
//       method: 'POST',
//       body: formData
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     console.log('Recommendations:', data);
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

const recommendHackathons = async (keywordDict) => {
  return fetch('http://0.0.0.0:8002/recommend-hackathons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(keywordDict) // Send the keywordDict as a JSON object
  })
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error('Error:', error));
};

// Example usage
// recommendHackathons({
//   "python": 5,
//   "machine learning": 3,
//   "data science": 2
// })
// .then(data => {
//   // Handle the recommendations data here
//   console.log("Recommendations:", data);
// })
// .catch(error => {
//   // Handle any errors here
//   console.error("Error:", error);
// });

//export {generate_problem, generate_questions, recommendHackathons, check_code}

const handleGenerate3 = async () => {
  console.log("In handleGenerate");
  
  try {
    // Wait for the Promise returned by generate_problem
    const generatedQuestion = await generate_problem({react: "react"});
    
    // Once the Promise is resolved, you can use the result
    console.log("Generated question data:", generatedQuestion);
  } catch (error) {
    // Handle any errors
    console.error("Error in generating question:", error);
  }
};
handleGenerate3()