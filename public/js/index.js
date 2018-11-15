var socket = io();

       socket.on('connect', function() {
           console.log("connected to server");

           socket.emit('createMessage', {
               from: 'ashutosh',
               text: 'HEY, how are you'
           })
       });

       socket.on('disconnect', function() {
           console.log("disconnect to server");
       });

       socket.on('newMessage', function(message){
           console.log("newMessage", message);
       });