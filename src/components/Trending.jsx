import { useState, useEffect } from "react";
import TrendingRepo from "./TrendingRepo";

const Trending = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    try {
      const url =
        "https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/daily/all.json";

      const req = await fetch(url);
      if (!req.ok) throw new Error(req.status);
      const data = await req.json();
      const slicedData = data.items.slice(0, 3);
      setRepos(slicedData);
    } catch (error) {
      console.error(error);
      setRepos([]);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="module trending-module">
      {isLoading
        ? "Loading trending..."
        : repos
        ? repos.map((e, i) => <TrendingRepo key={i} repo={e} />)
        : "Error while loading trending repos"}
    </div>
  );
};

export default Trending;
