import HeaderBox from "@/components/ui/HeaderBox";
import RecentTransactions from "@/components/ui/RecentTransactions";
import RightSidebar from "@/components/ui/RightSidebar";
import TotalBalanceBox from "@/components/ui/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async ({ searchParams }: SearchParamProps) => {
  const { id, page } = await searchParams;
  const currentPage = Number(page as string) || 1;

  const user = await getLoggedInUser();

  const accounts = await getAccounts({ userId: user?.$id! });

  if (!accounts) return;

  const appwriteItemId =
    (await (id as string)) || accounts?.data[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={user?.firstName || "Guest"}
            subtext="Access And Manage your accounts and transactions easily"
          />
          <TotalBalanceBox
            accounts={accounts?.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accounts.data}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={user}
        transactions={accounts?.transactions}
        banks={accounts.data?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
