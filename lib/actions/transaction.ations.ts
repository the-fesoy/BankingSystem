"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./appwrite";
import { parseStringify } from "../utils";

export const createTransaction = async (
  transaction: CreateTransactionProps,
) => {
  try {
    const { database } = await createAdminClient();
    console.log("this is the thngy : ", transaction);

    const newTransaction = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: "online",
        category: "Transfer",
        ...transaction,
      },
    );
    console.log("the process succeeded");
    return parseStringify(newTransaction);
  } catch (error) {
    console.error("errorrrrrrrrrrrrr", error);
  }
};
export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  try {
    const { database } = await createAdminClient();
    const senderTransaction = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("senderBankId", bankId)],
    );
    const receiverTransaction = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("receiverBankId", bankId)],
    );
    const transactions = {
      total: senderTransaction.total + receiverTransaction.total,
      documents: [
        ...senderTransaction.documents,
        ...receiverTransaction.documents,
      ],
    };
    return parseStringify(transactions);
  } catch (error) {
    console.error(error);
  }
};
