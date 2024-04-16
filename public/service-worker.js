self.addEventListener("push", function (event) {
    const body = event.data?.text() ?? "";
   
    event.waitUntil(
      self.registration.showNotification("Fofão Lanches - Pontos de Fidelidade", {
        body,
      }),
    );
  });