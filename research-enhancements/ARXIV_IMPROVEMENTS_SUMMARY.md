# Claude Code Snapshot – Research Enhancements (31 Mar 2026)

## Primary Source Paper
**arXiv:2603.20847** – Engineering Pitfalls in AI Coding Tools  
Empirical analysis of 3,536 Claude Code bugs:
- 67% functional
- 36.9% API/integration/config root causes
- Top symptoms: API errors (18.3%), terminal problems (14%), command failures (12.7%)

## Concrete Fixes Implemented in This Enhanced Fork
1. **API Error Resilience** (QueryEngine.ts pattern)
   - Added exponential-backoff retry + Zod schema validation for all Anthropic API calls.
2. **Configuration Validation** (schemas/ + entrypoints/)
   - Startup hook now validates Bun version, env vars, and paths before any tool invocation.
3. **Command Execution Guardrails** (tools/BashTool.ts, commands/)
   - Wrapped every exec with timeout + real-time status reporting to model.
4. **Permission & Security Layer** (toolPermission/)
   - Hardened checks to prevent root execution and unsafe file ops.
5. **State & Context Persistence** (state/, memdir/)
   - Automatic JSON serialization + checksum validation after every agent step.

These changes directly address the top engineering pitfalls identified in the paper while preserving the original Anthropic architecture for research purposes.
