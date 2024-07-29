// components/SendMessageForm.js

"use client";

import { useState, useEffect, useRef } from "react";

const SendMessageForm = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Add welcome message from CosmoGPT
    const welcomeMessage = {
      sender: "bot",
      text: "Hi there, I am here to help you create guidelines for your Cosmo flow",
    };
    setChat([welcomeMessage]);
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat when a new message is added
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChat((prevChat) => [...prevChat, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ params: { input: message } }),
      });

      if (!res.ok) {
        console.error("Error:", res.statusText);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.response };
      setChat((prevChat) => [...prevChat, botMessage]);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    } finally {
      setMessage("");
    }
  };

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900 via-black to-gray-900 animate-bgMove"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-black animate-opacity"></div>
      </div>
      <div className="relative bg-gray-900 shadow-2xl rounded-xl w-full max-w-4xl h-4/5 flex flex-col border-0 ">
        <div className="bg-gray-700 p-4 rounded-t-lg flex items-center justify-between border-b border-gray-600">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-white">
              <img
                src="/c-logo.png"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-white">CosmoGPT</h2>
              <p className="text-sm text-gray-300">Online</p>
            </div>
          </div>
          <button className="text-gray-300 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900 text-gray-300">
          {chat.map((chatItem, index) => (
            <div
              key={index}
              className={`flex mb-4 p-4 rounded-xl ${
                chatItem.sender === "user" ? "flex-row-reverse bg-blue-500 text-white" : "bg-gray-700 text-white"
              } ${chatItem.sender === "user" ? "ml-auto" : ""}`}
              style={{ maxWidth: "80%" }}
            >
              {chatItem.sender === "bot" && (
                <div className="flex-shrink-0">
                  <img
                    src="/c-logo.png"
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              )}
              <div className="ml-3 mr-3">
                {chatItem.sender === "bot" && typeof chatItem.text === "object" ? (
                  <ul className="list-disc list-inside">
                    {Object.entries(chatItem.text).map(([key, value], index) => (
                      <li key={index} className="mb-2">
                        {value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{chatItem.text}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <form onSubmit={handleSubmit} className="flex p-4 bg-gray-700 border-t border-gray-600 rounded-bl-xl rounded-br-xl">
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-200 leading-tight bg-gray-600 focus:outline-none focus:shadow-outline"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 ml-6 rounded-full shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessageForm;
