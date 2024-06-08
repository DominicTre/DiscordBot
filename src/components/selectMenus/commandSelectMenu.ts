import { ActionRowBuilder, SelectMenuOptionBuilder, SelectMenuBuilder } from 'discord.js';
import { SelectMenuType } from '../../typings/Component';

function createSelectMenu() {
    return new SelectMenuBuilder()
        .setPlaceholder('Article à commander')
        .setCustomId('commandSelectMenu')
        .addOptions([
            new SelectMenuOptionBuilder()
                .setLabel('Carotte')
                .setDescription('Pousse dans la terre')
                .setValue('carotte'),
            new SelectMenuOptionBuilder()
                .setLabel('Brocoli')
                .setDescription('Pousse aussi dans la terre')
                .setValue('brocoli')
        ]);
}

module.exports = {
    name: 'commandSelectMenu',
    selectMenu: createSelectMenu(),

    run: async ({ client, interaction }) => {
        const modal = client.modals.get('commandModal');
        const title = interaction.values.join();

        if (modal) {
            modal.modal.setTitle(title.charAt(0).toUpperCase() + title.slice(1));
            await interaction.showModal(modal.modal);

            // Après avoir montré le modal, éditer le message original pour réinitialiser le menu
            await interaction.message.edit({
                components: [new ActionRowBuilder<SelectMenuBuilder>().addComponents(createSelectMenu())]
            });
        } else {
            // Mise à jour de l'interaction avec le même menu déroulant pour réinitialiser le placeholder
            await interaction.update({
                components: [new ActionRowBuilder<SelectMenuBuilder>().addComponents(createSelectMenu())]
            });
        }
    }
} as SelectMenuType;
