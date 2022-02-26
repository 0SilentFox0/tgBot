import { Telegraf, Markup } from "telegraf";
import axios from "axios";

const token = "5227368679:AAG6NMaoWxG7AOYcnpK0eMigxOYa6vwYpsU";

const bot = new Telegraf(token);

const domain = "";
const ORG_ID = "organisationId__";
const CITY_ID = "cityId__";

const organisations = [
  {
    name: "Test1",
    tableId: 1,
    city: "Kyiv",
    contacts: {
      tel: "+3123123",
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

function getCities(cities) {
  organisations.forEach((org) => {
    if (!cities.includes(org.city)) cities.push(org.city);
  });
}

bot.start((ctx) => {
  let cities = [];
  getCities(cities);
  ctx.reply(
    "Привіт, цей бот створено для того, щоб ти зміг легко дізнатися, кому і яка потрібна допомога.\n" +
      "Для початку обери місто:",
    Markup.inlineKeyboard(
      cities.map((city) => [
        Markup.button.callback(city + " 🇺🇦", CITY_ID + city),
      ])
    )
  );
});

bot.action(new RegExp(ORG_ID + "*"), (ctx) => {
  const organisationInfo = organisations.find(
    (org) => org.tableId == ctx.match.input.replace(ORG_ID, "")
  );
  //   axios.get(`${domain}/`).then((response) => {
  const test = [
    {
      value: "25",
      name: "Бронежилет",
    },
    {
      value: "12",
      name: "Что-то",
      description: "lorem ipsum",
    },
  ];

  const reformatData = test.map(
    (item) =>
      "❤️" +
      item.name +
      " " +
      item.value +
      " " +
      (item.description ? item.description : " ") +
      "\n"
  );

  ctx.reply(
    `Назва організації: ${organisationInfo.name} \n` +
      `Контакти: \n` +
      `📱Телефон: ${organisationInfo.contacts.tel}\n` +
      `📍Адреса: ${organisationInfo.contacts.address}\n` +
      `🔵Телеграм: ${organisationInfo.contacts.tg} \n` +
      `🔵Фейсбук: ${organisationInfo.contacts.facebook}\n\n` +
      `Ось що нам потрібно: \n\n` +
      `${reformatData}`
  );
});

bot.action(new RegExp(CITY_ID + "*"), (ctx) => {
  ctx.reply(
    "Обери організацію",
    Markup.inlineKeyboard(
      organisations
        .filter((org) => ctx.match.input.replace(CITY_ID, "") === org.city)
        .map((org) => [Markup.button.callback(org.name, ORG_ID + org.tableId)])
    )
  );
});

bot.launch();
