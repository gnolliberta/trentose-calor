/* your code should go here */

var temp =  '<li>'+
              '<div class="icon">'+
                '<img src="img/icons/IMG.png">' +     
              '</div>'+
              '<div class="stats">'+  
                '<h2>DAY</h2>'+
                '<strong>min</strong> MINºC'+
                '<strong>max</strong> MAXºC'+   
              '</div>'+ 
            '</li>' ;


$(document).ready(function(){
  
    var Model = {
        dati: data
    };
    
    var Controller = {
        
        summary: function(){
            View.summary();
        },
        get_length: function(){
            return Model.dati.length;
        },
        get_day: function(i){
            return Model.dati[i].day;
        },
        get_period: function(i){
            return Model.dati[i].period;
        },
        get_condition: function(i){
            return Model.dati[i].condition;
        },
        get_max: function(current_day){
            var max=0;
            for(var i =0; i<Model.dati.length; i++){
                if(Model.dati[i].day == current_day){
                    if(max < Model.dati[i].temperature){max = Model.dati[i].temperature;}
                }
            }
            return max;
        },
        get_min: function(current_day){
            var min=1000;
            for(var i =0; i<Model.dati.length; i++){
                if(Model.dati[i].day == current_day){
                    if(min > Model.dati[i].temperature){min = Model.dati[i].temperature;}
                }
            }
            return min;
        }
        
    };
  
    var View = {
        
        summary: function(){
             $("#summary").html("");
             for(var i =0; i<Controller.get_length(); i++){
                if(i==0 || Controller.get_day(i-1)!=Controller.get_day(i)){
                    console.log("giorno: ",Controller.get_day(i));
                    var tmpl = temp;
                    tmpl = tmpl.replace("IMG", Controller.get_condition(i))
                                .replace("DAY", Controller.get_day(i))
                                .replace("MAX", Controller.get_max(Controller.get_day(i)))
                                .replace("MIN", Controller.get_min(Controller.get_day(i)));
                    $("#summary").append(tmpl);
                }
                
            }
        }
    };
    
    Controller.summary();
});







