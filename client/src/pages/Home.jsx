import React from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../jotaiLib/lib";
import OAuth from "../components/OAuth";
import Apple from "../components/Apple";

export default function Home() {
  const currentUser = useAtom(currentUserAtom);
  console.log(currentUser);

  return (
    <main className="flex flex-col p-10 sm:gap-28 sm:flex-row sm:flex sm:mx-auto sm:justify-evenly sm:mt-10 sm:items-center">
      <div className="flex-1 flex justify-center size-12 items-center align-middle sm:size-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="white"
          className="bi bi-twitter-x"
          viewBox="0 0 16 16"
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </svg>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <p className="text-gray-100 text-5xl mt-5 font-extrabold sm:text-7xl">
          Happening Now
        </p>
        <p className="text-gray-100 text-3xl mt-5 font-extrabold">
          Join today.
        </p>
        <div className="flex flex-col gap-2 mt-3 sm:w-1/2">
          <OAuth text={"Sign up with Google"} />
          <Apple />
          <div className="flex items-center text-white w-full gap-2">
            <hr className="flex-1" />
            <div>or</div>
            <hr className="flex-1" />
          </div>
          <div className="flex flex-col gap-1">
            <Link to="/sign-up">
              <button className="bg-[#1D9BF0] w-full rounded-2xl p-2 flex text-white justify-center items-center gap-2 hover:opacity-90 font-semibold">
                Create Account
              </button>
            </Link>

            <small className="text-slate-500 text-[11px]">
              By signing up, you agree to the{" "}
              <span className="text-[#1D9BF0]">Terms of Service</span>
              <span className="text-[#1D9BF0]">Privacy Policy,</span>
              including <span className="text-[#1D9BF0]">Cookie Use.</span>
            </small>
          </div>
        </div>
        <div className=" flex flex-col gap-2 mt-8">
          <div className="text-white font-bold text-xl">
            Already Have an Account?
          </div>
          <Link to="/sign-in">
            <button className="text-[#1D9BF0] border w-full sm:w-1/2 rounded-2xl border-gray-500 p-2 hover:bg-[#1d9cf028]">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
