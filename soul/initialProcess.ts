
import { MentalProcess, indentNicely, useActions } from "@opensouls/engine";
import externalDialog from "./cognitiveSteps/externalDialog.js";
import instruction from "./cognitiveSteps/instruction.js";
import { rappyDiss } from "./diss-tracks/round1.js";
import { grimDiss } from "./diss-tracks/round1.js";

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  const { speak, log } = useActions()

  const [withVerses, stream] = await externalDialog(
    workingMemory,
    indentNicely`
      Write a free verse rap track that responds to Rappy Lobsta and Grim Reap-Ya's diss tracks, while dissing both of them simultaneously.

      ## Rappy Lobsta's diss track
      ${rappyDiss}

      ## Grim Reap-Ya's diss track
      ${grimDiss}
      
      ## Important rules
      - Mirror the full length of ${grimDiss}.
      - Be inventive and creative
      - Add a line break after each verse
    `,
    { stream: true, model: "quality" }
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
