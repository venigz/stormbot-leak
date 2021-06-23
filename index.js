const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ".";
const figlet = require('figlet');
const axios = require('axios')
const bot_name = "StormBOT";
const talkedRecently = new Set();
const bot_version = "2.0 [`FULL`]";
const fs = require('fs');
const Sequelize = require('sequelize')
const db3 = require('sqlite3');
const util = require('minecraft-server-util');
const bot_authors = "Vmkk#2869, _rus3k#0509 oraz hossy#2076"
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

const ascii = require("ascii-table")
const table = new ascii("Events")
/*table.setHeading("Event", "Status")
    fs.readdirSync("./logs/").forEach(file => {
        if (file.startsWith("--") && file.endsWith(".js")) {
            table.addRow(file, "âž–")
        } else {
            if (!file.endsWith(".js")) return;
            require(`../logs/${file}`)(bot)
            table.addRow(file, "âž•")
        }
 })*/

 const eventFiles = fs.readdirSync('./logs').filter(file => file.endsWith('.js'));
 for (const file of eventFiles) {
	const event = require(`./logs/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client));
	} else {
		client.on(event.name, (...args) => event.execute(client));
	}
}

client.on('guildCreate', g =>{
  if(g.ownerID === "673306402030223391"){
    g.owner.send('**__SYSTEM: WYSZEDĹEM Z JEDNEGO Z TWOICH SERWERĂ“W PONIWEWAĹ» SYSTEM UZNAĹ GO ZA MULTISERWER lUB MASZ GBANA!__**')
    client.guilds.cache.get(g.id).leave()
  }

});
 
//---------------------------------------------------------- DEFINICJE BAZY DANYCH I ZMIENNYCH W BAZACH 
const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database-main.sqlite',
});

const st_Warn = sequelize.define('warns', {
  name: {
      type: Sequelize.STRING,
      unique: true,
  },
  warnings: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
  },
});
const st_Propozycje = sequelize.define('suggestion', {
  pr_server: {
      type: Sequelize.STRING,
      unique: true,
  },
  pr_channel: {
      type: Sequelize.STRING,
      defaultValue: 1,
      allowNull: false,
  },
});
const Users = sequelize.define('users', {
  servers: {
      type: Sequelize.INTEGER,
      unique: true,
      defaultValue: 0,
  },
});
const Welcome = sequelize.define('welcomes', {
  server: {
      type: Sequelize.STRING,
      unique: true,
  },
  channeli: {
      type: Sequelize.STRING,
      defaultValue: 0,
      allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    defaultValue: "Witaj, na serwerze!",
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    defaultValue: "#ffffff",
    allowNull: false,
  },
});
const Leaves = sequelize.define('leaves', {
  server2: {
      type: Sequelize.STRING,
      unique: true,
  },
  channeli2: {
      type: Sequelize.STRING,
      defaultValue: 0,
      allowNull: false,
  },
  message2: {
    type: Sequelize.STRING,
    defaultValue: "Ĺ»egnaj {user.id}!",
    allowNull: false,
  },
  color2: {
    type: Sequelize.STRING,
    defaultValue: "#ff0000",
    allowNull: false,
  },
});
client.on('ready', () => {
  st_Warn.sync();
  Welcome.sync();
  Users.sync();
  Leaves.sync();
  st_Propozycje.sync();
});

client.on('message', message =>{
  if(message.channel.id === "843440723000164383"){
    if(message.author.bot) return;
    let perr = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('DziÄ™kujemy za partnerstwo!')
      .setImage('https://media.discordapp.net/attachments/807828793116459008/812084790047670292/linha_8-3-1-3-1.gif')
    message.channel.send(perr)
  }
});
client.on('message', message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  

});
//------------------------ WIADOMOSÄ† NA READY
client.on('ready', () => {
    client.user.setPresence({ activity: { name: '.helpă»[1]ă»' + client.guilds.cache.size + ' serv.'}, status: 'idle' })
    console.log('ă»PomyĹ›lnie uruchomiono bota ' + bot_name + 'ă»Wersji: ' + bot_version + 'ă»oraz z autorami: ' + bot_authors)
      client.channels.cache.get('842755281784274984').setName(`đź“ă»Servers: ${client.guilds.cache.size}/250`);      
      client.channels.cache.get('843044720662020096').setName(`đź‘Ąă»BOT Users: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`);
});
//--------------------------------------------------------------- EMBED PO ZAPINGOWANIU BOTA
client.on("message", async (message) => {
  if (message.author.bot) return false;

  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

  if (message.mentions.has(client.user.id)) {
    
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
      const embed = new Discord.MessageEmbed()
      .setAuthor(` StormBOT INFO`, client.user.avatarURL({ dynamic: true }))
      .setColor('BLUE')
      .setTitle('StormBOT - Wielofunkcyjny bot discord')
      .setDescription('> <:mod:836515080493203488>ă»MĂłj prefix to `.` sprawdĹş liste komend pod `.help`\n\n> <:osoby:840643966931304468>ă»BOT: ' + bot_name + '\n> <:osoby:840643966931304468>ă»Wersja: ' + bot_version + '\n> <:osoby:840643966931304468>ă»Autorzy: [Vmkk#2869](https://discord.com/channels/@me/843932925837705217)' + bot_authors + '\n\n> <:reputacja:839877265322934302>ă»Uptime Bota: ' + `**${days}d ${hours}h ${minutes}m ${seconds}s**`)  
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')

      message.channel.send(embed);
  };
});


client.on("guildCreate", guild => {
  console.log('- Nowy Serwer ${guild.name}')
  client.channels.cache.get("843906308016701440").send("**-> Dodano bota na serwer!**\n Serwer: `" + guild.name + " || " + guild.id + "`\n Osoby: `" + guild.members.cache.size + "` \n**Statystyki bota:**\nLudzie(botusers): " + client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)+"\nSerwery:" + client.guilds.cache.size + "\n\n")
});

client.on("guildDelete", guild => {
  client.channels.cache.get("843906308016701440").send("**-> Wyrzucono bota z serwera!**\n Serwer: `" + guild.name + " || " + guild.id + "`\n Osoby: `" + guild.members.cache.size + "` \n**Statystyki bota:**\nLudzie(botusers): " + client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)+"\nSerwery:" + client.guilds.cache.size + "\n\n")
});
//-------------------------- OgĂłlne komendy, + definicje
client.on('message', async (message)  => {

if(message.guild.id === "842732495446605824"){
    if(message.mentions.members.size > 6){
      if(!message.member.hasPermission('ADMINISTRATOR')){
        const memberToBan = message.guild.members.cache.get(message.author.id)
              memberToBan.ban().then((bannedUser) => {
                  
          let raidantey = new Discord.MessageEmbed()
              .setColor('#ff0000')
              .setTitle('AntyRaid')
              .setDescription('> <:osoby:840643966931304468> - **' + bannedUser.user.tag + '!** ZostaĹ‚eĹ› zbanowany za prĂłbÄ™ rajdu, jeĹ›li to przypadek/lub nie byĹ‚o to zamierzone. Skontaktuj siÄ™ z Vmkk#2869 na pv!')
              .setFooter(bannedUser.user.tag + `(${bannedUser.user.id}) - ${bannedUser.user.name}`, bannedUser.user.displayAvatarURL() + ' ')
        let raidanty = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('AntyRaid')
            .setDescription('> <:osoby:840643966931304468> - **' + bannedUser.user.tag + '!** PrĂłbowaĹ‚ zrajdowaÄ‡ serwer! ZostaĹ‚ on zbanowany automatycznie!')
            .setFooter(bannedUser.user.tag + `(${bannedUser.user.id}) - ${bannedUser.user.name}`, bannedUser.user.displayAvatarURL() + ' ')
              message.channel.send(raidanty)
                try{
                    bannedUser.user.send(raidantey)
                }catch{
                  console.log('WystÄ…piĹ‚ bĹ‚ad podczas banowania na serwerze ' + message.guild.name + " uĹĽytwkonika " + bannedUser + " Problem: Nie mozna wyslac wiadomosci na pv")
                }

      })
      }
      

     
  
    
  }
}
if(message.guild.id === "815232714823041056"){
  if(message.mentions.members.size > 6){
    if(!message.member.hasPermission('ADMINISTRATOR')){
      const memberToBan = message.guild.members.cache.get(message.author.id)
            memberToBan.ban().then((bannedUser) => {
                
        let raidantey = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('AntyRaid')
            .setDescription('> <:osoby:840643966931304468> - **' + bannedUser.user.tag + '!** ZostaĹ‚eĹ› zbanowany za prĂłbÄ™ rajdu, jeĹ›li to przypadek/lub nie byĹ‚o to zamierzone. Skontaktuj siÄ™ z Vmkk#2869 na pv!')
            .setFooter(bannedUser.user.tag + `(${bannedUser.user.id}) - ${bannedUser.user.name}`, bannedUser.user.displayAvatarURL() + ' ')
      let raidanty = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setTitle('AntyRaid')
          .setDescription('> <:osoby:840643966931304468> - **' + bannedUser.user.tag + '!** PrĂłbowaĹ‚ zrajdowaÄ‡ serwer! ZostaĹ‚ on zbanowany automatycznie!')
          .setFooter(bannedUser.user.tag + `(${bannedUser.user.id}) - ${bannedUser.user.name}`, bannedUser.user.displayAvatarURL() + ' ')
            message.channel.send(raidanty)
              try{
                  bannedUser.user.send(raidantey)
              }catch{
                console.log('WystÄ…piĹ‚ bĹ‚ad podczas banowania na serwerze ' + message.guild.name + " uĹĽytwkonika " + bannedUser + " Problem: Nie mozna wyslac wiadomosci na pv")
              }

    })
    }
    

   

  
}
}

  if (message.content.includes('discord.gg/'||'discord.com/invite/')) {
      if(message.guild.id == "842732495446605824"){
        if(message.member.hasPermission('MANAGE_MESSAGES')){

        }else{
           let sq_nolink = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle('AntyInvite')
  .setDescription('> <:mod:836515080493203488> **' + message.author.tag + '!** PrĂłbowaĹ‚ siÄ™ zareklamowaÄ‡!')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
  let sq_nolink3 = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle('AntyInvite')
  .setDescription('> <:osoby:840643966931304468> - **' + message.author.tag + '!** Nie moĹĽesz siÄ™ reklamowaÄ‡!')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')

    message.delete()
      .then(message.channel.send(sq_nolink), message.author.send(sq_nolink3))
      }
        }
        
 
  }



  if(!message.content.startsWith(prefix) || message.author.bot) return
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase()


   //--------------------------------------------------------------------------- COOLDOWN
  
  let sq_glob_nopex = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
  .setDescription('> <:mod:836515080493203488> **BĹ‚Ä…d!** Nie posiadasz wystarczajÄ…cych uprawnien!')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')

  if(command) {

    if(message.channel.type === 'dm'){
      let sq_gban_add3 = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('StormBOT')
      .setDescription('<:osoby:840643966931304468> - **Blokada** Komendy na DM sÄ… zablokowane!')
      .setFooter(message.author.tag + `(${message.author.id}) - Prywatna wiadomoĹ›Ä‡`, message.author.displayAvatarURL() + ' ')
      return message.channel.send(sq_gban_add3)
    }else{
      if (talkedRecently.has(message.author.id)) {
      let sq_gban_add = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('StormBOT')
      .setDescription('<:osoby:840643966931304468> - **SprĂłbuj ponowie za 5s** Musisz odczekaÄ‡ podany czas przed uĹĽyciem komendy!')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
      return message.channel.send(sq_gban_add).then(m=>{
        setTimeout(function(){
          m.delete()
        }, 5000); 
      });
    } else {
  
  
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    talkedRecently.delete(message.author.id);
  }, 5000);
    }
  
    
  }
}
     
if (command === 'weryfikacja') {
  let sukces = new Discord.MessageEmbed()
   .setColor('GREEN')
   .setTimestamp()
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
   .setTitle('Weryfikacja')
   .setDescription('`đź”°` ZostaleĹ› pomyĹ›lnie zweryfikowany, pamiÄ™taj aby przestrzegaÄ‡ regulamin! MiĹ‚ej zabawy na serwerze.')
   let newEmbed = new Discord.MessageEmbed()
   .setColor('BLUE')
   .setTimestamp()
   .setFooter(message.author.tag + " PomyĹ›lnie zweryfikowano!", message.author.displayAvatarURL() + ' ')
   .setTitle('Weryfikacja - StormBOT')
   .setDescription('PomyĹ›lnie zweryfikowano uĹĽytkownika **' + message.author.tag + '**')
   .addFields(
    { name: '- ID:', value: message.author.id, inline: true },
    { name: '- Serwer', value: message.guild.name, inline: true },
    { name: '- UĹĽytkownik jest na:', value: message.author.tag + ' serwerach!', inline: true },
    { name: '- Dolaczyl do serwera:', value: message.member.joinedAt, inline: true },
    { name: '- Kanal weryfikacji:', value: message.channel.name, inline: true },

   )
  if (message.guild.id === '842732495446605824') {
    if (message.channel.id === '842732495804039168') {
      var role = message.guild.roles.cache.find(role => role.id === "842732495446605825");  
      message.member.roles.add(role)
      message.author.send(sukces)
      client.channels.cache.get('842754313528016916').send(newEmbed)
      message.delete()
    } else {
      message.delete()
    }
  } else {
    message.delete()
  }
}
   //--------------------------------------------------------------------------- BLACK LISTA

  
if(message.author.id === '824243749105565716') {
  const exampleEmbed = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('BĹ‚Ä…d krytyczny!')
  .setDescription('> `đźš«` **' + message.author.tag + '  ZostaĹ‚eĹ› zablokowany na bota (`GBAN`)**! Nie moĹĽesz korzystaÄ‡ z komend bota! Jakim cudem tak szybko go zarobiĹ‚eĹ›?')

  return message.channel.send(exampleEmbed)
}
if(message.author.id === '736682166527852687') {
  const exampleEmbed = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('BĹ‚Ä…d krytyczny!')
  .setDescription('> `đźš«` **' + message.author.tag + '  ZostaĹ‚eĹ› zablokowany na bota (`GBAN`)**! Nie moĹĽesz korzystaÄ‡ z komend bota! Jakim cudem tak szybko go zarobiĹ‚eĹ›?')

  return message.channel.send(exampleEmbed)
}
if(message.author.id === '674369062742261781') {
  const exampleEmbed = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('BĹ‚Ä…d krytyczny!')
  .setDescription('> `đźš«` **' + message.author.tag + '  ZostaĹ‚eĹ› zablokowany na bota (`GBAN`)**! Nie moĹĽesz korzystaÄ‡ z komend bota! Jakim cudem tak szybko go zarobiĹ‚eĹ›? PowĂłd: Dodawanie pustych serwerĂłw, i mieszanie z weryfikacja')

  return message.channel.send(exampleEmbed)
}
if(message.author.id === '673306402030223391') {
  const exampleEmbed = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('BĹ‚Ä…d krytyczny!')
  .setDescription('> `đźš«` **' + message.author.tag + '  ZostaĹ‚eĹ› zablokowany na bota (`GBAN`)**! Nie moĹĽesz korzystaÄ‡ z komend bota! Jakim cudem tak szybko go zarobiĹ‚eĹ›? PowĂłd: Dodawanie pustych serwerĂłw, i mieszanie z weryfikacja')

  return message.channel.send(exampleEmbed)
}

//--------------------------------------------------------------------------- CMD HANDLER
if(command === "panel"){
  client.commands.get('cmd-panel').execute(message, args);
}
if(command === "anime"){
  client.commands.get('cmd-anime').execute(message, args);
}
if(command === "shrug"){
  client.commands.get('cmd-shrug').execute(message, args);
}
if(command === "joke"){
  client.commands.get('cmd-joke').execute(message, args);
}
if(command === "kotek"){
  client.commands.get('cmd-cat').execute(message, args);
}
if(command === "pkn"){
  client.commands.get('cmd-pkn').execute(message, args);
}
if(command === "fakt"){
  client.commands.get('cmd-fakt').execute(message, args);
}
if(command === "kolor"){
  client.commands.get('cmd-color').execute(message, args);
}
if(command === "meme"){
  client.commands.get('cmd-mem').execute(message, args);
}
if(command === "opusc"){
  client.commands.get('cmd-forceleave').execute(message, args);
}
if(command === "losuj"){
  client.commands.get('cmd-random-number').execute(message);
}
if(command === "ticket"){
  if(message.channel.id === "842732495996190740"){
    client.commands.get('ticket').execute(message, args, command, client, Discord);
  }else{
    let ticket_nochannel = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
    .setDescription('> <:mod:836515080493203488> **- BĹ‚Ä…d!** Opcja dostÄ™pna tylko na serwerze developera!')
    .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
    message.channel.send(ticket_nochannel)
  }

}
//--------------------------------------------------------------------------- COMMAND


    if(command === "gban"){
      if(message.author.id === "768602416630988820"){

        let sq_gban_usage1 = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('BĹ‚Ä…d podczas wykonywania komendy (gban)!')
        .setDescription('> <:mod:836515080493203488> **| Poprawne uĹĽycie:** .gban <uĹĽytkownik> <powĂłd>')
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')


         text1 = message.mentions.users.first()
      text2 = [...args].slice(1).join(" ")


      if(!text1) return message.channel.send(sq_gban_usage1)
      if(!text2) return message.channel.send(sq_gban_usage1)
      let sq_gban_add = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Nadano GBANA!')
        .addFields(
          {name: "<:mod:836515080493203488> | Administrator", value: message.author.tag, inline: true},
          {name: "<:osoby:840643966931304468> | UĹĽytkownik", value: `${text1}`, inline: true},
          {name: "<:znaczek:835096478883643453> | PowĂłd nadania gbana", value: `${text2}`, inline: true},
        )
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
        message.channel.send(sq_gban_add)
      }
    }
     





  

    if(command === "help"){
    if(message.author.bot) return;
    let st_help = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Pomoc bota! - Prefix: ' + prefix, client.user.displayAvatarURL() + " Bot jest caĹ‚y czas rozwijany!")
      .addFields(
        {name: "<:mod:836515080493203488> ă»Komendy Administracyjne (`8`):", value: "`embed`, `warn`, `clear`, `pv`, `boost-post`, `ankieta`, `kick`, `ban`", inline: false},
        {name: "<:osoby:840643966931304468> ă»Komendy OgĂłlne (`6`):", value: "`gbans`, `czlonkowie`, `ping`, `nakladka`, `warnlist`, `userinfo(BETA)`,", inline: false},
        {name: "<:ping:839877264962355201> ă»Komendy 4FUN (`15`):", value: "`8ball`, `iq`, `gry`, `ship`, `uderz`, `figlet`, `kostka`, `kolor`, `shrug`, `anime`, `pkn`, `meme`, `kotek`, `joke`, `fakt`,", inline: false},
        {name: "<:dev:840643966935498752> ă»Komendy Konfiguracyjne (`4`):", value: "`setwelcome`, `funkcje`, `setleft`, `setsuggest`,", inline: false},
        {name: "<:znaczek:835096478883643453> ă»Komendy Inne (`3`):", value: "`avatar`, `emoji`, `mcstatus`", inline: false},
        {name: "<:bot:839877265436966942> ă»Komendy Bota (`9`):", value: "`botinfo`, `invite`, `zapros`, `dev`, `nakladka`, `poradniki`, `botzglos`, `ocen`, `lastupdate`,", inline: false},
        {name: "<:voice:839882731315789848> ă»Muzyka i Radio 24/7 (`0`):", value: "soon", inline: false},
        {name: "\n\n<:info:836515080605663255> ă»Linki:", value: "[Strona Bota](http://stormbot.gg/) ă» [Serwer Developerski](https://discord.com/invite/VgfGqReTMm) ă» [Statusy ShardĂłw](http://c.pl/)", inline: false},
      )
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
    message.reply(st_help)
  }




if(command === "funkcje"){
  let funkcje_help= new Discord.MessageEmbed()
    .setColor('#a0ffe0')
    .setDescription('**đź“Ś ă» Funkcje bota**\n\n')
    .addFields(
      {name: "DostÄ™pne funkcje", value: "ă»PoniĹĽej znajduje siÄ™ ich lista: \n", inline: false},
      {name: "â”Ť <:osoby:840643966931304468>ă»Powitania", value: "**â”–** `.funkcje powitania` - Komenda na ustawienia powitania", inline: false},
      {name: "â”Ť <:osoby:840643966931304468>ă»Pozegnania", value: "**â”–** `.funkcje pozegnania` - Komenda na ustawienia powitania", inline: false},
      {name: "â”Ť <:ping:839877264962355201>ă»Propozycje", value: "**â”–** `.funkcje propozycje` - Komenda na ustawienia powitania", inline: false},
      {name: "â”Ť <:bot:839877265436966942>ă»AntyInvite", value: "**â”–** `.funkcje antyinvite` - Komenda na ustawienia AntyInvite", inline: false},
      {name: "â”Ť <:dev:840643966935498752>ă»AntyRaid", value: "**â”–** `.funkcje antyraid` - AntyRaid, za jego pomocÄ… moĹĽesz ustawiÄ‡ ilosÄ‡ wzmianek w jednej wiadomoĹ›ci, po ktĂłrej daje automatycznego bana! Zapobiega to rajdom, czyli masowemu pingownaia caĹ‚ego serwera!", inline: false},

    )
    .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
  if(!args[0]) return message.channel.send(funkcje_help)
  if(args[0] === "pozegnania"){
    if(message.member.hasPermission('MANAGE_GUILD')){
      let usagepostadd2232 = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
      .setDescription('> **BĹ‚Ä…d!**: Nie PodaĹ‚eĹ› kanaĹ‚u na ktĂłrym chcesz ustawiÄ‡ PoĹĽegnania!\n> **Poprawne uĹĽycie: ** .funkcje pozegnania <id kanalu> <kolor> <tekst>')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
      let usagepostadd232 = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
      .setDescription('> **Podaj wiadomosÄ‡!**: Musisz podaÄ‡ wiadomoĹ›Ä‡ MoĹĽesz uĹĽyÄ‡ tych znacznikĂłw: `{user} = Nazwa uĹĽytkownika | {user.tag} = Tag uzytkownika | {user.id} = ID uĹĽytkownika`!\n> **Poprawne uĹĽycie: ** .funkcje pozegnania <id kanalu> <kolor> <tekst>')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
      let usag = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
      .setDescription('> **Podaj kolor!**: Nie WybraĹ‚eĹ› koloru wiadomosci!\n> **Poprawne uĹĽycie: ** .funkcje pozegnania <id kanalu> <kolor> <tekst>')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
      let text1 = args[1];
      let textelo = args[2];
      let welmessage = [...args].slice(3).join(" ");
      if(!text1) return message.channel.send(usagepostadd2232)
      if(!args[2]) return message.channel.send(usag)
      if(!args[3]) return message.channel.send(usagepostadd232)
      if(message.guild.channels.cache.get(text1)){
        const nazwaa = message.author.tag;
        const wel = await Leaves.findOne({ where: { server2: message.guild.id }});
        if(wel){
        let balanceuser = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle('Ustawienia - PoĹĽegnania')
          .setDescription('> `đźź˘` **Ustawnia powitania** UstawiĹ‚eĹ› poĹĽegnania na kanale ' + `**<#${text1}>**` + ` z kolorem ${textelo} oraz wiadomosciÄ… na wejĹ›cie: ` + welmessage)
          .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
          wel.update({ channeli2: text1.replace("<#", "").replace(">", "") }, { where: { server2: message.guild.id } });
          wel.update({ color2: textelo }, { where: { server2: message.guild.id } });
          wel.update({ message2: welmessage }, { where: { server2: message.guild.id } });
        message.channel.send(balanceuser)
        }else{
          let balanceuser = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle('Ustawienia - PoĹĽegnania')
          .setDescription('> `đźź˘` **Ustawnia powitania** UstawiĹ‚eĹ› poĹĽegnania na kanale ' + `**<#${text1}>**` + ` z kolorem ${textelo} oraz wiadomosciÄ… na wejĹ›cie: ` + welmessage)
          .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
        message.channel.send(balanceuser)
          Leaves.create({
          server2: message.guild.id,
          channeli22: text1,
          color2: textelo,
          message2: welmessage,
        });
    }
      }else{
        let usagepostadd22 = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
        .setDescription('> **Nie odnaleziono kanaĹ‚u!**: Nie odnaleziono takiego kanaĹ‚u na serwerze!')
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
        message.channel.send(usagepostadd22)
      }
    }else{
      let usagepostadd2 = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
      .setDescription('> **Nie posiadasz uprawnien!**: Nie posiadasz wystarczajÄ…cych uprawnien! Potrzebujesz `MANAGE_GUILD`')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
      message.channel.send(usagepostadd2)
    }
  }else{
    message.channel.send(funkcje_help)
  }
}


  if(command === "odev"){
    if(message.guild.id == "842732495446605824"){
      if(message.member.hasPermission('MANAGE_GUILD')){
        let sq_glob_nopex44 = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Statystyki')
        .setDescription('> `âś…` Pomyslnie odswiezono statystyki serwera deweloperskiego!')
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
      
        message.reply(sq_glob_nopex44)
        client.channels.cache.get('842755281784274984').setName(`đź“ă»Servers: ${client.guilds.cache.size}`);
        client.channels.cache.get('843044720662020096').setName(`đź‘Ąă»BOT Users: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`);
        client.channels.cache.get('842755101968957470').setName(`đź‘Ąă»Server Users: ${message.guild.memberCount}/250`);

      }else{
        let sq_glob_nopex4 = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
        .setDescription('> <:mod:836515080493203488> **BĹ‚Ä…d!** Nie posiadasz wystarczajÄ…cych uprawnien!')
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
      
        message.reply(sq_glob_nopex4)
      }
    }
  }
if(command === "lastupdate"){
  let nodm33 = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Ostatnie zmiany w bocie!')
        .setDescription('> `âś…` **Ostatnie zmiany w bocie** PoniĹĽej znajduje siÄ™ lista zarejestrowanych zmian!\n\n - `Dodano komendÄ™ ,warnlist z permisjami: none`\n- `Ustawiono max 250 znakĂłw na opini.`\n- `Dodano nowe wyrazy w .8ball`\n- `Ustawiono glonbalny cooldown na komendy!`')
        .setTimestamp()
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')

        message.channel.send(nodm33); 
        
        
}

  if(command === "ocen"){

    
  // Removes the user from the set after a minute
    let discordrate = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Ocena Bota!')
      .setDescription('> **Poprawne uĹĽycie: ** .ocen <1-10> <komentarz (`musisz uzasadniÄ‡ swojÄ… opinie`)>')
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      let discordrate3 = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Ocena Bota!')
      .setDescription('> **WystÄ…biĹ‚ bĹ‚Ä…d: ** Komentarz do opini moĹĽe mieÄ‡ max 250 znakĂłw!')
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
    if(!args[0]) return message.reply(discordrate)
    if(!args[1]) return message.reply(discordrate)
    let text = [...args].slice(1).join(' ')
    if(text.length > "250") return message.reply(discordrate3)
    if(args[0] === "1"){
      let rate = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> OceniĹ‚eĹ› bota na 1 â­ oraz dodaĹ‚eĹ› komentarz ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
      let rateing = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> UĹĽytkownik bota **' + message.author.tag + '** oceniĹ‚ go na 1 â­\n> Komentarz: ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
    message.channel.send(rate)
      client.channels.cache.get('842732495996190743').send(rateing)
    }else if(args[0] === "2"){
      let rate = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> OceniĹ‚eĹ› bota na 2 â­ oraz dodaĹ‚eĹ› komentarz ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
      let rateing = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> UĹĽytkownik bota **' + message.author.tag + '** oceniĹ‚ go na 2 â­\n> Komentarz: ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
    message.channel.send(rate)
      client.channels.cache.get('842732495996190743').send(rateing)
    }
    else if(args[0] === "3"){
      let rate = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> OceniĹ‚eĹ› bota na 3 â­ oraz dodaĹ‚eĹ› komentarz ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
      let rateing = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> UĹĽytkownik bota **' + message.author.tag + '** oceniĹ‚ go na 3 â­\n> Komentarz: ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
    message.channel.send(rate)
      client.channels.cache.get('842732495996190743').send(rateing)
    }
    else if(args[0] === "4"){
      let rate = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> OceniĹ‚eĹ› bota na 4 â­ oraz dodaĹ‚eĹ› komentarz ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
      let rateing = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> UĹĽytkownik bota **' + message.author.tag + '** oceniĹ‚ go na 4 â­\n> Komentarz: ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
    message.channel.send(rate)
      client.channels.cache.get('842732495996190743').send(rateing)
    }
    else if(args[0] === "5"){
      let rate = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> OceniĹ‚eĹ› bota na 5 â­ oraz dodaĹ‚eĹ› komentarz ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
      let rateing = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> UĹĽytkownik bota **' + message.author.tag + '** oceniĹ‚ go na 5 â­\n>  Komentarz: ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
    message.channel.send(rate)
      client.channels.cache.get('842732495996190743').send(rateing)
    }
    else if(args[0] === "6"){
      let rate = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> OceniĹ‚eĹ› bota na 6 â­ oraz dodaĹ‚eĹ› komentarz ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
      let rateing = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> UĹĽytkownik bota **' + message.author.tag + '** oceniĹ‚ go na 6 â­\n> Komentarz: ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
    message.channel.send(rate)
      client.channels.cache.get('842732495996190743').send(rateing)
    }
    else if(args[0] === "7"){
      let rate = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> OceniĹ‚eĹ› bota na 7 â­ oraz dodaĹ‚eĹ› komentarz ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
      let rateing = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> UĹĽytkownik bota **' + message.author.tag + '** oceniĹ‚ go na 7 â­\n> Komentarz: ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
    message.channel.send(rate)
      client.channels.cache.get('842732495996190743').send(rateing)
    }  else if(args[0] === "8"){
      let rate = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> OceniĹ‚eĹ› bota na 8 â­ oraz dodaĹ‚eĹ› komentarz ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
      let rateing = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> UĹĽytkownik bota **' + message.author.tag + '** oceniĹ‚ go na 8 â­\n> Komentarz: ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
    message.channel.send(rate)
      client.channels.cache.get('842732495996190743').send(rateing)
    }  else if(args[0] === "9"){
      let rate = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('>  OceniĹ‚eĹ› bota na 9 â­ oraz dodaĹ‚eĹ› komentarz ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
      let rateing = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> UĹĽytkownik bota **' + message.author.tag + '** oceniĹ‚ go na 9 â­\n> Komentarz: ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
    message.channel.send(rate)
      client.channels.cache.get('842732495996190743').send(rateing)
    }  else if(args[0] === "10"){
      let rate = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> OceniĹ‚eĹ› bota na 10 â­ oraz dodaĹ‚eĹ› komentarz ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
      let rateing = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ocena Bota!')
      .setDescription('> UĹĽytkownik bota **' + message.author.tag + '** oceniĹ‚ go na 10 â­\n> Komentarz: ' + text)
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setTimestamp()
    message.channel.send(rate)
      client.channels.cache.get('842732495996190743').send(rateing)
    }else{
      message.reply(discordrate)
    }
  

    

  }
  

  if(command === "userinfo"){
    let men = message.mentions.members.first()
    let a = message.author;
    if(men){
      let ui_no = new Discord.MessageEmbed()
      .setDescription('**<:book:845191089707155466> Informacje o **' + `${men.user.tag}`)
      .setColor('GREEN')
      .addFields(
        {name: '<:personframe:845191089266622464> | Nazwa:', value: men.user.username, inline: true},
        {name: '<:book:845191089707155466> | Tag:', value: men.user.tag, inline: true},
        {name: '<:connection:845191070576410654> | Id:', value: men.user.id, inline: true},
        {name: '<:settigns:845191052935168011> | DoĹ‚Ä…czyĹ‚ do serwera:', value: men.joinedAt.getDate() + "." + `${men.joinedAt.getUTCMonth()+1}`+ "." + men.joinedAt.getFullYear(), inline: true},
        {name: '<:library:845191053887012875> | IloĹ›Ä‡ rĂłl:', value: men.roles.cache.size, inline: true},
        {name: '<:activity:845191079280246824> | Administrator:', value: men.hasPermission('ADMINISTRATOR')||"Nie posiada", inline: true},
        {name: '<:live:845191070061166592> | Stream:', value: men.voice.streaming||"Nie streamuje", inline: true},
        {name: '<:connection:845191070576410654> | Id Ostatniej wiadomosci:', value: a.lastMessageID, inline: true},
        {name: '<:settigns:845191052935168011> | Ostatnia wiadomosÄ‡:', value: men.lastMessage||"_Nie udaĹ‚o siÄ™ wczytaÄ‡_", inline: true},
        {name: '<:partner:845191091884130354> | Partner dsc:', value: men.user.flags.has('DISCORD_PARTNER')||"Nie", inline: true},
        {name: '<:dev:845191092403044352> | Zweryfkowany dev:', value: men.user.flags.has('VERIFIED_DEVELOPER')||"Nie", inline: true},
        {name: '<:1332home:845191065182011392> | Dom balance:', value: men.user.flags.has('HOUSE_BALANCE')||"Nie", inline: true},
        {name: '<:1332home:845191065182011392> | Dom bravery:', value: men.user.flags.has('HOUSE_BRAVERY')||"Nie", inline: true},
        {name: '<:1332home:845191065182011392> | Dom brilliance:', value: men.user.flags.has('HOUSE_BRILLIANCE')||"Nie", inline: true},
        {name: '<:comment:845191085294485534> | Ĺapacz bugĂłw lvl1:', value: men.user.flags.has('BUGHUNTER_LEVEL_1')||"Nie", inline: true},
        {name: '<:comment:845191085294485534> | Ĺapacz bugĂłw lvl2:', value: men.user.flags.has('BUGHUNTER_LEVEL_2')||"Nie", inline: true},
        )
      message.channel.send(ui_no)
    }else{
          let ui_no = new Discord.MessageEmbed()
      .setDescription('**<:book:845191089707155466> Informacje o **' + a.tag)
      .setColor('GREEN')
      .addFields(
        {name: '<:personframe:845191089266622464> | Nazwa:', value: a.username, inline: true},
        {name: '<:book:845191089707155466> | Tag:', value: a.tag, inline: true},
        {name: '<:connection:845191070576410654> | Id:', value: a.id, inline: true},
        {name: '<:library:845191053887012875> | IloĹ›Ä‡ rĂłl:', value: message.member.roles.cache.size, inline: true},
        {name: '<:activity:845191079280246824> | Administrator:', value: message.member.permissions.has('ADMINISTRATOR')||"Nie posiada", inline: true},
        {name: '<:live:845191070061166592> | Stream:', value: message.member.voice.streaming||"Nie streamuje", inline: true},
        {name: '<:integration:845191073424867388> | Dyskr.:', value: a.discriminator.toString(), inline: true},
        {name: '<:connection:845191070576410654> | Id Ostatniej wiadomosci:', value: a.lastMessageID, inline: true},
        {name: '<:settigns:845191052935168011> | Ostatnia wiadomosÄ‡:', value: a.lastMessage||"_Nie udaĹ‚o siÄ™ wczytaÄ‡_", inline: true},
        {name: '<:partner:845191091884130354> | Partner dsc:', value: a.flags.has('DISCORD_PARTNER')||"Nie", inline: true},
        {name: '<:dev:845191092403044352> | Zweryfkowany dev:', value: a.flags.has('VERIFIED_DEVELOPER')||"Nie", inline: true},
        {name: '<:1332home:845191065182011392> | Dom balance:', value: a.flags.has('HOUSE_BALANCE')||"Nie", inline: true},
        {name: '<:1332home:845191065182011392> | Dom bravery:', value: a.flags.has('HOUSE_BRAVERY')||"Nie", inline: true},
        {name: '<:1332home:845191065182011392> | Dom brilliance:', value: a.flags.has('HOUSE_BRILLIANCE')||"Nie", inline: true},
        {name: '<:comment:845191085294485534> | Ĺapacz bugĂłw lvl1:', value: a.flags.has('BUGHUNTER_LEVEL_1')||"Nie", inline: true},
        {name: '<:comment:845191085294485534> | Ĺapacz bugĂłw lvl2:', value: a.flags.has('BUGHUNTER_LEVEL_2')||"Nie", inline: true},
        )
      message.channel.send(ui_no)
    }

  }







  if(command === "dev-ogloszenie"){
        if(message.guild.id === "842732495446605824"){
      if(message.member.permissions.has("MANAGE_MESSAGES")){
        let elodev = new Discord.MessageEmbed()
          .setColor('7955FF')
          .setDescription([...args].join(" "))
          .setImage('https://images-ext-1.discordapp.net/external/ctcQyWQ3k_1DvfaK-f2YOPj6xNATS9DU5w5lxzBo8xQ/%3Fwidth%3D1213%26height%3D682/https/media.discordapp.net/attachments/842841769070166106/843077225041231902/storm.png?width=1092&height=614')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
      message.channel.send(elodev)
      }

    }
  }
  if(command === "dev-ogloszenie2"){
    if(message.guild.id === "842732495446605824"){
  if(message.member.permissions.has("MANAGE_MESSAGES")){
    let elodev = new Discord.MessageEmbed()
      .setColor('7955FF')
      .setDescription([...args].join(" "))
      .setImage('https://images-ext-2.discordapp.net/external/qfcdZRowebNxWLwvweY1aU7j1LhbJnjSjRxuiJiv334/%3Fwidth%3D421%26height%3D54/https/media.discordapp.net/attachments/843152366677262348/844519297946484776/standard_3.gif?width=379&height=494')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
  message.channel.send(elodev)
  }

}
}

  if(command === "dev-mute"){
    if(message.guild.id === "842732495446605824"){
      if(message.member.permissions.has("MANAGE_MESSAGES")){
        let usertomute = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
        let reasonmute = [...args].slice(1).join(" ")
        var role = message.guild.roles.cache.find(role => role.id === "842732495446605825");
        let st_mute_seccess = new Discord.MessageEmbed()
          .setColor('#00ff00')
          .setTitle('Dev mute - StormBOT')
          .setDescription('> `đźź˘` **Wyciszono uĹĽytkownika ' + `${usertomute}` + '!** Za: ' + reasonmute)
        message.channel.send(st_mute_seccess)  
                client.channels.cache.get('843087889792237568').send(`${usertomute}` + ' zostaĹ‚eĹ› wyciszony za: ' + reasonmute)
        usertomute.roles.add(role)

        message.delete()
      }else{
        const nopex = new Discord.MessageEmbed()
          .setColor('#FF5733')
          .setTitle('Dev mute - StormBOT')
        .setDescription('> `âťŚ` Nie posiadam/posiadasz uprawnien! Potrzebujesz/Potrzebuje uprawnienia: `MANAGE_MESSAGES`(Lub bycia wyzej niĹĽ rola osoby ktĂłrÄ… chcesz zmutowaÄ‡!)')
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
          return channel.send(nopex)
      }
    }
  }























  if(command === "ban"){
    if(message.member.permissions.has('BAN_MEMBERS')){
      const { channel, guild, mentions, author } = message

        let date = new Date()
        let daysArg = +args[1]
        if (!isNaN(daysArg)) {
          if (daysArg < 0) daysArg = 0
          if (daysArg > 7) daysArg = 7
        }
        const reasonArg = [...args].slice(isNaN(daysArg) ? 1 : 2).join(" ")
        const userToBan = mentions.users.first();
        if (!userToBan) {
                const usage1 = new Discord.MessageEmbed()
                .setColor('#FF5733')
                .setTitle('Blad!')
        .setDescription('> `âťŚ` Wpisz jakÄ… osobÄ™ chcesz zbanowaÄ‡!')
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
          return message.reply(usage1)
        }
        if (userToBan.id === author.id) {
          const usage2 = new Discord.MessageEmbed()
          .setColor('#FF5733')
          .setTitle('Blad!')
        .setDescription('> `âťŚ` (xD) Czemu chcesz siÄ™ sam zbanowaÄ‡?')
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ');
          return message.channel.send(usage2)
    
        }
    
        const memberToBan = guild.members.cache.get(userToBan.id)
    
        if (!memberToBan.bannable) {
          const nopex = new Discord.MessageEmbed()
          .setColor('#FF5733')
          .setTitle('Blad!')
        .setDescription('> `âťŚ` Nie posiadam/posiadasz uprawnien! Potrzebujesz/Potrzebuje uprawnienia: `BAN_MEMBERS`(Lub bycia wyzej niĹĽ rola osoby ktĂłrÄ… chcesz zbanowaÄ‡!)')
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
          return channel.send(nopex)
    
        }
        const banOptions = {
          reason: reasonArg,
        }
    

    
        memberToBan.ban(banOptions).then((bannedUser) => {
          
    

          let warnuser = new Discord.MessageEmbed()
          .setColor('#FF5733')
          .setTitle('Sukces!')
          .setTimestamp()
          .setDescription('> `!` PomyĹ›lnie zbanowano uĹĽytkowika:')
          .setFooter(message.author.tag + ' ')
          .addFields(
           { name: '> `đź‘¤` **UĹĽytkownik:**', value: bannedUser, inline: true},
           { name: '> `đź’ˇ` **Administrator:**', value: message.author, inline: true},
           { name: '> `đź“¦` **Serwer:**', value: message.guild.name, inline: true},
           { name: '> `đź“–` **Data i godzina:**', value: date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes(), inline: true},
           { name: '> `đź“©` **KanaĹ‚:**', value: message.channel.name, inline: true},
           { name: '> `đź“‘` **PowĂłd:**', value: reasonArg, inline: true},
        
         )

         let warnusser = new Discord.MessageEmbed()
         .setColor('#FF5733')
         .setTitle('Zbanowany!')
         .setTimestamp()
         .setDescription('> `!` ZostaĹ‚eĹ› zbanowany! Zapoznaj siÄ™ z informacjami o zbanowaniu poniĹĽej:')
         .setFooter(message.author.tag + ' ')
         .addFields(
          { name: '> `đź‘¤` **UĹĽytkownik:**', value: bannedUser, inline: true},
          { name: '> `đź’ˇ` **Administrator:**', value: message.author, inline: true},
          { name: '> `đź“¦` **Serwer:**', value: message.guild.name, inline: true},
          { name: '> `đź“–` **Data i godzina:**', value: date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes(), inline: true},
          { name: '> `đź“©` **KanaĹ‚:**', value: message.channel.name, inline: true},
          { name: '> `đź“‘` **PowĂłd:**', value: reasonArg, inline: true},
       
        )

          channel.send(warnuser)
          try{
               bannedUser.user.send(warnusser)
          }catch{
            console.log('WystÄ…piĹ‚ bĹ‚ad podczas banowania na serwerze ' + message.guild.name + " uĹĽytwkonika " + bannedUser + " Problem: Nie mozna wyslac wiadomosci na pv")
          }

        })
    }else{
      const nopex = new Discord.MessageEmbed()
      .setColor('#FF5733')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d poczas wykonywania komendy (BAN)')
      .setDescription('> `âťŚ` Nie posiadam/posiadasz uprawnien! Potzrebujesz/Potrzebuje uprawnienia: `BAN_MEMBERS`(Lub bycia wyzej niĹĽ rola osoby ktĂłrÄ… chcesz zbanowaÄ‡!)')
         .setTimestamp()
       .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      message.channel.send(nopex)
    }
    
  }


  if (command === 'botzglos'){
    let report_usage = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
    .setDescription('> **BĹ‚Ä…d!** Musisz podaÄ‡ treĹ›Ä‡ zgĹ‚oszenia! Pamietaj ĹĽe za "bekowe" podania grozi gban!')
    .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
  
    if (!args[0]) return message.channel.send(report_usage)

    const messagetextcontent = [...args].join(" ")
    message.delete()

    const embedsu = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('ZgĹ‚oszenie do developera!')
      .setDescription('> `âś”` **PomyĹ›lnie wysĹ‚ano zgĹ‚oszenie do developera!** PamiÄ™taj, ĹĽe to nie jest komenda, do zabawy!')
      .setTimestamp()
      .setFooter(message.author.tag + ' ')
      .setFooter(message.author.username, message.author.displayAvatarURL());
    message.channel.send(embedsu)

    let newEmbed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('ZgĹ‚oszenie - StormBOT')
      .setDescription('> `âť•` **Nowe zgĹ‚oszenie: **' + messagetextcontent)
      .setTimestamp()
      .setFooter(message.author.tag + ' ')
      .addFields(
        { name: '> `đź“–` **UĹĽytkownik**', value: '> â”• ' + message.author.username, inline: true},
        { name: ' `đź’¬` **Czas:**', value: 'â”• ' + new Date().getDate(), inline: true},
        { name: '> `đź“` **Serwer:**', value: '> â”• ' + message.guild.name, inline: false},
      )
    client.channels.cache.get('843137281719533579').send(newEmbed)
  }
  

  
  if(command == "kostka"){
  let responses = [
    1,
    2,
    3,
    4,
    5,
    6,
  ]
      let response =
      responses[Math.floor(Math.random() * responses.length - 0)];
  let loskost = new Discord.MessageEmbed()
      .setColor('99F7AB')
      .setTitle('Kostki - StormBOT')
      .setDescription('> `đźŽ˛` WylosowaĹ‚eĹ› kostkÄ™ z liczbÄ… oczek **' + response + "**")
      .setImage('https://cdn.discordapp.com/attachments/832682471866368081/832683806481711114/Webp.net-gifmaker_3.gif')
  message.channel.send(loskost)
}

   if (command === 'figlet'){

    let text = [...args].join(" ")
    let figlet_usage = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
    .setDescription('> **BĹ‚Ä…d!** Poprawne uĹĽycie: .figlet <treĹ›Ä‡>')
    .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
  
    if(!text) return message.reply(figlet_usage)
    figlet(text, function(err, data) {
      if (err) {
          message.channel.send(err);
          return;
      }
      message.channel.send('```' + data + '```')
  });
  }
 if (command === 'kick') {
  let ban_noperms = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
  .setDescription('<:osoby:840643966931304468> - **BĹ‚Ä…d!** Nie posiadasz uprawnieĹ„! Potrzebujesz uprawnienia `KICK_MEMBERS`!')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(ban_noperms)
    const { channel, guild, mentions, author } = message

    const reasonArg = [...args].slice(1).join(" ")

    const userToKick = mentions.users.first()

    let nouserkicked2 = new Discord.MessageEmbed()
      .setColor('ff0000')
      .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
      .setDescription('<:osoby:840643966931304468> - **BĹ‚Ä…d!** Nie podaĹ‚eĹ› osoby ktĂłrÄ… chcesz wyrzuciÄ‡ z serwera!!')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
    if (!userToKick) {
      return message.reply(nouserkicked2)
    }

    if (userToKick.id === author.id) {
      let nouserkicked3 = new Discord.MessageEmbed()
      .setColor('ff0000')
      .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
      .setDescription('<:osoby:840643966931304468> - **BĹ‚Ä…d!** Zabezpieczenie(aid-n) zapobiega tej akcji! Nie moĹĽesz siebie wyrzuciÄ‡ z serwera')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')

      return message.reply(nouserkicked3)
    }

    const memberToKick = guild.members.cache.get(userToKick.id)

    if (!memberToKick.kickable) {
      return channel.send("Nie mam uprawnieĹ„ do wyrzucania uĹĽytkownikĂłw!")
    }
    memberToKick.kick(reasonArg).then((res) => {
      const witaj = new Discord.MessageEmbed()
	    .setColor('#ff0000')
      .setTitle('Wyrzucenie - StormBOT')
      .setThumbnail('https://emoji.discord.st/emojis/e66fc2d2-c913-419f-bec0-719c855a4184.gif')
      .setTimestamp()
      .setFooter(message.author.tag + ' ')
        .addFields(
          { name: 'đź‘¤ **UĹĽytkownik:**', value: `${res.displayName}`, inline: true},
          { name: 'đźš« **Administrator:**', value: message.author, inline: true},
          { name: 'đź“¦ **Serwer:**', value: message.guild.name, inline: true},
          { name: 'đź“© **KanaĹ‚:**', value: message.channel.name, inline: true},
          { name: 'đź“‘ **PowĂłd:**', value: `${reasonArg}`, inline: false},
       
        )

      channel.send(witaj)
    })




  }
if(command === "uderz"){
  const Canvas = require('canvas');

  
        const hituser_usage = new Discord.MessageEmbed()
        .setColor('#5C9EAD')
        .setTitle('Uderzenie - StormBOT')
        .setDescription('> `đź‘Š` Musisz podaÄ‡ kogo chcesz udarzyÄ‡!')
        .setImage('https://cdn.discordapp.com/attachments/830756030849876001/832676813553664030/Webp.net-gifmaker.gif')
      
        if(!args[0]) return message.channel.send(hituser_usage)
      

      
        const canvas = Canvas.createCanvas(700, 450);
        const ctx = canvas.getContext('2d');
      
        const background = await Canvas.loadImage('https://media.discordapp.net/attachments/830756030849876001/843120959439110174/g.jpg?width=864&height=526');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
       // ctx.font = '60px sans-serif';
      //  ctx.fillStyle = '#ffffff';
       // ctx.fillText(message.author.displayName, canvas.width / 2.5, canvas.height / 1.8);
      
        ctx.beginPath();
        ctx.arc(100, 100, 1000, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
      
        if(!message.mentions.users.first()) return message.reply('Podaj osobe')
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const avatar2 = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar2, 165, 45, 100, 100);
    
        ctx.drawImage(avatar, 465, 75, 100, 100);
      
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'gg.png');
      
    


        const hituser = new Discord.MessageEmbed()
          .setColor('#5C9EAD')
          .setTitle('Uderzenie - StormBOT')
          .setDescription('> `đź‘Š` UĹĽytkownik ' + message.author.username + ' uderzyĹ‚ ' + user)
      
        message.channel.send(hituser)
        message.channel.send(attachment)
        
}
  if(command === "ankieta"){
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(sq_glob_nopex);
    if (!args[0])
      return message.channel.send('âťŚ Wpisz treĹ›Ä‡ ankiety!')
  
      let text = [...args].join(" ")
      let data = new Date()
      let newembed2 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('đź“Š - Ankieta!')
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
      .setDescription('> `đź‘¤` **' + message.author.username + ' zrobiĹ‚ ankietÄ™!** \n> `đź‘Š` Data i godzina: ' + data.getUTCDay() +"."+data.getUTCMonth() +"."+data.getFullYear()+" - "+data.getHours() +":"+data.getMinutes() + '  \n\n> `đź“ˇ` **TreĹ›Ä‡:** ' + text)
      message.delete()
      message.channel.send(newembed2).then(msg => {
        msg
            .react('<:Tak:842797842884198400>')
            .then(() => msg.react('<:Nie:842798837696430090>'))
    })
  }
if (command === 'boost-post'){
  let no_perx = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
  .setDescription('> `đź”´` **BĹ‚Ä…d!** Nie posiadasz wystarczajÄ…cych uprawnien! Potrzebujesz `MANAGE_MESSAGES`')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
  let no_text = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
  .setDescription('> `đź”´` **BĹ‚Ä…d!** Musisz napisac treĹ›Ä‡ embeda!')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')

  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(no_perx);
  if (!args[0]) return message.channel.send(no_text)
    let kisssuser = [...args].join(" ")
    message.delete()
    let kissembed = new Discord.MessageEmbed()
      .setColor('EF97FF')
      .setTitle('')
      .setThumbnail('https://emoji.discord.st/emojis/aa88783c-03b6-4139-a96b-cd767944c1b1.png')
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
    .setDescription(kisssuser)
    message.channel.send(kissembed)
    
}
if(command === "mcstatus"){
        const embed3 = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Status serwera minecraft!')
        .setThumbnail('https://emoji.discord.st/emojis/af3ac981-4316-4e51-bfe8-2468550f3cf6.gif')
        .setDescription('> Podaj IP serwera!')
        if(!args[0]) return message.channel.send(embed3);
 
        util.status(args[0]).then((response) =>{
            console.log(response);
            const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Status serwera minecraft!')
            .setThumbnail('https://emoji.discord.st/emojis/af3ac981-4316-4e51-bfe8-2468550f3cf6.gif')
            .addFields(
                {name: '> đź”° Adres Ip', value: response.host, inline: true},
                {name: '> đźŚ€ Gracze Online', value: response.onlinePlayers, inline: true},
                {name: '> đź”° Max Graczy', value: response.maxPlayers, inline: true},
                {name: '> đźŚ€ Port', value: response.port, inline: true},
                {name: '> đź”° RconPort', value: response.rconport || "*Port zostaĹ‚ ukryty!*", inline: true},
                {name: '> đźŚ€ Nazwa', value: response.name || "*Serwer nie posiada zdefiniowanej nazwy! Ustaw w server.properties*", inline: true},
                {name: '> đź”° Wersja', value: response.version, inline: false},
                {name: '> đź”° Motd', value: util.status(args[0]).then((rp) =>{rp.motd.show}), inline: false},
            )
 
            message.channel.send(embed);
        })
        .catch ((error) =>{
            const embed2 = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Status serwera minecraft!')
            .setThumbnail('https://emoji.discord.st/emojis/af3ac981-4316-4e51-bfe8-2468550f3cf6.gif')
            .setDescription('> Nie znalazĹ‚em takiego serwera!')
            message.channel.send(embed2);
            throw error;
        })
}
if(command === "emoji"){

        let Embed = new Discord.MessageEmbed()
        .setTitle(`Emoji - ${message.guild.name} - StormBOT`)
        .setTimestamp()
        .setDescription('Komenda zostaĹ‚a tymczasowo wyĹ‚Ä…czona z powodu crashowania bota.')

        .setColor(`BLUE`);
        
        message.channel.send(Embed);
}

if(command === "pv"){
  let error = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('BĹ‚Ä…d!')
        .setDescription('> `âťŚ` Nie posiadasz wystarczajÄ…cych uprawieĹ„!')
        .setTimestamp()
        .setFooter(message.author.tag + ' ')
        
      let nometion = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('BĹ‚Ä…d!')
      .setDescription('> `âťŚ` Nie oznaczyĹ‚eĹ› osoby do ktĂłrej chcesz wysĹ‚aÄ‡ wiadomoĹ›Ä‡, lub nie ma jej na serwerze!')
        .setTimestamp()
        .setFooter(message.author.tag + ' ')
      let nomessage = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('WykryĹ‚em BĹ‚Ä…d!')
        .setDescription('âťŚ Nie napisaĹ‚eĹ› wiadomoĹ›ci, ktĂłra chcesz wysĹ‚aÄ‡ tej osobie!')
        .setTimestamp()
        .setFooter(message.author.tag + ' ')
      let nodm = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('WykryĹ‚em BĹ‚Ä…d!')
        .setDescription('âťŚ Ten UĹĽytkownik ma zablokowane wiadomoĹ›ci prywatne!')
        .setTimestamp()
        .setFooter(message.author.tag + ' ')
        let nodm3 = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('WiadomoĹ›Ä‡ Prywatna!')
        .setDescription('> `âś…` **OtrzymaĹ‚eĹ› wiadomoĹ›Ä‡ prywatnÄ… od ' + message.author.tag + ' o treĹ›ci:** '+ args.slice(1).join(" "))
        .setTimestamp()
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
  
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
       return message.channel.send(error);
     let user =
       message.mentions.members.first() ||
       message.guild.members.cache.get(args[0]);
     if (!user)
       return message.channel.send(nometion);
     if (!args.slice(1).join(" "))
       return message.channel.send(nomessage);
     user.user
       .send(nodm3)
       .catch(() => message.channel.send(nodm))
       .then(() => message.channel.send(sukces));
      let sukces = new Discord.MessageEmbed()
       .setColor('GREEN')
       .setTitle('Wiadomosci prywatne - StormBOT')
       .setDescription('> `âś…` **Pomyslnie wysĹ‚ano prywatnÄ… wiadomoĹ›Ä‡ do uĹĽytkownika ' + `${message.mentions.members.first()}` + '!** o treĹ›ci: ' + args.slice(1).join(" "))
       .setTimestamp()
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 

        
}

if(command === "poradniki"){
              const embed = new Discord.MessageEmbed()
            .setTitle(`Poradniki - StormBOT`)
            .setColor("#ff0000")
            .setDescription('Nie odnaleziono poradnikĂłw oznaczone tagiem **#poradnikstormbot**')
            .setFooter(message.author.username, message.author.avatarURL({dynamic: true}))
            message.channel.send(embed)
}
if(command === "avatar"){
  const member = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0])
        if(!member){
            const embed = new Discord.MessageEmbed()
            .setTitle(`Avatar uĹĽytkownika ${message.author.username}`)
            .setURL(message.author.avatarURL({dynamic: true, format: "png", size: 4096}))
            .setColor("RANDOM")
            .setImage(message.author.avatarURL({size: 4096, dynamic: true, format: "png"}))
            .setFooter(message.author.username, message.author.avatarURL({dynamic: true}))
            message.channel.send(embed)
            return
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`Avatar uĹĽytkownika ${member.username}`)
            .setURL(member.avatarURL({dynamic: true, size: 4096, format: "png"}))
            .setColor("RANDOM")
            .setImage(member.avatarURL({size: 4096, dynamic: true, format: "png"}))
            .setFooter(message.author.username, message.author.avatarURL({dynamic: true}))
        message.channel.send(embed)
}

if(command === "ship"){
  let sq_glob_nopex3 = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
  .setDescription('> <:mod:836515080493203488> **BĹ‚Ä…d!** Poprawne uĹĽycie: .ship <user1> <user2>!')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')

  
  if (!args[0]) return message.channel.send(sq_glob_nopex3)
  if (!args[1]) return message.channel.send(sq_glob_nopex3)
  let user57 = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let user34 = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        const random = Math.floor(Math.random() * 90) + 10
            if(random > 93){
              let ooo = new Discord.MessageEmbed()
              .setColor('#00ff00')
              .setTitle('Ship!')
              .setThumbnail('https://emoji.discord.st/emojis/9dd449d7-f44e-4c11-b3fe-01175c4cca54.gif')
              .setDescription(args[0] + ' + '+ args[1] + ' = ' + random + '% \n \n **Oklaski dla tej pary! Zyczmy jej duĹĽo miĹ‚oĹ›ci <3**')
              .setTimestamp()
              .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
              message.channel.send(ooo)
            }else if (random > 65){
              const newEmbed = new Discord.MessageEmbed()
              .setColor('2f3136')
              .setTitle('Ship - StormBOT')
              .setFooter('Gratulujemy i ĹĽyczymy udanego zwiÄ…ĹĽku!')
              .setThumbnail('https://emoji.discord.st/emojis/9dd449d7-f44e-4c11-b3fe-01175c4cca54.gif')
              .setTimestamp()
              .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
              .setDescription(args[0] + ' + '+ args[1] + ' = ' + random + '%')
            message.channel.send(newEmbed)
            } else {
              const newEmbed = new Discord.MessageEmbed()
              .setColor('2f3136')
              .setTitle('Ship - StormBOT')
              .setTimestamp()
              .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
              .setDescription(args[0] + ' + '+ args[1] + ' = ' + random + '%')
            message.channel.send(newEmbed)
            }
        
}
if(command === "ping"){
  let sq_8ball3 = new Discord.MessageEmbed()
  .setColor('#00FF00')
  .setTitle('Ping bota!')
  .setDescription('> <:ping:839877264962355201> - Trwa oblicznie...')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')

          message.channel.send(sq_8ball3).then((resultMessage) => {
            setTimeout(function(){
 const ping = resultMessage.createdTimestamp - message.createdTimestamp 
            let sq_8ball = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Ping bota!')
            .setDescription('> <:ping:839877264962355201> - **Ping Bota** wynosi (`' + ping + '`)ms')
            .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
          
            resultMessage.edit(sq_8ball)
            }, 2000);

           

        })
}
  if(command === "nakladka"){
    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(1000, 1000);
    const ctx = canvas.getContext('2d');



    const background = await Canvas.loadImage(message.author.displayAvatarURL({dynamic: true, format: 'png', size: 2048}));    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  
    const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/842754290229313586/843093242290634782/ess.png');
    ctx.drawImage(avatar, 0, 0, 1000, 1000);

    const attachmente = new Discord.MessageAttachment(canvas.toBuffer(), 'nakladka.png');

    let s1 = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Sukces!')
      .setDescription('PomyĹ›lnie wygenerowano nakĹ‚adkÄ™ oto ona!')
 
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
    message.channel.send(s1)
    message.channel.send(attachmente)

  }

 if(command === "dev"){
    const embe3 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Serwer Deweloperski')
      .setDescription('> <:dev:840643966935498752> **StormBOT 1.0v {`BETA`}** Kliknij [tutaj](https://discord.gg/ewGATBtayG) lub tutaj > https://discord.gg/ewGATBtayG aby doĹ‚Ä…czyÄ‡ do serwera dev.')  
            .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
      message.channel.send(embe3);
  }

  if(command === "invite"){
    const embe3 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Autoryzacja - StormBOT')
      .setDescription('> <:mod:836515080493203488> **StormBOT 1.0v (`BETA`)** Kliknij [tutaj](https://discord.com/api/oauth2/authorize?client_id=842828413899112458&permissions=8&scope=bot) aby dodaÄ‡ bota do swojego serwera')  
            .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
      message.channel.send(embe3);
  }
 if(command === "zapros"){
    const embe3 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Autoryzacja - StormBOT')
      .setDescription('> <:mod:836515080493203488> **StormBOT 1.0v (`BETA`)** Kliknij [tutaj](https://discord.com/api/oauth2/authorize?client_id=842828413899112458&permissions=8&scope=bot) aby dodaÄ‡ bota do swojego serwera')  
            .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
      message.channel.send(embe3);
  }
  if(command === "botinfo"){
    const embe3 = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Informacje o bocie - StormBOT')
      .setDescription('> <:mod:836515080493203488> **StormBOT 1.0v (`BETA`)**\n\n> `đźš€` Jestem na ' + client.guilds.cache.size + ' serwerach!\n> `đź“` Jestem pisany w **Discord.js 12v**\n> `đź“¨` Moimi autorami sÄ… **' + bot_authors + '**! \n> `đź“¤` PowstaĹ‚em **14 Maja 2021 roku!**\n> `đź“` Jestem hostowany na **ubuntu-20.04-x86_64!**')  
            .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
      message.channel.send(embe3);
  }
  
  if(command === "gry"){
      const client = new Discord.Client();
        let helpkod = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('DostÄ™pne Gry!')
        .setDescription('> **BĹ‚Ä…d!** Musisz wpisaÄ‡ grÄ™ w jakÄ… chcesz zagraÄ‡! \n> DostÄ™pne gry - `.pkn` - papier, kamien, nozyce')
        .setTimestamp('')
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
      message.channel.send(helpkod)
     
  }
if(command === "reklama"){
    message.reply('Soon')
}
  if(command === "gbans"){

    let sq_bs_no = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Lista GBanĂłw')
      .setDescription('- UĹĽytkownik/-czka **Madzia19(`Madzia19#8076-843577380513120286`)** zostaĹ‚a globalnie zbanowana przez **Vmkk#2869** za: _Rajd serwera dev._\n\n- UĹĽytkownik/-czka **Soolak(`Soolak#9250-674369062742261781`)** zostaĹ‚/-a globalnie zbanowany/-a przez **Vmkk#2869** za: _    Dodawanie pustych serwerĂłw, i mieszanie z weryfikacja__\n\n- UĹĽytkownik/-czka **Feris(`Feris#5161-736682166527852687`)** zostaĹ‚/-a globalnie zbanowany/-a przez **SYSTEM** za: _Podszywanie siÄ™ pod wĹ‚aĹ›ciciela, oraz tworzenie strony majÄ…cej na celu obrazÄ™!_')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
    message.channel.send(sq_bs_no)
  }
if(command === "8ball"){
   let question = message.content.slice(prefix.length + 6);
        if (!question){
          
  let sq_8ball = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
  .setDescription('> <:hash:834369568129941524> **BĹ‚Ä…d!** Musisz podaÄ‡ treĹ›Ä‡ pytania!')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')

          return message.channel.send(sq_8ball);
        }else {
          let responses = [
            "Tak",
            "nie wiem, ale jedno wiem ĹĽe nic nie wiem",
            "Nie",
            "idk",
            "Na pewno",
            "Morze, to takie zmine morze baĹ‚tyckie",
            "Na pewno nie",
            "Chyba sobie zartujesz...",
            "chyba",
            "Ja nie asystent google do rozmĂłw, ale wrĂłĹĽbitka!",
            "chyba ty",
            "Nie zadawaj mi takich pytaĹ„!",
            "chyba tak",
            "ee?",
            "chyba nie",
            "Predzej bede czlowiekiem niz to sie stanie...",
            "Glupie pytanie...",
            "đź‘",
            "Ĺ‚oĹ‚, dziwne pytanie!",
            "MuszÄ™ pomyĹ›leÄ‡... moĹĽe tak",
            "Nie wiem",
            "Daj mi spokĂłj",
            "Co ty nie powiesz...",
            "A co to ja jestem? WrĂłĹĽbita Maciej?",
          ];
          let response = responses[Math.floor(Math.random() * responses.length - 0)];
          let Embed = new Discord.MessageEmbed()
            .setTitle(`8Ball - WrĂłĹĽbictwo`)
            .setDescription('> `đź“¤` ** Pytanie**: ' + question +'\n> `đź“Ą` ** OdpowiedĹş**: ' + response)
            .setTimestamp()
            .setThumbnail('https://emoji.discord.st/emojis/0cd2410f-2847-4021-8696-585e51679029.png')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
            .setColor('BLUE');
          message.delete()
          message.channel.send(Embed);
        }
}


  if(command === "clear"){
     let delop = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Usuwanie wiadomosci!')
        .setDescription('> `âťŚ` Musisz wpisac ilosc wiadomosci, jakie chcesz usunac!')
        let delosp = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Usuwanie wiadomosci!')
        .setDescription('> `âťŚ` Maksymalna liczba mozliwych do usunecia wiadomosci to: `99`')
        let noperms = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Usuwanie wiadomosci!')
        .setDescription('> `âťŚ` Brak wystarczajacych uprawnien! ')
        const messageArray = message.content.split(' ');
          const argsr = messageArray.slice(1);
      
          if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(noperms);
          
          let deleteAmount;
      
          if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply(delop) }
      
          if (parseInt(args[0]) > 101) {
              return message.reply(delosp)
          } else {
              deleteAmount = parseInt(args[0]);
          }
      
          message.channel.bulkDelete(deleteAmount + 1, true);
          let cleart = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Sukces!')
            .setDescription('> `âś…` Pomyslnie usunieto **' + deleteAmount + '** wiadomosci!')
          message.channel.send(cleart).then(mess =>{

            let messid = message.id

  
          });
         
      
          

      
          parseInt(2);
          isNaN(2)
  }


  if(command === "czlonkowie"){
              let Embed = new Discord.MessageEmbed()
            .setTitle(`CzĹ‚onkowie serwera - StormBOT`)
            .setDescription(`Na serwerze znajduje siÄ™ obecnie **${message.guild.memberCount}** czĹ‚onkĂłw!`)
            .setTimestamp()
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
            .setColor('BLUE');
          message.channel.send(Embed);
  }

  if(command === "iq"){
  let nom = new Discord.MessageEmbed()
        .setColor('F0EC6B')
        .setTitle('BĹ‚Ä…d!')
        .setDescription('Musisz podaÄ‡ uĹĽytkownika jakiego chcesz sprawdziÄ‡ iQ')
        .setTimestamp()
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
        if (!args[0]) return message.channel.send(nom)
    
        let user34 =
          message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user34)
          return message.channel.send(nom);
    
        const arg1 = [...args].join(" ")
        const random = Math.floor(Math.random() * 170) + 10
              let ooo = new Discord.MessageEmbed()
              .setColor('BLUE')
              .setTitle('Sprawdzanie IQ!')
              .setDescription('IQ uĹĽytkownika **' + arg1 + '** wynosi **' + random + '**')
              .setTimestamp()
              .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
                        message.channel.send(ooo)
}



if (command === 'warn') {
  let date = new Date();
  let error = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('Blad!')
  .setDescription('> `âťŚ` Nie posiadasz wystarczajÄ…cych uprawieĹ„!')
  .setTimestamp()
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
  
let nometion = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('Blad!')
  .setDescription('> `âťŚ` Nie oznaczyĹ‚eĹ› osoby ktĂłrÄ… chcesz zwarnowaÄ‡!')
  .setTimestamp()
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
let nomessage = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('Blad!')
  .setDescription('> `âťŚ` Nie wpisanio powodu warna!')
  .setTimestamp()
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    

  if (!message.member.permissions.has("MANAGE_MESSAGES"))
   return message.channel.send(error);
 let user =
   message.mentions.members.first() ||
   message.guild.members.cache.get(args[0]);


   
 if (!user)
   return message.channel.send(nometion);
 if (!args.slice(1).join(" "))
   return message.channel.send(nomessage);



   let Warn = st_Warn

   const nazwa = user.id + '-' + message.guild.id; 


   const dwarn = await st_Warn.findOne({ where: { name: nazwa } });
   
   if (dwarn) {
      let liczba = dwarn.warnings + 1;
      Warn.update({ warnings: liczba }, { where: { name: nazwa } });
   } else if(!dwarn){
      st_Warn.create({
        name: nazwa,
        warnings: 1,
        });
    
   }

   let warnuser = new Discord.MessageEmbed()
   .setColor('#ff0000')
   .setTitle('OstrzeĹĽenie')
   .setTimestamp()
   .setDescription('> `!` OtrzymaĹ‚eĹ› ostrzeĹĽenie! Zapoznaj siÄ™ z nim poniĹĽej:')
   .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
   .addFields(
    { name: '<:mod:836515080493203488>ă»**UĹĽytkownik:**', value: user, inline: true},
    { name: '<:osoby:840643966931304468>ă»**Administrator:**', value: message.author, inline: true},
    { name: '<:ping:839877264962355201>ă»**IloĹ›Ä‡:**', value: dwarn.warnings, inline: true},
    { name: '<:info:836515080605663255>ă»**KanaĹ‚:**', value: message.channel.name, inline: true},
    { name: '<:dev:840643966935498752>ă»**Serwer:**', value: message.guild.name, inline: true},
    { name: '<:znaczek:835096478883643453>ă»**PowĂłd:**', value: args.slice(1), inline: true},
 
  )


  user.user
    .send(warnuser)

    let sukces = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('OstrzeĹĽenie!')
    .setTimestamp()
    .setDescription('> `!` PomyĹ›lnie nadano ostrzeĹĽenie:')
    .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
    .addFields(
     { name: '<:mod:836515080493203488>ă»**UĹĽytkownik:**', value: user, inline: true},
     { name: '<:osoby:840643966931304468>ă»**Administrator:**', value: message.author, inline: true},
     { name: '<:ping:839877264962355201>ă»**IloĹ›Ä‡:**', value: dwarn.warnings, inline: true},
     { name: '<:info:836515080605663255>ă»**KanaĹ‚:**', value: message.channel.name, inline: true},
     { name: '<:dev:840643966935498752>ă»**Serwer:**', value: message.guild.name, inline: true},
     { name: '<:znaczek:835096478883643453>ă»**PowĂłd:**', value: args.slice(1), inline: true},
  
   )
   message.channel.send(sukces)




  
  
}

if(command === "warnlist"){



const users = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
const nazwa = users + '-' + message.guild.id; 
const dwarn = await st_Warn.findOne({ where: { name: nazwa } });
  const warnedjasi3o = new Discord.MessageEmbed()
  .setColor('blue')
  .setTitle('Warny!')
  .setDescription('> `đź‘¤` **Poprawne uĹĽycie: ** .warnings <uĹĽytkownik>')
if(!args[0]) return message.channel.send(warnedjasi3o)


//message.reply(args[0] + 'Posiada ' + Warn.find({ where: { name: nazwa } }) + ' warny')
if(dwarn){

  let warnedjasio = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle('Liczba warnĂłw!')
  .setDescription('> <:osoby:840643966931304468>ă»UĹĽytkownik **' + users.tag + '** posiada **' + dwarn.warnings + '** warnĂłw')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
  message.reply(warnedjasio)
}else{

  let warnedjasio2 = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle('Liczba warnĂłw!')
  .setDescription('> <:osoby:840643966931304468>ă» UĹĽytkownik **' + users.tag + '** nie posiada warnĂłw!')
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
  message.channel.send(warnedjasio2)
}
}

if(command === "delwarn"){
if(message.guild.id === "842732495446605824"){
if(message.member.permissions.has('MANAGE_GUILD')){


  const users = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  const nazwa = users + '-' + message.guild.id; 
  const dwarn = await st_Warn.findOne({ where: { name: nazwa } });
    const warnedjasi3o = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Usuwanie warnĂłw!')
    .setDescription('> `đź‘¤` **Poprawne uĹĽycie: ** .delwarn <uĹĽytkownik> <iloĹ›Ä‡>')
  if(!args[0]) return message.channel.send(warnedjasi3o)
  if(!args[1]) return message.channel.send(warnedjasi3o)
  
  //message.reply(args[0] + 'Posiada ' + Warn.find({ where: { name: nazwa } }) + ' warny')
  if(dwarn){
  
    let sq_s_warn = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Usuwanie warnĂłw!')
    .setDescription('> <:osoby:840643966931304468>ă»Administrator **' + message.author.tag + '** usunÄ… **' + args[1] + '** warnĂłw uĹĽytownikowi ' + `${users}`)
    .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
    let sq_s_warn2 = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Usuwanie warnĂłw!')
    .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
    .setDescription('> <:osoby:840643966931304468>ă»UĹĽytkownik **' + users.tag + '** nie posiada warnĂłw')
    message.reply(sq_s_warn)
    let liczba = dwarn.warnings

      st_Warn.update({ warnings: liczba - args[1] }, { where: { name: nazwa } });
    
  }
}else{
  let error = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle('Blad!')
  .setDescription('> `âťŚ` **Nie posiadasz uprawnieĹ„!** Potrzebujesz uprawnienia ZarzÄ…dzanie Serwerem(`MANAGE_GUILD`)')
  
  .setTimestamp()
  .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')    
  
  message.channel.send(error)
}

}else{
  message.reply('Cmd na testach, tylko dla dev')
}

  }
  


  if(command === "embed"){
    if(message.member.hasPermission('MANAGE_MESSAGES')){
      let st_first_usage = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('WykryĹ‚em BĹ‚Ä…d!')
        .setDescription('`âť—` Musisz podaÄ‡ **kolor HEX** | Poprawne uĹĽycie: ``.embed <hex> <treĹ›Ä‡>``')
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
      let st_second_usage = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('WykryĹ‚em BĹ‚Ä…d!')
        .setDescription('`âť—` Musisz podaÄ‡ **treĹ›Ä‡ embeda** | Poprawne uĹĽycie: ``.embed <hex> <treĹ›Ä‡>``')
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
      if(!args[0]) return message.reply(st_first_usage)
      if(!args[1]) return message.reply(st_second_usage)

      let text = [...args].slice(1).join(" ")
      let st_embed = new Discord.MessageEmbed()
        .setColor(args[0])
        .setDescription(text)
        .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ') 
      message.channel.send(st_embed)
    }else{
      message.reply('Nie posiadasz uprawnieĹ„!')
    }
  }
  
  

  if(command === "setwelcome"){
    if(message.member.hasPermission('MANAGE_GUILD')){
      let usagepostadd2232 = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
      .setDescription('**Podaj id kanaĹ‚u!**: Nie PodaĹ‚eĹ› kanaĹ‚u na ktĂłrychm chcesz ustawiÄ‡ powitania!')
      let usagepostadd232 = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
      .setDescription('**Podaj wiadomosÄ‡!**: Musisz podaÄ‡ wiadomoĹ›Ä‡ MoĹĽesz uĹĽyÄ‡ tych znacznikĂłw: `{user} = Nazwa uĹĽytkownika | {user.tag} = Tag uzytkownika | {user.id} = ID uĹĽytkownika`!')
      let usag = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
      .setDescription('**Podaj kolor!**: Nie WybraĹ‚eĹ› koloru wiadomosci!')
    

      let text1 = args[0];
      let textelo = args[1];
      let welmessage = [...args].slice(2).join(" ");

      if(!text1) return message.channel.send(usagepostadd2232)
      if(!args[1]) return message.channel.send(usag)
      if(!args[2]) return message.channel.send(usagepostadd232)

      if(message.guild.channels.cache.get(text1)){
            
        const nazwaa = message.author.tag;
        const wel = await Welcome.findOne({ where: { server: message.guild.id }});
    
        if(wel){
        let balanceuser = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle('Ustawienia - Powitania')
          .setDescription('> `đźź˘` **Ustawnia powitania** UstawiĹ‚eĹ› powitania na kanale ' + `**<#${text1}>**` + ` z kolorem ${textelo} oraz wiadomosciÄ… na wejĹ›cie: ` + welmessage)
          .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
    
          wel.update({ channeli: text1.replace("<#", "").replace(">", "") }, { where: { server: message.guild.id } });
          wel.update({ color: textelo }, { where: { server: message.guild.id } });
          wel.update({ message: welmessage }, { where: { server: message.guild.id } });


        message.channel.send(balanceuser)
        }else{

          let balanceuser = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle('Ustawienia - Powitania')
          .setDescription('> `đźź˘` **Ustawnia powitania** UstawiĹ‚eĹ› powitania na kanale ' + `**<#${text1}>**` + ` z kolorem ${textelo} oraz wiadomosciÄ… na wejĹ›cie: ` + welmessage)
          .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
    


        message.channel.send(balanceuser)




          Welcome.create({
          server: message.guild.id,
          channeli: text1,
          color: textelo,
          message: welmessage,
    
        });
    }
      }else{
        let usagepostadd22 = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
        .setDescription('**Nie odnaleziono kanaĹ‚u!**: Nie odnaleziono takiego kanaĹ‚u na serwerze!')
      
        message.channel.send(usagepostadd22)
      }
    




    }else{
      let usagepostadd2 = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
      .setDescription('**Nie posiadasz uprawnien!**: Nie posiadasz wystarczajÄ…cych uprawnien! Potrzebujesz `MANAGE_GUILD`')
    
      message.channel.send(usagepostadd2)
    }
    

  }
  
  if(command === "setleft"){
    if(message.member.hasPermission('MANAGE_GUILD')){

      let usagepostadd2232 = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
      .setDescription('**Podaj id kanaĹ‚u!**: Nie PodaĹ‚eĹ› kanaĹ‚u na ktĂłrychm chcesz ustawiÄ‡ PoĹĽegnania!')
    
   
      let usagepostadd232 = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
      .setDescription('**Podaj wiadomosÄ‡!**: Musisz podaÄ‡ wiadomoĹ›Ä‡ MoĹĽesz uĹĽyÄ‡ tych znacznikĂłw: `{user} = Nazwa uĹĽytkownika | {user.tag} = Tag uzytkownika | {user.id} = ID uĹĽytkownika`!')
    
    
      let usag = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
      .setDescription('**Podaj kolor!**: Nie WybraĹ‚eĹ› koloru wiadomosci!')
    

      let text1 = args[0];
      let textelo = args[1];
      let welmessage = [...args].slice(2).join(" ");

      if(!text1) return message.channel.send(usagepostadd2232)
      if(!args[1]) return message.channel.send(usag)
      if(!args[2]) return message.channel.send(usagepostadd232)

      if(message.guild.channels.cache.get(text1)){
            
        const nazwaa = message.author.tag;
        const wel = await Leaves.findOne({ where: { server: message.guild.id }});
    
        if(wel){
        let balanceuser = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle('Ustawienia - PoĹĽegnania')
          .setDescription('> `đźź˘` **Ustawnia powitania** UstawiĹ‚eĹ› poĹĽegnania na kanale ' + `**<#${text1}>**` + ` z kolorem ${textelo} oraz wiadomosciÄ… na wejĹ›cie: ` + welmessage)
          .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
    
          wel.update({ channeli2: text1.replace("<#", "").replace(">", "") }, { where: { server2: message.guild.id } });
          wel.update({ color2: textelo }, { where: { server2: message.guild.id } });
          wel.update({ message2: welmessage }, { where: { server2: message.guild.id } });


        message.channel.send(balanceuser)
        }else{

          let balanceuser = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle('Ustawienia - PoĹĽegnania')
          .setDescription('> `đźź˘` **Ustawnia powitania** UstawiĹ‚eĹ› poĹĽegnania na kanale ' + `**<#${text1}>**` + ` z kolorem ${textelo} oraz wiadomosciÄ… na wejĹ›cie: ` + welmessage)
          .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
    


        message.channel.send(balanceuser)




          Leaves.create({
          server2: message.guild.id,
          channeli22: text1,
          color2: textelo,
          message2: welmessage,
    
        });
    }
      }else{
        let usagepostadd22 = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
        .setDescription('**Nie odnaleziono kanaĹ‚u!**: Nie odnaleziono takiego kanaĹ‚u na serwerze!')
      
        message.channel.send(usagepostadd22)
      }
    




    }else{
      let usagepostadd2 = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
      .setDescription('**Nie posiadasz uprawnien!**: Nie posiadasz wystarczajÄ…cych uprawnien! Potrzebujesz `MANAGE_GUILD`')
    
      message.channel.send(usagepostadd2)
    }
    

  }


  if(command === "ustawienia"){
  }



  if(command === "setsuggestion"){
    if(message.member.hasPermission('MANAGE_GUILD')){
      let usagepostadd2232 = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
      .setDescription('> `âťŚ` **Podaj id kanaĹ‚u!**: Nie PodaĹ‚eĹ› kanaĹ‚u na ktĂłrychm chcesz ustawiÄ‡ propozycje!')
      let pr_server = args[0];
      if(!args[0]) return message.channel.send(usagepostadd2232)
      if(message.guild.channels.cache.get(args[0])){
        const nazwaa = message.author.tag;
        const wel = await st_Propozycje.findOne({ where: { pr_server: message.guild.id }});
        if(wel){
        let balanceuser = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle('Ustawienia - Propozycje')
          .setDescription('> `đźź˘` **Ustawnia propozycje** UstawiĹ‚eĹ› propozycje na kanale ' + `**<#${args[0]}>**`)
          .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
          wel.update({ pr_channel: text1.replace("<#", "").replace(">", "") }, { where: { pr_server: message.guild.id } });
          
        message.channel.send(balanceuser)
        }else{
          let balanceuser = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle('Ustawienia - PropozycjÄ™')
          .setDescription('> `đźź˘` **Ustawnia propozycjÄ™** UstawiĹ‚eĹ› powitania na kanale ' + `**<#${args[0]}>**`)
          .setFooter(message.author.tag, message.author.displayAvatarURL() + ' ')
        message.channel.send(balanceuser)
          st_Propozycje.create({
            pr_server: message.guild.id,
            pr_channel: args[0],
        });
    }
      }else{
        let usagepostadd22 = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
        .setDescription('> `âťŚ` **Nie odnaleziono kanaĹ‚u!**: Nie odnaleziono takiego kanaĹ‚u na serwerze!')
      
        message.channel.send(usagepostadd22)
      }
    }else{
      let usagepostadd2 = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('WystÄ…piĹ‚ bĹ‚Ä…d!')
      .setDescription('> `âťŚ` **Nie posiadasz uprawnien!**: Nie posiadasz wystarczajÄ…cych uprawnien! Potrzebujesz `MANAGE_GUILD`')
      message.channel.send(usagepostadd2)
    }
  }

  if(command === "antyraidon"){
    if(message.author.id === "768602416630988820"){
          let raidanty = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('AntyRaid')
            .setDescription('> <:osoby:840643966931304468> - **' + message.author.tag+ '!** WĹ‚Ä…czyĹ‚ antyraida!')
            .setFooter(message.author.tag + `(${message.author.id}) - ${message.author.name}`, message.author.displayAvatarURL() + ' ')
              message.channel.send(raidanty)
    }else{
      let antyraid_usage = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('BĹ‚Ä…d podczas wykonywania komendy ' + command)
      .setDescription('> **BĹ‚Ä…d!** Komenda na razie dostÄ™pna tylko dla Dev.!')
      .setFooter(message.author.tag + `(${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
    
      message.reply(antyraid_usage)
    }

  } 

  //--------------------------------------------------------------//-------------// WARNY!

  if(command === "wn"){
    //---------///-----------------///EMBEDS
      let nopex = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('')
    //-------------------------------------END EMBEDA
    let db = st_Warn.findOne({ where: { name: message.guild.id }});
    if(message.member.hasPermission('MANAGE_MESSAGES')){
      if(!args[0]) return //Poprawne uĹĽycie warna
        let reason = [...args].slice(1).join(" ");
          if(args[1]){
            if(db){
              
            }else{
              //Tworzenie siÄ™ warna
            }
          }else{
            if(db){
              
            }else{
              //Tworzenie siÄ™ warna
            }
          }
    }else{
      //No permsission
    }
  }

});
client.on('guildMemberAdd', async (member) => {
  const welcomwe = new Discord.MessageEmbed()
  .setTitle('Powitanie ' + member.user.username + '!')
  .setImage('https://media.discordapp.net/attachments/842841769070166106/843057069112033280/witamy.png?width=1213&height=682')
  .setDescription('Witaj ' + member.user.username + '(`' + member.user.tag +'-' + member.user.id + '`) Zapoznaj siÄ™ z regulaminem oraz zweryfikuj siÄ™ na kanale weryfikacja, baw siÄ™ dobrze.')
  .setColor('#00ff00')
  if(member.guild.id === "842732495446605824"){
      client.channels.cache.get('842732495804039169').send(welcomwe)
  }

});
client.on('guildMemberRemove', async (member) => {
  const welcomwe = new Discord.MessageEmbed()
  .setTitle('PoĹĽegnanie ' + member.user.username + '!')
  .setImage('https://media.discordapp.net/attachments/842841769070166106/843057072752295956/zegnamy.png?width=1213&height=682')
  .setDescription('Ĺ»egnaj ' + member.user.username + '(`' + member.user.tag +'-' + member.user.id + '`) WyszedĹ‚ z serwera. Mamy nadzieje ĹĽe kiedyĹ› wrĂłci!')
  .setColor('#ff0000')
  if(member.guild.id === "842732495446605824"){
      client.channels.cache.get('842732495804039169').send(welcomwe)
  }




});
//----------------------------------- STATY
client.on('guildMemberAdd', member => {
  if(member.guild.id === "842732495446605824"){
    client.channels.cache.get('842755101968957470').setName(`đź‘Ąă»Server Users: ${member.guild.memberCount}`);
  }

});
client.on('guildMemberRemove', member => {
  if(member.guild.id === "842732495446605824"){
        client.channels.cache.get('842755101968957470').setName(`đź‘Ąă»Server Users: ${member.guild.memberCount}`);
  }

});
//-------------------------------------------------------------- SYSTEM AUTO POWITAĹ
client.on('guildMemberAdd', async (member) =>{

  const wel = await Welcome.findOne({ where: { server: member.guild.id }});
  if(member.guild.id === wel.server){

    

    let w2 = new Discord.MessageEmbed()
      .setColor(wel.color)
      .setDescription(wel.message.replace("{user}", member.user.username).replace("{user.tag}", member.user.tag).replace("{user.id}", member.user.id))
      .setFooter(message.author.tag + ` (${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
      try{
   client.channels.cache.get(wel.channeli).send(w2)
      }catch{
        console.log('---------------------------------------------------------------------- bĹ‚Ä…d wysyĹ‚anai wiadomosci')
      }
 
    
  }

});
//-------------------------------------------------------------- SYSTEM AUTO POĹ»EGNAĹ
client.on('guildMemberRemove', async (member) =>{

  const wel = await Leaves.findOne({ where: { server2: member.guild.id }});
  if(member.guild.id === wel.server2){

    

    let w2 = new Discord.MessageEmbed()
      .setColor(wel.color2)
      .setDescription(wel.message2.replace("{user}", member.user.username).replace("{user.tag}", member.user.tag).replace("{user.id}", member.user.id))
      .setFooter(message.author.tag + ` (${message.author.id}) - ${message.guild.name}`, message.author.displayAvatarURL() + ' ')
      try{
   client.channels.cache.get(wel.channeli2).send(w2)
      }catch{
        console.log('---------------------------------------------------------------------- bĹ‚Ä…d wysyĹ‚anai wiadomosci')
      }
 
    
  }

});


//------------------------------------------------------------------------ AUTO PROPOZYCJE
/*
client.on('message', async (message) => {
  const wel = await st_Propozycje.findOne({ where: { pr_server: message.guild.id }});
  if(message.channel.id === wel.pr_channel) {
    if(message.content.startsWith('&')) return
    if(message.author.bot) return
    const embedxdxd = new Discord.MessageEmbed()
    .setTitle('Propozycja ' + message.author.tag)
    .setColor('BLUE')
    .setDescription(message.content)
    .setFooter(message.author.tag + ' Aby skomentowaÄ‡ uĹĽyj &', message.author.displayAvatarURL())
    
    message.channel.send(embedxdxd).then(msg => {
          msg
              .react('đź”´')
              .then(() => msg.react('đźźˇ'))
              .then(() => msg.react('đźź˘'))
      })
    message.delete()
  }
});
client.on('message', async (message) => {
  const wel = await st_Propozycje.findOne({ where: { pr_server: message.guild.id }});
  if(message.guild.id === wel.pr_server){
     if (message.channel.id === wel.pr_channel) {
    if(message.content.startsWith('&')) {
    const embedxdxd = new Discord.MessageEmbed()
    .setTitle('Komentarz ' + message.author.tag)
    .setColor('#2F3136')
    .setDescription(message.content.replace('&', ' '))
    .setFooter(message.author.tag, message.author.displayAvatarURL())
    message.channel.send(embedxdxd)
    message.delete()
    }
  } 
  }
});
client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild) return;
  try{
  const verifyrole = reaction.message.guild.roles.cache.find(role => role.id === "842732495446605825");
  if (reaction.message.channel.id == '842732495804039168') {
      if (reaction.emoji.name === 'âś…') {
          await reaction.message.guild.members.cache.get(user.id).roles.add(verifyrole);
      }
  } else {
      return;
  }
  }catch{
console.log('--------------------------- ERRR')
  }
});*/

//------------------------------------------//--------------------------------------------------------------LOGI
client.on('channelUpdate', channel =>{
  if(channel.client.guilds.cache.get('842732495446605824')){
      let kanal = channel.client.channels.cache.get(`844987893108834365`)
  if (kanal) {
      let embed = new Discord.MessageEmbed()
          .setAuthor(`StormBOT â” Logi`, client.user.avatarURL({ dynamic: true }))
          .setTitle(`Aktualizacja kanaĹ‚u`)
          .setColor("BLUE")
          .setTimestamp()
          .setDescription(`KanaĹ‚ <#${channel.id}>(${channel.type}) zostaĹ‚ zaktualizowany!`)
      kanal.send(embed)
  }
  }

});
client.login('ODQyODI4NDEzODk5MTEyNDU4.YJ6_IA.1t_IL3ZKTq47hopkJh2PhUbcIEo')
