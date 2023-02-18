import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed"
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderPosts = () => {
    return posts.map((post) => {
      return (
        <div
          className="post-card"
          key={post.id}
          onClick={() => window.open(post.link, "_blank")}
        >
          <img src={post.featured_media_src_url} alt="" />
          <div className="post-content">
            <h2>{post.title.rendered}</h2>
            <p>{post.excerpt.rendered}</p>
            {post.author ? <p>Author: {post.author.name}</p> : null}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1>Recent Posts</h1>
      <div className="post-container">{renderPosts()}</div>
    </div>
  );
}

export default App;
