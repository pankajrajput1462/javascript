import * as amqp from "amqplib/callback_api";

export default class MessagePublish {
    url: string = 'localhost/'
    constructor() {
    }
    /**
     * publish to queue
     */
    public publishToQueue(queueName: string, data: any) {
        amqp.connect(this.url, async (error, connection) => {
            if (error) {
                throw new Error("Not able to connect Rabbit mq");
            }
            connection.createChannel(async (error, channel) => {
                if (error) {
                    throw new Error("channel error");
                }
                channel.assertQueue(queueName, {
                    durable: false
                });
                channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
            })

        });
    }
}