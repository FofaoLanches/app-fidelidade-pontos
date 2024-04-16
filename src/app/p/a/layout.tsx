"use client";
import { Fragment, useEffect } from "react";

import { Footer } from "@/components";
import { usePushNotifications } from "@/hooks";
import { SomeChildInterface } from "@/types";

export default function AdminLayout({ children }: SomeChildInterface) {
  const { handlePushNotifications } = usePushNotifications();

  useEffect(() => {
    handlePushNotifications();
  }, [handlePushNotifications])

  return (
    <Fragment>
      {children}
      <Footer className="bg-ternary-900" />
    </Fragment>
  );
}
