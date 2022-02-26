import { Telegraf, Markup } from "telegraf";
import axios from "axios";

const token = "5227368679:AAG6NMaoWxG7AOYcnpK0eMigxOYa6vwYpsU";
const domain = "";
const ORG_ID = "organisationId__";
const CITY_ID = "cityId__";

let organisations = [
  {
    name: "Test1",
    tableId: 1,
    city: "Kyiv",
    contacts: {
      tel: "+380994584994",
      address: "бла бла бла",
      tg: "",
      facebook: "",
    },
  },
  {
    name: "Test2",
    tableId: 2,
    city: "Chernivtsi",
    contacts: {
      tel: "+380994584994",
      address: "бла бла бла",
      tg: "",
      facebook: "",
    },
  },
  {
    name: "Test3",
    tableId: 3,
    city: "Kyiv",
    contacts: {
      tel: "+380994584994",
      address: "бла бла бла",
      tg: "",
      facebook: "",
    },
  },
];

const bot = new Telegraf(token);

function getCities(cities) {
  organisations.forEach((org) => {
    if (!cities.includes(org.city))
      cities.push({ city: org.city, id: CITY_ID + org.city });
  });
}

bot.start((ctx) => {
  let cities = [];
  getCities(cities);
  ctx.reply(
    "Привіт, цей бот створено для того, щоб ти зміг легко дізнатися, кому і яка потрібна допомога.\n Для початку обери місто:",
    Markup.inlineKeyboard(
      cities.map((o) => [Markup.button.callback(o.city + " 🇺🇦", o.id)])
    )
  );
});

bot.action(new RegExp(ORG_ID + "*"), (ctx) => {
  //   axios.get(`${domain}/`).then((response) => {
  console.log(ctx);
  ctx.reply(
    `Назва організації:  \nКонтакти: \nТелефон: \nАдреса: \nТелеграм: \nФейсбук: \nОсь що нам потрібно:`
  );
  //   });
});

bot.action(new RegExp(CITY_ID + "*"), (ctx) => {
  ctx.reply(
    "Обери організацію",
    Markup.inlineKeyboard(
      organisations
        .filter((o) => ctx.match.input.replace(CITY_ID, "") === o.city)
        .map((o) => [Markup.button.callback(o.name, ORG_ID + o.id)])
    )
  );
});

bot.launch();
