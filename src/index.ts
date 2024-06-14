require('dotenv').config();
import { ExtendedClient } from './structures/Client';

export const client = new ExtendedClient();

console.log(
	'------DISCORD BOT------\n\n by Dominic Tremblay\n\nhttps://github.com/DominicTre/DiscordBot\n'
);
client.start();
