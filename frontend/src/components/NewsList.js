import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './NewsList.css';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [canGoPrevious, setCanGoPrevious] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  const fetchData = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/api/news/?page=${currentPage}`);
    setNews(result.data.results);
    setCanGoPrevious(result.data.previous !== null);
    setCanGoNext(result.data.next !== null);
  };

  useEffect(() => {
    fetchData(); 
    const interval = setInterval(() => {
      fetchData(); 
    }, 60000);
    return () => clearInterval(interval);
  }, 
  [currentPage]); 

  const handlePositiveRating = async (id) => {
    await axios.post(`http://127.0.0.1:8000/api/news/${id}/add_positive_rating/`);
    const updatedNews = news.map(item => {
      if (item.id === id) {
        item.rating_positive += 1;
      }
      return item;
    });
    setNews(updatedNews);
  };

  const handleNegativeRating = async (id) => {
    await axios.post(`http://127.0.0.1:8000/api/news/${id}/add_negative_rating/`);
    const updatedNews = news.map(item => {
      if (item.id === id) {
        item.rating_negative += 1;
      }
      return item;
    });
    setNews(updatedNews);
  };

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

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };
  
  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="container">
      <ul>
      <div className="button-container">
        <button className="button" onClick={handleRefresh}>⭮</button>
      </div>
        {news.map(item => (
          <li key={item.id} className="news-item">
            <Link to={`/news/${item.id}`} className="link">
              <h3 className="heading">{item.name}</h3>
            </Link>            
            <div className="rating-container">
              <p className="rating" onClick={() => handlePositiveRating(item.id)}>
                <span role="img" aria-label="thumbs-up">👍</span> {item.rating_positive}
              </p>
              <p className="rating" onClick={() => handleNegativeRating(item.id)}>
                <span role="img" aria-label="thumbs-down">👎</span> {item.rating_negative}
              </p>
            </div>
            <p className="paragraph">Опубликовано @{item.author} {formatDate(item.pub_date)}</p>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button className="button" onClick={goToPreviousPage} disabled={!canGoPrevious}>{`◄ `}</button>
        <h3 className="page-number">{currentPage}</h3>
        <button className="button" onClick={goToNextPage} disabled={!canGoNext}>{` ►`}</button>
      </div>
    </div>
  );
};

export default NewsList;
