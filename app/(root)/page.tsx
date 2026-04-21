import HeaderBox from "@/components/ui/HeaderBox";
import RightSidebar from "@/components/ui/RightSidebar";
import TotalBalanceBox from "@/components/ui/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {
    firstName: "some n",
    lastName: "igga",
    email: "someni@example.com",
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access And Manage your accounts and transactions easily"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1902393.69}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 190.69 }, { currentBalance: 2000.0 }]}
      />
    </section>
  );
};

export default Home;
