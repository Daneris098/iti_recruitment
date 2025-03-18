import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import bg from '@assets/bg.png'; 


export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="bg-cover bg-center object-fill h-full w-full flex overflow-hidden " >
      <img
        src="bg.png "
        className="hidden sm:block  w-full h-full absolute object-fill z-10"
        alt="bg"
      />
      <div className="h-full w-full sm:w-1/2 gap-8  flex flex-col sm:justify-between  z-20 p-16 2xl:p-16 pt-6  2xl:pt-6 ">
        <img src="logo.png " className="w-36 2xl:w-48" alt="bg" />

        <div className="flex flex-col gap-12 sm:pt-0  sm:gap-8 2xl:gap-12  h-full sm:h-auto justify-center">
          <p className="2xl:text-6xl text-4xl text-gray-600 max-w-[25rem] 2xl:max-w-[45rem] font-semibold">
            Your Next Career Move Starts Here!
          </p>
          <p className="2xl:text-2xl text-gray-500 max-w-[25rem] 2xl:max-w-[40rem]">
            Looking for a new opportunity? At HRDotNet, we connect talented
            individuals like you with top companies.
          </p>
          <Button
            className=" w-full sm:w-1/3 h-10 2xl:h-14 rounded-md br-gradient border-none"
            onClick={() => {
              navigate("/vacancyList");
            }}
          >
            Search Jobs
          </Button>
        </div>
        <div className="hidden sm:block"></div>
      </div>

      <div className="hidden sm:block h-full w-1/2 z-30 ">
        <img
          src="person.png "
          className="  object-fill h-full w-full z-20 ml-32 py-16"
          alt="bg"
        />
      </div>
    </div>
  );
}
