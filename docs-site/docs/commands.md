# Commands

The extension provides one command per lifecycle step. Start with `design`; the design
gate (`design.status.yaml = approved`) blocks staging and commit until a human approves.

| Command | Purpose | Key MCP tools |
|---------|---------|---------------|
| `speckit.maximo.design` | Solution design - **start here** | os_query_builder, maximo_get_metadata |
| `speckit.maximo.plan` | Tool-by-tool staging plan from the approved design | maximo_get_metadata |
| `speckit.maximo.stage` | Stage changes in the Working Set | ws_update_field, ws_add_child_record, ws_init_new_record, ws_update_draft |
| `speckit.maximo.preview` | Preview the staged diff (`_action` tags, warnings) | ws_preview_changes |
| `speckit.maximo.validate` | Pre-commit checklist | - |
| `speckit.maximo.approve` | Record human approval of the preview | - |
| `speckit.maximo.commit` | Commit to Maximo (or discard to reject) | ws_commit, ws_discard |
| `speckit.maximo.verify` | Confirm committed state | os_query_builder, ws_load |
| `speckit.maximo.analyze` | Run a read-only analyze recipe | os_query_builder, maximo_get_metadata |
| `speckit.maximo.sync-reference` | Refresh OS reference from MCP (when export tools exist) | maximo_get_metadata |

Each command file lives in `extension/commands/`. The [MCP lifecycle](/mcp-lifecycle)
page explains the Working Set tools and the staging footguns the commands rely on.
