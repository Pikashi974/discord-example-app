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
import { getRandomEmoji, DiscordRequest } from "./utils.js";
import { getShuffledOptions, getResult } from "./game.js";

import { Client, Events, GatewayIntentBits } from "discord.js";
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.match(/[wW][iI][gG][gG][lL][eE]/gm) != null) {
    message.channel
      .send(
        "https://github.com/Pikashi974/discord-example-app/blob/main/assets/BocchiWiggle.gif?raw=true"
      )
      .catch(console.error);
  } else if (message.content.match(/[bB][oO][cC][cC][hH][iI]/gm) != null) {
    let obj = await fetch(
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

    let randomEmote = obj.items[Math.floor(obj.items.length * Math.random())];

    message.channel
      .send(
        `<${randomEmote.animated == true ? "a" : ""}:${randomEmote.name}:${
          randomEmote.id
        }>`
      )
      // .then(() => console.log("test"))
      .catch(console.error);
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
    const { type, id, data } = req.body;

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
          await res.send({
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
            await res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: { content: resultStr },
            });
            // Update ephemeral message
            await DiscordRequest(endpoint, {
              method: "PATCH",
              body: {
                content: "Nice choice " + getRandomEmoji(),
                components: [],
              },
            });
          } catch (err) {
            console.error("Error sending message:", err);
          }
        }
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
