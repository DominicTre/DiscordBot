import {
	ActionRowBuilder,
	SlashCommandBuilder,
	EmbedBuilder,
    PermissionFlagsBits,
	MessageOptions,
    SelectMenuBuilder,
} from 'discord.js';
import { CommandType } from '../typings/Command';

module.exports = {
    userPermissions: [PermissionFlagsBits.Administrator],
	data: new SlashCommandBuilder().setName('commandcreator').setDescription('Crée le message du créateur de commande'),
	async run({ interaction, client }) {
		if (interaction.isChatInputCommand()) {
			const components: MessageOptions['components'] = [];

            const selectMenu = client.selectMenus.get(
				'commandSelectMenu'
			)?.selectMenu;

            if(selectMenu){
                const actionRow = new ActionRowBuilder<SelectMenuBuilder>()
					.addComponents(selectMenu);
				components.push(actionRow);
            }
            if (components.length > 0) {
                interaction.deleteReply();
                return await interaction.channel?.send({
                    embeds: [
                        new EmbedBuilder().setTitle('Créateur de commande').setDescription('Sélectionnez le produit que vous voulez commander et indiquez combien vous voulez en commander.')
                    ],
                    components
                });
            } else {
                return await interaction.reply({ content: 'Problème dans la création de menu.', ephemeral: true });
            }
		}
	}
} as CommandType;
