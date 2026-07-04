# Dev integration test

Manual smoke test checklist for maximo-kit v0.2.0.

## Setup

```bash
specify init maximo-kit-test --integration cursor
cd maximo-kit-test
specify extension add --dev /path/to/maximo-kit/extension
specify preset add --dev /path/to/maximo-kit/preset --priority 5
```

## Verify extension

```bash
test -f .specify/extensions/maximo/commands/design.md
test ! -f .specify/extensions/maximo/commands/discover.md
test ! -f .specify/extensions/maximo/commands/catalogue-build.md
```

## Repo checks

From the maximo-kit repo:

```bash
node scripts/validate-repo.mjs
node scripts/validate-ascii.mjs
```

## MCP smoke test

With maximo-mcp-server connected:

1. `/speckit.maximo.design chg-001 Add numeric domain value 5 to WOPRIORITY`
2. Confirm the agent selects domain-value-change (variant numeric) from the recipe and
   calls maximo_get_metadata on DMMAXDOMAIN before staging.
3. Focused query on DMMAXDOMAIN via os_query_builder returns a working-set id.
