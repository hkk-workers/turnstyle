export async function onRequestPost(context) {
  const { token } = await context.request.json();
  const secret = "0x4AAAAAABilP4-JfLqG2E7Nt_O0170LPNc";

  const formData = new URLSearchParams();
  formData.append("secret", secret);
  formData.append("response", token);

  const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  const result = await verifyResponse.json();

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
