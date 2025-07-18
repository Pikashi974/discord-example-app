import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
  verifyKeyMiddleware,
} from "discord-interactions";
import {
  getRandomEmoji,
  DiscordRequest,
  getEmojis,
  triggerBocchi,
  eightBall,
  flipCoin,
  likeADragonFlip,
  infiniteFlip,
} from "./utils.js";
import { getShuffledOptions, getResult } from "./game.js";

import { Client, Events, GatewayIntentBits } from "discord.js";
import { MineSweeper, MineToString } from "./minesweeper.js";
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (
    message.content.match(
      /[eE][xX][pP][lL][oO][dD][eE]|[dD][eE][tT][oO][nN][aA][tT][eE]|[cC][oO][mM][bB][uU][sS][tT]|[rR][aA][pP][iI][dD][  ][nN][uU][cC][lL][eE][aA][rR][  ][fF][iI][sS][sS][iI][oO][nN]|[bB][oO][oO][mM]|[pP][iI][pP][eE][bB][oO][mM][bB]|[sS][pP][aA][rR][kK][lL][eE]/gm
    )
  ) {
    let obj = await getEmojis();

    let pipebombEmote = obj.items.find(
      (element) => element.name === "bocchithepipebomb"
    );
    message.react(`${pipebombEmote.id}`).catch(console.error);
  }
  if (message.content.match(/[hH][eE]['’][sS] [cC][oO][mM][iI][nN][gG]/gm)) {
    let obj = await getEmojis();

    let stareEmote = obj.items.find(
      (element) => element.name === "BocchiDeathStare"
    );
    message.react(`${stareEmote.id}`).catch(console.error);
  }

  if (
    message.content.match(/[hH][eE][lL]{2}[oO] [bB][oO][cC]{2}[hH][iI]/gm) !=
    null
  ) {
    message.channel
      .send(`He-Hello ${message.author.globalName}`)
      .catch(console.error);
  } else if (message.content.match(/[wW][iI][gG][gG][lL][eE]/gm) != null) {
    if (!triggerBocchi(5)) {
      message.channel
        .send(
          "https://github.com/Pikashi974/discord-example-app/blob/main/assets/BocchiWiggle.gif?raw=true"
        )
        .catch(console.error);
    } else {
      message.channel
        .send(
          "https://github.com/Pikashi974/discord-example-app/blob/main/assets/Bocchi_the_Nibiru.gif?raw=true"
        )
        .catch(console.error);
    }
  } else if (message.content.match(/[bB][wW][aA][aA]/gm) != null) {
    if (!triggerBocchi(5)) {
      let obj = await getEmojis();

      let bwaaEmote = obj.items.find(
        (element) => element.name === "bocchibwaa"
      );

      message.channel
        .send(
          `<${bwaaEmote.animated == true ? "a" : ""}:${bwaaEmote.name}:${
            bwaaEmote.id
          }>`
        )
        .catch(console.error);
    } else {
      message.channel
        .send(
          "https://github.com/Pikashi974/discord-example-app/blob/main/assets/Bocchi_the_Nibiru.gif?raw=true"
        )
        .catch(console.error);
    }
  } else if (
    message.content.match(
      /([bB][oO][cC][cC][hH][iI][,,][  ][uU][nN][lL][eE][aA][sS][hH][  ][tT][hH][eE][  ][cC][uU][rR][sS][eE][  ][oO][nN][  ])([^\n]+)/gm
    ) != null
  ) {
    // if (!triggerBocchi(5)) {
    let cursed = message.content.replace(
      /([bB][oO][cC][cC][hH][iI][,,][  ][uU][nN][lL][eE][aA][sS][hH][  ][tT][hH][eE][  ][cC][uU][rR][sS][eE][  ][oO][nN][  ])/,
      ""
    );

    message.channel
      .send(
        `${cursed}, I cast on you the most unholy of curses.\nCURSE OF RA 𓀀 𓀁 𓀂 𓀃 𓀄 𓀅 𓀆 𓀇 𓀈 𓀉 𓀊 𓀋 𓀌 𓀍 𓀎 𓀏 𓀐 𓀑 𓀒 𓀓 𓀔 𓀕 𓀖 𓀗 𓀘 𓀙 𓀚 𓀛 𓀜 𓀝 𓀞 𓀟 𓀠 𓀡 𓀢 𓀣 𓀤 𓀥 𓀦 𓀧 𓀨 𓀩 𓀪 𓀫 𓀬 𓀭 𓀲 𓀳 𓀴 𓀵 𓀶 𓀷 𓀸 𓀹 𓀺 𓀻 𓀼 𓀽 𓀾 𓀿 𓁀 𓁁 𓁂 𓁃 𓁄 𓁅 𓁆 𓁇 𓁈 𓁉 𓁊 𓁋 𓁍 𓁎 𓁏 𓁐 𓁑`
      )
      .catch(console.error);
    // } else {
    //   message.channel
    //     .send(
    //       "https://github.com/Pikashi974/discord-example-app/blob/main/assets/Bocchi_the_Nibiru.gif?raw=true"
    //     )
    //     .catch(console.error);
    // }
    // Bocchi, unleash the curse on someone
  } else if (
    message.content.match(
      /[lL][iI][kK][eE][  ][aA][  ][dD][rR][aA][gG][oO][nN]/gm
    ) != null
  ) {
    message.channel.send(`${likeADragonFlip()}`).catch(console.error);
  } else if (
    message.content.match(
      /[iI][nN][fF][iI][nN][iI][tT][eE][  ][wW][eE][aA][lL][tT][hH]/gm
    ) != null
  ) {
    message.channel.send(`${infiniteFlip()}`).catch(console.error);
  } else if (
    message.content.match(/[bB][oO][cC][cC][hH][iI], ([^\?]+) or ([^\?]+)/gm) !=
    null
  ) {
    // if (!triggerBocchi(5)) {
    let indexBefore = message.content.match("Bocchi")["index"];
    let choice = message.content
      .slice(indexBefore)
      .replace(/[bB][oO][cC][cC][hH][iI], /, "")
      .replace("?", "")
      .split(" or ");

    message.channel.send(`${flipCoin(choice)}`).catch(console.error);
    // } else {
    //   message.channel
    //     .send(
    //       "https://github.com/Pikashi974/discord-example-app/blob/main/assets/Bocchi_the_Nibiru.gif?raw=true"
    //     )
    //     .catch(console.error);
    // }
    // Bocchi, a or b?
  } else if (
    message.content.match(/[bB][oO][cC][cC][hH][iI], [^+]+\?/gm) != null
  ) {
    // if (!triggerBocchi(5)) {
    let question = message.content.replace(/[bB][oO][cC][cC][hH][iI], /, "");

    message.channel.send(`${await eightBall(question)}`).catch(console.error);
    // } else {
    //   message.channel
    //     .send(
    //       "https://github.com/Pikashi974/discord-example-app/blob/main/assets/Bocchi_the_Nibiru.gif?raw=true"
    //     )
    //     .catch(console.error);
    // }
    // Bocchi, question?
  } else if (message.content.match(/[bB][oO][cC][cC][hH][iI]/gm) != null) {
    if (!triggerBocchi(5)) {
      message.channel.send(`${await getRandomEmoji()}`).catch(console.error);
    } else {
      message.channel
        .send(
          "https://github.com/Pikashi974/discord-example-app/blob/main/assets/Bocchi_the_Nibiru.gif?raw=true"
        )
        .catch(console.error);
    }
  }
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
bot.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
bot.login(process.env.DISCORD_TOKEN);

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

// Store for in-progress games. In production, you'd want to use a DB
const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.PUBLIC_KEY),
  async function (req, res) {
    // Interaction type and data
    const { type, id, data, guild_id } = req.body;

    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }

    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;

      // "hello" command
      if (name === "hello") {
        // Send a message into the channel where command was triggered from
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            // Fetches a random emoji to send from a helper function
            content: `He-Hello ${req.body.member.user.global_name}`, //https://i.kym-cdn.com/photos/images/newsfeed/002/477/529/b46.gif
          },
        });
      }
      // "wiggle" command
      if (name === "wiggle") {
        // Send a message into the channel where command was triggered from
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            // Fetches a random emoji to send from a helper function
            content: `https://github.com/Pikashi974/discord-example-app/blob/main/assets/BocchiWiggle.gif?raw=true`, //https://i.kym-cdn.com/photos/images/newsfeed/002/477/529/b46.gif
          },
        });
      }
      // "bwaa" command
      if (name === "bwaa") {
        // Send a message into the channel where command was triggered from
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            // Fetches a random emoji to send from a helper function
            content: `https://github.com/Pikashi974/discord-example-app/blob/main/assets/BocchiBwaa.webp?raw=true`, //https://i.kym-cdn.com/photos/images/newsfeed/002/477/529/b46.gif
          },
        });
      }
      // "rock" command
      if (name === "rock") {
        // Send a message into the channel where command was triggered from
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            // Fetches a random emoji to send from a helper function
            content: `https://github.com/Pikashi974/discord-example-app/blob/main/assets/Bocchi_the_Nibiru.gif?raw=true`, //https://i.kym-cdn.com/photos/images/newsfeed/002/477/529/b46.gif
          },
        });
      }
      if (name === "lore") {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `[Lore of the server](https://www.youtube.com/watch?v=_QCUnWAzJ3g)`,
          },
        });
      }
      if (name === "botchi") {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `${await getRandomEmoji()}`,
          },
        });
      }
      if (name === "playlist") {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `https://open.spotify.com/artist/2nvl0N9GwyX69RRBMEZ4OD?si=vXalvPUdQYqiUViQqTxjZA`,
          },
        });
      }
      if (name === "8ball") {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `${await eightBall(data.options[0].value)}`,
          },
        });
      }
      if (name === "curse") {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `CURSE OF RA 𓀀 𓀁 𓀂 𓀃 𓀄 𓀅 𓀆 𓀇 𓀈 𓀉 𓀊 𓀋 𓀌 𓀍 𓀎 𓀏 𓀐 𓀑 𓀒 𓀓 𓀔 𓀕 𓀖 𓀗 𓀘 𓀙 𓀚 𓀛 𓀜 𓀝 𓀞 𓀟 𓀠 𓀡 𓀢 𓀣 𓀤 𓀥 𓀦 𓀧 𓀨 𓀩 𓀪 𓀫 𓀬 𓀭 𓀲 𓀳 𓀴 𓀵 𓀶 𓀷 𓀸 𓀹 𓀺 𓀻 𓀼 𓀽 𓀾 𓀿 𓁀 𓁁 𓁂 𓁃 𓁄 𓁅 𓁆 𓁇 𓁈 𓁉 𓁊 𓁋 𓁍 𓁎 𓁏 𓁐 𓁑`,
          },
        });
      }
      // "challenge" command
      if (name === "challenge" && id) {
        // Interaction context
        const context = req.body.context;
        // User ID is in user field for (G)DMs, and member for servers
        const userId =
          context === 0 ? req.body.member.user.id : req.body.user.id;
        // User's object choice
        const objectName = req.body.data.options[0].value;

        // Create active game using message ID as the game ID
        activeGames[id] = {
          id: userId,
          objectName,
        };

        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `Rock papers scissors challenge from <@${userId}>`,
            components: [
              {
                type: MessageComponentTypes.ACTION_ROW,
                components: [
                  {
                    type: MessageComponentTypes.BUTTON,
                    // Append the game ID to use later on
                    custom_id: `accept_button_${req.body.id}`,
                    label: "Accept",
                    style: ButtonStyleTypes.PRIMARY,
                  },
                ],
              },
            ],
          },
        });
      }
      if (name === "minesweeper") {
        let obj = await getEmojis();

        let pipebombEmote = obj.items.find(
          (element) => element.name === "bocchithepipebomb"
        );
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `# Bocchi the Mystic Minesweeper: ${
              data.options[1].value
            } pipebombs\n${MineToString(
              MineSweeper(data.options[0].value, data.options[1].value)
            )}`.replaceAll(
              ":bocchithepipebomb:",
              `<${pipebombEmote.animated == true ? "a" : ""}:${
                pipebombEmote.name
              }:${pipebombEmote.id}>`
            ),
          },
        });
      }
      console.error(`unknown command: ${name}`);
      return res.status(400).json({ error: "unknown command" });
    }

    /**
     * Handle requests from interactive components
     * See https://discord.com/developers/docs/interactions/message-components#responding-to-a-component-interaction
     */
    if (type === InteractionType.MESSAGE_COMPONENT) {
      // custom_id set in payload when sending message component
      const componentId = data.custom_id;

      if (componentId.startsWith("accept_button_")) {
        // get the associated game ID
        const gameId = componentId.replace("accept_button_", "");
        // Delete message with token in request body
        const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;
        try {
          res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: "What is your object of choice?",
              // Indicates it'll be an ephemeral message
              flags: InteractionResponseFlags.EPHEMERAL,
              components: [
                {
                  type: MessageComponentTypes.ACTION_ROW,
                  components: [
                    {
                      type: MessageComponentTypes.STRING_SELECT,
                      // Append game ID
                      custom_id: `select_choice_${gameId}`,
                      options: getShuffledOptions(),
                    },
                  ],
                },
              ],
            },
          });
          // Delete previous message
          await DiscordRequest(endpoint, { method: "DELETE" });
        } catch (err) {
          console.error("Error sending message:", err);
        }
        return;
      } else if (componentId.startsWith("select_choice_")) {
        // get the associated game ID
        const gameId = componentId.replace("select_choice_", "");

        if (activeGames[gameId]) {
          // Interaction context
          const context = req.body.context;
          // Get user ID and object choice for responding user
          // User ID is in user field for (G)DMs, and member for servers
          const userId =
            context === 0 ? req.body.member.user.id : req.body.user.id;
          const objectName = data.values[0];
          // Calculate result from helper function
          const resultStr = getResult(activeGames[gameId], {
            id: userId,
            objectName,
          });

          // Remove game from storage
          delete activeGames[gameId];
          // Update message with token in request body
          const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;

          try {
            // Send results
            res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: { content: resultStr },
            });
            // Update ephemeral message
            await DiscordRequest(endpoint, {
              method: "PATCH",
              body: {
                content: "Nice choice " + (await getRandomEmoji()),
                components: [],
              },
            });
          } catch (err) {
            console.error("Error sending message:", err);
          }
        }
        return;
      }
    }

    // console.log(req.body);

    console.error("unknown interaction type", type);
    return res.status(400).json({ error: "unknown interaction type" });
  }
);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
