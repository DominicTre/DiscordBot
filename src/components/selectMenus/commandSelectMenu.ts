import { ActionRowBuilder, SelectMenuOptionBuilder, SelectMenuBuilder, CacheType, SelectMenuInteraction} from 'discord.js';
import Product from '../../schemas/product';
import { SelectMenuType } from '../../typings/Component';

async function createSelectMenu(interaction: SelectMenuInteraction<CacheType>) {
    const options = await getSelectMenuOptions(interaction);
    return new SelectMenuBuilder()
        .setPlaceholder('Article à commander')
        .setCustomId('commandSelectMenu')
        .addOptions(options);
}

async function getSelectMenuOptions(interaction: { guildId: any; }) {
    const productData = await Product.findById(interaction.guildId);

    const selectMenuOptionBuilderArray: SelectMenuOptionBuilder[] = [];

    if (productData?.products) {
        productData.products.forEach((product: { name?: string; price?: number }) => {
            if(product.name){
                selectMenuOptionBuilderArray.push(
                    new SelectMenuOptionBuilder()
                        .setLabel(product.name)
                        .setDescription(`Prix: ${product.price}$`)
                        .setValue(`${product.name}|${product.price}`)
                );
            }
        });
    }

    return selectMenuOptionBuilderArray;
}

module.exports = {
    name: 'commandSelectMenu',
    selectMenu: async function(interaction) {
        return await createSelectMenu(interaction);
    },

    run: async ({ client, interaction }) => {
        const modal = client.modals.get('commandModal');
        const title = interaction.values.join();
        const [productId, price] = title.split('|');
        const productName = productId ? productId : "Combien en voulez vous?"

        if (modal) {
            modal.modal
                .setTitle(`Commande de ${productName}`)
                .setCustomId(`commandModal_`+(`${productName}_${price}`).toLowerCase())
            await interaction.showModal(modal.modal);



            // Après avoir montré le modal, éditer le message original pour réinitialiser le menu
            const newSelectMenu = await createSelectMenu(interaction);
            await interaction.message.edit({
                components: [new ActionRowBuilder<SelectMenuBuilder>().addComponents(newSelectMenu)]
            });
        } else {
            // Mise à jour de l'interaction avec le même menu déroulant pour réinitialiser le placeholder
            const newSelectMenu = await createSelectMenu(interaction);
            await interaction.update({
                components: [new ActionRowBuilder<SelectMenuBuilder>().addComponents(newSelectMenu)]
            });
        }
    }
} as SelectMenuType;
