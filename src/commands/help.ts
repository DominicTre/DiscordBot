import {
	ActionRowBuilder,
	SlashCommandBuilder,
	ButtonBuilder,
	EmbedBuilder,
	SelectMenuBuilder,
	MessageOptions,
	PermissionFlagsBits
} from 'discord.js';
import { CommandType } from '../typings/Command';

module.exports = {
	userPermissions: [PermissionFlagsBits.Administrator],
	data: new SlashCommandBuilder().setName('help').setDescription('help'),
	async run({ interaction, client }) {
		if (interaction.isChatInputCommand()) {
			const components: MessageOptions['components'] = [];
			const button = client.buttons
				.get('test-button-id')
				?.button.setLabel('new label');

			const selectMenuPromise = client.selectMenus.get(
				'test-select-menu-id'
			)?.selectMenu;

			button &&
				components.push(
					new ActionRowBuilder<ButtonBuilder>().addComponents(button)
				);

			if(selectMenuPromise){
				const selectMenu = await selectMenuPromise(interaction)
				const actionRow = new ActionRowBuilder<SelectMenuBuilder>()
					.addComponents(selectMenu);
				components.push(actionRow);
			}
			
			return await interaction.channel?.send({
				embeds: [
					new EmbedBuilder().setTitle('title').setDescription('description')
				],
				components
			});
		}
	}
} as CommandType;
