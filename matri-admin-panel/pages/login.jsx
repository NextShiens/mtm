import AuthLayout from "@/components/AuthLayout";
import { backendUrl } from "@/url";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";

const Login = () => {
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(backendUrl + "/admin/checkLogin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("Error during checkLogin:", error);
      });
  }, []);

  const handleLogin = () => {
    if (email === "" || password === "") {
      toast.error("Email and password are required");
      return;
    }
    setIsloading(true);
    fetch(backendUrl + "/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsloading(false);
        if (data.error) {
          toast.error(data.error);
        } else if (data.success) {
          router.push("/");
        }
      })
      .catch((error) => {
        setIsloading(false);
        toast.error("An error occurred during login");
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Toaster position="top-center" />
      <div className="w-[97%] sm:w-1/2 lg:w-1/4 flex gap-10 flex-col border p-5 rounded-lg">
        <h1 className="text-xl font-bold">Admin Login</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="Email">Email</label>
          <input
            className="outline-none shadow-sm p-3 rounded-xl w-full border border-gray-200"
            type="text"
            name="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Password">Password</label>
          <input
            className="outline-none shadow-sm p-3 rounded-xl w-full border border-gray-200"
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-navBtnBg-Color text-white p-2 rounded-xl"
          onClick={handleLogin}
        >
          {isLoading ? <LoaderIcon className="mx-auto" /> : "Login"}
        </button>
      </div>
    </div>
  );
};

Login.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Login;
