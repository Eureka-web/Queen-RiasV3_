const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "!",
    ownerName: process.env.OWNER_NAME || "PropertyBuzzNG",
    ownerNumber: process.env.OWNER_NUMBER || "2347035442043",
    mode: process.env.MODE || "private ",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "PropertyBuzzNG-XMD",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU9ZQmZhMUtDWWhqZlNhT01ualBYN3kxdGdPRWJPRzBOSFNwSU1sY2EwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieEd4RW9ZTnhkQ2dRWXg2TUs5WWI4THFLMlFGL2hWVFYrL2JrUnFtdHBsVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSHRjSHFDQnJ5YXcxa3dwc1VnMEhNUlYvN2ZlelAyYnhiNzhHd1J4QjJzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwVFRNUUtRWEJsSWN0dWZDYUQ2NWJWMmdSWlVML1hSME5pdDZRcnp0MmljPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVKRlY1NXNWaWdzYU8yTGF6SG9kemNSa0F0aEM4QUNkckZvL0g2VEtCVmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBXOWZON2llTUV5cTB1cnNLbGF5bEdQM3lpS3N3V0Q0bCt6U0hzQzVKSEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME9JVzA5bnZ1a1M2dDBNU1dEa2R4cHozZ296RHA1MWk3blh2RkN1UXduVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3dnb0ZMODMvaEZlSmV5MkxpVG9xOVR6MnJqQXFQZVJxckVGdHFOTXgxOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklxbW56T0luandsTzFWRkdIc2VQU0hrT3V4RGkyWWNxdjVGWUdyRVlFY24xd1duUC85UWpzMWhFaG0reUUwK2MzT0xJdVBFQjNGS0x6UC9FbDNZZWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMyLCJhZHZTZWNyZXRLZXkiOiJtV2Q1c0hlaUNBbCtBdkJUcXRvMFpZZ2drRUJCcXNyZkgrYTJpekZUVnE4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJLRjI2WTVEVyIsIm1lIjp7ImlkIjoiMjM0NzAzNTQ0MjA0Mzo3NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJQcm9wZXJ0eUJ1enpORyIsImxpZCI6IjE0Njg0MTI3NDQ0NTk3MDo3NkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0x1ZTFyUUNFSjZQc2NBR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkZ6WFVlaTZ0bExiMXF0Z25ZNUNnbEljcVZIdFU1c2xPKzg0R3dVWHk1R3c9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ii81a200bFV4NmpxaWhQeW5QQ1JYbk5NeFhsWVNpcFM3NCtEMmx4T0xqcFREcGk5Qk9SdkwrTlZpcmlGMXJ2cTNlZGx5dzQ0MjQxYTdIRGJHdVh5RUN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJNeFpsKytHT29ieHpEa0F4dFRvZTc5bmk2dVBRbUNmSGV0RWdZQWQyL0g5RDZQRUpHVVp0a0lwakszSElwRkhvbkhuT0NuaDZRV1FBTkN4RVBBUlBpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMzU0NDIwNDM6NzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmMxMUhvdXJaUzI5YXJZSjJPUW9KU0hLbFI3Vk9iSlR2dk9Cc0ZGOHVScyJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1NjM1MjQ0LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
