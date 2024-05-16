
import { MentalProcess, indentNicely, useActions } from "@opensouls/engine";
import externalDialog from "./cognitiveSteps/externalDialog.js";
import instruction from "./cognitiveSteps/instruction.js";

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  const { speak, log } = useActions()

  const [withVerses, stream] = await externalDialog(
    workingMemory,
    indentNicely`
      Write a single rap verse making fun of your opponent.
      
      ## Important rules
      - Between 6 and 8 verses.
      - Add a line break after each verse.
    `,
    { stream: true, model: "gpt-4o" }
  );
  speak(stream);
  await withVerses.finished;

  log(withVerses.memories.slice(-1)[0].content);

  const [, style] = await instruction(
    withVerses,
    indentNicely`
      Write a prompt for a music AI that will use the verses you wrote to generate a song. Don't mention the rapper's names, make it about the topic of the verses.
      
      Follow this format:
      A song about <topic>, <genre, [genre2...]>, <mood, [mood2...]>.
    `,
    { model: "gpt-4o" }
  );
  speak(style);

  return withVerses;
}

export default initialProcess
