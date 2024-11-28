import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Peer from "peerjs";

const socket = io("http://localhost:5000"); // Update with your backend URL

const DoctorChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [doctorPeerId, setDoctorPeerId] = useState("");
  const videoRef = React.useRef(null);
  const peer = React.useRef(null);

  // Connect to PeerJS
  useEffect(() => {
    peer.current = new Peer();
    peer.current.on("open", (id) => {
      setPeerId(id);
      socket.emit("join-room", { peerId: id });
    });

    peer.current.on("call", (call) => {
      call.answer();
      call.on("stream", (remoteStream) => {
        videoRef.current.srcObject = remoteStream;
      });
    });

    return () => {
      peer.current.destroy();
    };
  }, []);

  // Listen for chat messages
  useEffect(() => {
    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chat-message", message);
      setMessages((prev) => [...prev, { user: "You", text: message }]);
      setMessage("");
    }
  };

  const startVideoCall = () => {
    setIsVideoCall(true);
    socket.emit("request-video-call", peerId);

    socket.on("accept-video-call", (doctorId) => {
      setDoctorPeerId(doctorId);
      const call = peer.current.call(doctorId, videoRef.current.srcObject);
      call.on("stream", (remoteStream) => {
        videoRef.current.srcObject = remoteStream;
      });
    });
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg w-72">
      <div className="p-4">
        <h2 className="text-lg font-bold">Chat with Doctor</h2>
        <div className="h-48 overflow-y-auto border border-gray-200 p-2 mb-2">
          {messages.map((msg, index) => (
            <div key={index} className={msg.user === "You" ? "text-right" : ""}>
              <p>
                <strong>{msg.user}: </strong>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow border border-gray-300 p-1 rounded"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Send
          </button>
        </div>
        <button
          onClick={startVideoCall}
          className="mt-2 bg-green-500 text-white px-4 py-1 rounded w-full"
        >
          Start Video Call
        </button>
        {isVideoCall && (
          <video
            ref={videoRef}
            autoPlay
            className="mt-4 border border-gray-300 rounded w-full"
          />
        )}
      </div>
    </div>
  );
};

export default DoctorChat;
