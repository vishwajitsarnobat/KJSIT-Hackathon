// Courses.js
import React, { useState, useEffect } from 'react';
import styles from './Courses.module.css'; // Import the module CSS

const projectsData = [
  {
    id: 1,
    name: "AI Chatbot",
    description: "Build an AI chatbot for customer support.",
    courses: [
      {
        name: "Natural Language Processing",
        description: "Learn NLP fundamentals.",
        time: "3 months",
        link: "https://example.com/nlp-course"
      },
      {
        name: "React for Frontend",
        description: "Master React to build user interfaces.",
        time: "2 months",
        link: "https://example.com/react-course"
      }
    ]
  },
  {
    id: 2,
    name: "Recommendation System",
    description: "Develop a recommendation system for e-commerce.",
    courses: [
      {
        name: "Machine Learning",
        description: "Learn the basics of machine learning.",
        time: "4 months",
        link: "https://example.com/ml-course"
      },
      {
        name: "Python for Data Science",
        description: "Get started with Python and Data Science.",
        time: "2 months",
        link: "https://example.com/python-course"
      }
    ]
  }
];

const interestForm = [
  {
    question: "What field interests you the most?",
    options: ["AI", "Web Development", "Data Science", "Mobile Development"]
  },
  {
    question: "What is your experience level?",
    options: ["Beginner", "Intermediate", "Advanced"]
  }
];

const Courses = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [formData, setFormData] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjects, setShowProjects] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const userCompletedForm = localStorage.getItem('userCompletedForm');
    if (userCompletedForm) {
      setIsFirstTime(false);
      setShowProjects(true);
      setProjects(projectsData);
    }
  }, []);

  const handleFormChange = (question, option) => {
    setFormData(prev => ({ ...prev, [question]: option }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsFirstTime(false);
    setShowProjects(true);
    localStorage.setItem('userCompletedForm', 'true');
    setProjects(projectsData);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className={styles.coursesContainer}>
      {isFirstTime && !showProjects ? (
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <h2>Please fill in your interests</h2>
          {interestForm.map((q, index) => (
            <div key={index} className={styles.questionBlock}>
              <p>{q.question}</p>
              {q.options.map((option, i) => (
                <label key={i} className={styles.optionLabel}>
                  <input
                    type="radio"
                    name={q.question}
                    value={option}
                    onChange={() => handleFormChange(q.question, option)}
                    required
                    className={styles.radioInput}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      ) : (
        <div className={styles.content}>
          {selectedProject ? (
            <div>
              <h2 className={styles.heading}>Courses for {selectedProject.name}</h2>
              {selectedProject.courses.map((course, idx) => (
                <div key={idx} className={styles.courseBlock}>
                  <h3 className={styles.courseTitle}>{course.name}</h3>
                  <p className={styles.courseDescription}>{course.description}</p>
                  <p>Duration: {course.time}</p>
                  <a href={course.link} target="_blank" rel="noopener noreferrer" className={styles.courseLink}>
                    Access Course
                  </a>
                </div>
              ))}
              <button onClick={() => setSelectedProject(null)} className={styles.backButton}>Back to Projects</button>
            </div>
          ) : (
            <div>
              <h2 className={styles.heading}>Projects</h2>
              {projects.map(project => (
                <div key={project.id} className={styles.projectBlock} onClick={() => handleProjectClick(project)}>
                  <h3 className={styles.projectTitle}>{project.name}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;
