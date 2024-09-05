import NavbarComp from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import { Spin } from "antd";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const Router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
      setLoading(true);
    };

    const handleStop = () => {
      NProgress.done();
      setLoading(false);
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleStop);
    Router.events.on("routeChangeError", handleStop);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleStop);
      Router.events.off("routeChangeError", handleStop);
    };
  }, []);
  console.log(loading);

  return getLayout(
    <>
      {loading ? (
        <div className=" w-full h-screen items-center justify-center relative">
          <Spinner />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

const Spinner = () => {
  return (
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
