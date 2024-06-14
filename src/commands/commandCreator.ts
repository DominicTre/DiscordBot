import {
	ActionRowBuilder,
	SlashCommandBuilder,
	EmbedBuilder,
    PermissionFlagsBits,
	MessageOptions,
    SelectMenuBuilder,
    ButtonBuilder,
} from 'discord.js';
import { CommandType } from '../typings/Command';

module.exports = {
    userPermissions: [PermissionFlagsBits.Administrator],
	data: new SlashCommandBuilder().setName('commandcreator').setDescription('Crée le message du créateur de commande'),
	async run({ interaction, client }) {
		if (interaction.isChatInputCommand()) {
			const components: MessageOptions['components'] = [];

            const selectMenuPromise = client.selectMenus.get(
				'commandSelectMenu'
			)?.selectMenu;

            const refreshCommandCreator = client.buttons.get(
                'refreshCommandCreator'
            )?.button;

            if(selectMenuPromise && refreshCommandCreator){
                const selectMenu = await selectMenuPromise(interaction)
                const actionRow = new ActionRowBuilder<SelectMenuBuilder>()
					.addComponents(selectMenu);
                const buttonRow = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(refreshCommandCreator)
				components.push(actionRow,buttonRow);
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
