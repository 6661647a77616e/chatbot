import React, { useState } from "react";

const App = () => {
  const [inputValue, setInputValue] = useState(""); //store the user's input
  const [response, setResponse] = useState(null); //store the response from the API
  const [error, setError] = useState(null); //Stores any error that occurs during the API call


// Sends a POST request to the specified API endpoint.
// The request includes headers for authorization and content type.
// The body of the request is a JSON string containing the user's input and some additional parameters.
  const handleSendMessage = async () => { //function to send the user's input to the API
    try {
      const res = await fetch(
        "https://fadzwan-langflow.hf.space/api/v1/run/b8e6feb5-fc52-414e-a18c-d3441133c5d9?stream=false",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer <TOKEN>",
            "Content-Type": "application/json",
            "x-api-key": "<your api key>",
          },
          body: JSON.stringify({
            input_value: inputValue,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
              "ChatInput-K84gu": {},
              "Prompt-3eRif": {},
              "OpenAIModel-sCkb3": {},
              "ChatOutput-M2hoY": {},
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat with AI</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Type your message here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleSendMessage} style={{ padding: "10px", background: "#C8E383", border: "none", cursor: "pointer" }}>
        Send Message
      </button>
      {response && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h3>Response</h3>
          <p>{response?.outputs?.[0]?.outputs?.[0]?.results?.message?.text || "No response message available"}</p>
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default App;
