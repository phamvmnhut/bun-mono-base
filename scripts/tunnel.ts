import localtunnel from "localtunnel";

(async () => {
	console.log("Starting tunnel...");
	const tunnel = await localtunnel({ port: 3000, subdomain: "thay-tu-vi-api" });

	// the assigned public url for your tunnel
	// i.e. https://abcdefgjhij.localtunnel.me
	tunnel.url;

	console.log("Tunnel server started", tunnel.url);

	tunnel.on("close", () => {
		// tunnels are closed
		console.log("Tunnel server closed");
	});

	const tunnel2 = await localtunnel({ port: 8081, subdomain: "thay-tu-vi-client" });

	// the assigned public url for your tunnel
	// i.e. https://abcdefgjhij.localtunnel.me
	tunnel2.url;

	console.log("Tunnel client started", tunnel2.url);

	tunnel2.on("close", () => {
		// tunnels are closed
		console.log("Tunnel client closed");
	});
})();
