import React from "react";
import { useStore } from "@/hooks/useStore";
import { Toast, RoleSwitchModal, SuccessModal, SecurityFlowModal } from "@/components/ui";

export function WebApp({ children }: { children?: React.ReactNode }) {
  const s = useStore();
  return (
    <div className="w-full min-h-screen">
      {children}

      <RoleSwitchModal s={s} />
      <SuccessModal s={s} />
      <SecurityFlowModal s={s} />
      <Toast msg={s.toastMsg} />
    </div>
  );
}
