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

        //Assert Queue
        const QUEUE = 'testqueue'
        channel.assertQueue(QUEUE)

        //Send message
        channel.consume(QUEUE, msg => {
            console.log('Message received: ' + msg.content);
        })
        
    })
})