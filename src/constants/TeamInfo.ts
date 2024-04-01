import "../interfaces/TeamMemberInterface";
import MalcolmImage from "../assets/Malcolm.jpg";
import HampusImage from "../assets/Hampus.jpg";
import PabloImage from "../assets/PabloDiaz.jpg";
import AliceImage from "../assets/Alice.jpg";
import ArashImage from "../assets/Arash.jpg"

// Team members data/info
const teamMembers: TeamMemberInterface[] = [
  {
    name: "Hampus",
    jobTitle: "Scrum Master",
    description:
      "Hej och välkommen till vår sida! Jag är stolt över att vara en del av detta fantastiska projekt som Scrum Master. Mitt uppdrag är att se till att vårt team fungerar smidigt och effektivt för att leverera det bästa resultatet möjligt. Jag är involverad i olika delar av projektet och arbetar hårt för att lösa problem och främja samarbete. Mitt mål är att se till att alla i teamet trivs och är framgångsrika. Tack för att du är här och stödjer oss på vår resa mot framgång!",
    image: HampusImage,
  },

  {
    name: "Pablo",
    jobTitle: "Utvecklare",
    description:
      "Pablo Diaz heter jag och från en tidig ålder har jag älskat att sitta ner och skapa, från att rita små figurer som barn till att nu arbeta med teknik och lösningar. Jag trivs både med träning och med att utforska världen framför datorn. Min styrka ligger i min förmåga att tänka utanför boxen för att hitta nya och innovativa lösningar på olika utmaningar. När jag inte arbetar eller sitter framför datorn, ägnar jag mig åt min hobby - historia. Jag finner inspiration i att lära mig om tidigare tider och dras till att dra paralleller mellan dåtid och nutid.",
    image: PabloImage,
  },

  {
    name: "Malcolm",
    jobTitle: "Utvecklare",
    description:
      "Malcolm Uzuriaga Toro är namnet. Jag är 28år gammal och studerar inom Javautveckling i Front/-Backend. På min fritid spenderar jag mycket tid ute med min hund, cykel eller mina sprayburkar. Jag är en kreativ man som gillar att skapa saker ur egen fantasi och älskar att ha kul och ta vara på tiden man har. När jag blir stor vill jag bli en Programmerare som förhoppningsvis kan skapa häftiga program eller lösa svåra problem åt företag/bolag som dom själva inte kan lösa !",
    image: MalcolmImage,
  },

  {
    name: "Alice",
    jobTitle: "Utvecklare/ AW ansvarig",
    description:
      "När jag inte är upptagen med att vara en pålitlig och engagerad utvecklare i teamet, tar jag rollen som after work-ansvarig på allvar. Jag älskar att utforska Stockholms pulserande nattliv och upptäcka nya gömda pärlor i staden. Utöver det är träning en stor del av mitt liv, och jag finner stor glädje i att vara social och umgås med vänner och kollegor.",
    image: AliceImage,
  },

  {
    name: "Kim",
    jobTitle: "Produkt ägare",
    description: "Passionate coder with a love for frontend development.",
    image:
      "https://img.freepik.com/premium-vector/teenager-boy-laughing-expressing-emotions_316839-2943.jpg?size=626&ext=jpg",
  },

  {
    name: "Bilge",
    jobTitle: "Software Engineer",
    description: "Passionate coder with a love for frontend development.",
    image:
      "https://img.freepik.com/premium-vector/bearded-man-employee-giving-presentation-showing_316839-2935.jpg",
  },

  {
    name: "Arash",
    jobTitle: "Software Engineer",
    description: "Hej, jag heter Arash Sohrevardi, en entusiastisk fullstack-utvecklare med djup kunskap i Java, TypeScript och React, samt en solid förståelse för CSS, Flexbox och global state hantering. Utöver mina tekniska färdigheter, bär jag på erfarenheter som förbundsdomare hos Svenska Innebandyförbundet och en bakgrund som extremsportare, vilket har lärt mig vikten av teamwork och att hålla huvudet kallt under press. Som 42-åring med en passion för träning och att utforska nya horisonter, är jag en utåtriktad och prestigelös individ som tror starkt på teamets dynamik. Jag siktar på att utöka min karriär internationellt inom programmering, där jag känner att jag kan bidra väsentligt till storskaliga projekt. Jag är övertygad om att min unika kombination av teknisk kompetens, teamorienterad inställning och livserfarenhet gör mig till en värdefull tillgång i varje projekt.",
    image: ArashImage,
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

export default teamMembers;
