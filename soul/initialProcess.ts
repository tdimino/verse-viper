
import { MentalProcess, useActions } from "@opensouls/engine";
import externalDialog from "./cognitiveSteps/externalDialog.js";

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  const { speak  } = useActions()

  const [withDialog, stream] = await externalDialog(
    workingMemory,
    "Write a single rap verse making fun of your opponent.",
    { stream: true, model: "gpt-4o" }
  );
  speak(stream);

  return withDialog;
}

export default initialProcess
