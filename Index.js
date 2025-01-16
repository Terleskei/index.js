const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

const TOKEN = 'MTMyOTUwNDkzMDQ4NjI4ODUwNA.GYmTFZ.rO1DstpD5XqPtoLY8kxxPky4cWAQxqtotwgfNM'; // Substitua pelo seu token do bot
const RADIO_URL = 'https://stream.zeno.fm/u1ras1s42yzuv'; // URL da sua rádio

client.once('ready', () => {
    console.log(`${client.user.tag} está online!`);
});

client.on('messageCreate', async (message) => {
    if (message.content === '!radio') {
        if (message.member.voice.channel) {
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            const player = createAudioPlayer();
            const resource = createAudioResource(RADIO_URL);

            player.play(resource);
            connection.subscribe(player);

            message.reply('🎶 Tocando a rádio agora!');
        } else {
            message.reply('Você precisa estar em um canal de voz!');
        }
    }
});

client.login(TOKEN);
