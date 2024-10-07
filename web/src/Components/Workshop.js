import React from 'react';
import styles from './Workshop.module.css';

export const eventData = [
  {
    eventTitle: "Tech Conference 2024",
    organizer: "Tech World",
    organizerLogo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tech_World_logo.svg",
    attendeesCount: 200,
    daysLeft: 30,
    eventTag: "Technology",
    location: "Los Angeles",
    description: "Join industry leaders and innovators at the Tech Conference 2024 to explore the latest trends in technology and networking opportunities.",
    topics: ["Technology", "Networking", "Innovation"],
    updatedOn: "Oct 4, 2024",
    deadline: "30 days left",
  },
  {
    eventTitle: "Health & Wellness Expo",
    organizer: "Wellness Group",
    organizerLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wellness_Group_logo.svg",
    attendeesCount: 150,
    daysLeft: 14,
    eventTag: "Health",
    location: "New York",
    description: "Discover the latest in health and wellness at this interactive expo, featuring workshops, speakers, and product demonstrations.",
    topics: ["Health", "Wellness", "Fitness"],
    updatedOn: "Oct 2, 2024",
    deadline: "14 days left",
  },
  {
    eventTitle: "Art & Culture Festival",
    organizer: "Cultural Society",
    organizerLogo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Cultural_Society_logo.svg",
    attendeesCount: 300,
    daysLeft: 5,
    eventTag: "Art & Culture",
    location: "Paris",
    description: "Celebrate creativity and diversity at the Art & Culture Festival, featuring exhibitions, performances, and interactive art installations.",
    topics: ["Art", "Culture", "Exhibitions"],
    updatedOn: "Sept 28, 2024",
    deadline: "5 days left",
  },
  {
    eventTitle: "Cybersecurity Workshop",
    organizer: "Secure Tech",
    organizerLogo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Secure_Tech_logo.png",
    attendeesCount: 100,
    daysLeft: 20,
    eventTag: "Cybersecurity",
    location: "Online",
    description: "Enhance your cybersecurity skills in this hands-on workshop, featuring expert speakers and real-world scenarios.",
    topics: ["Cybersecurity", "Networking", "Data Protection"],
    updatedOn: "Oct 1, 2024",
    deadline: "20 days left",
  },
  {
    eventTitle: "Environmental Sustainability Summit",
    organizer: "Eco World",
    organizerLogo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Eco_World_logo.svg",
    attendeesCount: 250,
    daysLeft: 15,
    eventTag: "Environment",
    location: "San Francisco",
    description: "Join thought leaders in exploring sustainable practices and innovations to combat climate change.",
    topics: ["Sustainability", "Climate Change", "Environment"],
    updatedOn: "Sept 30, 2024",
    deadline: "15 days left",
  },
];

const Workshop = () => {
  return (
    <div className={styles.eventsContainer}>
      <h2 className={styles.heading}>Upcoming Events</h2>
      <div className={styles.eventList}>
        {eventData.map((event, index) => (
          <div key={index} className={styles.eventBlock}>
            <div className={styles.eventHeader}>
              <img
                src={event.organizerLogo}
                alt={`${event.organizer} logo`}
                className={styles.organizerLogo}
              />
              <div>
                <h3 className={styles.eventTitle}>{event.eventTitle}</h3>
                <p className={styles.organizerName}>{event.organizer}</p>
              </div>
            </div>
            <p className={styles.eventTag}>{event.eventTag}</p>
            <p className={styles.location}>{event.location}</p>
            <p className={styles.description}>{event.description}</p>
            <p className={styles.attendeesCount}>{event.attendeesCount} Attendees</p>
            <p className={styles.deadline}>{event.deadline}</p>
            <button className={styles.registerButton}>Register Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workshop;
