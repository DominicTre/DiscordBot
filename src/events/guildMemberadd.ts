import { Event } from '../structures/Event';

export default new Event('guildMemberAdd', async (member) => {
    const role = member.guild.roles.cache.find(role => role.name === 'Client');
    if (role) {
        member.roles.add(role)
            .then(() => console.log(`Added role "Client" to ${member.user.tag}`))
            .catch(error => console.error('Error adding role:', error));
    } else {
        console.error('Role "Client" not found!');
    }
});