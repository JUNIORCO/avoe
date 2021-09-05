const { ExecutionsClient } = require("@google-cloud/workflows");
// const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const config = require("./config.json");

const executionsClient = new ExecutionsClient();
// const secretManagerServiceClient = new SecretManagerServiceClient();

const projectId = config.google.projectId;
const workflowLocation = config.google.workflow.location;
const workflowName = config.google.workflow.name;
// const workflowSecret = config.google.workflow.secret;

exports.invokeWorkflow = async (req, res) => {
  const { audioBase64, styleSelected } = JSON.parse(req.body);

  if (!audioBase64 || !styleSelected) {
    const error = "Request body does not contain audioBase64 || styleSelected";
    console.log(error);
    return res.status(400).send(error);
  }

  const workflowsAPI = await callWorkflowsAPI(audioBase64, styleSelected);

  if (workflowsAPI.success) {
    return res.send(`Result: ${workflowsAPI.result}`);
  }

  return res
    .status(400)
    .send(`Error running workflow. Result: ${workflowsAPI.result}`);
};

const callWorkflowsAPI = async (audioBase64, styleSelected) => {
  try {
    // const [secret] = await secretManagerServiceClient.getSecret({
    //   name: `projects/${projectId}/secrets/${workflowSecret}`,
    // });

    const createExecutionRes = await executionsClient.createExecution({
      parent: executionsClient.workflowPath(
        projectId,
        workflowLocation,
        workflowName
      ),
      argument: {
        audioBase64,
        styleSelected,
      },
    });

    const executionName = createExecutionRes[0].name;
    console.log(`Created execution: ${executionName}`);

    // Wait for execution to finish, then print results.
    let executionFinished = false;
    let backoffDelay = 1000; // Start wait with delay of 1,000 ms
    console.log("Poll every second for result...");
    while (!executionFinished) {
      const [execution] = await executionsClient.getExecution({
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
};
