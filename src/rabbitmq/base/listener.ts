import { Channel, Connection, ConsumeMessage } from "amqplib";
import { KEYS } from "../constants/keys";
import { EXCHANGES } from "../constants/exchanges";
import { QUEUES } from "../constants/queues";

export abstract class Listener {
  abstract keys: KEYS[];
  abstract exchange: EXCHANGES;
  abstract queue: QUEUES;

  private conn: Connection;
  public channel!: Channel;

  constructor(conn: Connection) {
    this.conn = conn;
  }

  abstract handleEvents(
    key: KEYS,
    data: any,
    consumeMessage: ConsumeMessage
  ): void;

  parseMessage(msg: ConsumeMessage) {
    const data = msg.content.toString();
    return JSON.parse(data);
  }

  async listen() {
    // Channel creation
    const channel = await this.conn.createChannel();
    this.channel = channel;

    // Exchange creation / assertion
    await channel.assertExchange(this.exchange, "topic", {
      durable: true,
    });

    // Queue creation / binding
    const q = await channel.assertQueue(this.queue, {
      durable: true,
    });

    // Binding queues
    this.keys.forEach(async (key) => {
      await channel.bindQueue(q.queue, this.exchange, key);
    });

    // Consume events from queue
    channel.consume(
      q.queue,
      async (msg) => {
        if (msg) {
          const key = msg.fields.routingKey as KEYS;
          const parsedData = this.parseMessage(msg);

          console.log(
            `Received message with key: ${key}, exchange: ${this.exchange}, queue: ${this.queue} and message: `,
            parsedData
          );

          this.handleEvents(key, parsedData, msg);
        }
      },
      {
        noAck: false,
      }
    );

    console.log(
      `[*] Waiting for messages on queue: ${this.queue}. To exit press CTRL+C`
    );
  }
}
