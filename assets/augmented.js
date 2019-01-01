//========== GET CARDS AND RENDER THEM ON PAGE ==========//
$(document).ready(function(){
 $.ajax({
    type:'GET',
    url:"http://13.250.25.253:8080/getCards",
    crossDomain: true,
    success:function(cards){
              console.log('cards',cards)
               cards.map((card) => {
                   $('#cards').append(
                    '<div class="col-sm-3 card">'+
                        '<img class="card-img-top" src="assets/images/'+card.barcode+'" alt="Card image">'+
                        '<div class="card-body">'+
                        '<h4 class="card-title">Video</h4>'+
                        '<p class="card-text">Url- '+card.url+'</p>'+
                        '</div>'+
                    '</div>'
                   )
               })
           },
           error:function(err){
               console.log('err',err)
           }
        })
})


//========== Upload Video ==========//
function uploadFile(){
    
    // Appending video
    var fileData= $( '#file-input' )[0].files[0];

   // Checking if video size not greater than 100 MB
    if(fileData.size>100000000){
        $('#for-alerts').html(
            '<div class="alert alert-danger">'+
                '<strong>Error!</strong> File Exceeds 100 MB. Please Choose a small video'+
            '</div>'
        )
        return;
    }

    var data = new FormData();
    data.append( 'file', fileData );

    $.ajax({
        type:'POST',
        url:"http://13.250.25.253:8080/createCard",
        data:data,
        processData: false,  // tell jQuery not to process the data
        contentType: false,
        success:function(result){
            // show success alert
            $('#for-alerts').html(
                '<div class="alert alert-success">'+
                    '<strong>Success!</strong> Video Successfully Uploaded'+
                '</div>'
            )
           
            setTimeout(function(){ location.reload(); }, 2000);
            
        },
        error:function(err){
            $('#for-alerts').html(
                '<div class="alert alert-danger">'+
                    '<strong>Error!</strong> '+err+
                '</div>'
            )
        }
    })
   
}

