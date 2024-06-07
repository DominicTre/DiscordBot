import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { ButtonType } from '../../typings/Component';

module.exports = {
	name: 'employe',
	button: new ButtonBuilder()
		.setCustomId('employe')
		.setStyle(ButtonStyle.Primary)
		.setLabel('label'),
	run: async ({ client, interaction }) => {
		const modal = client.modals.get('test-modal-id');
		if (modal) return await interaction.showModal(modal.modal);
	}
} as ButtonType;
