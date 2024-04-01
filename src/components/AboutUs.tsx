import { useEffect, useState } from "react";
import "../styling/AboutUs.css";
import teamMembers from "../constants/TeamInfo";

const AboutUs = () => {

  // State to keep track of the selected team member
  const [selectedMember, setSelectedMember] = useState<TeamMemberInterface | null>(null);

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
    <div className="about-us-container">
      <div className="about-us-header-section">
        <div className="about-us-background-image">
          <img
            src="https://eep.io/images/yzco4xsimv0y/6aZY89JahywcsYcUkC6seq/88f9ad3c2c5004fd2166b1b5b7ee6567/hero_our-story.jpg?w=1520&fm=avif&q=60"
            alt="Grupp 4"
          />
          <h1 className="about-us-group-name">Grupp 4</h1>
        </div>
      </div>
      <div className="about-us-description-section">
        <p>
          Välkommen till Grupp 4! Vi är en grupp människor från olika
          livsstilar, alla dyker in i programmering tillsammans. Från de med
          lite mer erfarenhet till nyfikna entusiaster, är vi en mångsidig skara
          förenade av vår kärlek till kodning. Men hej, det är inte bara arbete
          och ingen lek. Vi ser till att umgås efter arbetstid, byta historier
          och bygga vänskap. Kom och joina oss på denna programmeringsresa där
          lärande är kul och vänskap är nyckeln. / ChatGpt
        </p>
      </div>
      <div className="about-us-info-section">
        <div className="about-us-info-card">
          <h2>Events</h2>
          <p>Weekly After Work hangouts are mandatory!</p>
        </div>
        <div className="about-us-info-card">
          <h2>Opening Hours</h2>
          <p>We're always open for coding adventures!</p>
        </div>
      </div>
      {/* Team/crew section */}
      <div className="about-us-crew-section">
        <h2>The Team</h2>
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
      </div>

      {/* Details about the selected team member */}
      {/* If selectedMember exists(aka not null) the code is executed */}
      {selectedMember && (
        <div id="about-us-selected-member" className="about-us-selected-member">
          <img src={selectedMember.image} alt={selectedMember.name} />
          <h3>{selectedMember.name}</h3>
          <p>{selectedMember.jobTitle}</p>
          <p>{selectedMember.description}</p>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
