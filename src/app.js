//The URIs of the REST endpoint
VUPS = "https://prod-13.northeurope.logic.azure.com:443/workflows/fa21be7e443945e4a137d5a3be9ed6a4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AjG3mpVGEwoMcFNlx7A2P9JcFwVSVmq4kGJMrR5QA20";
RAI = "https://prod-03.northeurope.logic.azure.com:443/workflows/291f6be3875d429093eec9235619fc55/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qAILInLWfmz7eOcKy80GDKB0buFWLDGEGs5i2i_NDTQ ";

BLOB_ACCOUNT = "https://videostorageb00811318.blob.core.windows.net";
DIA0 = "https://prod-00.centralus.logic.azure.com/workflows/77dec66a87c2491dbdef32435588b2f3/triggers/manual/paths/invoke/rest/v1/video/"
DIA1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=V_3iwA-88PaA27_uvGuqdUbsMCrVvK_BQYJyJMY_sxM"


//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
 submitData = new FormData();
 //Get form variables and append them to the form data object
 submitData.append('FileName', $('#FileName').val());
 submitData.append('userID', $('#userID').val());
 submitData.append('userName', $('#userName').val());
 submitData.append('File', $("#UpFile")[0].files[0]);
 

 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
 url: VUPS,
 data: submitData,
 cache: false,
 enctype: 'multipart/form-data',
 contentType: false,
 processData: false,
 type: 'POST',
 success: function(data){

 }
 });
 

}

function reviewSubmit(){
  submitData = new FormData();
  submitData.append('reviewTextbox', $('#reviewTextbox').val());

$.ajax({
  url: VUPS,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success: function(data){

  }
})


}


//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
//Replace the current HTML in that div with a loading message
$('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
$.getJSON(RAI, function( data ) {
//Create an array to hold all the retrieved assets
var items = [];




//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
$.each( data, function( key, val ) {
items.push( "<hr />");
items.push( "<video controls> <source type='video/mp4' src='"+BLOB_ACCOUNT + val["filepath"] + "'width =''/> <br />></video>")
items.push( "<br><br>File Name: <b>" + val["fileName"] +"</b><br />");
items.push( "<br>Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
items.push( "<input placeholder='feel free to leave a review of the video' id='reviewText' style='width: 350px; height: 300px'>")
items.push( '<button type="button" id="appendTextBox" class="btn btn-link" onclick="reviewSubmit(\''+val["id"] +'\')">Submit Review</button> ')
items.push( '<br><br><button type="button" id="video" class="btn btn-danger" onclick="deleteVideo(\''+val["id"] +'\')">Delete</button <br/><br/>')
items.push( "<hr />");
});
//Clear the assetlist div
$('#ImageList').empty();
//Append the contents of the items array to the ImageList Div
$( "<ul/>", {
"class": "my-new-list",
html: items.join( "" )
}).appendTo( "#ImageList" );
});
 
}


function deleteVideo (id){

$.ajax({
  type: "DELETE",
  url: DIA0 + id + DIA1,

}).done(function( msg ) {
  getImages();
})
}




//items.push( "<video controls> <source type='video/mp4' src='"+BLOB_ACCOUNT + val["filepath"] + "'width =''/> <br />></video>")