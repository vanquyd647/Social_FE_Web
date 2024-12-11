import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage, getMessagesInRoom } from '../../store/slices/messageSlice';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import '../Chat/ChatRoom.css'; 

const ChatRoom = () => {
    const location = useLocation();
    // Use the useParams hook to get route parameters
    const { chatRoomId, userId } = useParams(); 
    const { chatRoomName } = location.state || {};
    const [newMessage, setNewMessage] = useState('');
    const dispatch = useDispatch();
    const { messages, loadingFetch, error } = useSelector((state) => state.messages);

    // Create a ref to scroll to the latest message
    const messagesEndRef = useRef(null);

    // Socket connection
    const socket = io('http://localhost:5559'); 
    // const socket = io('https://social-be-hyzv.onrender.com');

    useEffect(() => {
        // Fetch initial messages when entering the chat room
        dispatch(getMessagesInRoom(chatRoomId));

        // Join the room
        socket.emit('joinRoom', chatRoomId);

        // Listen for new messages
        socket.on('receiveMessage', (message) => {
            dispatch(receiveMessage(message)); // Dispatch message to Redux state
        });

        // Cleanup when component unmounts
        return () => {
            socket.disconnect();
        };
    }, [chatRoomId, dispatch]);

    // Scroll to the end of the messages list when new messages are added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                room_id: chatRoomId,
                sender_id: userId,
                content: newMessage,
                timestamp: new Date(),
            };

            socket.emit('sendMessage', message);
            setNewMessage(''); // Clear the input field
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            {loadingFetch ? (
                <div>Loading...</div>
            ) : error ? (
                <div style={{ color: 'red' }}>Error: {error}</div>
            ) : (
                <div className="message-list">
                    {messages.map((item, index) => {
                        const isSentByCurrentUser = item.sender_id === userId;
                        return (
                            <div
                                key={index}
                                className={`message ${isSentByCurrentUser ? 'sent' : 'received'}`}
                            >
                                <span className="message-text">
                                    {isSentByCurrentUser ? 'You: ' : `${chatRoomName}: `}
                                    {item.content}
                                </span>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} /> {/* Scroll marker */}
                </div>
            )}

            <div className="input-container">
                <input
                    type="text"
                    className="input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
