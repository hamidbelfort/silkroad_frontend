import BankAccountForm from "../components/dashboard/customer/bankAccountForm";
import BankAccountList from "../components/dashboard/customer/bankAccountList";
import { Separator } from "@/components/ui/separator";
//import { Metadata } from "next";
import { getServerTranslation } from "@/lib/serverTranslation";

// export const metadata: Metadata = {
//   title: "Manage Bank Accounts",
// };

export default async function BankAccountsPage() {
  const { t } = await getServerTranslation("common");
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">
        {t("title.bankAccount")}
      </h1>
      <BankAccountForm />
      <Separator />
      <BankAccountList />
    </div>
  );
}
