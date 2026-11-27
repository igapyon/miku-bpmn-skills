---
name: igapyon-miku-bpmn
description: Discover reusable processes from miku-daybook activities and related tasks, define them using BPMN concepts, and assemble or run a parent Process that calls user-selected processes in order. Use when the user asks to discover, define, assemble, or run a miku-bpmn process, or explicitly invokes this skill.
---

# miku-bpmn

Use BPMN as the reference for process terminology and structure. A reusable Process defines a unit of work. A larger Process can invoke reusable processes through Call Activities. A User Task represents a decision assigned to a person.

Use `igapyon-miku-daybook` to locate and read miku-daybook activities and related tasks, and to record run outcomes in activities. This companion skill is a required premise because activities provide work history, related tasks provide job context, and activities record run outcomes.

## Discover and define a process

1. Read the miku-daybook activities selected by the user and any related tasks. Use activities to identify the work actually done, its order, decision points, and results. Distinguish work observed in an activity from proposals recorded there. Use task records for the job's purpose, completion conditions, and reported progress or remaining work. Identify plans and status from task records as such, and label any inferences made during discovery.
2. Present a reusable process candidate in the conversation with its purpose, required inputs, tasks, decision criteria, outputs, and completion conditions. Link to the supporting activities and any related tasks used, and identify the evidence for any inferred step. If several activities describe the same work, show shared steps and meaningful differences.
3. Save a definition when the user asks to save it or adopts the candidate as a definition. When the project and daybook roots are separate, omit links and paths to daybook records from the saved definition and other project-facing text. Record the link to the saved definition in the daybook activity using the daybook workflow. Preserve existing task IDs when editing. In a new draft, use one Markdown file per process unless the user has specified another format. When including BPMN XML, put it in one labeled XML code block and refer to its task IDs from the written instructions. Use the BPMN model for ordering and branching and the instructions for task behavior. Ask for clarification if they conflict.

## Assemble and present a parent Process

1. Read the process definitions selected by the user. Ask if a definition cannot be identified or the intended order is unclear.
2. Give the parent Process a name that describes the current job. Create one Call Activity per invocation, referencing the selected Process definition. Connect the Call Activities with Sequence Flows in the user's order, from start to end. Identify each required input's source, such as a job input or an earlier Process output, and identify the outputs the parent Process returns.
3. Present the parent Process before execution. Show its purpose, the ordered Call Activities and their referenced definitions, the input and output mappings, and any unresolved inputs. A readable Markdown outline is sufficient for the preview. A request to assemble or revise the parent Process ends with the preview.

## Run the parent Process

1. For a run request, use the presented parent Process if it matches the user's current selection and order. Otherwise, assemble and present it first. Check that the called definitions have task instructions and resolve missing inputs before the call that needs them. Follow the parent Process's Sequence Flows and pass results according to its input and output mappings.
2. Carry out each task with the supplied instructions and available tools. Check its completion condition before advancing. Report the current task and the missing condition if it cannot be completed. If the model uses an element whose execution you cannot interpret, identify that element and ask how to proceed.
3. At a User Task, give the person the decision to make, the relevant evidence, and the requested response. Pause the work that depends on the answer. When a response arrives, apply it to that task and continue from the recorded point. If another session will resume the run, retain the process and task IDs, completed outputs, and pending question in the authorized work record.
4. Report the tasks actually completed, any remaining decision, and the resulting artifacts. Use the miku-daybook workflow when recording the run to an activity. Preserve the difference between what was intended and what actually happened.
