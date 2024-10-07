import React, { useState } from 'react';
import classes from "./Homepage.module.css"

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('competitions');

  const dummyCompetitions = [
    { id: 1, title: 'Hackathon 2024', description: '24-hour coding challenge.' },
    { id: 2, title: 'AI Challenge', description: 'Build AI models to solve real-world problems.' },
    { id: 3, title: 'CodeFest', description: 'Collaborative coding event.' }
  ];

  return (
    <div className={"classes.home-container"}>
      <nav className={classes.navbar}>
        <ul>
          <li onClick={() => setActiveTab('competitions')} className={activeTab === 'competitions' ? 'active' : ''}>
            Competitions / Hackathons
          </li>
          <li onClick={() => setActiveTab('jobs')} className={activeTab === 'jobs' ? 'active' : ''}>
            Jobs and Internships
          </li>
          <li onClick={() => setActiveTab('events')} className={activeTab === 'events' ? 'active' : ''}>
            Events and Workshops
          </li>
          <li onClick={() => setActiveTab('learnings')} className={activeTab === 'learnings' ? 'active' : ''}>
            Learnings
          </li>
          <li onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>
            Profile
          </li>
        </ul>
      </nav>

      <div className={classes.content}>
        {activeTab === 'competitions' && (
          <div className={classes.list}>
            <h2>Competitions and Hackathons</h2>
            <ul>
              {dummyCompetitions.map((competition) => (
                <li key={competition.id} className="competition-item">
                  <h3>{competition.title}</h3>
                  <p>{competition.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* You can add other content for jobs, events, learnings, profile here */}
      </div>
    </div>
  );
};

export default HomePage;
