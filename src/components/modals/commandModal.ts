import {
    ActionRowBuilder,
	ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
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
                    .setStyle(TextInputStyle.Short),
            )
        ),
    
	run: async ({ interaction }) => {
        const modalCustomId = interaction.customId;
        const [, productName, priceString] = modalCustomId.split('_');
        const quantityString = interaction.fields.getTextInputValue('commandTextInput');

        // Convertir les valeurs de price et quantity en nombres
        if (priceString){
            const price = parseFloat(priceString);
            const quantity = parseFloat(quantityString);
    
            if (!isNaN(price) && !isNaN(quantity)) {
                const total = price * quantity;
    
                return await interaction.followUp({
                    content: `Produit: ${productName}\nPrix: ${price}$\nQuantité: ${quantity}\nTotal: ${total}$`
                });
            } else {
                return await interaction.followUp({
                    content: 'Prix ou quantité invalide.'
                });
            }
        }
        
	}
} as ModalType;
