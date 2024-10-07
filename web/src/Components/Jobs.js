import React from 'react';
import styles from './Jobs.module.css';

export const jobData = [
  {
    jobTitle: "Software Engineer",
    companyName: "Google",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    appliedCount: 10,
    daysLeft: 15,
    jobTag: "Freshers Welcome",
    location: "Bangalore",
    description: "Join the software engineering team at Google and work on cutting-edge technologies, build scalable systems, and write efficient code.",
    skills: ["JavaScript", "Python", "System Design", "Problem Solving"],
    updatedOn: "Oct 1, 2024",
    deadline: "15 days left",
  },
  {
    jobTitle: "Product Manager",
    companyName: "Microsoft",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    appliedCount: 5,
    daysLeft: 10,
    jobTag: "Experienced Professionals",
    location: "Hyderabad",
    description: "Drive the development of innovative products at Microsoft, working with cross-functional teams to deliver high-quality solutions.",
    skills: ["Product Management", "Strategic Planning", "Cross-functional Leadership", "Communication"],
    updatedOn: "Sept 30, 2024",
    deadline: "10 days left",
  },
  {
    jobTitle: "Data Scientist",
    companyName: "Amazon",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    appliedCount: 8,
    daysLeft: 25,
    jobTag: "Experienced Professionals",
    location: "Delhi",
    description: "Analyze large datasets to discover trends and insights, building predictive models to help drive business decisions at Amazon.",
    skills: ["Python", "Machine Learning", "Data Analysis", "Statistical Modeling"],
    updatedOn: "Oct 3, 2024",
    deadline: "25 days left",
  },
  {
    jobTitle: "Marketing Analyst",
    companyName: "Facebook",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    appliedCount: 7,
    daysLeft: 18,
    jobTag: "Experienced Professionals",
    location: "Mumbai",
    description: "Work with the marketing team to analyze campaign data, identify trends, and provide actionable insights to improve campaign performance.",
    skills: ["Marketing Analytics", "Google Analytics", "Campaign Strategy", "Data Interpretation"],
    updatedOn: "Oct 2, 2024",
    deadline: "18 days left",
  },
  {
    jobTitle: "UX Designer",
    companyName: "Adobe",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Adobe_Corporate_Logo.svg",
    appliedCount: 4,
    daysLeft: 20,
    jobTag: "Freshers Welcome",
    location: "Remote",
    description: "Create seamless user experiences by designing intuitive interfaces and collaborating with developers to implement UX best practices.",
    skills: ["UX Design", "Wireframing", "Prototyping", "Figma", "User Research"],
    updatedOn: "Oct 1, 2024",
    deadline: "20 days left",
  },
  {
    jobTitle: "Relationship Manager - Mortgage Sales",
    companyName: "HDFC Bank",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/1/16/HDFC_Bank_logo.svg",
    appliedCount: 1,
    daysLeft: 29,
    jobTag: "Experienced Professionals",
    location: "Chennai",
    description: "Manage mortgage sales, coordinate with clients, and meet sales targets. Excellent communication skills required.",
    skills: ["Sales", "Client Management", "Communication", "Mortgage Knowledge"],
    updatedOn: "Oct 5, 2024",
    deadline: "29 days left",
  },
];

const Jobs = () => {
  return (
    <div className={styles.jobsContainer}>
      <h2 className={styles.heading}>Available Jobs</h2>
      <div className={styles.jobList}>
        {jobData.map((job, index) => (
          <div key={index} className={styles.jobBlock}>
            <div className={styles.jobHeader}>
              <img src={job.companyLogo} alt={job.companyName} className={styles.companyLogo} />
              <div>
                <h3 className={styles.jobTitle}>{job.jobTitle}</h3>
                <p className={styles.companyName}>{job.companyName}</p>
              </div>
            </div>
            <p className={styles.jobTag}>{job.jobTag}</p>
            <p className={styles.location}>{job.location}</p>
            <p className={styles.description}>{job.description}</p>
            <p className={styles.skills}>Skills: {job.skills.join(', ')}</p>
            <p className={styles.deadline}>Deadline: {job.deadline}</p>
            <button className={styles.applyButton}>Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
