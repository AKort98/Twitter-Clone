import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiComment, BiHeart, BiRepost, BiSolidHeart } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
function PostDetails() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const paramid = useParams("id");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  console.log(currentUser);
  useEffect(() => {
    const PostDetails = async () => {
      const response = await fetch(`/api/posts/post/` + paramid.id);
      const data = await response.json();
      setPost(data);
    };
    PostDetails();
  }, []);

  useEffect(() => {
    const postComments = async () => {
      const response = await fetch(`/api/posts/post/comments/` + paramid.id);
      const data = await response.json();
      console.log(data);
      setComments(data);
    };
    postComments();
  }, []);
  const dateTime = () => {
    const timestamp = new Date(post.createdAt);
    const day = timestamp.getDate(); // Get the day of the month (1-31)
    const month = timestamp.toLocaleString("default", { month: "short" }); // Get the month (0-11)
    const year = timestamp.getFullYear(); // Get the full year (4-digit)
    const hours = timestamp.getHours(); // Get the hours (0-23)
    const minutes = timestamp.getMinutes(); // Get the minutes (0-59)

    return hours + ":" + minutes + " - " + month + " " + day + ", " + year;
  };
  return (
    <main className="sm:w-[580px] sm:mx-auto sm:border-l-[1px] border-l-gray-700 border-r-gray-700 sm:border-r-[1px]">
      <div className="flex gap-7 items-center p-4">
        <Link to="/home">
          <span>
            <RiArrowGoBackLine className="text-gray-200" />
          </span>
        </Link>
        <span className="text-gray-200 font-extrabold text-xl">Post</span>
      </div>
      {post && (
        <div className="flex flex-col w-full  border-gray-700">
          <div className="mt-4 flex gap-2 items-center px-4 ">
            <img
              src={post.userRef.avatar || "https://picsum.photos/200/200"}
              alt=""
              className="rounded-full size-9"
            />
            <span className="text-gray-200 capitalize font-semibold">
              {post.userRef.username}
            </span>
          </div>
          <div className="px-4">
            <p className="text-[#E7E9EA] mt-2">{post.text}</p>
          </div>
          <small className="text-[#71767B] mt-2 px-4">{dateTime()}</small>
          <div className="text-gray-400 flex items-center justify-between mt-2 border-t-[1px] border-b-[1px] p-2 border-gray-800 px-4">
            <div className="flex items-center gap-1 ">
              <span>
                <BiComment className="size-4" />
              </span>
              <small>52</small>
            </div>
            <div className="flex items-center gap-1 ">
              <span>
                <BiRepost className="size-4" />
              </span>
              <small>52</small>
            </div>
            <div className="flex items-center gap-1 align-middle">
              <button
                onClick={() => {
                  setLiked(!liked);
                  let num = liked ? 1 : -1;
                  setLikes((old) => old + num);
                }}
              >
                {currentUser && liked ? (
                  <BiSolidHeart className="size-4" color="red" />
                ) : (
                  <BiHeart className="size-4" />
                )}
              </button>
              <small>{likes}</small>
            </div>
            <div className="flex items-center gap-1 align-middle">
              <span>
                <BsEye className="size-4" />
              </span>
              <small>{post.likes}</small>
            </div>
          </div>
          <div className="mt-2 flex gap-3 px-4">
            <img
              src={
                currentUser.avatar ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              alt=""
              className="size-8 rounded-full"
            />
            <textarea
              placeholder="Post your reply"
              className="bg-transparent w-full text-gray-200 focus:outline-none placeholder-[#71767B] placeholder:font-semibold mt-1"
            />
          </div>
          <div className="flex justify-end mt-2 border-b-[1px] border-gray-700 px-4">
            <button className="text-white justify-end w-16 bg-blue-700 rounded-2xl mb-2 p-1">
              Reply
            </button>
          </div>
          <div className="flex flex-col">
            {comments &&
              comments.map((comment) => (
                <div
                  className="border-b-[1px] border-gray-700 flex gap-3 py-3 px-4"
                  key={comment._id}
                >
                  <img
                    src={comment.avatar || "https://picsum.photos/200/200"}
                    alt=""
                    className="size-9 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-200 capitalize font-semibold">
                      {comment.userRef.username}
                    </span>
                    <p className="text-[#E7E9EA] mt-2">{comment.content}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default PostDetails;
