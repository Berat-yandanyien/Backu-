const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://nomercy:alperen179300@cluster0.0ttm0.mongodb.net/athanasia?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(console.log("Mongoose Bağlandı Guardians Role Backup Sistemi devreye girmiş bulunmaktadır."));
  
client.on("ready", () => {
  setInterval(() => roleBackup(), 5000);
});
//client.guilds.get
client.on("ready", async () => {
  client.user.setStatus("online");
  client.user.setActivity("Berat ❤️ Artius", { type: "WATCHING"}); //// TYPE - WATCHING , PLAYING , LISTENING gibi değiştirilebilir.
 });

const Database = require("./models/roles.js");

function roleBackup() {
	const guild = "756106557263183894";
  client.guilds.get(guild).roles.forEach(role => {
    Database.findOne({ rolid: role.id }, async (err, res) => {
      if (!res) {
        let members = role.members.map(gmember => gmember.id);
        let newSchema = new Database({
          _id: new mongoose.Types.ObjectId(),
          rolid: role.id,
          name: role.name,
          color: role.hexColor,
          permissions: role.permissions,
          members: members,
          position: role.position,
          hoisted: role.hoisted
        });
        newSchema.save();
      } else if (res) {
        res.name = role.name;
        res.color = role.hexColor;
        res.members = role.members.map(gmember => gmember.id);
        res.position = role.position;
        res.hoisted = role.hoisted;
        res.save();
      }
    });
  });
}
client.on("roleDelete", async role => {
  await Database.findOne({ rolid: role.id }, async (err, res) => {
    if (!res) return;
    await role.guild
      .createRole({
        name: res.name,
        hoist: res.hoist,
        color: res.color,
        position: res.position,
        permissions: res.permissions,
        mentionable: false
      })
      .then(rolee => {
        res.members.map(member => {
          role.guild.members.get(member).addRole(rolee.id);
        });
      });
  });
});

process.on("uncaughtException", function(err) {
  console.error(err + " hata var");
});

client.login(process.env.token);///////// göt tıffan bak şimdi .env'e gir token yerine tokeninini yapıştır 

client.on("ready", async () => {
client.channels.cache.get("797064512376930344").join()
}) 


client.on("ready", async function() {
const voiceChannel = "797225778097029190"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})
