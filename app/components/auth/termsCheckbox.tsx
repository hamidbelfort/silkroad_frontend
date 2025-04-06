"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function TermsCheckbox({
  onChange,
}: {
  onChange: (checked: boolean) => void;
}) {
  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setAgreed(checked);
    onChange(checked);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id="terms"
          checked={agreed}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the&nbsp;
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 underline"
              >
                Terms and Conditions
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  Terms and Conditions
                </DialogTitle>
              </DialogHeader>
              <div className="text-sm leading-6 space-y-2">
                <p>
                  This is where your terms and conditions
                  go. You can include any legal or usage
                  information that users must accept before
                  registering.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </Label>
      </div>
    </div>
  );
}
