import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import info from "./info.json";

const Discover = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(info);
  }, []);

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {articles.map((article, index) => (
          <div key={index} className="max-h-fit">
            <h2>{article.titlu}</h2>
            <img className=" relative max-h-fit" src={article.poza} />
            <p>{article.articol}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Discover;
