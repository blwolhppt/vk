import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './NewsDetail.css';
import Comments from './Comments.js';

const NewsDetail = () => {
  const [newsDetail, setNewsDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/news/${id}/`);
        setNewsDetail(result.data);
      } catch (error) {
        console.error('Ошибка при получении новостей:', error);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric'
    };
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '/') ;
  };

  if (!newsDetail) {
    return (
    <div className="error-message">
      Возникла ошибка! Ведется работа над этим.
    </div>)
  }

  return (
    <div className="container"> 
      <Link to="/" className="home-link">❮ На главную</Link>
      <h3 className="news-name">{newsDetail.name}</h3> 
      <h3 className="news-title">{newsDetail.title}</h3> 
      <p>Ссылка на источник: <a href={newsDetail.href} className="link">{newsDetail.href}</a></p>
      <p className="paragraph">Опубликовано @{newsDetail.author}</p>
      <p className="paragraph">Время публикации новости в оригинальном источнике {formatDate(newsDetail.news_date)}</p>
      <p className="news-content">{newsDetail.content}</p> 
      <Comments newsId={id} />
    </div>
  );
};

export default NewsDetail;
