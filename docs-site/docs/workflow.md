# Design to commit

maximo-kit runs every change through a design-first lifecycle with human gates:

```text
design -> approve design -> plan -> stage -> preview -> approve WS -> commit -> verify
```

## The steps

1. **design** - the agent selects the recipe/variant from `recipes/builtin/`, reads the
   linked knowledge, queries MCP for schema, and writes `design.md` (business need,
   Object Structures, existing state, proposed change, impact, tests, rollback).
2. **approve design** - a human sets `design.status.yaml` to `approved`. Nothing is
   staged before this.
3. **plan** - the design becomes an ordered, tool-by-tool staging plan.
4. **stage** - changes are staged in an MCP Working Set (parent fields with
   `ws_update_field`; child rows with `ws_add_child_record` on the relation name). The
   working-set id is recorded so later steps reuse it.
5. **preview** - `ws_preview_changes` shows the diff, with each child row tagged
   Add / Change / Delete, plus any non-blocking validation warnings.
6. **approve WS** - a human reviews the preview and records an approval.
7. **commit** - `ws_commit` writes to Maximo; on failure the set is discarded and a
   fresh one is started.
8. **verify** - focused queries confirm the committed state.

## Guardrails

- No staging or commit until `design.status.yaml` is approved.
- No commit without a preview and a recorded human approval.
- Analyze recipes (`external-system-analyze`, `app-designer-analyze`) are read-only.
- Reject staged changes any time with `ws_discard`.

Optional: `sync-reference` refreshes `knowledge/reference/` from Maximo when the
server-side export tools are enabled. See the [MCP lifecycle](/mcp-lifecycle) for tool
details and footguns.
