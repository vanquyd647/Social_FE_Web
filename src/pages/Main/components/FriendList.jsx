import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getFriendsList,
    searchUsers,
    sendFriendRequest,
    getSentRequests,
    getReceivedRequests,
    acceptFriendRequest,
    removeFriend
} from '../../../store/slices/friendSlice';
import { createChatRoom } from '../../../store/slices/chatSlice';
import Navbar from './Navbar';

const FriendList = () => {
    const dispatch = useDispatch();
    const { friends, users, sentRequests, receivedRequests, loading, error } = useSelector(state => state.friends);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch friends, sent, and received requests on component mount
        dispatch(getFriendsList());
        dispatch(getSentRequests());
        dispatch(getReceivedRequests());
    }, [dispatch]);

    const handleChat = async (friendId) => {
        // Create a chat room with the selected friend
        const chatData = {
            members: [friendId], // Assuming the current user ID is automatically added
        };

        // Dispatch the action to create the chat room
        await dispatch(createChatRoom(chatData));
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            dispatch(searchUsers(searchQuery));
            console.log('dispatched searchUsers', searchQuery);
        }
    };

    const handleSendRequest = (userId) => {
        dispatch(sendFriendRequest(userId)).then(() => {
            dispatch(getFriendsList());
            dispatch(getSentRequests());
            dispatch(getReceivedRequests());
        });
    };

    const handleAcceptRequest = (userId) => {
        dispatch(acceptFriendRequest(userId)).then(() => {
            dispatch(getFriendsList());
            dispatch(getSentRequests());
            dispatch(getReceivedRequests());
            handleChat(userId);
        });
    };

    const handleRemoveRequest = (userId) => {
        dispatch(removeFriend(userId)).then(() => {
            dispatch(getFriendsList());
            dispatch(getSentRequests());
            dispatch(getReceivedRequests());
        });
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: '1rem' }}>
                <h2>Friends</h2>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
                />

                {/* Search Results */}
                {searchQuery && (
                    <div>
                        <h3>Search Results:</h3>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                                {users.map(user => (
                                    <li key={user._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{user.username || user.email}</span>
                                        <button onClick={() => handleSendRequest(user._id)}>Add</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* Received Requests */}
                <div>
                    <h3>Received Requests:</h3>
                    <ul>
                        {receivedRequests.map(request => (
                            <li key={request._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{request.username}</span>
                                <div>
                                    <button onClick={() => handleAcceptRequest(request._id)}>Accept</button>
                                    <button onClick={() => handleRemoveRequest(request._id)}>Decline</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sent Requests */}
                <div>
                    <h3>Sent Requests:</h3>
                    <ul>
                        {sentRequests.map(request => (
                            <li key={request._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{request.username}</span>
                                <button onClick={() => handleRemoveRequest(request._id)}>Cancel</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Friends */}
                <div>
                    <h3>Your Friends:</h3>
                    <ul>
                        {friends.map(friend => (
                            <li key={friend._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                {/* Avatar */}
                                <img
                                    src={friend.avatar_url || 'default-avatar.jpg'}
                                    alt={friend.username || "No username"}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
                                />
                                {/* Friend Info */}
                                <div>
                                    <h4 style={{ margin: 0 }}>{friend.username || friend.email}</h4>
                                    <p style={{ margin: 0, color: 'gray' }}>{friend.bio}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Error Display */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
};

export default FriendList;
