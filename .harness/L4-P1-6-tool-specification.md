# L4 Tool Specification: P1-6 Web Search & MCP Integration

**Feature:** P1-6 Web Search & MCP Integration  
**Principle:** EP-12 (Finite attention demands active management)  
**Date:** 2026-04-16  
**Status:** Specification for Tranche 1 remediation

---

## Executive Summary

This specification defines the concrete tools and enforcement mechanisms for P1-6 (Web Search & MCP Integration). The feature prevents knowledge silos by giving agents access to current external data beyond training cutoff. This specification provides operational recipes for MCP capability discovery, caching/filtering, and rate-limit enforcement.

---

## L4 Actions & Concrete Tools

### Action 1: MCP Capabilities Discovery & Registry

**Purpose:** Maintain a canonical registry of available MCP servers with auto-discovery and liveness monitoring.

**Tool Name:** `mcp-capabilities-generator`

**Schema:** `.harness/mcp-capabilities.schema.json`

**Registry File:** `.harness/mcp-capabilities.json`

**Discovery Mechanism:**
1. **At Session Start:** Read `.harness/mcp-capabilities.json`
2. **Capability Probe:** For each listed MCP server, query capabilities (via MCP protocol)
3. **Liveness Check:** Ping each server at `liveness_check_interval_seconds` (default 300s)
4. **Update Registry:** Refresh `status` field (available | unavailable | degraded)
5. **Timestamp:** Record `last_checked` in ISO8601 format

**Server Registration Format:**

```json
{
  "server_id": "gmail-mcp",
  "name": "Gmail MCP Server",
  "type": "stdio",
  "uri": "~/.claude/mcp/gmail/bin/gmail-mcp",
  "capabilities": ["read_email", "send_email", "list_labels"],
  "authenticated": true,
  "liveness_check_interval_seconds": 300,
  "last_checked": "2026-04-16T10:30:00Z",
  "status": "available"
}
```

**Input Contract:**
- Server ID, name, transport type (stdio | sse | tcp)
- URI or path to executable
- Capability list (populated by discovery or manual registration)
- Authentication flag (true if OAuth/token required)

**Output Contract:**
- Valid entry in `.harness/mcp-capabilities.json`
- Status field updated on each liveness check
- Timestamp precision ≥ 1 second

**Integration with Agent Startup:**
- Agent reads `.harness/mcp-capabilities.json` at startup
- For each server with `status: "available"`, agent registers tools
- Degraded or unavailable servers logged but not loaded

**Acceptance Criteria:**
1. [ ] Discovery script runs without errors
2. [ ] All registered servers appear in `.harness/mcp-capabilities.json`
3. [ ] Capability lists populated correctly (no false capabilities)
4. [ ] Liveness checks run at defined intervals
5. [ ] Status transitions (available ↔ unavailable) recorded with timestamp
6. [ ] Schema conformance validated by `npm run smoke`

---

### Action 2: Knowledge Lookup Caching & Filtering

**Purpose:** Prevent redundant external API calls through intelligent caching and relevance filtering.

**Tool Name:** `knowledge-lookup-router`

**Cache Location:** `.harness/search-cache.json` (key=query, value=result+metadata)

**Cache TTL:**
- Web search results: 24 hours (rapidly changing)
- MCP results: 12 hours (domain-dependent, configurable per server)
- Knowledge-base lookups: 7 days (static content)

**Decision Logic (Before External Call):**

```yaml
IF query in search-cache AND cache_entry.age < TTL
  THEN return cached_result, log cache_hit
ELSE
  evaluate_relevance(task_context, query):
    IF is_time_sensitive_query (news, stock, version, recent-change)
      THEN source = web_search
    ELSE IF is_standard_question (definitions, algorithms, training-data)
      THEN source = in_context (do not search)
    ELSE IF is_domain_specific (API docs, internal tools)
      THEN source = mcp_lookup
    END
    IF source != in_context
      THEN call_external_api(source, query)
      THEN cache_result(query, result, TTL)
      THEN return result
END
```

**Logging:** Every lookup decision logged to `.harness/knowledge-lookup.jsonl`:
```json
{
  "timestamp": "2026-04-16T10:30:00Z",
  "query": "Python 3.12 release date",
  "decision": "web_search",
  "decision_reason": "time_sensitive_version_query",
  "source": "web",
  "result_quality_score": 0.95,
  "cache_hit": false,
  "latency_ms": 1200
}
```

**Rate Limit Enforcement:**
- Web Search: Per `.harness/mcp-capabilities.json` `rate_limit` field (default 100 req/min)
- MCP Servers: Per-server rate limit in capabilities manifest
- Enforcement: Track requests in `.harness/rate-limit-state.json`; escalate if limit exceeded

**Input Contract:**
- Task context (current task ID, objective)
- Query string
- Optional: source hint (prefer web | prefer mcp | prefer in_context)

**Output Contract:**
- Result object with source, timestamp, quality_score
- Cached for future lookups
- Lookup logged to `.harness/knowledge-lookup.jsonl`

**Acceptance Criteria:**
1. [ ] Cache hit rate > 60% for repeated queries (target)
2. [ ] Cache TTL honored (old entries expired, fresh entries retained)
3. [ ] Decision routing correct (time-sensitive → web, standard → in-context, domain-specific → mcp)
4. [ ] Rate limits never exceeded (escalate before limit)
5. [ ] Lookup logs show > 70% correct routing decisions

---

### Action 3: Relevance Filtering & Decision Audit

**Purpose:** Ensure agents use external knowledge only when it adds value.

**Tool Name:** `relevance-filter`

**Decision Categories:**
1. **Time-Sensitive:** News, prices, version release dates, recent API changes, current events
2. **Standard Questions:** Definitions, algorithms, programming concepts, historical facts (in training data)
3. **Domain-Specific:** API documentation, internal tool specifications, specialized tools

**Heuristics:**
- Time-sensitive queries: Contain keywords like "latest", "2026", "recent", "release", "version", "current"
- Standard questions: Contain keywords like "what is", "how to", "explain", "definition"
- Domain-specific: Contain references to internal domains or tool names

**Feedback Loop:**
- After external lookup, log result quality score (0.0–1.0)
- Agent provides feedback: "was this result helpful?" (0=not helpful, 1=very helpful)
- Score stored in `.harness/knowledge-lookup.jsonl`
- Aggregated routing accuracy metric calculated weekly

**Acceptance Criteria:**
1. [ ] Agent evaluates task context before external calls (no auto-search)
2. [ ] Routing decisions logged with decision_reason
3. [ ] Quality scores collected for > 90% of lookups
4. [ ] Aggregate routing accuracy > 70% (correct decision category)
5. [ ] False positive rate (searching when in-context sufficient) < 20%

---

## Prevention Rules Binding (L4 Prevention)

### P1-6-knowledge-silos
- **Status:** implemented
- **Rule:** You must prevent agents from being limited to internal training data for fast-moving topics. Mandate web-search or MCP-knowledge retrieval for external research tasks.
- **Enforcement Surface:** Relevance filtering + decision audit in `.harness/knowledge-lookup.jsonl`
- **Current Status:** Guidance documented; mechanical enforcement pending Tranche 2

### P1-6-narrative-mcp-manifests
- **Status:** implemented
- **Rule:** MCP server configurations and capability definitions must follow a machine-readable JSON format.
- **Enforcement Surface:** `.harness/mcp-capabilities.schema.json` validated by `npm run smoke`
- **Current Gate:** Schema contract validation

---

## SAS vs. MAS Scope

### SAS Status: Partial
- **Complete:** MCP discovery and registry (single-agent can query static MCP manifest)
- **Complete:** Search caching (local `.harness/search-cache.json`)
- **Partial:** Relevance filtering (decision audit logged but no enforcement)
- **N/A:** Distributed cache invalidation (single-agent, no cache coordination)

### MAS Status: Planned
- **Future:** Shared cache across agent swarm (distributed `.harness/search-cache.json`)
- **Future:** Cross-agent MCP server management (discovery shared across team)
- **Future:** Coordinated rate-limit enforcement (pool shared across agents)
- **Future:** Aggregate relevance feedback (team routing accuracy metrics)

### SAS→MAS Migration
1. **SAS Phase 1:** Single-agent MCP discovery + local caching + decision audit
2. **MAS Phase 1:** Shared MCP registry across agents; centralized cache
3. **MAS Phase 2:** Distributed cache invalidation (when cached results should be refreshed)
4. **MAS Phase 3:** Coordinated rate-limit pools (agents share quota)
5. **MAS Phase 4:** Swarm-wide relevance feedback (team routing optimization)

---

## Integration Points

### With P1-3 Tool Offloading
- External knowledge results can be noisy (search returns many results)
- Tool Offloading (P1-3) helps filter relevant results
- Action: Knowledge-lookup result fed through tool-offloading lens

### With P1-2 Context Compaction
- Knowledge-lookup logs contribute to context compaction decisions
- Large result sets may trigger summarization (P1-2)
- Action: Context-compaction-policy checks knowledge-lookup volume

### With Observability (P1-5)
- Knowledge-lookup audit trail feeds into observation-report.json
- Cache metrics (hit rate, TTL efficiency) included in dashboard
- Action: `npm run observe` includes knowledge-lookup stats

---

## Test Strategy

### Unit Tests
1. **mcp-capabilities-generator:** MCP server list → schema-valid registry
2. **knowledge-lookup-router:** Query + context → correct source decision
3. **relevance-filter:** Query features → decision category + confidence score
4. **cache-ttl:** Timestamp check → expired entries removed

### Integration Tests
1. **End-to-end:** Agent task with time-sensitive query → web search triggered
2. **Caching:** Repeated query → cache hit, latency < 100ms
3. **Rate limits:** Requests at quota boundary → escalation triggered
4. **Fallback:** MCP server unavailable → fallback to web search
5. **Routing accuracy:** Weekly aggregate > 70% correct decisions

### Acceptance Criteria Verification
- [ ] MCP servers auto-discovered and registered
- [ ] Cache hit rate > 60% for production workload
- [ ] Rate limit violations = 0 (escalate before breach)
- [ ] Decision routing accuracy aggregated weekly and tracked
- [ ] Schema conformance validated by `npm run smoke`

---

## Measurement Bindings

**Feature:** P1-6  
**Registry:** `.harness/measurement-definitions.json`  
**Binding Key:** `P1-6`

### Metrics
1. **p1-6-outdated-answer-rate** (declared-unmounted)
   - Target: 0 for rapidly evolving domains
   - Collection: Evaluation against ground truth
   - Source: `.harness/knowledge-lookup.jsonl`

2. **p1-6-cache-hit-rate** (proxy-mounted)
   - Target: > 60%
   - Collection: Cache operation tracking
   - Source: `.harness/search-cache.json` metadata

3. **p1-6-mcp-capabilities-schema-conformance** (implemented)
   - Target: 100%
   - Collection: `npm run smoke`
   - Source: `.harness/mcp-capabilities.json` schema validation

---

## References

- Feature: `framework/features/P1-06.md`
- Schemas:
  - `.harness/mcp-capabilities.schema.json`
  - `.harness/search-cache.json` (generated)
  - `.harness/knowledge-lookup.jsonl` (generated)
- Related: P1-3 Tool Offloading, P1-2 Context Compaction, P1-5 Observability
- Principle: `framework/principles/EP-12.md`

---

**Specification Version:** 1.0  
**Approval Status:** Ready for Tranche 1 review  
**Next Steps:** MCP registry auto-discovery in Tranche 2; relevance-filter enforcement in Tranche 3
