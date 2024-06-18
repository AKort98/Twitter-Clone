import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { FaUpload } from "react-icons/fa";
import { GiFactory } from "react-icons/gi";
import { useQueryClient } from "@tanstack/react-query";

function CreatePost() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const [images, setImages] = useState([]);

  const handlePost = async () => {
    setLoading(true);
    setError("");
    const response = await fetch("/api/posts/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        userRef: currentUser._id,
      }),
    });
    const data = await response.json();
    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setText("");
    console.log(data);
    queryClient.invalidateQueries("posts");
  };

  const handleUpload = () => {
    document.querySelector("input[type=file]").click();
  };

  return (
    <div className="text-white w-full p-4 flex flex-col gap-2 border-b-[1px] border-b-gray-700 ">
      <div className="flex items center gap-2">
        <img
          src={
            currentUser.avatar ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          }
          alt=""
          className="rounded-full size-9"
        />
        <div className="flex flex-col w-full mt-2 text-wrap">
          <textarea
            placeholder="What is happening?!"
            className="bg-transparent focus:outline-none text-xl"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex mt-6 items-end justify-between">
            <div className="flex gap-3 w-1/3 justify-between ">
              <button onClick={handleUpload}>
                <FaUpload className="text-blue-700 cursor-pointer" />
              </button>
              <input type="file" className="hidden" />
              <GiFactory className="text-blue-700 cursor-pointer" />
              <BiPoll className="text-blue-700 cursor-pointer" />
              <FaUpload className="text-blue-700 cursor-pointer" />
            </div>
            <div className="">
              <button
                className="bg-blue-500 px-5 py-1 rounded-3xl disabled:opacity-50"
                disabled={loading || text === ""}
                onClick={handlePost}
              >
                {loading ? "posting" : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
