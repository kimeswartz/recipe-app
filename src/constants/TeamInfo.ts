import "../interfaces/TeamMemberInterface";
import MalcolmImage from "../assets/TeamMemberImages/Malcolm.jpg";
import HampusImage from "../assets/TeamMemberImages/Hampus.jpg";
import PabloImage from "../assets/TeamMemberImages/PabloDiaz.jpg";
import AliceImage from "../assets/TeamMemberImages/Alice.jpg";
import ArashImage from "../assets/TeamMemberImages/Arash.jpg";
import KimImage from "../assets/TeamMemberImages/kim.jpeg";
import BilgeImage from "../assets/TeamMemberImages/bilge.jpg";
import ChatGPTImage from "../assets/TeamMemberImages/chatGPTLogo.jpg";

// Team members data/info
const teamMembers: TeamMemberInterface[] = [
  {
    name: "Hampus",
    jobTitle: "Scrum Master",
    description:
      "Hello and welcome to our page! I am proud to be a part of this amazing project as Scrum Master. My mission is to ensure that our team operates smoothly and efficiently to deliver the best possible results. I am involved in various aspects of the project and work hard to solve problems and promote collaboration. My goal is to ensure that everyone on the team thrives and succeeds. Thank you for being here and supporting us on our journey towards success!",
    image: HampusImage,
  },

  {
    name: "Kim",
    jobTitle: "Product Owner",
    description:
      "As a product owner, my overarching responsibility is to ensure that the project achieves its goals and that the desired product is delivered according to specifications. This means that I act as the primary advocate for the project and am responsible for defining the vision, goals, and requirements for the product. I ensure that the product meets the agreed-upon quality standards by establishing and following appropriate quality control processes and by conducting tests and evaluations as needed.",
    image: KimImage,
  },

  {
    name: "Pablo",
    jobTitle: "Developer",
    description:
      "My name is Pablo Diaz, and from an early age, I've had a passion for creating, from drawing small figures as a child to now working with technology and solutions. I enjoy both exercising and exploring the world in front of the computer. My strength lies in my ability to think outside the box to find new and innovative solutions to various challenges. When I'm not working or in front of the computer, I devote myself to my hobby - history. I find inspiration in learning about past times and I am drawn to drawing parallels between the past and the present.",
    image: PabloImage,
  },

  {
    name: "Malcolm",
    jobTitle: "Developer",
    description:
      "Malcolm Uzuriaga Toro is the name. I am 28 years old and studying Java development in Front/Backend. In my free time, I spend a lot of time outdoors with my dog, bike, or my spray cans. I am a creative man who enjoys creating things from my own imagination and loves to have fun and make the most of the time I have. When I grow up, I want to become a programmer who hopefully can create cool programs or solve difficult problems for companies that they themselves cannot solve!",
    image: MalcolmImage,
  },

  {
    name: "Alice",
    jobTitle: "Developer/ After-Work Coordinator",
    description:
      "When I'm not busy being a reliable and committed developer on the team, I take the role of after-work coordinator seriously. Through organizing social activities, I facilitate team bonding, which in turn cultivates stronger relationships and enhances collaboration within our work environment. Outside of work, I love exploring Stockholm, whether it's a leisurely walk through the city streets or sharing a meal together with friends and colleagues. You can often find me at a cozy café or a wine bar.",
    image: AliceImage,
  },

  {
    name: "Bilge",
    jobTitle: "Developer",
    description:
      "I'm a developer within the team, primarily focusing on coding tasks. My work involves implementing and testing functionality. I collaborate with the team to enhance our workflow. The aim is to deliver high-quality results within deadlines. Thank you for allowing me to be part of this project!",
    image: BilgeImage,
  },

  {
    name: "Arash",
    jobTitle: "Developer",
    description:
      "Hello, my name is Arash Sohrevardi, an enthusiastic full-stack developer with deep knowledge in Java, TypeScript, and React, as well as a solid understanding of CSS, Flexbox, and global state management. In addition to my technical skills, I bring experiences as a referee with the Swedish Floorball Federation and a background as an extreme sports enthusiast, which has taught me the importance of teamwork and keeping a cool head under pressure. As a 42-year-old with a passion for fitness and exploring new horizons, I am an outgoing and humble individual who strongly believes in the dynamics of teamwork. I aim to expand my career internationally in programming, where I feel I can significantly contribute to large-scale projects. I am convinced that my unique combination of technical expertise, team-oriented approach, and life experience makes me a valuable asset in any project.",
    image: ArashImage,
  },

  {
    name: "ChatGPT",
    jobTitle: "AI Assistant",
    description:
      "I'm ChatGPT, an AI language model created by OpenAI. My purpose is to assist and engage in various conversations, providing information, answering questions, and generating text based on the input I receive. I've been trained on a diverse range of internet text, allowing me to understand and respond to many topics and inquiries. Whether you need help with a specific question, want to brainstorm ideas, or just fancy a chat, feel free to engage with me!",
    image: ChatGPTImage,
  },
];

export default teamMembers;
