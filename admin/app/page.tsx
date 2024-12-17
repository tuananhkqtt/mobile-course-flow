"use client";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import Verification from "./components/Auth/Verification";
import Heading from "./utils/Heading";

interface Props { }

const Page: FC<Props> = (props) => {
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  // useEffect(() => {
  //   if (user) {
  //     redirect("/admin");
  //   }
  // }, [user]);

  return (
    <div>
      <Heading
        title="CourseFlow - Admin"
        description="CourseFlow is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <div className="w-[90%] md:w-[420px] m-auto h-screen flex items-center justify-center">
        {route === "Login" && <Login setRoute={setRoute} />}
        {route === "Sign-up" && <Signup setRoute={setRoute} />}
        {route === "Verification" && <Verification setRoute={setRoute} />}
      </div>
    </div>
  );
};

export default Page;
