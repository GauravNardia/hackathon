"use client";
import { useState } from "react";
import { runLangflow } from "../lib/LangflowClient";
import ReactMarkdown from "react-markdown"; // Install using `npm install react-markdown`
import { Button } from "./ui/button";

export default function LangflowComponent() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const result = await runLangflow(inputValue, false);

    // Flatten nested response data into a plain string
    const responseText =
      result?.outputs?.flatMap((output: any) =>
        output.outputs?.map(
          (subOutput: any) => subOutput?.results?.message?.text
        )
      )
      .join("\n") || "No message found";

    setResponse(responseText);
    console.log("Langflow response:", result);
  } catch (err) {
    setError("An error occurred while running the flow.");
    console.error("Error during Langflow execution:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-4 px-20 rounded-lg max-w-6xl w-full mx-auto">
      <form onSubmit={handleSubmit} className="flex justify-center items-center w-full gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Which post type (reels, carousel, static) performed best?"
          className="border w-full border-gray-300 p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white p-5 rounded-full hover:bg-blue-600 disabled:bg-blue-300 transition-all"
          disabled={loading}
        >
          {loading ? "Running..." : "Run Flow"}
        </Button>
      </form>

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      <div className="mt-4 p-4 bg-gray-900 w-full h-screen whitespace-pre-wrap max-w-6xl w-full mx-auto">

        {response ? (
          <ReactMarkdown className="prose text-white">{response}</ReactMarkdown>
        ) : (
          <p className="text-white">Get your social media post insights.</p>
        )}
      </div>
    </div>
  );
}
