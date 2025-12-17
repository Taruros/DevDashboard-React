const TrendingRepo = ({ repo }) => {
  return (
    <a
      href={repo.url}
      className="trending-repo"
      target="_blank"
      rel="noopener noreferrer"
    >
      <p className="trending-title">{repo.title}</p>

      <p className="trending-description">{repo.description}</p>

      <p className="trending-language" style={{ color: repo.languageColor }}>
        {repo.language}
      </p>
    </a>
  );
};

export default TrendingRepo;
