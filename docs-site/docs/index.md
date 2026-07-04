---
layout: home

hero:
  name: maximo-kit
  text: A Maximo configuration copilot
  tagline: Recipes, evidence-backed knowledge, and the MCP Working Set lifecycle. A developer plus any coding agent can inspect, design, stage, preview, approve, and commit IBM Maximo configuration - with design-first guardrails.
  image:
    src: /logo.svg
    alt: maximo-kit
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: View recipes
      link: /recipes

features:
  - title: Recipe-driven outcomes
    details: Agents pick deterministic config Object Structures by reasoning over recipes, not keyword routers or catalogue resolvers.
  - title: Evidence-backed knowledge
    details: IBM-sourced guidance with MCP-confirmed schemas for staging, impact checks, tests, and rollback.
  - title: MCP Working Set lifecycle
    details: Design, query, stage, preview, approve, and commit through maximo-mcp-server on your connected instance.
  - title: Design gate by default
    details: No staging or commit until design.md is reviewed and approved. Analysis recipes stay read-only.
---

## How it works

```text
Developer (plain language)
        |
        v
Spec Kit commands + recipes + knowledge
        |
        v
AI agent selects recipe and config OS
        |
        v
MCP: metadata, queries, Working Set
        |
        v
Maximo configuration objects
```

Built as a GitHub Spec Kit extension (+ preset) over
[maximo-mcp-server](https://github.com/soumyaprasadrana/maximo-mcp-server).
