<div align="center">
  <img src="docs-site/docs/public/logo.svg" width="88" alt="maximo-kit" />
  <h1>maximo-kit</h1>
  <p>
    <strong>A configuration copilot for IBM Maximo.</strong><br />
    Describe a change in plain language; a coding agent inspects, designs, stages,
    previews, and commits it through maximo-mcp-server -- with design-first guardrails.
  </p>
  <p>
    <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-blue" />
    <img alt="GitHub Spec Kit" src="https://img.shields.io/badge/GitHub-Spec%20Kit-181717" />
    <img alt="IBM Maximo" src="https://img.shields.io/badge/IBM-Maximo-052FAD" />
    <img alt="maximo-mcp-server" src="https://img.shields.io/badge/MCP-maximo--mcp--server-6E56CF" />
  </p>
</div>

---

## Overview

maximo-kit is a [GitHub Spec Kit](https://github.com/github/spec-kit) extension and
preset that turns IBM Maximo configuration into a spec-driven workflow. A developer
states an outcome; the agent selects a **recipe**, reads evidence-backed **knowledge**,
queries the live instance through
[maximo-mcp-server](https://github.com/soumyaprasadrana/maximo-mcp-server) for schema,
and drives the Working Set lifecycle:

```
inspect -> design -> plan -> stage -> preview -> approve -> commit -> verify
```

Object Structure selection is deterministic (recipe-driven, not discovery), and nothing
is written to Maximo until a human approves both the design and the previewed diff.

## Requirements

- The Spec Kit CLI (`specify`)
- [maximo-mcp-server](https://github.com/soumyaprasadrana/maximo-mcp-server) (>= 1.1.0)
- An IBM Maximo instance with configuration Object Structures exposed over OSLC
  (`mxe.oslc.validusewith`)

> **Note:** maximo-mcp-server must be configured in your coding agent (Claude Code,
> Cursor, ...) **manually** -- maximo-kit does not set it up for you. Follow the
> [maximo-mcp-server](https://github.com/soumyaprasadrana/maximo-mcp-server) setup
> instructions for your agent before installing the extension.

## Install

maximo-kit ships as two zips on the Releases page. The extension is self-contained --
it carries the commands, recipes, and knowledge in one archive.

```bash
# 1. Create a Spec Kit project for your agent
specify init my-maximo --integration claude      # or: --integration cursor
cd my-maximo

# 2. Install the extension (commands + recipes + knowledge)
specify extension add maximokit --from https://github.com/soumyaprasadrana/maximo-kit/releases/download/v0.1.1/maximo-kit-0.1.1.zip

# 3. (optional) Install the SDD templates preset
specify preset add maximo-kit --from https://github.com/soumyaprasadrana/maximo-kit/releases/download/v0.1.1/maximo-kit-preset-0.1.1.zip --priority 5
```

> **The extension id is `maximokit`.** Install it with exactly that name
> (`specify extension add maximokit ...`); the slash commands register as
> `/speckit.maximokit.*`.

Use the **release asset** URLs above (from the Releases page), not the source-code
archive. For a newer version, swap the tag and file version (for example
`releases/download/v0.2.0/maximo-kit-0.2.0.zip`).

## Usage

Every change runs through a strict, ordered lifecycle. Each step is a command that
checks the previous step is done, so nothing reaches Maximo without your review. Run one
command at a time:

```text
/speckit.maximokit.design  chg-001 <plain-language request>   # writes design.md
#   then approve: set maximo/changes/chg-001/design.status.yaml to `approved`
/speckit.maximokit.plan     chg-001    # writes staging-plan.md
/speckit.maximokit.stage    chg-001    # stages in a Working Set (does not commit)
/speckit.maximokit.preview  chg-001    # writes preview.md (Add/Change/Delete diff)
/speckit.maximokit.approve  chg-001    # records your approval of that preview
/speckit.maximokit.commit   chg-001    # writes to Maximo (only if approved)
/speckit.maximokit.verify   chg-001    # confirms the change landed
```

Artifacts for each change are written under `maximo/changes/<id>/`. Full walkthrough:
the [Getting started](https://soumyaprasadrana.github.io/maximo-kit/getting-started) guide.

## How it works

| Layer            | Role                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Recipes**      | Map a plain-language outcome to config Object Structures, variants, and child relations                           |
| **Knowledge**    | Evidence-backed guidance: domains, scripting, integration, BPM, security, system, and how to drive the MCP safely |
| **MCP**          | maximo-mcp-server provides live schema, queries, and the stage / preview / commit lifecycle                       |
| **Design-first** | Human approval gates on the design and the previewed diff before anything is committed                            |

## Documentation

Full documentation -- concepts, the MCP lifecycle, commands, and recipes -- is published
at **https://soumyaprasadrana.github.io/maximo-kit/**.

## License

MIT.

---

<div align="center">
  Built and maintained by
  <a href="https://github.com/soumyaprasadrana">Soumya Prasad Rana</a>.
</div>
