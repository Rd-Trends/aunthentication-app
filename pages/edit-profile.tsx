import Head from "next/head";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdCameraAlt, MdChevronLeft } from "react-icons/md";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import useUser from "../hooks/useUser";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";

interface formData {
  email: string;
  name: string;
  bio: string;
  phone: string;
  photo?: FileList;
  password?: string | number;
  customError: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("please enter a valid email address")
    .required("Your email address must be provided"),
  password: yup.string(),
  bio: yup.string().min(30).required("please update your bio"),
  phone: yup.string().required("please provide your mobile number"),
  name: yup.string().required("your name must be provided"),
});

export default function EditProfile() {
  const { user, loading, mutate } = useUser();
  const [previewImage, setPreviewImage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<formData>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (!user && !loading) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

  const updateUserInfo = handleSubmit(async (data) => {
    let formData = new FormData();
    Object.keys(data).forEach((key) =>
      formData.append(key, data[key as keyof formData]!)
    );

    formData.append("photo", data!.photo![0]);
    const res = await fetch(`/api/user/${user!._id}`, {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      const data = await res.json();
      mutate(data);
      router.push("/");
    }
  });

  return (
    <>
      <Head>
        <title>Edit your profile</title>
      </Head>
      {user ? (
        <>
          <Navbar />
          <main className="flex flex-col mx-auto max-w-2xl md:justify-center min-h-full my-8 ">
            <Link
              href="/"
              className=" text-lg text-[#2D9CDB] flex space-x-1 items-center ml-4 md:ml-0 "
            >
              <MdChevronLeft size={20} />
              <span>Back</span>
            </Link>

            <div className="w-full md:border border-[#E0E0E0] rounded-xl mt-8 px-4 md:px-10 py-4 md:py-8">
              <div className="mb-6">
                <h1 className=" text-2xl mb-2">Change info</h1>
                <p className=" text-sm font-medium text-[#828282]">
                  Changes will be reflected to every services
                </p>
              </div>

              <form onSubmit={updateUserInfo}>
                <label
                  htmlFor="photo"
                  className="uppercase text-sm font-medium text-[#828282] flex items-center mb-8 cursor-pointer"
                >
                  <div className=" mr-6 relative">
                    <img
                      width={100}
                      height={100}
                      src={
                        previewImage
                          ? previewImage
                          : user?.photo ?? "/photo.png"
                      }
                      className="rounded-lg w-[72px] h-[72px] object-center object-cover"
                      alt=""
                    />
                    <MdCameraAlt
                      className=" absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
                      color="#FFFFFF"
                      size={20}
                    />
                  </div>
                  <input
                    type="file"
                    id="photo"
                    className=" w-[0.1px] h-[0.1px] opacity-0"
                    {...register("photo")}
                    onChange={(e) =>
                      setPreviewImage(URL.createObjectURL(e.target.files![0]))
                    }
                  />
                  change photo
                </label>
                <Input
                  label="name"
                  id="name"
                  {...register("name")}
                  defaultValue={user?.name}
                  className="mb-6 w-full max-w-[420px]"
                  placeholder="Enter your name..."
                />
                {errors?.name && (
                  <p className=" -mt-4 mb-2 text-red-500">
                    {errors.name.message}
                  </p>
                )}
                <Input
                  label="bio"
                  id="bio"
                  tag="textarea"
                  {...register("bio")}
                  defaultValue={user?.bio}
                  className="mb-6 w-full max-w-[420px]"
                  placeholder="Enter your bio..."
                />{" "}
                {errors?.bio && (
                  <p className=" -mt-4 mb-2 text-red-500">
                    {errors.bio.message}
                  </p>
                )}
                <Input
                  label="phone"
                  id="phone"
                  {...register("phone")}
                  defaultValue={user?.phone}
                  className="mb-6 w-full max-w-[420px]"
                  placeholder="Enter your phone..."
                />
                {errors?.phone && (
                  <p className=" -mt-4 mb-2 text-red-500">
                    {errors.phone.message}
                  </p>
                )}
                <Input
                  label="email"
                  id="email"
                  {...register("email")}
                  defaultValue={user?.email}
                  className="mb-6 w-full max-w-[420px]"
                  placeholder="Enter your email..."
                />{" "}
                {errors?.email && (
                  <p className=" -mt-4 mb-2 text-red-500">
                    {errors.email.message}
                  </p>
                )}
                <Input
                  label="password (Not required, except you want to change)"
                  id="password"
                  {...register("password")}
                  placeholder="Enter your new password..."
                  className="mb-6 w-full max-w-[420px]"
                />
                <Button className="px-8">Save</Button>
              </form>
            </div>
          </main>
          <Footer className="max-w-2xl mx-auto pb-8 pt-4 px-4 md:px-0" />
        </>
      ) : null}
    </>
  );
}
