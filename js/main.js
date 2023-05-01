
// Personal Assistant




//elements
var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');


var user = {message:""};

var httpRequest;

chatbotSendMessage("Please choose an option: ");
initializeOptions();



function chatbotSendMessage(messageText){


    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50');
    messageElement.classList.add('float-left');
    messageElement.classList.add('shadow-sm');
    messageElement.style.margin ="10px";
    messageElement.style.padding ="5px";

    messageElement.innerHTML = "<span>Chatbot: </span>"+
    "<span style="+"margin-top:10px; padding:10px"+">"+ messageText +"</span>";

    messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1}],{duration:1000}); 
    chatContainer.appendChild(messageElement);

     //scroll to last message
     chatContainer.scrollTop = chatContainer.scrollHeight;
    
}



function sendMessage(messageText){

     var messageElement = document.createElement('div');
     messageElement.classList.add('w-50');
     messageElement.classList.add('float-right');
     messageElement.classList.add('shadow-sm');
     messageElement.style.margin ="10px";
     messageElement.style.padding ="5px";

     messageElement.innerHTML = "<span>You: </span>"+
     "<span style="+"margin-top:10px; padding:10px"+">"+ messageText +"</span>";

     messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1}],{duration:1000}); 
   
     chatContainer.appendChild(messageElement);

     //scroll to last message
      chatContainer.scrollTop = chatContainer.scrollHeight;
   

}







function initializeOptions(){

     let options = [
       {number:1,chocie:"Weather"},
       {number:2,chocie:"Sports"},
       {number:3,chocie:"News"},
     ];


    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50');
    messageElement.classList.add('float-left');
    messageElement.classList.add('shadow-sm');
    messageElement.style.margin ="10px";
    messageElement.style.padding ="5px";

    for(let i=0; i<options.length; i++){
          messageElement.innerHTML +=  "<br>"+
          "<span style="+"margin-top:10px; padding:10px"+">"+ options[i].number +" - "+ options[i].chocie +"</span>";

    }

    messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1}],{duration:1000}); 
    chatContainer.appendChild(messageElement);
      


}




function handleWeatherResponse(){

      if(httpRequest.readyState === XMLHttpRequest.DONE){
               if(httpRequest.status === 200){
                // console.log(httpRequest.responseText);    
                let response = JSON.parse(httpRequest.responseText);

                let city = response.location.name;
                let temp = response.current.temperature;
                let hum = response.current.humidity;
                let icon = response.current.weather_icons[0];

                let messageToSend = "<br>";
                messageToSend += "<span> <img src='"+ icon +"' > </span>";
                messageToSend += "<br>";
                messageToSend += " City: "+ city;
                messageToSend += "<br>";
                messageToSend += " Temperature: "+ temp + " C";
                messageToSend += "<br>";
                messageToSend += " Humidity: "+ hum;

                chatbotSendMessage(messageToSend);



               chatbotSendMessage("Please choose an option: ");
                initializeOptions();


               }else{

                    alert("There was an unexpected error.");
               }

      }

}





function getWeatherRequest(lat,long){

     httpRequest = new XMLHttpRequest();

     httpRequest.onreadystatechange = handleWeatherResponse
     httpRequest.open('GET',"http://api.weatherstack.com/current?access_key=0d3ad50bafa8fc0d247be50f2f691507&query="+lat+','+long);
     httpRequest.send();

}


function getLocationAndWeather(){


       navigator.geolocation.getCurrentPosition((pos)=>{

         let lat = pos.coords.latitude;
         let long = pos.coords.longitude;

         getWeatherRequest(lat,long);


       },(err)=>{

          console.log(err);

       });



}


function assistantResponse(messageText){


         let userChoice =  parseInt(messageText.trim());

         chatbotSendMessage('Please wait...');

         switch(userChoice){

          case 1:
               //alert("you chose weather");
               //get location then weather
               getLocationAndWeather();
               break;
          case 2:
               //get sports news
               alert("you chose sports");
               window.open('https://www.google.com/search?q=sports');
               break;
          case 3:
               //get general news
               alert("you chose news");
               window.open('https://www.google.com/search?q=news');
               break;
           default:               
           alert("Please choose a valid number");
           chatbotSendMessage("Please choose a valid number");
         }


}

sendBtn.addEventListener('click', function(e){

    if(textbox.value == ""){
     alert('Please type in a message');

    }else{
         
     let messageText = textbox.value.trim();   
     user.message = messageText;
     sendMessage(messageText); 
     textbox.value = "";  
     
  
      assistantResponse(messageText);



    }
});



textbox.addEventListener('keypress',function(e){

     //if user hits the enter button on keyborad (13)
      if(e.which == 13){
          if(textbox.value == ""){
               alert('Please type in a message');
          
              }else{
                   
               let messageText = textbox.value.trim();
               user.message = messageText;
               sendMessage(messageText); 
               textbox.value = "";  
        
          
               assistantResponse(messageText);
          
             
              }


      }


});




 

