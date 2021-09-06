"use strict";
import { getUrl } from "./api.js";
import { createOriginContent } from "./originContent.js";
import { createEpisodeContent } from "./episodeContent.js"


async function createCharacterContent(
  character,
  contentNode
) {
  const html = `<div class="flex-none pl-6">
    <img src="${character.image}" alt="character profile image" class="max-h-md max-w-md">
    <div class="card-body">
      <h1 class="card-title">${character.name}</h1>
      <p id="character-info">${character.species} | ${character.status} | ${character.gender} | </p>
    </div>
  </div>`;

  contentNode.innerHTML = html;

  const originButton = document.createElement("button");
  originButton.innerText = character.origin.name;
  originButton.onclick = async () => {
    const origin = await getUrl(character.origin.url);
    await createOriginContent(
      origin,
      contentNode
    );
  };

  const info = document.getElementById("character-info");
  info.appendChild(originButton);

  character.episode.forEach(async (episodeUrl) => {
    const response = await getUrl(episodeUrl);
    const { name, episode } = response;
    const episodeHtml = `
    <div class="card bordered m-4 shadow-2xl"> 
      <div class="flex flex-col m-4"> 
        <h3>${name}</h3>
        <p>${episode}</p>
      </div>
    </div>
    `;

    const episodeButton = document.createElement("button");
    episodeButton.onclick = async () => {
      await createEpisodeContent(
        response,
        contentNode
      );
    };

    episodeButton.innerHTML = episodeHtml;
    contentNode.appendChild(episodeButton);
  });
}

export { createCharacterContent };