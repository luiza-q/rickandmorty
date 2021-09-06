import { createHeader } from "./header.js";
import { createSidebar } from "./sidebar.js";
import { createEpisodeContent } from "./episodeContent.js";
import { createCharacterContent } from "./characterContent.js";
import { createOriginContent } from "./originContent.js";
import { getEpisode } from "./api.js";

async function init() {
  const root = document.getElementById("root");
  const flexContainerId = "flex-container";
  createHeader(root, "Rick & Morty");
  await createSidebar(root, flexContainerId, linkCallback);
  const flexContainer = document.getElementById(flexContainerId);
  const contentNode = document.createElement("div");
  flexContainer.appendChild(contentNode);

  async function linkCallback(id) {
    const content = await getEpisode(id);
    createEpisodeContent(
      content,
      contentNode,
      createCharacterContent,
      createOriginContent
    );
  }
}

init();