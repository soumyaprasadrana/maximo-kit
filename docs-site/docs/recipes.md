# Recipe model

A **recipe** ties a user **outcome** to config Object Structures and knowledge paths.
Recipes make Object Structure selection deterministic - the agent reasons over the
recipe and knowledge to pick the recipe and variant, then confirms schema via MCP. They
are not a one-to-one map of Object Structures.

## Change recipes

| Recipe | Group | Object Structures |
|--------|-------|-------------------|
| domain-value-change | DATADICTIONARY | DMMAXDOMAIN (variants: aln, numeric, synonym, numrange, table, crossover) |
| automation-script | SCRIPTCFG | DMSCRIPT, DMLAUNCHPOINT |
| integration-outbound-build | INTEGRATION | DMMAXIFACEOUT + DMMAXEXTSYSTEM + DMMAXENDPOINT (+ script) - end-to-end outbound |
| integration-endpoint-change | INTEGRATION | DMMAXENDPOINT |
| integration-external-system-change | INTEGRATION | DMMAXEXTSYSTEM |
| integration-publish-channel-change | INTEGRATION | DMMAXIFACEOUT |
| integration-enterprise-service-change | INTEGRATION | DMMAXIFACEIN |
| integration-invocation-channel-change | INTEGRATION | DMMAXIFACEINVOKE |
| workflow-change | BPM | DMWFPROCESS (new / new revision / in-place edit) |
| escalation-change | BPM | DMESCALATION |
| communication-template-change | BPM | DMCOMMTEMPLATE |
| signature-option-change | APPSECURITY | DMSIGOPTION |
| security-group-change | APPSECURITY | DMMAXGROUP |
| system-property-change | SYSTEM | DMMAXPROP (value lives in child MAXPROPVALUE) |
| cron-task-change | SYSTEM | DMCRONTASKDEF (schedule lives in child CRONTASKINSTANCE) |

## Analyze recipes (read-only)

| Recipe | Group | Object Structures |
|--------|-------|-------------------|
| external-system-analyze | INTEGRATION | DMMAXEXTSYSTEM, DMMAXIFACEOUT, DMMAXIFACEIN, DMMAXENDPOINT, DMSCRIPT |
| app-designer-analyze | APPLICATION | DMMAXAPPS, DMSIGOPTION, DMCONDITION, DMMAXDOMAIN |

## Variants

Base recipes such as `domain-value-change` and `automation-script` define **variants**
in YAML (domain type, launch point type). Each variant carries its child object, the
MCP **relation** name to stage on, and its own knowledge paths. Agents load the base
plus the selected variant before MCP staging.

## Source files

- `recipes/builtin/*.yaml` and `recipes/README.md`
- `knowledge/reference/mcp-schema-confirmed.md` for MCP-confirmed field and relation names
- `knowledge/mcp/interaction-guide.md` for the staging lifecycle
