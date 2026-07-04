# Getting Started

## Install the Spec Kit extension

```bash
specify extension add --dev ./extension
specify preset add --dev ./preset --priority 5
```

Connect **maximo-mcp-server** in Cursor.

## Your first change

```text
/speckit.maximo.design chg-001 Add synonym domain value WORKING12 (maps to INPRG) to WOSTATUS
```

The agent selects the recipe (`domain-value-change`) from `recipes/builtin/`, determines
the domain type by querying `MAXDOMAIN.DOMAINTYPE` (WOSTATUS is SYNONYM, so the `synonym`
variant), reads the linked knowledge, confirms the DMMAXDOMAIN schema via MCP, and writes
`design.md`.

Approve the design, then run: **plan -> stage -> preview -> approve -> commit -> verify**.
See the [MCP lifecycle](/mcp-lifecycle) for how staging works under the hood, and the
worked artifact set in `examples/001-add-domain-value/`.

## Browse docs locally

```bash
npm install
npm run docs:dev
```

Open the URL shown in the terminal (default `http://localhost:5173`).

## Refresh reference from Maximo

```text
/speckit.maximo.sync-reference
```

Updates `knowledge/reference/` when MCP migration export tools are available.

## Learn more

- [Workflow](/workflow)
- [Commands](/commands)
- [Recipes](/recipes)
- [MCP setup](/mcp-setup)
