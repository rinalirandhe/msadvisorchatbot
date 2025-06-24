import React, { useState } from "react";
import "./styles.css";

const chemicalData = {
  Paracetamol: {
    method: [
      "Column: Accucore C18, 100×2.1 mm, 2.6 µm",
      "Mobile Phase A: Water + 0.1% Formic Acid",
      "Mobile Phase B: ACN + 0.1% Formic Acid",
      "Gradient: 0–5 min: 5% B to 50% B",
      "Flow Rate: 0.4 mL/min",
      "Injection Volume: 5 µL",
      "MRM Transition: 152 → 110 (Quant), 152 → 93 (Qual)"
    ],
    prep: [
      "Weigh 10 mg standard",
      "Dissolve in 10 mL Methanol",
      "Sonicate for 5 minutes",
      "Dilute in mobile phase (50:50)",
      "Filter using 0.22 µm PTFE filter"
    ],
    design: [
      "5-point calibration: 1, 5, 10, 20, 50 ng/mL",
      "Include matrix blank and QC samples",
      "Check retention time repeatability",
      "Target %RSD < 2%"
    ]
  },
  Reserpine: {
    method: [
      "Column: Phenyl-Hexyl, 100 mm × 2.1 mm",
      "Mobile Phase A: Water + 0.1% FA",
      "Mobile Phase B: ACN + 0.1% FA",
      "Gradient: 0–5 min: 10% B to 60% B",
      "Flow Rate: 0.25 mL/min",
      "MRM Transition: 609 → 195"
    ],
    prep: [
      "Weigh 2 mg",
      "Dissolve in Methanol",
      "Dilute with mobile phase",
      "Filter through 0.22 µm PTFE"
    ],
    design: [
      "Calibrate with 0.5, 1, 5 ppm",
      "Use matrix blank",
      "Stability check over 24 hrs"
    ]
  },
  Caffeine: {
    method: [
      "Column: Hypersil GOLD C18, 100×2.1 mm",
      "Mobile Phase A: Water + 0.1% FA",
      "Mobile Phase B: MeOH + 0.1% FA",
      "Flow Rate: 0.3 mL/min",
      "MRM Transition: 195 → 138"
    ],
    prep: [
      "Dissolve 5 mg in Methanol",
      "Sonicate 5 minutes",
      "Dilute to 1 ppm",
      "Filter through 0.22 µm filter"
    ],
    design: [
      "Matrix-matched calibration",
      "Triplicate injections",
      "Peak shape and retention"
    ]
  },
  Chloramphenicol: {
    method: [
      "Column: C8, 100×2.1 mm",
      "Mobile Phase: Water + 0.1% FA / ACN",
      "Flow Rate: 0.4 mL/min",
      "MRM: 321 → 152 (Negative Mode)"
    ],
    prep: [
      "Weigh 10 mg",
      "Dissolve in Methanol",
      "Dilute in 50:50 mobile phase",
      "Filter before injection"
    ],
    design: [
      "Use matrix blank",
      "Spiked samples",
      "Evaluate ion suppression"
    ]
  }
};

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I can help you with LC-MS/MS parameters. Please enter a chemical name (e.g., Paracetamol, Reserpine, etc.)"
    }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    const newMessages = [...messages, { from: "user", text: userText }];
    setMessages(newMessages);

    const chem = userText.trim().toLowerCase();
    const matchedKey = Object.keys(chemicalData).find(
      key => key.toLowerCase() === chem
    );

    if (matchedKey) {
      const data = chemicalData[matchedKey];
      const response = `**LC/MS Method:**\n- ${data.method.join("\n- ")}\n\n**Sample Prep:**\n- ${data.prep.join("\n- ")}\n\n**Experimental Design:**\n- ${data.design.join("\n- ")}`;
      setMessages(prev => [...prev, { from: "bot", text: response }]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, I don't have information on that chemical. Try: Paracetamol, Reserpine, Caffeine, or Chloramphenicol."
        }
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="header">
        <img src="/chatbotlogo.png" height={100} width={120} />
        <h1 style={{ color: 'white' }}>MS Advisor ChatBot</h1>
      </div>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.from}`}>
            <strong>{msg.from === "bot" ? "MS Advisor: " : "You: "}</strong>
            <pre>{msg.text}</pre>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          placeholder="Enter chemical name..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
