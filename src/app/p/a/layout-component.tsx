"use client";
import { isEmpty } from "lodash";
import { useCallback, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { IoIosWarning } from "react-icons/io";

import { QrCodeModal } from "@/components";
import { QrCodeContext } from "@/context";
import { useWpp } from "@/hooks/useWpp";
import { UserInterface } from "@/types";

export function ClientAdminLayout(props: { session: UserInterface; sessionRef: any }) {
  const { session, sessionRef } = props;
  const { getQrCode } = useWpp();

  const { isOpenModalQrCode, setIsOpenModalQrCode } = useContext(QrCodeContext);

  const now = new Date();
  const endOfTimestamp = now.getTime() + 47000;
  const endOfTime = new Date(endOfTimestamp);

  const showToastWithQrCodeButton = useCallback(async () => {
    if (session.whatsapp_session_active) return;
    const res = await getQrCode({ token: session.token });
    if (res.whatsapp_session_active) return;

    if (isEmpty(sessionRef.current)) {
      toast(
        (t) => {
          return (
            <button
              ref={sessionRef}
              onClick={() => {
                toast.dismiss(t.id);
                setIsOpenModalQrCode(true);
              }}
              className="flex items-center"
            >
              <IoIosWarning className="w-full text-fontsColor-900]" size="50" />
              <span className="text-fontsColor-900 text-sm">
                Observamos que você não está conectado no WhatsApp, <span className="font-bold">clique nesse balão para autenticar!</span>
              </span>
            </button>
          );
        },
        { duration: 99999, style: { backgroundColor: "#EAB308" } },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    showToastWithQrCodeButton();
  }, [showToastWithQrCodeButton]);

  return (
    <QrCodeModal
      session={session}
      isOpen={isOpenModalQrCode}
      currentDateTimer={now}
      finalDateTimer={endOfTime}
      onClose={() => setIsOpenModalQrCode(false)}
    />
  );
}
