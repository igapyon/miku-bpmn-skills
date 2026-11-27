# Process discovery from daybook activity

Use this guide when turning one or more daybook activities into reusable Process candidates. Activities are the primary evidence for work actually performed; related tasks add purpose, completion conditions, and reported progress. Do not treat a planned step as completed merely because it appears in an activity.

## Set the scope

- Identify the job by its input, requested outcome, and completion condition. A calendar date alone is not a process boundary.
- Read the selected activity or activities and relevant task records. Preserve where one activity continues into another.
- State which work is in scope and which nearby work is excluded, with the reason. Work that was already in progress at the start can be an input rather than part of the process.
- If no related task exists, proceed and record that fact.

## Build an evidence trail

Create stable evidence IDs such as `E01`. For every consequential action, decision, handoff, and result, record:

- what the activity says happened, and where in the selected record it appears;
- who performed it or whether the actor is unknown;
- its evidence type: `実績`, `利用者報告`, `計画`, `推定`, or `追加案`;
- the inputs, decision reason, result, and artifact passed to the next step when recorded.

Use `実績` only for work or results directly recorded in the activity. Treat a user's later report as `利用者報告` until an independent check corroborates it. Mark an inference `推定` and name its evidence IDs and reason. Mark a useful but unobserved step `追加案`; never insert it into the observed history as if it happened.

## Find Process boundaries

Group small operations when they share a purpose and produce one handoff. Split candidates when an input, responsible party, output, decision owner, or completion condition changes in a way that lets each part start and finish independently. Give each candidate:

- purpose and boundary;
- start condition and required inputs, with their providers;
- ordered task IDs, responsible party, decision points, and evidence IDs;
- output and recipient;
- completion condition and unresolved questions.

Use concrete values from the case to explain the evidence, then turn case-specific repository names, versions, paths, or URLs into inputs where a reusable process needs them. Keep stable instructions as instructions instead of making them variables.

## Preserve decisions and exception paths

- Model a decision made by a person as a BPMN User Task. State the question, evidence to show, expected response, and the next step that waits for the response.
- Keep authorization and technical verification separate. A user's report can authorize a subsequent operation; it does not itself prove what an API or Git ref contains.
- Record guard failures, no-ops, and blocked duplicate requests. Keep them out of the normal path unless they represent a reusable branch in the process.
- Model a confirmed alternative path with a BPMN gateway and explicit conditions. If an alternative is only proposed, label it as an additional proposal and do not present it as observed behavior.
- Do not infer that a missing local tag or artifact is missing remotely; check the relevant remote when that distinction matters.

## Review before saving

Trace each proposed task back to its evidence and trace each in-scope evidence item forward to a task or an explicit exclusion. Confirm that the task order follows the recorded handoffs. Keep activity facts, user-reported actions, and reusable instructions visibly distinct. For a single case, explain why each candidate may transfer to another job and state that the result has not been validated against multiple cases.

Save definitions only when the user requests them or adopts the candidates. Keep project-facing examples free of private daybook paths; refer to the source by a non-sensitive case description and date instead. When BPMN XML is included, keep its task order, gateways, and User Tasks aligned with the written instructions.
