import {
    ActionRowBuilder,
	Colors,
	EmbedBuilder,
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
                if (interaction.guild) {
                    const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
                    var iconURL
                    if (interactionUser.displayAvatarURL() == null) iconURL= "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdiscord.com%2Fbranding&psig=AOvVaw1-nuINbLDblDZe71iEiRXg&ust=1719865465864000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCND7maOUhIcDFQAAAAAdAAAAABAE"
                    else iconURL = interactionUser.displayAvatarURL()

                    //Va chercher le channel des commandes avec le id. Voir pour le faire avec la BD avec un channel custom
                    const channel = await interaction.guild.channels.fetch("1248038079365644368")
                    if (channel?.isTextBased()) {
                        await channel?.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`Commande de ${productName}`)
                                    .setColor(Colors.Aqua)
                                    .setAuthor({name: interactionUser.displayName, iconURL: iconURL,url: `https://discord.com/users/${interactionUser.id}`})
                                    .addFields(
                                        {name : "Produit", value : `${productName}` },
                                        {name : "Quantité", value : `${quantity}`, inline:true  },
                                        {name : "Prix", value : `${price}$`, inline:true },
                                        {name : "Total", value : `${total}$`, inline:true   },
                                        {name : "Utilisateur", value : `<@${interaction.user.id}>`, inline: true }, // Mention de l'utilisateur
                                    )
                                    .setTimestamp()
                            ],
                        });
                        
                        
                        
                        
                        
                        
                        return await interaction.followUp({
                            content: `Produit: ${productName}\nPrix: ${price}$\nQuantité: ${quantity}\nTotal: ${total}$. \n\n Commande créée`
                        });
                    }
                        
                }

            } else {
                return await interaction.followUp({
                    content: 'Prix ou quantité invalide.'
                });
            }
        }
        
	}
} as ModalType;
