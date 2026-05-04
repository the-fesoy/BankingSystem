import BankCard from "@/components/ui/BankCard";
import HeaderBox from "@/components/ui/HeaderBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const page = async ({ searchParams }: SearchParamProps) => {
  const { id, page } = await searchParams;
  const currentPage = Number(page as string) || 1;

  const user = await getLoggedInUser();

  const accounts = await getAccounts({ userId: user?.$id! });

  if (!accounts) return;

  const appwriteItemId =
    (await (id as string)) || accounts?.data[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities"
        />
        <div className="space-y-4">
          <h2 className="header-2">your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((a: Account) => {
                return (
                  <BankCard
                    account={a}
                    userName={`${user?.firstName} ${user?.lastName}`}
                    key={a.id}
                    showBalance={true}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
