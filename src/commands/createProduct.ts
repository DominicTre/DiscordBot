import {
	SlashCommandBuilder,
	PermissionFlagsBits
} from 'discord.js';
import Product from '../schemas/product';
import { CommandType } from '../typings/Command';

module.exports = {
	userPermissions: [PermissionFlagsBits.Administrator],
	data: new SlashCommandBuilder()
		.setName('createproduct')
		.setDescription('Crée un produit disponible dans les commandes')
        .addStringOption((option) =>
			option
				.setName('nom')
				.setDescription('Nom du produit à ajouter')
				.setRequired(true)
		)
        .addIntegerOption((option) =>
            option
                .setName("prix")
                .setDescription("Prix du produit")
                .setRequired(true)
            ),

	async run({ interaction,args }) {
		const nom = args.getString('nom');
		const prix = args.getInteger('prix');

        // Mise à jour du produit dans la base de données
        await Product.findByIdAndUpdate(interaction.guildId, {
            $addToSet: {
                [`products`]: {
                    name: nom,
                    price: prix
                }
            }
        }, { upsert: true });
        return await interaction.followUp({
            content : `Produit créé : ${nom} - ${prix}$`,
            ephemeral : true
        });
	}
} as CommandType;
