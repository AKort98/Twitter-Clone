import React, { useEffect, useState } from "react";
import { BsGearFill } from "react-icons/bs";

import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import ReactLoading from "react-loading";
import ForYou from "../components/ForYou";

function Feed() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(5);
  const [end, setEnd] = useState(true);

  console.table(posts);
  //console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      const res = await fetch(`/api/user/get-friends-posts/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setPosts(data);
      if (data.length < 5) {
        setEnd(true);
        return;
      }
      setEnd(false);
    };
    fetchPosts();
  }, []);
  const handleShowmore = async () => {
    setEnd(true);
    setMoreLoading(true);
    const res = await fetch(
      `/api/user/get-friends-posts/${currentUser._id}?offset=${offset}`
    );
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      setMoreLoading(false);
      return;
    }
    setMoreLoading(false);
    setPosts((prevPosts) => [...prevPosts, ...data]);
    setOffset((prevOffset) => prevOffset + 5);
    if (data.length < 5) {
      setEnd(true);
      return;
    }
    setEnd(false);
  };
  return (
    <>
      {currentUser && (
        <header className="flex justify-between px-4 mt-3 items-center">
          <img
            alt=""
            src={
              currentUser.avatar ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            className="rounded-full size-8 sm:hidden"
          />
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              className="bi bi-twitter-x sm:hidden"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </div>
          <BsGearFill className="text-white size-4 sm:hidden" />
        </header>
      )}
      <main className="pb-12 sm:pb-0 sm:w-1/2 sm:mx-auto sm:border-l-[1px] border-l-gray-700 border-r-gray-700 sm:border-r-[1px]">
        <div>
          <ForYou />
        </div>
        <div className="hidden sm:inline">
          <CreatePost />
        </div>
        {loading ? (
          <div className="flex justify-center w-full p-5">
            <ReactLoading type="spinningBubbles" color="#1D9BF0" width={30} />
          </div>
        ) : (
          ""
        )}
        {posts.length > 0 && <Post posts={posts} />}
        <div className="flex justify-center">
          <button
            className="text-blue-700 font-semibold justify-center mt-5 mb-5 w-24 p-1 rounded-2xl"
            onClick={handleShowmore}
            hidden={end}
          >
            Show more
          </button>
          {moreLoading ? (
            <div className="flex justify-center w-full p-5">
              <ReactLoading type="spinningBubbles" color="#1D9BF0" width={30} />
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
      <div className="sm:hidden">
        <Navbar />
      </div>
    </>
  );
}

export default Feed;
