"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { PlaidLinkOnSuccess, usePlaidLink } from "react-plaid-link";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, settoken] = useState("");
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      settoken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);
  const router = useRouter();
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/");
    },
    [user],
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          disabled={!ready}
          onClick={() => {
            open();
          }}
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          className="plaidlink-ghost"
          variant={"ghost"}
          onClick={() => {
            open;
          }}
        >
          <Image
            src="/icons/connect-bank.svg"
            width={24}
            height={24}
            alt="connect bank"
          />
          <p className="font-semibold text-[16px] hidden! xl:block text-black-2">
            Connect Bank
          </p>
        </Button>
      ) : (
        <Button
          onClick={() => {
            open();
          }}
          className="plaidlink-default ml-1"
        >
          <Image
            src="/icons/connect-bank.svg"
            width={24}
            height={24}
            alt="connect bank"
          />
          <p className="font-semibold text-[16px] text-gray-700">
            Connect Bank
          </p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
