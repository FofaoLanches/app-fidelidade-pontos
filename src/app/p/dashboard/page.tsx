"use client";
import { Map, Marker } from "pigeon-maps";
import React from "react";

import { Button, Container } from "@/components";

export default function Page() {
  return (
    <Container className="px-[10%]">
      <h1 className="text-center text-2xl font-extrabold text-fontsColor-800">Fofão Lanches</h1>
      <div className="flex rounded-[20px] border-[5px] border-fundo-600 overflow-hidden">
        <Map height={300} defaultCenter={[-29.6510737, -50.7826055]} defaultZoom={11}>
          <Marker width={50} anchor={[-29.6510737, -50.7826055]} />
        </Map>
      </div>
      <Button
        className="text-fontsColor-200"
        variant="link"
        blank={true}
        href="https://www.google.com/search?q=como+chegar+no+fofao+lanches+em+taquara&rlz=1C1VDKB_pt-PTBR1081BR1081&oq=&gs_lcrp=EgZjaHJvbWUqCQgGEEUYOxjCAzIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQoyMzk1NTFqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8"
      >
        Abrir rota para a lancheria
      </Button>
    </Container>
  );
}
