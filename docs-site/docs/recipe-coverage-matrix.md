# Recipe coverage matrix

Backlog mapping from config-group inventory to recipe families. The inventory is authoritative for **config Object Structure** names; recipes are outcome-based, not one-recipe-per-OS.

Legend:

- **Mode:** change | analyze | unsupported
- **Risk:** low | medium | high
- **Research:** researched | needs research | environment-specific

Last updated: 2026-07-03

## DATADICTIONARY

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMMAXDOMAIN | domain-value-change | aln, numeric, synonym, table, crossover | medium | researched | none | change | Outcome-based domain configuration with type-specific children |
| DMMAXOBJECTCFG | object-structure-change | (deferred) | high | needs research | DMMAXINTOBJECT | unsupported | Object/attribute DDL-like changes; defer until dedicated knowledge |
| DMMAXRELATIONSHIP | relationship-change | (deferred) | high | needs research | DMMAXOBJECTCFG | unsupported | Relationship changes affect many apps |
| DMMAXINTOBJECT | intobject-change | (deferred) | high | needs research | integration recipes | unsupported | Integration object structure design |
| DMCONDITION | condition-change | (deferred) | medium | needs research | DMSCRIPT, DMWFPROCESS | unsupported | Conditions span apps, workflow, security |

## APPLICATION

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMMAXAPPS | app-designer-analyze | base | low | researched | DMSIGOPTION, DMCONDITION | analyze | Read-only dependency analysis |
| DMMAXAPPS | application-change | (deferred) | high | needs research | many | unsupported | App designer changes need deep UX knowledge |
| DMMAXMENU | menu-change | (deferred) | medium | needs research | DMMAXMODULES | unsupported | Wave 2 candidate |
| DMMAXMODULES | module-change | (deferred) | medium | needs research | DMMAXMENU | unsupported | Wave 2 candidate |
| DMSCTEMPLATE | service-catalog-template | (deferred) | medium | needs research | none | unsupported | Service catalog scope |
| DMQUERY | query-change | (deferred) | medium | needs research | DMMAXAPPS | unsupported | Saved queries affect reporting and apps |
| DMMAXLAUNCHENTRY | launch-in-context | (deferred) | medium | environment-specific | DMMAXAPPS | unsupported | Launch in context configuration |

## APPSECURITY

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMSIGOPTION | signature-option-change | base | medium | researched | DMMAXAPPS | change | Wave 1 implemented |
| DMSIGOPTFLAG | signature-option-change | flags | medium | environment-specific | DMSIGOPTION | change | Use with sigoption recipe when flags required |
| DMMAXGROUP | security-group-change | base | high | researched | DMSIGOPTION | change | Wave 1 implemented |
| DMCTRLGROUP | security-group-change | ctrl | high | needs research | DMMAXGROUP | unsupported | Control group pattern needs MCP schema |
| DMMAXUSER | user-security-change | (deferred) | high | needs research | DMMAXGROUP | unsupported | User assignment high risk; defer |
| DMMAXSERVSECURITY | service-security-change | (deferred) | high | needs research | none | unsupported | Service security specialized |

## INTEGRATION

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMMAXENDPOINT | integration-endpoint-change | base | medium | researched | none | change | Wave 1 implemented |
| DMMAXEXTSYSTEM | integration-external-system-change | base | medium | researched | iface recipes | change | Wave 1 implemented |
| DMMAXIFACEOUT | integration-publish-channel-change | base | high | researched | DMMAXENDPOINT, DMMAXEXTSYSTEM | change | Wave 1 outbound channel |
| DMMAXIFACEIN | integration-enterprise-service-change | base | high | researched | DMMAXENDPOINT, DMMAXEXTSYSTEM | change | Wave 1 inbound service |
| DMMAXIFACEINVOKE | integration-invocation-channel-change | base | high | researched | DMMAXENDPOINT | change | MCP-confirmed 2026-07-03 |
| DMMAXIFACECONTROL | integration-control-change | (deferred) | medium | needs research | DMMAXIFACEIN/OUT | unsupported | Interface control records |
| DMMAXQUEUE | integration-queue-change | (deferred) | medium | needs research | DMMAXIFACEIN | unsupported | Queue configuration |
| DMWSREGISTRY | webservice-registry-change | (deferred) | medium | needs research | DMMAXENDPOINT | unsupported | Web services library |
| DMJSONRESOURCETYPE | json-resource-change | (deferred) | medium | needs research | DMJSONRESOURCE | unsupported | JSON resource type |
| DMJSONRESOURCE | json-resource-change | (deferred) | medium | needs research | DMJSONRESOURCETYPE | unsupported | JSON resource definitions |
| DMMAXAICONFIG | ai-config-change | (deferred) | medium | needs research | none | unsupported | AI configuration emerging area |
| DMMAXEXTSYSTEM | external-system-analyze | base | low | researched | iface OS | analyze | Existing analyze recipe |

## BPM

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMWFPROCESS | workflow-change | base | high | researched | DMCOMMTEMPLATE, DMACTION | change | Wave 1 implemented |
| DMESCALATION | escalation-change | base | high | researched | DMACTION, DMCOMMTEMPLATE | change | Wave 1 implemented |
| DMCOMMTEMPLATE | communication-template-change | base | medium | researched | none | change | Wave 1 implemented |
| DMACTION | action-change | (deferred) | medium | needs research | DMSCRIPT | unsupported | Often paired with workflow/escalation |
| DMACTIONGROUP | action-group-change | (deferred) | medium | needs research | DMACTION | unsupported | Action groups |
| DMROLE | role-change | (deferred) | high | needs research | DMMAXGROUP | unsupported | Role vs group model environment-specific |
| DMINBOUNDCOMMCFG | inbound-email-change | (deferred) | medium | needs research | DMCOMMTEMPLATE | unsupported | Email listener configuration |

## SCRIPTCFG

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMSCRIPT | automation-script | object, attribute, action, condition, integration, cron | medium | researched | DMLAUNCHPOINT | change | Wave 1 base + variants |
| DMLAUNCHPOINT | automation-script | (same variants) | medium | researched | DMSCRIPT | change | Staged with script recipe |

## SYSTEM

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMMAXPROP | system-property-change | base | medium | researched | none | change | Wave 1 implemented |
| DMCRONTASKDEF | cron-task-change | base | high | researched | none | change | Wave 1 implemented |
| DMMAXLOGGER | logging-change | (deferred) | low | needs research | DMMAXLOGAPPENDER | unsupported | Logger configuration |
| DMMAXLOGAPPENDER | logging-change | (deferred) | low | needs research | DMMAXLOGGER | unsupported | Appender configuration |

## REPORTING

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMREPORT | report-change | (deferred) | medium | needs research | DMREPORTDESIGN | unsupported | BIRT report definitions |
| DMREPORTDESIGN | report-design-change | (deferred) | medium | needs research | DMREPORT | unsupported | Report design artifacts |
| DMKPIMAIN | kpi-change | (deferred) | medium | needs research | DMREPORT | unsupported | KPI configuration |

## DOCUMENTLIBRARY

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMDOCTYPES | doctype-change | (deferred) | low | needs research | none | unsupported | Document folder types |

## RESOURCES / FUNCTIONAL

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMPERSON | person-change | (deferred) | medium | needs research | none | unsupported | Master data; often non-config workflow |
| DMPERSONGROUP | persongroup-change | (deferred) | medium | needs research | DMPERSON | unsupported | Assignment groups |
| DMSHIFT | shift-change | (deferred) | low | needs research | DMCALENDAR | unsupported | Shift definitions |
| DMCALENDAR | calendar-change | (deferred) | low | needs research | none | unsupported | Calendar and holidays |

## CLASSIFICATIONDATA

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMCLASSIFICATION | classification-change | (deferred) | medium | needs research | none | unsupported | Classification hierarchies |

## OSLC

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMOSLCPROVIDER | oslc-provider-change | (deferred) | high | needs research | DMOSLCRESOURCE | unsupported | OSLC provider configuration |
| DMOSLCRESOURCE | oslc-resource-change | (deferred) | high | needs research | DMOSLCPROVIDER | unsupported | OSLC resource shape |
| DMOSLCBUSRES | oslc-change | (deferred) | high | needs research | OSLC family | unsupported | Additional OSLC OS in reference |
| DMOSLCCOMMONPROPS | oslc-change | (deferred) | medium | needs research | OSLC family | unsupported | OSLC common properties |
| DMOSLCDOMAIN | oslc-change | (deferred) | medium | needs research | OSLC family | unsupported | OSLC domain |
| DMOSLCERRORMAP | oslc-change | (deferred) | medium | needs research | OSLC family | unsupported | OSLC error map |
| DMOSLCEXTMEDIATYPE | oslc-change | (deferred) | low | needs research | OSLC family | unsupported | Media types |
| DMOSLCINTERACTION | oslc-change | (deferred) | medium | needs research | OSLC family | unsupported | OSLC interaction |
| DMOSLCNSPREFIX | oslc-change | (deferred) | low | needs research | OSLC family | unsupported | Namespace prefix |
| DMOSLCRESTYPE | oslc-change | (deferred) | medium | needs research | OSLC family | unsupported | Resource type |
| DMOSLCSPDEFN | oslc-change | (deferred) | medium | needs research | OSLC family | unsupported | Service provider defn |

## Interaction configuration

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMINTERACTION | interaction-change | (deferred) | medium | needs research | INTEGRATION group | unsupported | Interaction cfg; map via sync-reference |
| DMMAPRULES | interaction-map-change | (deferred) | medium | needs research | DMMAPDEF | unsupported | Map rules |
| DMMAPDEF | interaction-map-change | (deferred) | medium | needs research | DMMAPRULES | unsupported | Map definitions |

## MIGRATION (package metadata)

| OS | Recipe family | Recipe id / variant | Risk | Research | Dependencies | Mode | Rationale |
|----|---------------|---------------------|------|----------|--------------|------|-----------|
| DMPACKAGE | n/a | n/a | low | researched | none | unsupported | Package metadata; not business config surface |
| DMPACKAGEDEF | n/a | n/a | low | researched | none | unsupported | Package definition metadata |
| DMPKGDSTTRGT | n/a | n/a | low | researched | none | unsupported | Package destination metadata |
| DMCFGGROUP | n/a | n/a | low | researched | none | unsupported | Config group export metadata |
| DMDEPENDENCY | n/a | n/a | low | researched | none | unsupported | Package dependency metadata |

## Wave 1 summary (implemented recipes)

| # | Recipe id | Status |
|---|-----------|--------|
| 1 | domain-value-change | implemented (5 variants) |
| 2 | automation-script | implemented (6 variants) |
| 3 | integration-endpoint-change | implemented |
| 4 | integration-external-system-change | implemented |
| 5 | integration-publish-channel-change | implemented |
| 6 | integration-enterprise-service-change | implemented |
| 7 | integration-invocation-channel-change | implemented (MCP-confirmed) |
| 8 | workflow-change | implemented |
| 9 | escalation-change | implemented |
| 10 | communication-template-change | implemented |
| 11 | signature-option-change | implemented |
| 12 | security-group-change | implemented |
| 13 | system-property-change | implemented |
| 14 | cron-task-change | implemented |

## Deliberately deferred

- Application Designer change recipes (DMMAXAPPS mutations)
- OSLC full family
- Reporting (DMREPORT, DMREPORTDESIGN, DMKPIMAIN)
- JSON resources and AI config
- User security (DMMAXUSER)
- Object structure / relationship DDL-style changes
- Migration group OS (package metadata only)
