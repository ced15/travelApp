import React, { useEffect, useState } from "react";
import axios from "axios";
import info from "./info.json";
import state from "../Atom/Atom";
import { useAtom } from "jotai";
import { Carousel, Button } from "flowbite-react";
import { Card } from "flowbite-react";

const Discover = () => {
  const [articles, setArticles] = useState([]);
  const [showFormAndTrip, setShowFormAndTrip] = useAtom(state.currentTrip);

  useEffect(() => {
    setShowFormAndTrip({ state: false });
  }, []);

  useEffect(() => {
    setArticles(info);
  }, []);

  return (
    <div className="bg-[url('/images/mementoTravel.jpg')] min-h-screen bg-cover bg-no-repeat bg-fixed  pt-10 h-full sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {articles.map((article, index) => (
          <Card
            className="max-w-fit max-h-fit"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={article.poza}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {article.titlu}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {article.articol}
            </p>
            <a href={article.link} className="inline-block">
              <Button 
                variant="text" className="flex items-center gap-2">
                Learn More
    
              </Button>
            </a>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default Discover;
