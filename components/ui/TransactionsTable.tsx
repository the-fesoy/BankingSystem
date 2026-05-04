import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";
import { transactionCategoryStyles } from "@/constants";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, chipBackgroundColor, textColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;
  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table className="border-separate border-spacing-y-1">
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transactions</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2max-md:hidden">Channel</TableHead>
          <TableHead className="px-2max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date));
          const amount = formatAmount(t.amount);

          const isDebit = t.type === "debit";
          const isCredit = t.type === "credit";

          return (
            <TableRow
              key={t.id}
              className={`${
                isDebit || amount[0] === "-" ? "bg-[#FFFBFA]" : "bg-[#f2f2f267]"
              } !over:bg-none border-none  `}
            >
              <TableCell className="max-w-[250px] py-10 pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  isDebit || amount[0] === "-"
                    ? "text-[#f04438]"
                    : "text-[#039855]"
                }`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>
              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={status} />
              </TableCell>
              <TableCell className="pl-2 pr-10 min-w-32">
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {t.paymentChannel}
              </TableCell>
              <TableCell className="pl-2 pr-10 max-md:hidden">
                <CategoryBadge
                  category={t.category === "" ? "Unknown" : t.category}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
