"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, formatAmount } from "@/lib/utils";

export const BankDropdown = ({
  accounts,
  setValue,
  otherStyles,
}: BankDropdownProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSeclected] = useState(accounts[0]);

  const handleBankChange = (id: string) => {
    const account = accounts.find((account) => account.appwriteItemId === id)!;

    setSeclected(account);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });
    router.push(newUrl, { scroll: false });

    if (setValue) {
      setValue("senderBank", id);
    }
  };

  return (
    <Select
      defaultValue={selected.id}
      onValueChange={(value) => handleBankChange(value)}
    >
      <SelectTrigger
        className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}
      >
        <Image
          src="icons/credit-card.svg"
          width={20}
          height={20}
          alt="account"
        />
        <div className="flex gap-2  items-center  w-full">
          <p className="line-clamp-1">{selected.name}:</p>
          <p className="text-green-700 text-14">{selected.currentBalance}$</p>
        </div>
      </SelectTrigger>
      <div className="relative right-0 w-20 is it here">
        <SelectContent
          className={`w-full bg-white so where is it md:w-[300px] ${otherStyles}`}
          align="end"
        >
          <SelectGroup>
            <SelectLabel className="py-2 font-normal text-gray-500">
              Select a bank to display
            </SelectLabel>
            {accounts.map((account: Account) => (
              <SelectItem
                key={account.id}
                value={account.appwriteItemId}
                className="cursor-pointer border-t"
              >
                <div className="flex flex-col bg-white">
                  <p className="text-16 font-medium ">{account.name}</p>

                  <SelectValue
                    className="text-14 font-medium"
                    placeholder="Select a bank"
                  >
                    {formatAmount(account.currentBalance)}
                  </SelectValue>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </div>
    </Select>
  );
};
