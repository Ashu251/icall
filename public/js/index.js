var socket = io();

       socket.on('connect', function() {
           console.log("connected to server");

       });

       socket.on('disconnect', function() {
           console.log("disconnect to server");
       });

       socket.on('newMessage', function(message){
        var formattedTime = moment(message.createdAt).format('h:mm a');
        
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);
       });

       socket.on('newLocationMessage', function (message){
        var formattedTime = moment(message.createdAt).format('h:mm a');    
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            url: message.url,
            from: message.from,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);
       });



    //    socket.emit('createMessage', {
    //        from: 'Frank',
    //        text: 'hi'
    //    }, function (data) {
    //        console.log('got it', data);
    //    });
       var messageTextbox = jQuery('[name=message]');
       jQuery('#message-form').on('submit', function (e) {
           e.preventDefault();

           socket.emit('createMessage', {
               from: 'User',
               text: jQuery('[name=message]').val()
           }, function(){
            messageTextbox.val('');
           });
       });


       var locationButton = jQuery('#send-location');
       locationButton.on('click', function () {
           if (!navigator.geolocation) {
               return alert('Geolocation not supported by your browser.');
           }

           locationButton.attr('disabled', 'disabled').text('Sending Location...');
           
            navigator.geolocation.getCurrentPosition(function (position) {
                locationButton.removeAttr('disabled').text('Sending Location');
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, function () {
                locationButton.removeAttr('disabled').text('Sending Location');
                alert('Unable to fetch loaction');
            });
       });