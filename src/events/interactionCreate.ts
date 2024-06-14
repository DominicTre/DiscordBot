import {
	CommandInteractionOptionResolver,
	ContextMenuCommandInteraction,
	InteractionType
} from 'discord.js';
import { requiredPermissions } from '../utils/vars';
import { client } from '../index';
import { Event } from '../structures/Event';
import { ExtendedInteraction } from '../typings/Command';

export default new Event('interactionCreate', async (interaction) => {
	try {
		const missingPermissions = (
			await interaction.guild?.members.fetchMe()
		)?.permissions.missing(requiredPermissions);
		if (missingPermissions?.length != 0)
			return interaction.isRepliable()
				? await interaction.reply(
						`Bot is missing these required permissions: ${missingPermissions}`
				  )
				: null;

		switch (interaction.type) {
			case InteractionType.ApplicationCommand: {
				await interaction.deferReply();

				const command =
					client.commands.get(interaction.commandName) ??
					client.contextCommands.get(interaction.commandName);

				//Check for nonexistent command
				if (!command) {
					return await interaction.followUp(
						'You have used a non existent command'
					);
				}
				//Check rate limit
				if (client.commandCoolDown.has(interaction.user.id))
					return await interaction.followUp(
						'You are making commands too quickly'
					);
				//check if guild granted the necessary permissions to run the bot
				if (
					command.userPermissions &&
					interaction.memberPermissions?.missing(command.userPermissions)
						.length != 0
				)
					return await interaction.followUp(
						'You do not have permission to use this command'
					);

				//rate limit for command spamming
				client.commandCoolDown.add(interaction.user.id);
				setTimeout(() => {
					client.commandCoolDown.delete(interaction.user.id);
				}, 2500);

				return await command.run({
					args: interaction.options as CommandInteractionOptionResolver,
					client,
					interaction: interaction as ExtendedInteraction &
						ContextMenuCommandInteraction
				});
			}

			case InteractionType.ModalSubmit: {
				if (interaction.isModalSubmit()) {
					const modalCustomId = interaction.customId;
					//console.log(`Received modal submit interaction with custom ID: ${modalCustomId}`);

					// Extraction de l'ID de base du modal
					const baseModalId = modalCustomId.split('_')[0];
					
					if (baseModalId) {
						const modal = client.modals.get(baseModalId);
						if (modal) {
							try {
								await interaction.deferReply({ ephemeral: true });
								await modal.run({ interaction, client });
							} catch (error) {
								console.error(error);
								await interaction.reply({ content: 'An error occurred while processing the modal.', ephemeral: true });
							}
						} else {
							console.log(`No modal found with base ID: ${baseModalId}`);
						}
					} else {
						console.log(`Invalid baseModalId extracted from custom ID: ${modalCustomId}`);
					}
				}

				/*await interaction.deferReply({ ephemeral: true });

				//check le customID
				const modalCustomId = interaction.customId;
        		console.log(`Received modal submit interaction with custom ID: ${modalCustomId}`);

				return await client.modals
					.get(interaction.customId)
					?.run({ client, interaction });*/
				return
			}

			case InteractionType.MessageComponent: {
				if (interaction.isButton())
					return await client.buttons
						.get(interaction.customId)
						?.run({ client, interaction });
				if (interaction.isSelectMenu())
					return await client.selectMenus
						.get(interaction.customId)
						?.run({ client, interaction });
				break;
			}
			default:
				console.log('object');
		}
	} catch (error) {
		console.log(error);
		return await interaction.channel?.send(
			'There was a problem with your request. Please try again later'
		);
	}
});
