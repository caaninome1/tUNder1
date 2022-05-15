const amqp = require("amqplib/callback_api");

const host = process.env.MQHOST || "127.0.0.1";
const port = process.env.MQPORT || 5672;
const user = process.env.MQUSER || null;
const pass = process.env.MQPASS || null;
const userInfo = user ? `${user}:${pass}@` : "";
const queue = "tunder_images";
const url = `amqp://${userInfo}${host}:${port}`;

sendMessage = (message) => {
  console.log(url);
  console.log(queue);
  amqp.connect(url, function (err, conn) {
    if (err) {
      console.log("error al conectar con rabbitmq");
      console.log(err);
      return;
    }
    conn.createChannel(function (err, ch) {
      if (err) {
        console.log("error al crear canal");
        console.log(err);
        return;
      }
      ch.assertQueue(queue, { durable: true });
      var options = {
        persistent: true,
        noAck: false,
        timestamp: Date.now(),
        contentEncoding: "utf-8",
        contentType: "application/json",
      };
      ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(" [x] Sent %s", message.id);
    });
  });
};

module.exports = {
  sendMessage,
};
