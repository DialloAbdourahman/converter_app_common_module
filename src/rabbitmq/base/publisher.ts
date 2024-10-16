import { Connection } from "amqplib";
import { Event } from "../constants/event-type";
import { EXCHANGES } from "../constants/exchanges";

export abstract class Publisher<T extends Event> {
  abstract key: T["key"];
  abstract exchange: EXCHANGES;

  private conn: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }

  async publish(data: T["data"]) {
    const channel = await this.conn.createChannel();

    await channel.assertExchange(this.exchange, "topic", {
      durable: true,
    });

    channel.publish(
      this.exchange,
      this.key,
      Buffer.from(JSON.stringify(data)),
      {
        persistent: true,
      }
    );

    console.log(
      `SENT event with key: ${this.key}, exchange: ${this.exchange} and data: ${data}`
    );

    channel.close();
  }
}
