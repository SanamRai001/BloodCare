import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import Draggable from "react-draggable";
import "react-chatbot-kit/build/main.css";

import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
      {open && (
        <Draggable handle=".chatbot-header">
          <div className="chatbot-box shadow-lg rounded" style={{ width: 300 }}>
            <div className="chatbot-header bg-danger text-white p-2 cursor-move rounded-top">
              BloodBot
              <button
                onClick={() => setOpen(false)}
                className="btn btn-sm btn-light float-end"
              >
                ✖
              </button>
            </div>
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </div>
        </Draggable>
      )}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="btn btn-danger rounded-circle"
          style={{ width: 60, height: 60 }}
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
