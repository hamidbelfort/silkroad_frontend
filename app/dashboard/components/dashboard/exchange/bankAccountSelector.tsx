import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
};

export function BankAccountSelector({ register }: Props) {
  return (
    <div>
      <Input
        placeholder="Enter or select your bank account"
        {...register("bankAccount")}
      />
    </div>
  );
}
