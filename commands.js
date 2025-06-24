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
const PLAYLIST_COMMAND = {
  name: "playlist",
  description: "Listen to the best of the Kessoku gang",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const EIGHTBALL_COMMAND = {
  name: "8ball",
  description: "Ask Bocchi something",
  options: [
    {
      type: 3,
      name: "question",
      description: "What do you want to ask Bocchi?",
      focused: true,
      required: true,
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: "challenge",
  description: "Challenge to a match of rock paper scissors",
  options: [
    {
      type: 3,
      name: "object",
      description: "Pick your object",
      required: true,
      choices: createCommandChoices(),
    },
    // {
    //   type: 6,
    //   name: "user",
    //   description: "Choose your opponent",
    //   required: true,
    // },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};
const RA_COMMAND = {
  name: "curse",
  description: "Summon the curse of Ra",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const MINESWEEPER_COMMAND = {
  name: "minesweeper",
  description: "Bocchi will mine the field. Try to avoid it.",
  options: [
    {
      type: 4,
      name: "size",
      description: "How big is the square?",
      required: true,
    },
    {
      type: 4,
      name: "bombs",
      description: "How many bombs do you want?",
      required: true,
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};
const ALL_COMMANDS = [
  hello_COMMAND,
  WIGGLE_COMMAND,
  BWAA_COMMAND,
  ROCK_COMMAND,
  LORE_COMMAND,
  BOTCHI_COMMAND,
  PLAYLIST_COMMAND,
  EIGHTBALL_COMMAND,
  CHALLENGE_COMMAND,
  RA_COMMAND,
  MINESWEEPER_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
