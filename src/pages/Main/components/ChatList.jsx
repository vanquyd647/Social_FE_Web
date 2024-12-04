import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserChats, setCurrentChatRoom } from '../../../store/slices/chatSlice';

import Navbar from './Navbar';

const ChatList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Lấy dữ liệu từ Redux store
    const { chatRooms, loading, error, userId } = useSelector((state) => state.chats);

    const [refreshing, setRefreshing] = useState(false);

    // Fetch danh sách phòng chat khi component được mount
    useEffect(() => {
        dispatch(getUserChats());
    }, [dispatch]);

    // Xử lý pull-to-refresh
    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getUserChats())
            .unwrap()
            .finally(() => setRefreshing(false));
    }, [dispatch]);

    // Xử lý chọn phòng chat
    const handleSelectChatRoom = (chatRoom) => {
        // Using React Router's navigate hook
    
        // Dispatch action to set the current chat room
        dispatch(setCurrentChatRoom(chatRoom));
    
        // Navigate to the ChatRoom page, passing chatRoomId and userId as query params or route params
        navigate(`/chat-room/${chatRoom._id}/${userId}`, { state: { chatRoomName: chatRoom.displayName } });
    
        // Optional: you can show an alert here as well
        alert(`Chuyển đến phòng chat: ${chatRoom.displayName}`);
    };

    if (loading) return <p>Đang tải danh sách phòng chat...</p>;
    if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>;

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <h2>Danh sách phòng chat</h2>
                <button style={styles.refreshButton} onClick={handleRefresh}>
                    Làm mới
                </button>
                <ul style={styles.chatList}>
                    {chatRooms.map((room) => (
                        <li key={room._id} style={styles.chatRoomItem}>
                            <div style={styles.chatRoomInfo}>
                                <img
                                    src={room.avatar}
                                    alt={room.displayName}
                                    style={styles.avatar}
                                />
                                <span style={styles.chatRoomName}>{room.displayName}</span>
                            </div>
                            <button
                                style={styles.openChatButton}
                                onClick={() => handleSelectChatRoom(room)}
                            >
                                Mở chat
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const styles = {
    container: {
        padding: '1rem',
    },
    refreshButton: {
        marginBottom: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    chatList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    chatRoomItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #ddd',
        marginBottom: '1rem',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    chatRoomInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '1rem',
    },
    chatRoomName: {
        fontSize: '18px',
    },
    openChatButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ChatList;
