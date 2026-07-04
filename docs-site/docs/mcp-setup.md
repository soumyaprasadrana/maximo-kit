# Maximo MCP Server Setup

Maximo Kit requires [@soumyaprasadrana/maximo-mcp-server](https://www.npmjs.com/package/@soumyaprasadrana/maximo-mcp-server) >= 1.1.0.

## Install MCP server

```bash
npm install -g @soumyaprasadrana/maximo-mcp-server
```

## Maximo prerequisites

1. Deploy `MAXMCPMETADATA.py` automation script in Maximo ([source](https://raw.githubusercontent.com/soumyaprasadrana/maximo-mcp-server/refs/heads/main/MAXMCPMETADATA.py))
2. Set `mxe.oslc.validusewith` to include categories needed for your config OS (e.g. `MIGRATIONMGR`, `INTEGRATION`, `OSLC`)
3. Provide API key with appropriate access

## Cursor MCP configuration

Add to Cursor MCP settings (example):

```json
{
  "mcpServers": {
    "maximo-mcp-server": {
      "command": "maximo-mcp-server",
      "env": {
        "MAXIMO_URL": "https://your-maximo/maximo",
        "MAXIMO_API_KEY": "your-api-key",
        "MCP_DATA_BASE_DIR": "C:\\maximo-mcp",
        "MCP_LOGS_DIR": "C:\\maximo-mcp\\logs",
        "AUDIT_ENABLED": "true"
      }
    }
  }
}
```

Create persistent directories for `MCP_DATA_BASE_DIR` and `MCP_LOGS_DIR` before first run.

## First startup

Initial metadata reconcile may take several minutes. MCP tools return `metadata_sync_in_progress` until complete. Check logs in `MCP_LOGS_DIR`.

## Working Set tools used by Maximo Kit

| Phase | Tools |
|-------|-------|
| Resolve | `os_query_builder` (creates the working set), `ws_load`, `ws_get_records`, `ws_set_active`, `ws_get_active` |
| Stage (edit) | `ws_update_field`, `ws_multi_update`, `ws_add_child_record`, `ws_remove_child_record` |
| Stage (new) | `ws_init_new_record`, `ws_update_draft`, `ws_add_child_record` |
| Preview | `ws_preview_changes` |
| Commit | `ws_commit` (or `ws_discard` to reject) |
| Verify | read tools; `ws_remove` for session cleanup |
| Audit | `maximo_get_audit_logs` when enabled |

Object Structure names are resolved from recipes and `knowledge/reference/`, not from
a local catalogue or metadata search. See `knowledge/mcp/interaction-guide.md` for the
full working-set lifecycle.

## HTTP / watsonx Orchestrate

For HTTP transport with OAuth, see the maximo-mcp-server README. Use `--strict-tool-schema` for watsonx Orchestrate compatibility.
