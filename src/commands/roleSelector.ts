import {
	ActionRowBuilder,
	SlashCommandBuilder,
	ButtonBuilder,
	EmbedBuilder,
    PermissionFlagsBits,
	MessageOptions,
} from 'discord.js';
import { CommandType } from '../typings/Command';

module.exports = {
    userPermissions: [PermissionFlagsBits.Administrator],
	data: new SlashCommandBuilder().setName('roleselector').setDescription('Crée le message du sélecteur de rôle'),
	async run({ interaction, client }) {
		if (interaction.isChatInputCommand()) {
			const components: MessageOptions['components'] = [];
			const buttonEmploye = client.buttons
				.get('employe')
				?.button.setLabel('Employé');
            const buttonClient = client.buttons
				.get('client')
				?.button.setLabel('Client');

            if(buttonEmploye && buttonClient){
                const actionRow = new ActionRowBuilder<ButtonBuilder>()
					.addComponents(buttonEmploye, buttonClient);
				components.push(actionRow);
            }
            if (components.length > 0) {
                interaction.deleteReply();
                return await interaction.channel?.send({
                    embeds: [
                        new EmbedBuilder().setTitle('Demande de rôle').setDescription('Cliquez sur un des boutons pour faire une demande de rôle aux admins')
                    ],
                    components
                });
            } else {
                return await interaction.reply({ content: 'Aucun bouton n\'a pu être ajouté.', ephemeral: true });
            }
		}
	}
} as CommandType;
