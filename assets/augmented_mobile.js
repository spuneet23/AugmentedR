/* First will get cards from API then Using AR.js creating a scene, dynamically creating markers 
    and attaching them to videos. So that when camera recognizes the pattern then can play linked video */
$(document).ready(function() {
    $.ajax({
      type: "GET",
      url: "http://13.250.25.253:8080/getCards",
      crossDomain: true,
      success: function(cards) {
        console.log("cards", cards);
        
        var cardsHtml = cards.map(function(card) {
                              return '<video muted id="vid'+card.video_id+'" autoplay loop="true" src='+card.url+' crossorigin="anonymous" playsinline webkit-playsinline ></video>'
                        })
            cardsHtml = cardsHtml.join('');

        var markers = cards.map(function(card){
                        return '<a-marker type="barcode" value='+card.video_id+'>'+
                          '<a-video src="#vid'+card.video_id+'" width="1" height="1" rotation="-90 0 0" position="0 0 0"></a-video>'+
                      '</a-marker>'
                      })
            markers = markers.join('');

        $('body').append(
             '<a-scene id="scene" embedded arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3">'+
              '<a-assets id="assets">'+
                 cardsHtml+
              '</a-assets>'+
                  markers+
               '<a-entity camera></a-entity>'+
            '</a-scene>'
        )
        
      },
      error: function(err) {
        console.log("err", err);
      }
    });
  });
  
