import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";

const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState({});

  async function fetchNews() {
    const timestamp = Date.now();
    const cached = JSON.parse(localStorage.getItem("newsData")) || null;
    if (cached && timestamp - cached.timestamp < 15 * 60 * 1000) {
      return cached.data;
    }

    const url = `https://devdashboard.vercel.app/api/news`;
    const req = await fetch(url);
    if (!req.ok) throw new Error(req.status);
    const news = await req.json();

    localStorage.setItem(
      "newsData",
      JSON.stringify({
        timestamp,
        data: news.articles,
      })
    );

    return news.articles;
  }

  useEffect(() => {
    (async () => {
      const newArticles = await fetchNews();
      setArticles(newArticles);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="module news-module">
      {isLoading
        ? "Loading news..."
        : articles.map((e) => <NewsCard key={e.id} article={e} />)}
    </div>
  );
};

export default News;
