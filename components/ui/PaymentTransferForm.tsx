"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actons";
import { createTransaction } from "@/lib/actions/transaction.ations";
import { decryptId } from "@/lib/utils";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";

import { Field, FieldError, FieldLabel } from "./field";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { BankDropdown } from "./BankDropdown";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(1, "Amount is required"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  sharableId: z.string().min(8, "Please select a valid sharable Id"),
});

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      sharableId: "",
    },
  });

  const submit = async (data: any) => {
    setIsLoading(true);

    try {
      const receiverAccountId = decryptId(data.sharableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };

      const transfer = await createTransfer(transferParams);

      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };
        console.log(senderBank);
        const newTransaction = await createTransaction(transaction);

        if (newTransaction) {
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
      {/* Sender Bank */}
      <Controller
        name="senderBank"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="py-4">
            <FieldLabel>Select Source Bank</FieldLabel>

            <BankDropdown
              accounts={accounts}
              setValue={form.setValue}
              otherStyles="!w-full"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Transfer Note */}
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="py-4">
            <FieldLabel>Transfer Note</FieldLabel>

            <Textarea
              {...field}
              className="input-class"
              placeholder="Write a short note here"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="py-4">
            <FieldLabel>Recipient Email</FieldLabel>

            <Input
              {...field}
              className="input-class"
              placeholder="ex: johndoe@gmail.com"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Sharable ID */}
      <Controller
        name="sharableId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="py-4">
            <FieldLabel>Receiver Plaid Sharable Id</FieldLabel>

            <Input
              {...field}
              className="input-class"
              placeholder="Enter public account number"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Amount */}
      <Controller
        name="amount"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="py-4">
            <FieldLabel>Amount</FieldLabel>

            <Input {...field} className="input-class" placeholder="ex: 5.00" />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Submit */}
      <div className="pt-4">
        <Button type="submit" className="payment-transfer_btn">
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
            </>
          ) : (
            "Transfer Funds"
          )}
        </Button>
      </div>
    </form>
  );
};

export default PaymentTransferForm;
