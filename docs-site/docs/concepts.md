# Concepts

A quick mental model before you run anything.

## Config Object Structures

Maximo exposes configuration through **Object Structures** (OS) - OSLC-facing views over
one or more business objects. maximo-kit works with the configuration OS family
(internally DM-prefixed, e.g. `DMMAXDOMAIN`, `DMSCRIPT`, `DMMAXIFACEOUT`). These let you
query and modify Maximo *configuration* the same way you would read business data.

A config OS has a **parent** object and **child** objects reached by a **relation**
name. The child object name and its relation name are often different - for example
domain values live in the `NUMERICDOMAIN` object but you stage them on the relation
`NUMDOMAINVALUE`. This distinction matters when staging (see the
[MCP lifecycle](/mcp-lifecycle)).

Note: metadata search does not return config OS. maximo-kit selects them
deterministically from recipes and the reference, not by discovery.

## Three layers of guidance

| Layer | Where | Role |
|-------|-------|------|
| **Recipes** | `recipes/builtin/*.yaml` | Map a user outcome to the OS, variant, child relations, and stage order |
| **Knowledge** | `knowledge/` | Evidence-backed how-to: domains, scripting, integration, BPM, security, system, and the MCP interaction guide |
| **Reference** | `knowledge/reference/` | OS inventory and MCP-confirmed schema snapshots |

The agent reads the recipe first, loads the linked knowledge, then confirms schema via
MCP. Object Structure names are never guessed.

## The Working Set

A **Working Set** is a stateful MCP session that holds your staged changes before they
touch Maximo. You query or initialize records into it, stage field and child-row
changes, preview the diff, then commit or discard. It has a sliding idle timeout
(~15 minutes) and is identified by an id you carry across the lifecycle. This is what
makes changes safe: nothing is written until an explicit, previewed, approved commit.

## Design-first

Every change starts with a `design.md` that a human approves before anything is staged.
Analyze recipes are read-only. See [Design to commit](/workflow).
