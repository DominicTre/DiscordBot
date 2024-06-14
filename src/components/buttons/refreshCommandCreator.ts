import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageOptions, SelectMenuBuilder } from 'discord.js';
import { ButtonType } from '../../typings/Component';

function createButton() {
    return new ButtonBuilder()
    .setCustomId('refreshCommandCreator')
    .setStyle(ButtonStyle.Success)
    .setLabel('Refresh')
}

module.exports = {
	name: 'refreshCommandCreator',
	button: createButton(),
	run: async ({client ,interaction }) => {

        const components: MessageOptions['components'] = [];

        const selectMenuPromise = client.selectMenus.get(
            'commandSelectMenu'
        )?.selectMenu;

        if(selectMenuPromise){
            const selectMenu = await selectMenuPromise(interaction)
            const actionRow = new ActionRowBuilder<SelectMenuBuilder>()
                .addComponents(selectMenu);
            const buttonRow = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(createButton())
            components.push(actionRow,buttonRow);
        }

        await interaction.update({
            components: components
        });
	}
} as ButtonType;
