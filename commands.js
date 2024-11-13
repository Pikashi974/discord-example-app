import "dotenv/config";
import { getRPSChoices } from "./game.js";
import { capitalize, InstallGlobalCommands } from "./utils.js";

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple hello command
const hello_COMMAND = {
  name: "hello",
  description: "Basic command",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Simple hello command
const WIGGLE_COMMAND = {
  name: "wiggle",
  description: "Must have for Bocchi the Bot",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const BWAA_COMMAND = {
  name: "bwaa",
  description: "bwaa",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const ROCK_COMMAND = {
  name: "rock",
  description: "Bocchi becomes the most solid of rocks",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const LORE_COMMAND = {
  name: "lore",
  description: "Anything you need to know about the server",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const BOTCHI_COMMAND = {
  name: "botchi",
  description: "Any emote from the pool",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [
  hello_COMMAND,
  WIGGLE_COMMAND,
  BWAA_COMMAND,
  ROCK_COMMAND,
  LORE_COMMAND,
  BOTCHI_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
