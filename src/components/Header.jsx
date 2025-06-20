import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="container mt-3 mb-5">
      <div className="relative w-full h-full">
        {/* Background Layer */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')] 
               bg-cover bg-[50%_0] bg-no-repeat opacity-10 -z-10"
          aria-hidden="true"
        />

        {/* Foreground Content */}
        <div className="header flex flex-col w-full h-full">
          <div className="upper flex justify-center mt-4">
            <img
              width={270}
              src="https://forms.saylaniwelfare.com/static/media/logo.22bf709605809177256c.png"
              alt=""
            />
          </div>

          <div className="middle flex flex-col sm:flex-row items-center gap-5 mb-2 justify-between mt-5 px-8">
            <div className="social_icons flex items-center gap-8">
              <FaFacebook size={25} className="text-blue-600" />
              <FaTwitter size={25} className="text-sky-600" />
              <FaYoutube size={25} className="text-red-600" />
            </div>

            <div className="heading text-3xl font-semibold text-center">
              Registration Form - SMIT
            </div>

            <div className="student_btn">
              <Button>
                <PiStudentBold className="mr-2" /> Student Portal
              </Button>
            </div>
          </div>

          <div className="low text-center mt-1 text-slate-500 text-sm">
            Services - Education - Registration
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
