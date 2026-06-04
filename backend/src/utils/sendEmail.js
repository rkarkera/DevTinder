const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("../utils/sesClient");

const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [
      ],
      ToAddresses: [
        toAddress,
      ],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<h1>Testing ses</h1>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "Testing ses",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "testing ses",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
    ],
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand(
    "karkerarachan19@gmail.com",
    "karkerarachan19@gmail.com",
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

module.exports = { run };