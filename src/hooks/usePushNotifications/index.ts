"use client";

import { useSession } from "next-auth/react";
import { useCallback } from "react";

export function usePushNotifications() {
  const session = useSession();

  const handlePushNotifications = useCallback(async () => {
      if (typeof window === 'undefined') return;
          navigator.serviceWorker.register('/service-worker.js').then(async serviceWorker => {
     
          let subscription = await serviceWorker.pushManager.getSubscription();
    
          if (!subscription) {
            const response = await fetch("/api/notifications");
            const { publicKey } = await response.json();
            subscription = await serviceWorker.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: publicKey
            });


            await fetch("/api/notifications", {
              method: "POST",
              body: JSON.stringify({
                user_id: session.data?.user.id,
                subscription,
              })
           });
          };

          console.log("DEBUG subscription", subscription)
        });
      }, [session.data?.user.id]);

    return {
        handlePushNotifications
    }
}