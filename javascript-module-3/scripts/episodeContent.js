import { getUrl } from "./api.js";

async function createEpisodeContent(
  content,
  contentNode,
  createCharacterContent,
  createOriginContent
) {
  const html = `<div class="flex-none card bordered pl-6">
    <div class="card-body"><h1 class="card-title">${content.name}</h1></div>
    <div>${content.air_date} | ${content.episode}</div>
  </div>
  </div>`;

  contentNode.innerHTML = html;

  content.characters.forEach(async (url) => {
    console.log(url)
    const character = await getUrl(url);
    const characterHtml = `
    <div class="card bordered card-body">
      <img src="${character.image}" class="w-full">
      <h2 class="card-title">${character.name}</h2>
      <p>${character.species} | ${character.status}</p>
    </div>
    `;

    const characterButton = document.createElement("button");
    characterButton.onclick = async () => {
      await createCharacterContent(
        character,
        contentNode,
        createEpisodeContent,
        createOriginContent
      );
    };

    characterButton.innerHTML = characterHtml;
    contentNode.appendChild(characterButton);
  });
}

export { createEpisodeContent };