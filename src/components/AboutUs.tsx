import { useEffect, useState } from "react";
import "../styling/AboutUs.css";
import "../interfaces/TeamMemberInterface";

const AboutUs = () => {
  // Team members data/info
  const teamMembers: TeamMember[] = [
    {
      name: "Alice",
      jobTitle: "Software Engineer",
      description: "Passionate coder with a love for frontend development.",
      image:
        "https://img.freepik.com/premium-vector/male-character-presentation-making-gesture_316839-3134.jpg?size=626&ext=jpg",
    },
    {
      name: "Kim",
      jobTitle: "Software Engineer",
      description: "Passionate coder with a love for frontend development.",
      image:
        "https://img.freepik.com/premium-vector/teenager-boy-laughing-expressing-emotions_316839-2943.jpg?size=626&ext=jpg",
    },
    {
      name: "Malcolm",
      jobTitle: "Software Engineer",
      description: "Passionate coder with a love for frontend development.",
      image:
        "https://img.freepik.com/premium-vector/young-business-man-showing-gesture-good-idea-flat-vector-cartoon-design_185694-733.jpg",
    },
    {
      name: "Bilge",
      jobTitle: "Software Engineer",
      description: "Passionate coder with a love for frontend development.",
      image:
        "https://img.freepik.com/premium-vector/bearded-man-employee-giving-presentation-showing_316839-2935.jpg",
    },
    {
      name: "Hampus",
      jobTitle: "Scrum Master",
      description:
        "Hej och välkommen till vår sida! Jag är stolt över att vara en del av detta fantastiska projekt som Scrum Master. Mitt uppdrag är att se till att vårt team fungerar smidigt och effektivt för att leverera det bästa resultatet möjligt. Jag är involverad i olika delar av projektet och arbetar hårt för att lösa problem och främja samarbete. Mitt mål är att se till att alla i teamet trivs och är framgångsrika. Tack för att du är här och stödjer oss på vår resa mot framgång!",
      image:
        "https://img.freepik.com/premium-vector/person-using-mobile-phone-holding-hand-surfing-internet-reading-online-bearded-man-glasses-texting-with-smartphone-cellphone-flat-vector-illustration-isolated-white-background_633472-561.jpg?size=626&ext=jpg",
    },
    {
      name: "Arash",
      jobTitle: "Software Engineer",
      description: "Passionate coder with a love for frontend development.",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/008/056/913/small_2x/young-smiling-man-cartoon-character-shows-gesture-cool-with-two-thumbs-up-flat-illustration-isolated-on-white-background-free-vector.jpg",
    },
    {
      name: "Pablo",
      jobTitle: "UI/UX Designer",
      description: "Creative designer with a knack for user-centered design.",
      image:
        "https://img.freepik.com/premium-vector/smiling-businessman-gesturing-showing-thumbs-up_316839-2100.jpg",
    },
    {
      name: "ChatGPT",
      jobTitle: "AI Assistant",
      description:
        "I'm ChatGPT, an AI language model created by OpenAI. My purpose is to assist and engage in various conversations, providing information, answering questions, and generating text based on the input I receive. I've been trained on a diverse range of internet text, allowing me to understand and respond to many topics and inquiries. Whether you need help with a specific question, want to brainstorm ideas, or just fancy a chat, feel free to engage with me!",
      image:
        "https://verticalresponse.com/wp-content/uploads/2023/04/chat-gpt-logo-scaled.jpeg",
    },
  ];

  // State to keep track of the selected team member
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Function to handle clicking on a team member. Updates the state
  const handleMemberClick = (member: TeamMember) => {
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
