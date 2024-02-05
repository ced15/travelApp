import React, { useEffect, useState } from "react";
import axios from "axios";

const Discover = () => {
  const [news, setNews] = useState([]);

useEffect(() => {
  const fetchNews = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          // category: "entertainment",
          q: "tourism",
          language: "en",
          apiKey: "ff7f550c1d2a4a209fc2ecb0a3e69ec9",
        },
      });

      console.log("News API Response:", response.data);

      setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  fetchNews();
}, []);

return (
  <div>
    <h2>Travel News</h2>
    <ul>
      {news.map((article) => (
        <li key={article.title}>
          {article.urlToImage && (
            <div>
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{ width: "100px", height: "auto" }}
              />
            </div>
          )}
          <div>
            {article.urlToImage && <strong>{article.title}</strong>}{" "}
            {article.description}
            {article.urlToImage && <br />}
            {article.urlToImage && (
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

};

export default Discover;
