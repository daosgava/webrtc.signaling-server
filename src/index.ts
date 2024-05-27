import { Elysia, t } from "elysia";

const port = 3000;

const OPERATION = {
	JOIN: "join",
	NEW_USER: "new user",
	CANDIDATE: "candidate",
	OFFER: "offer",
	ANSWER: "answer",
	UNSUBSCRIBE: "unsubscribe",
};

const app = new Elysia()
	.ws("/ws", {
		body: t.Object({
			type: t.String(),
			room: t.String(),
			payload: t.Optional(
				t.Object({
					candidate: t.Optional(t.Any()),
					offer: t.Optional(t.Any()),
					answer: t.Optional(t.Any()),
				}),
			),
		}),
		message(ws, message) {
			switch (message.type) {
				case OPERATION.JOIN:
					ws.subscribe(message.room);
					console.info(`Subscribed to the ${message.room}`);
					ws.publish(String(message.room), { type: OPERATION.JOIN, room: message.room });
					break;
				case OPERATION.UNSUBSCRIBE:
					ws.unsubscribe(message.room);
					console.info(`Unsubscribed from the ${message.room}`);
					break;
				case OPERATION.CANDIDATE:
				case OPERATION.OFFER:
				case OPERATION.ANSWER:
					console.info(
						`Publishing ${message.type} to ${message.room}`,
					);
					ws.publish(String(message.room), message);
					break;
				default:
					console.log(`Unknown operation type: ${message.type}`);
					break;
			}
		},
	})
	.listen(port);

console.log(
	`🐲: Server is running at ${app.server?.hostname}:${app.server?.port}`,
);
