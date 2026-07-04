# validusewith primer

System property `mxe.oslc.validusewith` controls which Object Structure categories are exposed via OSLC.

## Categories

Examples: `MIGRATIONMGR`, `INTEGRATION`, `OSLC`, `REPORTING`.

`MIGRATIONMGR` is a use-with category for configuration OS exposure, not Migration Manager package workflows.

## maximo-kit approach

maximo-kit resolves Object Structure names deterministically from `recipes/builtin/`
and `knowledge/reference/` -- not from live metadata search (which does not return
config/DM-prefixed OS anyway).

Use `maximo_get_metadata` only after the OS is chosen from the recipe, for field and
child-relation verification on that known OS name.
