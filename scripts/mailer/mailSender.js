"use strict";
const Config = require("./config/mailerConfig");
const emailRecipents = Config.emailList;
const htmlTemplate = Config.htmlTemplate;
const nodemailer = require("nodemailer");

const formatMessages = (messages) => {
  const trTags = [];
  for (const msg of messages) {
    trTags.push(`<tr class="${msg.severity}">
                <td> ${msg.dateTime}</td>
                <td>${msg.severity}</td>
                <td>${msg.message}</td>
            </tr>`);
  }
  return htmlTemplate.replace("{TR}", trTags.join("\n"));
};
const sendEmail = async (messageFormatted) => {
  const mailjet = require("node-mailjet").connect("de5a4fd1d2a8fb915dc6f0922ccbd3b1", "5985cffd7e0265f1f29e3907ea2895ba");
  const messagesTo = [];
  for (const email of emailRecipents) {
    messagesTo.push({
      Email: email.email,
      Name: email.name || "Report subscriber",
    });
  }
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "eugeny.garder@sprintingsoftware.com",
          Name: "Duncan McLeod the Migrator",
        },
        To: messagesTo,
        Subject: "Migration Report",
        HTMLPart: messageFormatted,
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};
const sendEmails = (messages) => {
  const messageFormatted = formatMessages(messages);
  sendEmail(messageFormatted);
};

module.exports.sendEmails = sendEmails;
