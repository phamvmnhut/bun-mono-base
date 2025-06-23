import ngrok from "@ngrok/ngrok";

async function main() {
  const listener = await ngrok.forward({
    addr: 3000,
    authtoken: process.env.DEV_NGROK_AUTH_TOKEN,
  });

  console.log(`Ingress established at: ${listener.url()}`);
};

main();

process.stdin.resume();
