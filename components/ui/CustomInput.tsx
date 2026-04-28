import React from "react";
import { Input } from "./input";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";
import { Controller, useForm } from "react-hook-form";
import { UseFormReturn } from "react-hook-form";

interface CustomInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  description: string;
  placeholder: string;
  type?: "text" | "email" | "password" | "date";
}

const CustomInput = ({
  form,
  name,
  label,
  description,
  placeholder,
  type = "text",
}: CustomInputProps) => {
  return (
    <div className="w-full">
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="form-item py-1 ">
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="form-label" htmlFor={field.name}>
                {label}
              </FieldLabel>
              <div className="flex flex-col w-full">
                <Input
                  className="input-class"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={placeholder}
                  autoComplete="off"
                  type={type}
                />
                {/* <FieldDescription className="form-message py-2">
                  {description}
                </FieldDescription> */}
                {fieldState.invalid && (
                  <FieldError
                    className="py-2 text-red-700"
                    errors={[fieldState.error]}
                  />
                )}
              </div>
            </Field>
          </div>
        )}
      />
    </div>
  );
};

export default CustomInput;
