# Design to commit

maximo-kit runs every change through a strict, ordered lifecycle with human gates:

```text
design -> (approve design) -> plan -> stage -> preview -> (validate) -> approve -> commit -> verify
```

Each step is a separate command. **Every command checks that the previous step produced
its artifact and stops if it did not** -- you cannot skip stage, preview, or approval,
and staging never commits. Run one command at a time.

## Steps, commands, and gates

| Step | Command | Produces | Runs only if |
|------|---------|----------|--------------|
| Design | `/speckit.maximokit.design <id> <request>` | `design.md`, `design.status.yaml` (draft) | -- (entry point) |
| Approve design | *(you edit the file)* | `design.status.yaml` = `approved` | design.md exists |
| Plan | `/speckit.maximokit.plan <id>` | `staging-plan.md` | design approved |
| Stage | `/speckit.maximokit.stage <id>` | `staged.json` (Working Set) | design approved + plan exists |
| Preview | `/speckit.maximokit.preview <id>` | `preview.md` (Add/Change/Delete diff) | staged.json exists |
| Validate (optional) | `/speckit.maximokit.validate <id>` | `validation.md` | preview exists |
| Approve | `/speckit.maximokit.approve <id>` | `approval.record.yaml` | preview reviewed |
| Commit | `/speckit.maximokit.commit <id>` | `commit.log` (writes to Maximo) | design approved + preview + approval all present |
| Verify | `/speckit.maximokit.verify <id>` | `verify.md` | commit.log exists |

All artifacts live under `maximo/changes/<id>/`.

## How to approve the design

After `design`, open `maximo/changes/<id>/design.status.yaml` and set:

```yaml
status: approved
```

Nothing is staged until the design is approved.

## Guardrails

- No staging or commit until `design.status.yaml` is `approved`.
- **Staging never commits**, and preview never commits -- committing is its own gated
  step that requires a recorded approval of the reviewed preview.
- If the staged set changes after approval, the approval is void -- re-preview and
  re-approve.
- Analyze recipes (`external-system-analyze`, `app-designer-analyze`) are read-only.
- Reject staged changes at any time with `ws_discard`.

See the [MCP lifecycle](/mcp-lifecycle) for the Working Set tools and the child-record
footguns the commands rely on.
