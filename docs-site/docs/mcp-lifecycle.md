# MCP lifecycle

How an agent drives maximo-mcp-server to stage changes safely. This mirrors
`knowledge/mcp/interaction-guide.md`, which the agent loads at run time.

## Tool surface

**Query / read:** `os_query_builder` (the only query entry point - it also creates the
Working Set and returns its id), `ws_load`, `ws_get_records`, `ws_set_active`,
`ws_get_active`.

**Stage (edit):** `ws_update_field` (one field), `ws_multi_update` (several),
`ws_add_child_record` / `ws_remove_child_record` (one child row at a time).

**Stage (new):** `ws_init_new_record` (returns the working-set id + a draft `_tempId` +
per-field metadata), then `ws_update_draft` to fill the draft. (There is no
`ws_add_record`; older references to it are stale.)

**Finish:** `ws_preview_changes`, `ws_commit`, `ws_discard`, `ws_remove`.

## Lifecycle

```text
Edit existing:
  maximo_get_metadata -> os_query_builder -> ws_load -> ws_set_active
    -> ws_update_field / ws_add_child_record
    -> ws_preview_changes -> [approval] -> ws_commit

Create new:
  maximo_get_metadata -> ws_init_new_record -> ws_update_draft
    -> ws_add_child_record -> ws_preview_changes -> [approval] -> ws_commit
```

## Working-set id and TTL

Capture the working-set id when it is created and reuse it across stage, preview, and
commit. Working sets are evicted after ~15 minutes idle (any call resets the clock;
responses expose `wsExpiresAt`). On "working set not found", re-run `os_query_builder` /
`ws_init_new_record` and re-stage. Never reuse a working-set id after a failed commit.

## Footguns

- **Full-array replace:** never `ws_update_field` a relation-array field to change one
  child row - it resubmits the whole array and can drop the rows you omit. Use
  `ws_add_child_record` / `ws_remove_child_record`.
- **Relation vs object name:** stage children on the **relation** name (e.g.
  `NUMDOMAINVALUE`), not the object name (`NUMERICDOMAIN`). Recipes carry the relation.
- **Child-local keys:** match a child row by its child-local natural key
  (e.g. `value` + siteid/orgid), not the parent key. A blank siteid/orgid is a distinct
  key from a populated one.
- **System-generated fields:** omit required-but-system-generated fields such as domain
  `valueid` - Maximo generates them.
- **Domain-constrained fields:** if unsure of an allowed value, omit it rather than
  guess (a wrong value fails commit with `invalid_domain_value`).

## Child diff semantics

`ws_preview_changes` tags each staged child row: **Add** (key + supplied fields),
**Change** (key + only changed fields), **Delete** (key only); identical rows are
omitted. Review these tags before approving - an unexpected full replace signals a
natural-key problem.
