const NewsCard = ({ article }) => {
  return (
    <a href={article.url} target="_blank" className="news-article">
      <img
        src={article.image || "./news-placeholder.png"}
        loading="lazy"
        className="news-image"
      />
      <div className="news-text">
        <h3 className="news-title">{article.title}</h3>
        <p className="news-description">
          {article.description || article.content || "No description available"}
        </p>
      </div>
    </a>
  );
};

export default NewsCard;
