class LangflowClient {
    baseURL: string;
    applicationToken: string;
  
    constructor(baseURL: string, applicationToken: string) {
      this.baseURL = baseURL;
      this.applicationToken = applicationToken;
    }
  
    async post(endpoint: string, body: object, headers: any = { "Content-Type": "application/json" }) {
      headers["Authorization"] = `Bearer ${this.applicationToken}`;
      const url = `${this.baseURL}${endpoint}`;
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });
  
        const responseMessage = await response.json();
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
        }
        console.log(responseMessage);
        return responseMessage;
      } catch (error) {
        console.error("Request Error:", error);
        throw error;
      }
    }
  
    async runFlow(flowId: string, langflowId: string, inputValue: string, stream = false, tweaks = {}) {
      const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
      return this.post(endpoint, {
        input_value: inputValue,
        input_type: "chat",
        output_type: "chat",
        tweaks,
      });
    }
  }
  
  export const runLangflow = async (inputValue: string, stream = false) => {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_value: inputValue,
        input_type: "chat",
        output_type: "chat",
        tweaks: {},
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  