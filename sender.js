const amqp = require('amqplib/callback_api')


//Create connection
amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        console.log('Connect failed')
        throw connError
    }

    //Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            console.log('Create channel failed')
            throw channelError
        }

        const data='{"id":11, "packet_no":126, "temperature":30, "humidity":60, "tds":1100, "pH":5.0}'

        //Assert Queue
        const QUEUE = 'testqueue'
        channel.assertQueue(QUEUE)

        //Send message
        channel.sendToQueue(QUEUE, Buffer.from(data))
        console.log('Message sent: ' + data);
    })
})