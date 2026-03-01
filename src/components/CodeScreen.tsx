import React from 'react';
import { motion } from 'motion/react';
import { Code as CodeIcon, Terminal, Cpu, Copy, Check } from 'lucide-react';

const FIRMWARE_CODE = `// RoboClean ESP32 Firmware v1.2.4
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "RoboNet_2G";
const char* password = "clean_windows_2024";

void setup() {
  Serial.begin(115200);
  setupSuction();
  setupSensors();
  connectToWiFi();
}

void loop() {
  if (isSecure()) {
    executeCleaningPath();
    reportTelemetry();
  } else {
    emergencyStop();
  }
  delay(100);
}`;

export default function CodeScreen() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(FIRMWARE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Robot Firmware</h2>
        <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <CodeIcon size={20} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card flex items-center gap-3 p-4">
          <Cpu size={20} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Target</span>
            <span className="text-sm font-bold">ESP32-WROOM</span>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <Terminal size={20} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Version</span>
            <span className="text-sm font-bold">v1.2.4-stable</span>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={handleCopy}
            className="p-2 bg-slate-800/80 backdrop-blur-md rounded-lg text-slate-400 hover:text-primary transition-colors"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          </button>
        </div>
        <div className="bg-[#1e1e1e] rounded-2xl p-6 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 shadow-2xl">
          <pre className="text-emerald-400/90">
            {FIRMWARE_CODE.split('\n').map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-slate-700 select-none w-4 text-right">{i + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Build Logs</h3>
        <div className="card bg-slate-900/50 border-slate-800 p-4 font-mono text-[10px] text-slate-400 flex flex-col gap-1">
          <p>[09:12:44] Compiling sketches...</p>
          <p>[09:12:46] Memory usage: 42% (Internal RAM)</p>
          <p className="text-emerald-500">[09:12:47] Build successful. Ready to flash.</p>
        </div>
      </div>

      <button className="btn-primary w-full flex items-center justify-center gap-3">
        <Terminal size={20} />
        <span>Flash to Robot</span>
      </button>
    </div>
  );
}
