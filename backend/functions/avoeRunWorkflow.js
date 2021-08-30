const { ExecutionsClient } = require("@google-cloud/workflows");
const client = new ExecutionsClient();

const projectId = process.env.PROJECT_ID;

exports.avoeRunWorkflow = async (req, res) => {
  const body = JSON.parse(req.body);
  if (req.method !== "POST") {
    return res.status(405).send("Only POST method is allowed");
  }
  if (!body.audioBase64 || !body.styleSelected) {
    console.log("Does not contain audioBase64 or styleSelected");
    return res
      .status(400)
      .send("Body doesn't contain audioBase64 or styleSelected");
  }
  const workflowsAPI = await callWorkflowsAPI(body.audioBase64, body.styleSelected);
  if (!workflowsAPI.success) {
    return res
      .status(400)
      .send(`Error running workflow. Result: ${workflowsAPI.result}`);
  }
  res.send(`Result: ${workflowsAPI.result}`);
};

/**
 * Calls the Workflow API and waits for the execution result.
 */
async function callWorkflowsAPI(audioBase64, styleSelected) {
  const location = "us-central1";
  const workflow = "avoe-workflow";

  console.log("audioBase64 : ", audioBase64.slice(0, 20));
  console.log("styleSelected : ", styleSelected);

  // Execute workflow
  try {
    const createExecutionRes = await client.createExecution({
      parent: client.workflowPath(projectId, location, workflow),
      argument: {
        audioBase64,
        styleSelected
      },
    });
    const executionName = createExecutionRes[0].name;
    console.log(`Created execution: ${executionName}`);

    // Wait for execution to finish, then print results.
    let executionFinished = false;
    let backoffDelay = 1000; // Start wait with delay of 1,000 ms
    console.log("Poll every second for result...");
    while (!executionFinished) {
      const [execution] = await client.getExecution({
        name: executionName,
      });
      executionFinished = execution.state !== "ACTIVE";

      // If we haven't seen the result yet, wait a second.
      if (!executionFinished) {
        console.log("- Waiting for results...");
        await new Promise((resolve) => {
          setTimeout(resolve, backoffDelay);
        });
        backoffDelay *= 2; // Double the delay to provide exponential backoff.
      } else {
        console.log(`Execution finished with state: ${execution.state}`);
        console.log(execution.result);
        return {
          success: true,
          result: execution.result,
        };
      }
    }
  } catch (e) {
    console.error(`Error executing workflow: ${e}`);
    return {
      success: false,
    };
  }
}
