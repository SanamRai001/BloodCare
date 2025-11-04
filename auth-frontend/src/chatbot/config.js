// src/chatbot/config.js
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "BloodBot 🤖",
  initialMessages: [
    createChatBotMessage("Hi! I'm BloodBot. Ask me about volunteering, donating blood, or contacting Red Cross.")
  ],
  customStyles: {
    botMessageBox: { backgroundColor: "#d92332" },
    chatButton: { backgroundColor: "#d92332" },
  },
};

export default config;
