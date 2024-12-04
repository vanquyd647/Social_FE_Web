import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk, createPostThunk, likePostThunk, addCommentThunk } from '../../../store/slices/postSlice';
import '../css/Newsfeed.css'; // Import the CSS file
import { uploadImageAsync } from "../../../components/uploadImage";
import Navbar from './Navbar';

const Newsfeed = () => {
    const dispatch = useDispatch();
    const { posts = [], loading, error } = useSelector((state) => state.posts);  // Ensure posts is an array by default

    const [newPostContent, setNewPostContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comment, setComment] = useState('');
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const avatarPost = "https://firebasestorage.googleapis.com/v0/b/red89-f8933.appspot.com/o/Social_app%2Favatar.png?alt=media&token=081b5305-d9eb-4dc1-86ad-e9e106758550";


    useEffect(() => {
        dispatch(getPostsThunk());
    }, [dispatch]);

    const handleCreatePost = async () => {
        if (isPosting) return; // Ngăn việc nhấn nhiều lần

        if (!newPostContent && !selectedFile) {
            alert('Please enter content or select an image/video.');
            return;
        }

        setIsPosting(true); // Bắt đầu xử lý

        let fileUrl = null;
        if (selectedFile) {
            fileUrl = await uploadImageAsync(selectedFile);
        }

        const postData = {
            content: newPostContent,
            media_urls: fileUrl ? [fileUrl] : [],
        };

        try {
            await dispatch(createPostThunk(postData));
            setNewPostContent('');
            setSelectedFile(null);
            setIsPostModalOpen(false);
            dispatch(getPostsThunk());
        } catch {
            alert('Failed to create the post.');
        } finally {
            setIsPosting(false); // Kết thúc xử lý
        }
    };


    const handleLikePost = async (postId) => {
        await dispatch(likePostThunk({ postId, userId: 'user_id' }));
        dispatch(getPostsThunk());
    };

    const handleAddComment = async (postId) => {
        if (!comment.trim()) {
            alert('Please enter a comment.');
            return;
        }

        const commentData = { content: comment };
        try {
            await dispatch(addCommentThunk({ postId, commentData }));
            setComment('');
            setSelectedPost(null);
            setIsCommentModalOpen(false);
            dispatch(getPostsThunk());
        } catch {
            alert('Failed to add comment.');
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    return (
        <>
            <Navbar />
            <div className='MainNF'>
                <div className="newsfeed-container">
                    <h1>Newsfeed</h1>

                    {/* Create Post Section */}
                    <button className="create-post-button" onClick={() => setIsPostModalOpen(true)}>
                        Create Post
                    </button>

                    {/* Posts List */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        [...posts]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((post) => (
                                <div key={post._id} className="post-container">
                                    <div className="post-header">
                                        <img
                                            src={post.author_id.avatar_url || avatarPost} // Hiển thị avatar hoặc ảnh mặc định nếu không có
                                            alt={`${post.author_id.username}'s avatar`}
                                            className="avatar"
                                        />
                                        <h3>{post.author_id.username}</h3>
                                    </div>
                                    <p>{post.content}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {post.media_urls?.length > 0 &&
                                            (post.media_urls[0].endsWith('.mp4') ? (
                                                <video controls className="post-media">
                                                    <source src={post.media_urls[0]} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <img
                                                    src={post.media_urls[0]}
                                                    alt="Post media"
                                                    className="post-media"
                                                />
                                            ))}
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>
                                        <button className="like-button" onClick={() => handleLikePost(post._id)}>
                                            Like ({post.likes.length})
                                        </button>
                                        <button
                                            className="comment-button"
                                            onClick={() => {
                                                setSelectedPost(post);
                                                setIsCommentModalOpen(true);
                                            }}
                                        >
                                            Comment ({(post.comments?.length || 0)})
                                        </button>
                                    </div>
                                </div>
                            ))
                    )}


                    {/* Create Post Modal */}
                    {isPostModalOpen && (
                        <div className="modal-background">
                            <div className="modal-content">
                                <h2>Create Post</h2>
                                <textarea
                                    className="textarea"
                                    placeholder="What's on your mind?"
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                />
                                <input className="file-input" type="file" onChange={handleFileChange} />
                                {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                                <div className="modal-buttons">
                                    <button
                                        className="post-button"
                                        onClick={handleCreatePost}
                                        disabled={isPosting} // Vô hiệu hóa nút khi đang xử lý
                                    >
                                        {isPosting ? 'Posting...' : 'Post'}
                                    </button>
                                    <button className="cancel-button" onClick={() => setIsPostModalOpen(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Comment Modal */}
                    {isCommentModalOpen && selectedPost && (
                        <div className="modal-background">
                            <div className="modal-content">
                                <h2>Comments</h2>
                                <ul>
                                    {(selectedPost.comments || []).map((comment, index) => (
                                        <li key={index} style={{ marginBottom: '0.5rem' }}>
                                            <strong>{comment.author_id?.username || 'Anonymous'}:</strong> {comment.content}
                                        </li>
                                    ))}
                                </ul>
                                <textarea
                                    className="textarea"
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <div className="modal-buttons">
                                    <button className="post-button" onClick={() => handleAddComment(selectedPost._id)}>
                                        Add Comment
                                    </button>
                                    <button className="close-button" onClick={() => setIsCommentModalOpen(false)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Newsfeed;
