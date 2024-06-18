import React, { useEffect } from "react";
import { BsGearFill } from "react-icons/bs";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import ReactLoading from "react-loading";
import ForYou from "../components/ForYou";
import LogoX from "../components/LogoX";
import PostList from "../components/PostList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Sidebar from "../components/Sidebar";

function Feed() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam = 0 }) => {
    const res = await fetch(
      `/api/user/get-friends-posts/${currentUser._id}?offset=${pageParam}`
    );
    const data = await res.json();
    return data;
  };

  const {
    data: queriedPosts,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      const end = lastPage.end;
      return end ? undefined : lastPage.nextOffset;
    },
  });
  console.log(queriedPosts);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      {currentUser && (
        <header className="flex justify-between p-4 items-center sm:p-0 sm:hidden">
          <img
            alt=""
            src={
              currentUser.avatar ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            className="rounded-full size-8 sm:hidden"
          />
          <LogoX size={8} />
          <BsGearFill className="text-white size-4 sm:hidden" />
        </header>
      )}
      <main className="md:flex justify-center ">
        <div className="pb-12 sm:pb-0 md:border-l-[1px] border-l-gray-700 border-r-gray-700 sm:border-r-[1px] md:w-1/2 ">
          <div>
            <ForYou />
          </div>
          <div className="hidden sm:block">
            <CreatePost />
          </div>
          {isLoading ? (
            <div className="flex justify-center w-full p-5">
              <ReactLoading type="spinningBubbles" color="#1D9BF0" width={30} />
            </div>
          ) : (
            ""
          )}
          {queriedPosts && <PostList pages={queriedPosts.pages} />}
          {isFetchingNextPage ? (
            <div className="flex justify-center w-full p-5">
              <ReactLoading type="spinningBubbles" color="#1D9BF0" width={30} />
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-center" ref={ref}></div>
        </div>
        <div className=""></div>
      </main>

      <Navbar />
    </>
  );
}

export default Feed;
