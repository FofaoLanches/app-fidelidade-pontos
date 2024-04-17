function parseBody(event) {
    const text = event.data?.text() ?? "";

    return JSON.parse(text);
}

self.addEventListener("push", function (event) {
    try {
        const { message, redirectUrl } = parseBody(event);
   
        event.waitUntil(
            self.registration.showNotification("Fofão Lanches - Pontos de Fidelidade", {
                body: message,
                icon: "/mascote_sem_fundo.png",
                requireInteraction: true,
                data: { url: redirectUrl }   
            }),
    );
    } catch(error) {
        console.error(error);
    }
  });

self.addEventListener('notificationclick', function(event) {
    const { notification } = event;
    const { url } = notification.data;

    clients.openWindow(url);
    event.notification.close();
}, false);