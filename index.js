require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "!image") {
    const prompt = args.join(" ");
    if (!prompt) return message.reply("❌ Please provide an image prompt!");

    try {
      const seed = Math.floor(Math.random() * 100000);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux-pro&enhance=true&nologo=true&private=true&seed=${seed}`;

      const embed = new EmbedBuilder()
        .setTitle("🎨 AI-Generated Image")
        .setDescription(`Prompt: **${prompt}**`)
        .setImage(imageUrl);

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply("⚠️ Failed to generate an image. Try again later.");
    }
  }
});

client.login(process.env.TOKEN);
