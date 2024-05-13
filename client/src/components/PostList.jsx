import React from "react";
import Post from "./Post";

function PostList({ pages }) {
  return (
    <div className="flex flex-col">
      {pages.map((page) =>
        page.tweets.map((tweet) => <Post post={tweet} key={tweet._id} />)
      )}
    </div>
  );
}

export default PostList;
