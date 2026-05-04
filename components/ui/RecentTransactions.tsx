import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import BankItemTab from "./BankItemTab";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-betweem">
        <h2 className="recent-transactions-label">Recent Transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId} className="block! w-full">
        <TabsList className="w-full recent-transactions-tablist">
          {accounts.map((account: Account) => {
            return (
              <TabsTrigger key={account.id} value={`${account.appwriteItemId}`}>
                <BankItemTab
                  account={account}
                  appwriteItemId={appwriteItemId}
                  key={account.id}
                />
              </TabsTrigger>
            );
          })}
        </TabsList>

        {accounts.map((account: Account) => {
          return (
            <TabsContent
              value={account.appwriteItemId}
              key={account.id}
              className="space-y-4 w-full"
            >
              <BankInfo
                account={account}
                type="full"
                appwriteItemId={appwriteItemId}
                key={account.id}
              />
              <TransactionsTable transactions={currentTransactions} />
              {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} />
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
