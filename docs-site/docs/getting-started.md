# Getting started

This takes you from zero to your first committed Maximo configuration change.

## Prerequisites

- The Spec Kit CLI (`specify`) installed.
- [maximo-mcp-server](https://github.com/soumyaprasadrana/maximo-mcp-server) (>= 1.1.0),
  configured **manually** in your coding agent (Claude Code or Cursor). maximo-kit does
  not set this up for you -- follow the maximo-mcp-server setup for your agent first, and
  confirm the tools respond before continuing. See [MCP setup](/mcp-setup).
- An IBM Maximo instance with configuration Object Structures exposed over OSLC
  (`mxe.oslc.validusewith`).

## 1. Create a project

```bash
specify init my-maximo --integration claude    # or: --integration cursor
cd my-maximo
```

## 2. Install maximo-kit

The extension is self-contained -- commands, recipes, and knowledge in one archive.
Install it with the id **`maximokit`** from the latest release asset:

```bash
specify extension add maximokit --from https://github.com/soumyaprasadrana/maximo-kit/releases/download/v0.1.1/maximo-kit-0.1.1.zip

# optional: SDD templates preset
specify preset add maximo-kit --from https://github.com/soumyaprasadrana/maximo-kit/releases/download/v0.1.1/maximo-kit-preset-0.1.1.zip --priority 5
```

The slash commands register as `/speckit.maximokit.*`.

## 3. Make your first change (the full flow)

Every change runs through a strict, ordered lifecycle. **Each command checks that the
previous step is done and refuses to skip ahead**, so you always review before anything
is written to Maximo. Run one command at a time, in order.

Example request: add a synonym value `WORKING12` (mapped to the existing status `INPRG`)
on the `WOSTATUS` domain.

### Step 1 - design

```text
/speckit.maximokit.design chg-001 Add synonym domain value WORKING12 (maps to INPRG) to WOSTATUS
```

The agent picks the recipe, determines the domain type by querying Maximo, and writes
`maximo/changes/chg-001/design.md`. **Read it.**

### Step 2 - approve the design

Open `maximo/changes/chg-001/design.status.yaml` and set the status to `approved`.
Nothing can be staged until you do this.

### Step 3 - plan

```text
/speckit.maximokit.plan chg-001
```

Produces `staging-plan.md` -- the exact MCP calls that will run. Review it.

### Step 4 - stage

```text
/speckit.maximokit.stage chg-001
```

Stages the change in a Working Set (**nothing is committed yet**) and records
`staged.json` with the working-set id.

### Step 5 - preview

```text
/speckit.maximokit.preview chg-001
```

Writes `preview.md` -- the exact diff, with each row tagged Add / Change / Delete.
Review it carefully. (Optional: `/speckit.maximokit.validate chg-001` runs a checklist.)

### Step 6 - approve

```text
/speckit.maximokit.approve chg-001
```

Records your approval of that preview.

### Step 7 - commit

```text
/speckit.maximokit.commit chg-001
```

Writes to Maximo -- and only because the design is approved **and** an approval record
exists for the reviewed preview. Logs the result to `commit.log`.

### Step 8 - verify

```text
/speckit.maximokit.verify chg-001
```

Queries Maximo to confirm the change landed.

Every artifact lives under `maximo/changes/chg-001/`. For the gates and guardrails see
[Design to commit](/workflow); for how staging works under the hood see
[MCP lifecycle](/mcp-lifecycle); and there is a full worked example in the repo under
`examples/001-add-domain-value/`.

## Browse these docs locally

```bash
npm install
npm run docs:dev
```

Open the URL shown in the terminal (default `http://localhost:5173`).

## Learn more

- [Design to commit](/workflow) - the lifecycle and its gates
- [MCP lifecycle](/mcp-lifecycle) - the Working Set tools and footguns
- [Commands](/commands) - every command at a glance
- [Recipes](/recipes) - what maximo-kit can change
