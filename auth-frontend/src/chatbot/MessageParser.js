// src/chatbot/MessageParser.js
import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes("volunteer")) actions.volunteer();
    else if (lower.includes("donate")) actions.donate();
    else if (lower.includes("contact")) actions.contact();
    else if (lower.includes("raj")) actions.raj();
    else if (lower.includes("greet")) actions.greet();
    else if (lower.includes("sameer")) actions.sameer();
    else actions.jpt();
  };

  return React.cloneElement(children, { parse });
};

export default MessageParser;
