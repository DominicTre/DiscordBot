import {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle
} from 'discord.js';
import { ModalType } from '../../typings/Component';

module.exports = {
	name: 'commandModal',
	modal: new ModalBuilder()
		.setCustomId('commandModal')
		.setTitle('Combien en voulez vous?')
		.addComponents(
			new ActionRowBuilder<TextInputBuilder>().addComponents(
				new TextInputBuilder()
					.setCustomId('commandTextInput')
					.setLabel('Quantité de produit')
					.setStyle(TextInputStyle.Short)
			)
		),
	run: async ({ interaction }) => {
		return await interaction.followUp({
            content: interaction.fields.getTextInputValue('commandTextInput')
        });
	}
} as ModalType;
