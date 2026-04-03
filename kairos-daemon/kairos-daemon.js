#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const LOG_FILE = path.join(process.cwd(), 'kairos-journal.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;
  console.log(`[Kairos] ${message}`);
  try { fs.appendFileSync(LOG_FILE, entry); } catch (e) {}
}

function getInsight() {
  const insights = ["Consider vector-based memory for long context.", "Test retry logic on tool calls.", "Track file changes for better context.", "Experiment with periodic state serialization.", "Monitor CPU/memory during long runs."];
  return insights[Math.floor(Math.random() * insights.length)];
}

function startDaemon() {
  log("Kairos daemon started");
  log("Persistent companion active");
  try {
    fs.watch(process.cwd(), { recursive: true }, (e, f) => {
      if (f && (f.endsWith('.js') || f.endsWith('.ts') || f.endsWith('.py'))) log(`Change in: ${f}`);
    });
  } catch (e) {}
  setInterval(() => log(`Insight: ${getInsight()}`), 480000);
  log(`Journal: ${LOG_FILE}`);
  log("Running. Ctrl+C to stop.");
}

if (require.main === module) {
  startDaemon();
  process.on('SIGINT', () => { log("Daemon shutting down"); process.exit(0); });
}
