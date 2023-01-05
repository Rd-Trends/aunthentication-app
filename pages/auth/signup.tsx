import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import * as yup from "yup";

import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
import useUser from "../../hooks/useUser";

interface formData {
  email: string;
  password: string | number;
  customError: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("please enter a valid email address")
      .required("Your email address must be provided"),
    password: yup
      .string()
      .min(6, "Password length must be greater than six")
      .required("Please enter your password"),
  })
  .required();

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<formData>({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user, mutate } = useUser();

  const handleSignup = handleSubmit(async (data) => {
    setLoading(true);
    clearErrors("customError");
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const user = await response.json();
      setLoading(false);
      mutate(user);
      router.push("/");
    }
    if (response.status >= 400) {
      const err = await response.json();
      setLoading(false);
      setError("customError", { type: "custom", message: err.message });
    }
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Register an account</title>
      </Head>
      <div className=" flex flex-col md:items-center md:justify-center min-h-screen md:py-6 ">
        <main className=" md:border md:border-[#BDBDBD] rounded-3xl px-4 py-8 md:p-12 md:w-[500px]">
          <Logo />
          <p className=" font-semibold text-lg mt-6 mb-4">
            Join thousands of learners from around the world
          </p>
          <p className=" font-normal mb-6">
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
          <form action="" className="w-full" onSubmit={handleSignup}>
            <div className="flex items-center w-full border border-[#BDBDBD] rounded-lg mb-4">
              <span className="pl-4 py-1">
                <MdEmail color="#828282" size={20} />
              </span>
              <input
                type="email"
                placeholder="Email"
                className="w-11/12 py-3 px-4 outline-none border-none"
                {...register("email")}
              />
            </div>
            {errors?.email && (
              <p className=" -mt-4 mb-2 text-red-500">{errors.email.message}</p>
            )}

            <div className="flex items-center w-full border border-[#BDBDBD] rounded-lg mb-4">
              <span className="pl-4 py-1">
                <MdLock color="#828282" size={20} />
              </span>
              <input
                type="text"
                placeholder="Password"
                className="w-11/12 py-3 px-4 outline-none border-none"
                {...register("password")}
              />
            </div>
            {errors?.password && (
              <p className=" -mt-4 mb-2 text-red-500">
                {errors.password.message}
              </p>
            )}

            <Button className="font-semibold w-full" loading={loading}>
              start coding now
            </Button>
            {errors?.customError && (
              <p className=" mt-2 text-red-500">
                {errors?.customError?.message}
              </p>
            )}
          </form>

          <p className="pt-8 pb-6 text-center ">
            or continue with these social profile
          </p>

          <div className="flex items-center space-x-4 justify-center">
            <Link href="/api/auth/google">
              <Image src="/Google.svg" alt="" width={40} height={40} />
            </Link>
            <Link href="/api/auth/facebook">
              <Image src="/Facebook.svg" alt="" width={40} height={40} />
            </Link>
            <Link href="/api/auth/twitter">
              <Image src="/Twitter.svg" alt="" width={40} height={40} />
            </Link>
            <Link href="/api/auth/github">
              <Image src="/Gihub.svg" alt="" width={40} height={40} />
            </Link>
          </div>

          <p className="mt-6 text-center">
            Adready a member?{" "}
            <Link href="/auth/login" className="text-[#2D9CDB]">
              Login
            </Link>
          </p>
        </main>
        <Footer className="py-8 px-4 md:w-[500px] md:px-0 md:py-4" />
      </div>
    </>
  );
};

export default Signup;
