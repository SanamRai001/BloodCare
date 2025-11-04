// src/chatbot/ActionProvider.js
import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleFAQ = (answer) => {
    const message = createChatBotMessage(answer);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  return React.cloneElement(children, {
    actions: {
      greet: () => handleFAQ("Hello! How can I assist you today?"),
      volunteer: () =>
        handleFAQ("Go to the 'Become a Volunteer' page to join."),
      donate: () =>
        handleFAQ("Check the 'Donate Blood' section for nearby camps."),
      contact: () =>
        handleFAQ("Please contact your nearest Red Cross chapter."),
      raj: () =>
        handleFAQ("Raj is a student ,and he always visit lokanthali often"),
      sameer: () => handleFAQ("sameer is a hero a superman"),
      jpt: () => handleFAQ("Please ask a valid query"),
    },
  });
};

export default ActionProvider;
