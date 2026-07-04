# Architecture

maximo-kit is a GitHub Spec Kit extension that helps a developer and any coding agent
safely change IBM Maximo configuration through **maximo-mcp-server**.

## Layers

| Layer | Location | Role |
|-------|----------|------|
| Recipes | `recipes/builtin/` | Maps outcomes to config groups and Object Structures |
| Knowledge | `knowledge/` | Evidence-backed how-to guidance |
| Reference | `knowledge/reference/` | Config groups, OS inventory, MCP schema snapshots |
| Commands | `extension/commands/` | Design-first agent workflow |
| MCP | maximo-mcp-server | Schema, queries, Working Set at runtime |

## Flow

```text
design -> approve design -> plan -> stage -> preview -> approve WS -> commit -> verify
```

The agent selects recipe and variant by reading user intent, recipes, and knowledge. **No** local intent router, compiled catalogue, or OS discovery search.

## Hard rules

1. Deterministic Object Structure names from recipes/reference -- schema via MCP after selection
2. Single MCP-connected Maximo target (no credentials in repo)
3. Design approval before stage/commit
4. Analysis recipes are read-only
5. ASCII-only repository text

## What we removed (do not reintroduce)

- Toolkit / catalogue engine / intent CLI
- Pack framework and multi-environment promotion modeling
- One recipe per Object Structure
