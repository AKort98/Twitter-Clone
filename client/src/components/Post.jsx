import React from "react";
import { BiComment, BiHeart, BiRepost } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";

function Post({ post }) {
  const time = (timestamp) => {
    const dateofTweet = new Date(timestamp);
    const currentTimestamp = new Date(); // Current time
    const differenceInMilliseconds = currentTimestamp - dateofTweet;
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / (1000 * 60)
    );
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays > 1) {
      return differenceInDays + "d";
    }
    if (differenceInMinutes > 60) {
      return differenceInHours + "h";
    }
    if (differenceInMinutes < 1) {
      return "now";
    }
    return differenceInMinutes + "m";
  };

  const randomavatar = () => {
    return "https://picsum.photos/200/200?random";
  };

  return (
    <div
      to={`/post/${post._id}`}
      className="flex gap-3 border-b-[1px] p-4 box-border border-b-gray-600 hover:bg-[#111111af] cursor-pointer"
      key={post._id}
    >
      <Link to={`/${post.userRef.username}`}>
        <img
          src={post.userRef.avatar || randomavatar()}
          alt=""
          className="rounded-full size-9 hover:opacity-75"
        />
      </Link>
      <Link to={`/post/${post._id}`} className="flex flex-col w-full">
        <div className="flex items-baseline gap-2">
          <span className="text-gray-200 font-extrabold capitalize text-lg">
            {post.userRef.username}
          </span>
          <small className="text-gray-500 text-[15px]">
            {time(post.createdAt)}
          </small>
        </div>
        <span className="text-gray-200">{post.text}</span>
        <div className="text-gray-400 flex items-center justify-between mt-2 ">
          <div className="flex items-center gap-1">
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
            <span>
              <BiHeart className="size-4" />
            </span>
            <small>{post.likes}</small>
          </div>
          <div className="flex items-center gap-1 align-middle">
            <span>
              <BsEye className="size-4" />
            </span>
            <small>{post.likes}</small>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Post;
