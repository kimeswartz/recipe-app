//Alice

import { useEffect, useState } from "react";
import "../styling/HeaderComponentStyle.css";
import "../styling/AboutUsStyle.css";
import teamMembers from "../constants/TeamInfo";

const AboutUs = () => {
  // State to keep track of the selected team member
  const [selectedMember, setSelectedMember] =
    useState<TeamMemberInterface | null>(null);

  // Function to handle clicking on a team member. Updates the state
  const handleMemberClick = (member: TeamMemberInterface) => {
    setSelectedMember(member);
  };

  //Function to scroll down to selected member
  useEffect(() => {
    if (selectedMember) {
      const element = document.getElementById("about-us-selected-member");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedMember]);

  return (
    <>
      <header className="header team-header">
        <div className="header-content">
          <h1 className="header-title">The Team</h1>
        </div>
      </header>

      <section className="standard-container">
        <h2>We're always open for coding adventures!</h2>
        <p className="centered-container">
          Welcome to Group 4! We are a diverse group of individuals from various
          lifestyles, all diving into programming together. From those with a
          bit more experience to curious enthusiasts, we are a versatile bunch
          united by our love for coding. But hey, it's not all work and no play.
          We make sure to socialize after hours, swap stories, and build
          friendships. Come join us on this programming journey where learning
          is fun and friendship is key.
        </p>
      </section>

      <section className="standard-container">
        <h2>Meet us</h2>
        <div className="about-us-crew">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="about-us-member"
              onClick={() => handleMemberClick(member)}
            >
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {selectedMember && (
        <section className="standard-container">
          <div
            id="about-us-selected-member"
            className="about-us-selected-member"
          >
            <img src={selectedMember.image} alt={selectedMember.name} />
            <h3>{selectedMember.name}</h3>
            <p>{selectedMember.jobTitle}</p>
            <p>{selectedMember.description}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default AboutUs;
