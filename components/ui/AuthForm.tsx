"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const formSchema = z.object({
    firstName:
      type === "sign-up" ? z.string().min(1).max(50) : z.string().optional(),
    lastName:
      type === "sign-up" ? z.string().min(1).max(50) : z.string().optional(),
    address:
      type === "sign-up" ? z.string().min(1).max(120) : z.string().optional(),
    city:
      type === "sign-up" ? z.string().min(1).max(50) : z.string().optional(),
    state:
      type === "sign-up" ? z.string().min(1).max(50) : z.string().optional(),
    postalCode:
      type === "sign-up" ? z.string().min(5).max(10) : z.string().optional(),
    dateOfBirth:
      type === "sign-up" ? z.string().min(10).max(10) : z.string().optional(),
    ssn: type === "sign-up" ? z.string().min(4).max(4) : z.string().optional(),
    // shared fields
    email: z.string().email(),
    password: z.string().min(8),
  });
  const [isLoading, setisLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      //  shared fields
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setisLoading(true);

    try {
      const userData = {
        email: data.email,
        password: data.password,
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address!,
        city: data.city!,
        dateOfBirth: data.dateOfBirth!,
        postalCode: data.postalCode!,
        ssn: data.ssn!,
        state: data.state!,
      };

      if (type === "sign-up") {
        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        response ? router.push("/") : console.error("Sign in failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="cursor-pointer items-center gap-1 flex">
          <Image
            src={"/icons/logo.svg"}
            height={34}
            width={34}
            alt="Hormozone logo"
          />
          <h1 className="sidebar-logo text-26 font-ibm-plex-serif font-bold text-black-1">
            Hormozone
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4 md:gap-6">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <div className="">
          <form action="" className="" onSubmit={form.handleSubmit(onSubmit)}>
            {type === "sign-up" && (
              <>
                <div className="flex w-full gap-4">
                  <CustomInput
                    description=""
                    form={form}
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your first name"
                    type="text"
                  />

                  <CustomInput
                    description=""
                    form={form}
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your last name"
                    type="text"
                  />
                </div>
                <CustomInput
                  description=""
                  form={form}
                  label="City"
                  name="city"
                  placeholder="Enter your city"
                  type="text"
                />
                <CustomInput
                  description=""
                  form={form}
                  label="Address"
                  name="address"
                  placeholder="Enter your address"
                  type="text"
                />

                <div className="flex w=full gap-4">
                  <CustomInput
                    description=""
                    form={form}
                    label="State"
                    name="state"
                    placeholder="Ex: California"
                    type="text"
                  />
                  <CustomInput
                    description=""
                    form={form}
                    label="Postal Code"
                    name="postalCode"
                    placeholder="Ex: 90210"
                    type="text"
                  />
                </div>
                <div className="flex w-full justify-between gap-4">
                  <CustomInput
                    type="date"
                    description=""
                    form={form}
                    label="Date of Birth"
                    name="dateOfBirth"
                    placeholder="yyyy-mm-dd"
                  />
                  <CustomInput
                    description=""
                    form={form}
                    type="text"
                    label="SSN"
                    name="ssn"
                    placeholder="Ex: 1234"
                  />
                </div>
              </>
            )}
            <CustomInput
              description="Enter your email to continue."
              type="email"
              form={form}
              label="Email"
              name="email"
              key="email"
              placeholder="Enter your email"
            />
            <CustomInput
              description="Enter your password to continue."
              type="password"
              form={form}
              label="Password"
              name="password"
              key="password"
              placeholder="Enter your password"
            />

            <div className="flex flex-col gap-4">
              <Button
                className="form-btn my-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
          <footer className="flex justify-center gap-1">
            <p>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-blue-600 hover:text-blue-800"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </div>
      )}
    </section>
  );
};

export default AuthForm;
