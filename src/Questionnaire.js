

import React, { useState } from 'react';
import './Questionnaire.css';

const questions = {
  KnowledgeDepth: [
    { question: "How many non-fiction books did you read in the last year?", options: ["0-5", "6-10", "11-15", "16+"] },
    { question: "How many academic journals do you subscribe to?", options: ["0", "1-2", "3-4", "5+"] },
    { question: "Can you discuss recent advancements in your field of interest?", options: ["Not at all", "Somewhat", "Confidently", "Expertly"] },
    { question: "How confident are you explaining basic physics, biology, or history?", options: ["Not at all", "Somewhat", "Confidently", "Expertly"] },
    { question: "How many research papers have you read in the last year?", options: ["0-5", "6-10", "11-15", "16+"] }
  ],
  CuriosityExploration: [
    { question: "How often do you fall into YouTube/Wikipedia rabbit holes?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "How many online courses or tutorials have you completed recently?", options: ["0", "1-2", "3-4", "5+"] },
    { question: "How often do you attend webinars or online lectures?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "Have you ever started a project based on something you learned online?", options: ["Never", "Once", "A few times", "Regularly"] },
    { question: "How often do you explore new topics outside your field of expertise?", options: ["Never", "Occasionally", "Frequently", "Always"] }
  ],
  ProblemSolving: [
    { question: "Do you enjoy solving complex puzzles or brainteasers?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "Have you ever developed a solution to a real-world problem?", options: ["Never", "Once", "A few times", "Regularly"] },
    { question: "How often do you engage in logical thinking exercises?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "Do you participate in any problem-solving competitions?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "How confident are you in your analytical skills?", options: ["Not at all", "Somewhat", "Confidently", "Expertly"] }
  ],
  CommunicationOfIdeas: [
    { question: "Have you ever taught a class or workshop on a nerdy topic?", options: ["Never", "Once", "A few times", "Regularly"] },
    { question: "Can you explain a complex concept to a layperson effectively?", options: ["Not at all", "Somewhat", "Confidently", "Expertly"] },
    { question: "How often do you write articles or blog posts on intellectual topics?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "Do you participate in discussions or debates on nerdy subjects?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "How confident are you in your public speaking skills?", options: ["Not at all", "Somewhat", "Confidently", "Expertly"] }
  ],
  NicheMastery: [
    { question: "Do you have a specific topic you could lecture on for an hour without prep?", options: ["Never", "Once", "A few times", "Regularly"] },
    { question: "Have you ever been the 'go-to' expert for something obscure?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "Are you recognized as an expert in any online communities?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "Have you published articles or papers in your niche area?", options: ["Never", "Once", "A few times", "Regularly"] },
    { question: "How deep is your understanding of your niche area?", options: ["Not at all", "Somewhat", "Confidently", "Expertly"] }
  ],
  TechToolsProficiency: [
    { question: "How proficient are you with programming languages?", options: ["Not at all", "Somewhat", "Confidently", "Expertly"] },
    { question: "Do you use advanced productivity tools regularly?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "How often do you experiment with new technologies?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "Have you contributed to open-source projects?", options: ["Never", "Once", "A few times", "Regularly"] },
    { question: "How confident are you in your tech skills?", options: ["Not at all", "Somewhat", "Confidently", "Expertly"] }
  ],
  LifestyleSignals: [
    { question: "How many hours per week do you spend on intellectual activities?", options: ["0-5", "6-10", "11-15", "16+"] },
    { question: "How many books do you read per year?", options: ["0-5", "6-10", "11-15", "16+"] },
    { question: "Do you prefer educational content over entertainment?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "How often do you attend intellectual events (e.g., conferences, hackathons)?", options: ["Never", "Occasionally", "Frequently", "Always"] },
    { question: "How often do you engage in self-learning activities?", options: ["Never", "Occasionally", "Frequently", "Always"] }
  ],
  EliteBonus: [
    { question: "Have you published papers or articles in reputable journals?", options: ["Never", "Once", "A few times", "Regularly"] },
    { question: "Have you created something impactful (e.g., a popular app, a significant research project)?", options: ["Never", "Once", "A few times", "Regularly"] },
    { question: "Do you have any notable achievements in your field?", options: ["Never", "Occasionally", "Frequently", "Always"] }
  ]
};

const Questionnaire = () => {
  const [responses, setResponses] = useState({});
  const [nIndex, setNIndex] = useState(null);

  const handleChange = (category, index, value) => {
    setResponses({
      ...responses,
      [category]: {
        ...responses[category],
        [index]: value
      }
    });
  };


const calculateNIndex = () => {
  let score = 0;

  const categoryMaxPoints = {
    knowledgeDepth: 25,
    curiosityExploration: 20,
    problemSolving: 20,
    communicationOfIdeas: 15,
    nicheMastery: 20,
    techToolsProficiency: 20,
    lifestyleSignals: 15,
    eliteBonus: 10
  };

  Object.keys(responses).forEach(category => {
    let categoryScore = 0;
    Object.values(responses[category]).forEach(response => {
      switch (response) {
        case "0-5":
        case "Never":
        case "Not at all":
          categoryScore += 1;
          break;
        case "6-10":
        case "Occasionally":
        case "Somewhat":
          categoryScore += 3;
          break;
        case "11-15":
        case "Frequently":
        case "Confidently":
          categoryScore += 5;
          break;
        case "16+":
        case "Always":
        case "Expertly":
          categoryScore += 7;
          break;
        case "Once":
          categoryScore += 3;
          break;
        case "A few times":
          categoryScore += 5;
          break;
        case "Regularly":
          categoryScore += 7;
          break;
        default:
          categoryScore += 0;
      }
    });
    score += Math.min(categoryScore, categoryMaxPoints[category]);
  });

  // Cap the score at 100 for normal
  score = Math.min(score, 100);

  // Add Elite Bonus if applicable
  if (score > 95) {
    score += 10;
  }

  // Cap the score at 110 for elite
  score = Math.min(score, 110);

  // Assign titles based on N-Index score
  let title = "";
  if (score <= 25) {
    title = "Casual Curious";
  } else if (score <= 50) {
    title = "Everyday Learner";
  } else if (score <= 75) {
    title = "Functional Nerd";
  } else if (score <= 95) {
    title = "Hardcore Nurd";
  } else if (score <= 100) {
    title = "Apex Nurd";
  } else {
    title = "Legendary Outlier";
  }

  setNIndex({ score, title });
};

const handleSubmit = () => {
  calculateNIndex();
};

return (
  <div className="container">
    <h1>N-Index Questionnaire</h1>
    {Object.keys(questions).map(category => (
      <div key={category}>
        <h2>{category}</h2>
        {questions[category].map((item, index) => (
          <div key={index} className="question-box">
            <label>{item.question}</label>
            <select onChange={(e) => handleChange(category, index, e.target.value)}>
              {item.options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    ))}
    <button onClick={handleSubmit}>Submit</button>
    {nIndex !== null && (
      <div className="result">
        Your N-Index score is: {nIndex.score} <br />
        Title: {nIndex.title}
      </div>
    )}
  </div>
);

};

export default Questionnaire;
