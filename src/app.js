import { Telegraf, Markup } from "telegraf";
import axios from "axios";

const token = "5227368679:AAG6NMaoWxG7AOYcnpK0eMigxOYa6vwYpsU";

const bot = new Telegraf(token);

const domain = "";
const ORG_ID = "organisationId__";
const CITY_ID = "cityId__";

const organizations = [
  {
    name: "Test1",
    tableId: "Shit1",
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
    tableId: "Shit2",
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
    tableId: "Shit3",
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
  organizations.forEach((org) => {
    if (!cities.includes(org.city)) cities.push(org.city);
  });
}

function formatOrganization(ctx, data) {
  const organizationInfo = organizations.find(
    (org) => org.tableId === ctx.match.input.replace(ORG_ID, "")
  );
  ctx.reply(
    `Назва організації: ${organizationInfo.name} \n` +
      `Контакти: \n` +
      `📱Телефон: ${organizationInfo.contacts.tel}\n` +
      `📍Адреса: ${organizationInfo.contacts.address}\n` +
      `🔵Телеграм: ${organizationInfo.contacts.tg} \n` +
      `🔵Фейсбук: ${organizationInfo.contacts.facebook}\n\n` +
      `Ось що нам потрібно: \n\n` +
      `${data}`
  );
}

function reformatOrganizationResponse(rawData) {
  return rawData.map(
    (item) =>
      "❤️" +
      item.name +
      " " +
      item.value +
      " " +
      (item.description ? item.description : " ") +
      "\n"
  );
}

function printCities(ctx, cities) {
  ctx.reply(
    "Привіт, цей бот створено для того, щоб ти зміг легко дізнатися, кому і яка потрібна допомога.\n" +
      "Для початку обери місто:",
    Markup.inlineKeyboard(
      cities.map((city) => [
        Markup.button.callback(city + " 🇺🇦", CITY_ID + city),
      ])
    )
  );
}

function printOrganizations(ctx) {
  ctx.reply(
    "Обери організацію",
    Markup.inlineKeyboard(
      organizations
        .filter((org) => ctx.match.input.replace(CITY_ID, "") === org.city)
        .map((org) => [
          Markup.button.callback(
            org.name + " " + org.address,
            ORG_ID + org.tableId
          ),
        ])
    )
  );
}

bot.start((ctx) => {
  let cities = [];
  getCities(cities);
  printCities(ctx, cities);
});

bot.action(new RegExp(ORG_ID + "*"), (ctx) => {
  axios
    .get(`${domain}/organizations/${organizationInfo.tableId}`)
    .then((response) => {
      const reformatedData = reformatOrganizationResponse(response.data);

      formatOrganization(ctx, reformatedData);
    })
    .catch((err) => {
      ctx.telegram.answerCbQuery(err.data.error);
    });
});

bot.action(new RegExp(CITY_ID + "*"), (ctx) => {
  printOrganizations(ctx);
});

bot.launch();
