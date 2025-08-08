import React, { useState, useEffect } from "react";
import "../App.css";

const Card = ({ category }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");    
  const [debouncedSearch, setDebouncedSearch] = useState(""); 

  const apikey = import.meta.env.VITE_NEWS_API;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (!apikey) {
      setError("Missing API key (VITE_NEWS_API). Put it in your .env and restart dev server.");
      setNews([]);
      return;
    }

    setLoading(true);
    setError(null);
},[apikey])

    
useEffect(() => {
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}`;

  if (category) url += `&category=${category}`;
  if (debouncedSearch) url += `&q=${debouncedSearch}`;

  fetch(url)
    .then(res => res.json())
    .then(data => setNews(data.articles || []))
    .catch(err => {
      console.error(err);
      setNews([]);
    });
}, [category, debouncedSearch]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setDebouncedSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm("");
    setDebouncedSearch("");
  };

  return (
    <div className="news-container">
      <h2>
        Latest <span className="badge text-bg-primary">{category || "Top"}</span>
      </h2>

      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search articles"
        />
        <button type="submit" className="search-btn">Search</button>
        <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
      </form>

      {loading && <div className="notice">Loading...</div>}
      {error && <div className="notice error">Error: {error}</div>}

      {!loading && !error && news.length === 0 && (
        <div className="notice">
          No articles found{debouncedSearch ? ` for "${debouncedSearch}"` : ""}.
        </div>
      )}

      <div className="news-grid">
        {news.map((n, idx) => (
          <article key={n.url || idx} className="news-card">
            <img
              src={n.urlToImage || "/default.jpg"}
              alt={n.title}
              className="news-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/default.jpg";
              }}
            />
            <div className="news-content">
              <h3>{n.title}</h3>
              <p>{n.description || "No description available."}</p>
              <a href={n.url} target="_blank" rel="noopener noreferrer" className="news-btn">
                Read More
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Card;
