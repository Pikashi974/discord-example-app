import "dotenv/config";

let bocchiCounter = 0;
let lasthour = new Date();

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = "https://discord.com/api/v10/" + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent":
        "DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)",
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: "PUT", body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export async function getRandomEmoji() {
  const obj = await getEmojis();

  let randomEmote = obj.items[Math.floor(obj.items.length * Math.random())];

  return `<${randomEmote.animated == true ? "a" : ""}:${randomEmote.name}:${
    randomEmote.id
  }>`;
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function triggerBocchi(number) {
  bocchiCounter++; // add part to not increase if 8 then 5
  if (
    bocchiCounter >= number &&
    (new Date().getTime() - lasthour.getTime()) / (1000 * 60 * 60) < 1
  ) {
    lasthour = new Date();

    bocchiCounter = 0; // add part to not reset if 5
    return true;
  } else if (
    (new Date().getTime() - lasthour.getTime()) / (1000 * 60 * 60) >=
    1
  ) {
    bocchiCounter = 1;
    lasthour = new Date();
  } else {
    lasthour = new Date();
  }
  return false;
}
export async function getEmojis() {
  return await fetch(
    `https://discord.com/api/v10/applications/${process.env.APP_ID}/emojis`,
    {
      method: "GET",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        "Content-Type": "application/json; charset=UTF-8",
        "User-Agent":
          "DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)",
      },
    }
  ).then((res) => res.json());
}
export async function eightBall(params) {
  // console.log(params);

  let questionning = await fetch(
    `https://eightballapi.com/api${
      Math.random() < 0.5 ? "/biased" : ""
    }?question=${params.replaceAll(" ", "+")}&lucky=${Math.random() < 0.5}`
  ).then((res) => res.json());
  // console.log(questionning);

  return questionning.reading;
}
export function flipCoin(tableChoice) {
  let table = [];
  for (let index = 0; index < 5; index++) {
    table.push(Math.random() < 0.5);
  }
  let nbTrue = table.filter((element) => element).length;
  let outcome = nbTrue > 2 ? tableChoice[0] : tableChoice[1];
  switch (nbTrue) {
    case 0:
    case 5:
      return `Definitely ${outcome}`;
    case 1:
    case 4:
      return `Most likely ${outcome}`;
    default:
      return `Probably ${outcome}`;
  }
}
export function likeADragonFlip() {
  let flip = Math.floor(Math.random() * 5);
  switch (flip) {
    case 0:
      return "https://github.com/Pikashi974/discord-example-app/blob/main/assets/like_a_dragon.mp4?raw=true";
      break;
    case 1:
      return "https://github.com/Pikashi974/discord-example-app/blob/main/assets/LIKE_A_WHAT.mp4?raw=true";
      break;
    case 2:
      return "https://github.com/Pikashi974/discord-example-app/blob/main/assets/infinite_what.png?raw=true";
      break;
    case 3:
      return "https://github.com/Pikashi974/discord-example-app/blob/main/assets/LikeADragon.jpg?raw=true";
      break;
    default:
      return "Like a WHAT";
      break;
  }
}
