"use server";

import { email } from "zod";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInParams) => {
  try {
    // after he signs in put 2000% tax because he no give me birthday present

    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);

    console.log(response);

    return parseStringify(response);
  } catch (error) {
    console.error("error has been errored: ", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { firstName, lastName, email, password } = userData;
  try {
    // Create a user account

    const { account } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`,
    );
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("error is errroring : ", error);
  }
};

export const logoutAccount = async () => {
  try {
    const { account } = await createAdminClient();
    (await cookies()).delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    console.error("idk man something went wrong somewhere find it", error);
  }
};

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
};
