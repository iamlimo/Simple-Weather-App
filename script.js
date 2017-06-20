$(function(){
    
    var key = "e72e06baca307df8ed39aebe3244ad3d";
    
    var location = {
    }
    function getLocation(){
        
        if(!navigator.geolocation){
            alert("What could possibly be wrong")
        }
        
        function success(position){
          var long = position.coords.longitude;
          var lat = position.coords.latitude;
             
            var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+lat+ "&lon=" + long +"&appid=" + key ;
            
            function displayLocation(){
              $.ajax({
                  url: url,
			      success: function(data){
                    $("#locateApp").html(data.name + ", " + data.sys.country);
                      //$("#tempApp").html(data.main.temp)
                      
                      /*function convertToCelsius(dataTime){
                         var inKelvin = dataTime;
                        var zeroKelvin = 273.15;
                        var convert = inKelvin - zeroKelvin;
                          return convert + "&#x2103;";
                      }
                    //convertToCelsius(kelvin)
                    $("#tempApp").html(convertToCelsius(data.main.temp));*/
                      
                      var metric ={
                          temp: data.main.temp,
                          celsius: "&#x2103;",
                          fahr: "&#x2109;",
                          toCelsius: function(){
                          var convert = this.temp- 273.15;
                              return Math.ceil(convert);
                        },
                          toFahr: function(){
                          var convert = (this.temp * 1.8)- 459.67;
                              return Math.ceil(convert);
                        }
                      }
                      
                     
                     
                     function toggleWeather(){
                        $("#tempApp").html(metric.toCelsius() + metric.celsius); 
                         
                      var div =  document.getElementById("tempApp");
                         div.addEventListener("click", function(){
                           
                        var div =  document.getElementById('tempApp');
                             
                  var sliced = metric.celsius.slice(3);
                  var num = parseInt(sliced, 16); 
                  var str = String.fromCharCode(num);
                  
                  var slicedFahr = metric.fahr.slice(3);
                  var numFahr = parseInt(slicedFahr, 16);
                  var strFahr = String.fromCharCode(numFahr);
                             

                  if (div.innerHTML === metric.toCelsius() + str) {
                      div.innerHTML = metric.toFahr() + metric.fahr;
                  } 
                             
                  else if(div.innerHTML === metric.toFahr() + strFahr){
                       div.innerHTML = metric.toCelsius() + metric.celsius
                   }
                   else {
                      console.log('No match string');
                      console.log(metric.toCelsius() + str);
                  }
                         }, false)
                     }
                      toggleWeather()
                     
                      
                     
                      
                    $("#icon").html("<img src='" +"https://openweathermap.org/img/w/" + data.weather[0].icon +"." + "png" + "'>");
                     
                    //convertToFahr 
                      
                     
                      
                   
                      
                  }
              })
            }
            
            displayLocation()
            
        };
        
        function error(){
            alert("can't access location")
        }
        
       
        navigator.geolocation.getCurrentPosition(success,error)
    }
   
    getLocation();
    
});

