import { getUrl as getCharacter } from "./api.js";

async function createOriginContent(
  origin,
  contentNode,
  createContent,
  createCharacterContent
) {
  const html = `<div class="card bordered card-body">
    <h1 class="card-title">${origin.name}</h1>
    <p>${origin.type} | ${origin.dimension}</p>
  </div>
  `;

  contentNode.innerHTML = html;

  origin.residents.forEach(async (url) => {
    const character = await getCharacter(url);
    const characterHtml = `
    <div class="card bordered card-body">  
      <img src="${character.image}" />
      <h2 class="card-title">${character.name}</h2>
      <p>${character.species} | ${character.status}</p>
    `;

    const characterButton = document.createElement("button");
    characterButton.onclick = async () => {
      createCharacterContent(
        character,
        contentNode,
        createContent,
        createOriginContent
      );
    };

    characterButton.innerHTML = characterHtml;
    contentNode.appendChild(characterButton);
  });
}

export { createOriginContent };