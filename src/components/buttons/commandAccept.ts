import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { ButtonType } from '../../typings/Component';

module.exports = {
	name: 'accept_command',
	button: new ButtonBuilder()
		.setCustomId('accept_command')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Accept command'),
	run: async ({ client, interaction }) => {
		const modal = client.modals.get('test-modal-id');
		if (modal) return await interaction.showModal(modal.modal);
	}
} as ButtonType;
