import { useState, useEffect } from "react";
import axios from "axios";

export default function ChatBox({ appointments, setAppointments }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input,
        session_id: "default",
      });

      const botMessage = { sender: "bot", text: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
      
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: Cannot connect to server." }]);
    }
  };

  return (
<div className="chat-box w-full max-w-xl bg-blue-50 rounded-xl shadow-lg p-5 flex flex-col">
  <h3 className="text-3xl font-bold font-sans mb-2 text-center text-gray-800 bg-red-200 rounded-lg px-2 py-1 mx-auto">
    Chat with AI
  </h3>

  {/* Chat history */}
  <div className="chat-history flex-1 flex flex-col overflow-y-auto mb-4 space-y-2">
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`message max-w-[48%] px-4 py-2 rounded-lg break-words ${
          msg.sender === "user"
            ? "bg-blue-500 text-white self-end"
            : "bg-green-300 text-black self-start"
        }`}
      >
        {msg.text}
      </div>
    ))}
  </div>

  {/* Input area */}
  <div className="input-area flex gap-2">
    <input
      type="text"
      placeholder="Type a command..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      onClick={sendMessage}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
    >
      Send
    </button>
  </div>
</div>
  );
}
