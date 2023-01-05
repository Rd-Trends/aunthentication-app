import { Inter } from "@next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import UserDetails from "../components/UserDetails";
import useUser from "../hooks/useUser";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, loading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{`${user?.name}'s profile`}</title>
      </Head>
      {user ? (
        <>
          <Navbar />
          <main className="flex flex-col items-center md:justify-center min-h-full my-8">
            <h1 className=" text-4xl mb-2 px-4">Perosnal info</h1>
            <p className="text-lg font-light px-4">
              Basic info, like your name and photo
            </p>
            <UserDetails />
          </main>
          <Footer className="max-w-2xl mx-auto pb-8 pt-4 px-4 md:px-0" />
        </>
      ) : null}
    </>
  );
}
