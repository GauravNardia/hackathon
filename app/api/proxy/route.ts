import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { input_value } = await req.json();

  const flowId = "8d3e6090-65f1-4298-9ab0-ae571c19ea2c";
  const langflowId = "778fa49f-335a-4e5d-aff2-251789771774";
  const applicationToken = process.env.NEXT_PUBLIC_LANGFLOW_API_TOKEN || "";
  const apiURL = `https://api.langflow.astra.datastax.com/lf/${langflowId}/api/v1/run/${flowId}?stream=false`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${applicationToken}`,
      },
      body: JSON.stringify({
        input_value: input_value,
        input_type: "chat",
        output_type: "chat",
        tweaks: {},
      }),
      signal: controller.signal, // Attach the AbortController
    });

    clearTimeout(timeoutId); // Clear the timeout if the request succeeds


    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error proxying the request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
