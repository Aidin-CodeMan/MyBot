
const qrcode = require("qrcode-terminal");
  const { MessageMedia } = require("whatsapp-web.js");

  const { Client, LocalAuth } = require("whatsapp-web.js");
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
    args: ["--no-sandbox"],
  },
  });
  
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

    console.log("Client is ready!");
  });

  client.on("message", async (message) => {
    const content = message.body;
    if (content.toLowerCase() === "sa") {
      message.reply("as");
      const media = await MessageMedia.fromUrl(
        "https://i.pinimg.com/originals/02/91/32/029132c8642f5f5d61f61213426e38d1.jpg"
      );
      client.sendMessage(message.from, media);
    }
  });
  client.on("message", async (msg) => {
    if (msg.body === "!everyone") {
      const chat = await msg.getChat();
      if (chat.isGroup) {
        const chat = await msg.getChat();

        let text = "";
        let mentions = [];

        for (let participant of chat.participants) {
          mentions.push(`${participant.id.user}@c.us`);
          text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
      } else {
        client.sendMessage(msg.from, "Hata");
      }
    }
  });

  client.initialize();
 
