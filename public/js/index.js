var socket = io();

       socket.on('connect', function() {
           console.log("connected to server");

       });

       socket.on('disconnect', function() {
           console.log("disconnect to server");
       });

       socket.on('newMessage', function(message){
           console.log("newMessage", message);
           var li = jQuery('<li></li>');
           li.text(`${message.from}: ${message.text} `);

           jQuery('#messages').append(li);
       });

       socket.emit('createMessage', {
           from: 'Frank',
           text: 'hi'
       }, function (data) {
           console.log('got it', data);
       });

       jQuery('#message-form').on('submit', function (e) {
           e.preventDefault();

           socket.emit('createMessage', {
               from: 'User',
               text: jQuery('[name=message]').val()
           }, function(){

           });
       });