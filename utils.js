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
export function fiveBocchis() {
  bocchiCounter++;
  if (
    bocchiCounter >= 5 &&
    (new Date().getTime() - lasthour.getTime()) / (1000 * 60 * 60) < 1
  ) {
    lasthour = new Date();

    bocchiCounter = 0;
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
