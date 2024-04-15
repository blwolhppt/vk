import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comments.css';

const Comments = ({ newsId }) => {
  const [comments, setComments] = useState([]);
  const [nickname, setNickname] = useState('');
  const [text, setText] = useState('');
  const [parentCommentId, setParentCommentId] = useState(null);
  const [replyTo, setReplyTo] = useState('');

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/comments/?news=${newsId}`);
      setComments(response.data.results);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      author: nickname,
      text: text,
      news: newsId,
      parent_comment: parentCommentId
    };
    try {
      await axios.post('http://127.0.0.1:8000/api/comments/', data);
      fetchComments();
      setNickname('');
      setText('');
      setParentCommentId(null);
      setReplyTo('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
    setReplyTo('');
  };

  const renderComments = (comments, parentId = null, parentAuthor = null) => {
    return comments
      .filter(comment => comment.parent_comment === parentId)
      .map(comment => (
        <div key={comment.id} style={{ marginLeft: parentId ? '40px' : '0px' }}>
          <p><strong>{comment.author}</strong>: {parentAuthor ? `@${parentAuthor} ${comment.text}` : comment.text}</p>
          <button className="reply-button" onClick={() => {
            setParentCommentId(comment.id);
            setReplyTo(comment.author);
          }}>Ответить</button>
          {renderComments(comments, comment.id, comment.author)}
        </div>
      ));
  };
  
  return (
    <div className="comments-section">
      <h2>Обсуждение ({comments.length})</h2>
      {renderComments(comments)}
      {replyTo && (
        <div>
          <p>Ответ пользователю: @{replyTo}</p>
          <button className="cancel-reply-button" onClick={handleCancelReply}>Отменить ответ</button>
        </div>
      )}
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          className="comment-input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Псевдоним для этого сайта"
          required
        />
        <textarea
          className="comment-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className="comment-submit" type="submit">Оставить комментарий</button>
      </form>
    </div>
  );
};

export default Comments;
