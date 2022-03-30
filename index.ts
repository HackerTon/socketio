import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import fastifyStatic from "fastify-static";
const path = require("path");

const server = fastify({ logger: true });
server.register(fastifyIO);
server.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
});

// server.get("/abc", async (req, reply) => {
//   server.io.emit("hello");
//   return "ping";
// });

const start = async () => {
  try {
    await server.listen(3000);

    server.io.on("connection", (socket) => {
      console.log(`User ${socket.id} connected!`);
      server.io.emit("hello", "hello");

      // socket.on("hello", () => {
      //   console.log("hello");
      // });
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
