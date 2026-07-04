# maximo-mcp-server tool proposals (for the copilot)

Design specs for server-side tools the kit needs. These are implemented in the
maximo-mcp-server repo, NOT here. Each degrades gracefully: the kit works without them
(manual steps), and improves when they exist. Status: proposed / not built.

## T1. Config-OS export tools (unblocks sync-reference)

- `dm_list_config_groups` -> [{ group, description, os: [names] }]
- `dm_list_config_os` -> [{ osName, primaryObject, pk, children: [{ object, relation }] }]

Purpose: let `/speckit.maximo.sync-reference` regenerate `knowledge/reference/*.md` and
surface add-on OS (transport/telematics) not in the OOTB reference.
Inputs: none (or a group filter). Outputs: JSON as above.
Data source: the server already holds all of this in its synced metadata (469 OS) -- a
local read, no Maximo round-trip. Safety: read-only, no gating.
Kit use: sync-reference maps the JSON into the markdown reference tables (markdown only
in repo). The `relation` field fixes the current gap where relatedObjects returns
`relation: null`.

## T2. get-Maximo-logs tool

- `maximo_get_logs { logger?, level?, lines?, sinceMinutes? }` -> recent server-side log lines.

Purpose: turn "check logs for the script logger" (verify step for script/cron changes)
into a real call; power a troubleshooting procedure.
Implementation: Maximo has no OOTB log-tail OS; likely needs a companion automation
script (MAXMCPLOGS.py, alongside MAXMCPMETADATA.py) exposing bounded log reads over
OSLC. Safety: read-only but can leak secrets -- gate behind admin mode (T3), cap lines,
redact known secret patterns.
Kit use: `verify.md` for automation-script / cron-task recipes; a new
`knowledge/system/troubleshooting.md`.

## T3. Admin mode (env-gated tier)

Gate: `MCP_ENABLE_ADMIN_MODE=true` (separate from `MCP_ENABLE_DEV_MODE`). Tools:

- `maximo_reload_cache { type: maxprop|domain|script|all }` -- refresh caches after a
  commit (pairs with liverefresh semantics on system properties/domains).
- `maximo_run_cron_now { crontask, instance }` -- fire a cron instance for verification
  (cron-task-change verify step).
- T2 logs.

Each admin tool: `requireConfirmation` always on, audit-logged. OFF by default; kit
knowledge must state the flow falls back to manual UI steps when absent.

## T4. Small server fixes (do while in there)

- Populate `relation` in `relatedObjects` responses (currently always null; agents must
  fetch the full parent schema just to learn relation names).
- `mcp_server_status` reports `version: "unknown"` -- wire the real package version.
- Surface `wsExpiresAt` on a cheap status call (already in some ws responses) so agents
  can check WS staleness before staging on an older id.

## Notes confirmed from server source (2026-07-04)

- Working sets: sliding idle TTL, default 15 min (`OSWorkingSetEngine.inactivityMs`),
  eviction sweep every 60s; `getExpiry` -> `wsExpiresAt`.
- Current create flow: `ws_init_new_record` -> `ws_update_draft` (NOT `ws_add_record`,
  which is gone). The server's own `MC_TOOLS_USAGE_GUIDELINES.md` is stale on this and
  should be updated server-side.
- Child diffs (`childRelations.diffChildArray`) are tagged Add/Change/Delete by the
  child-local natural key; no usable key -> full-array replacement.
