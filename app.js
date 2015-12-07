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
        data: data,
        dati: [],
        init: function(){
            var tn=[]; var rv=[];
            var j=0; var k=0;
            for(var i =0;i< this.data.length; i++){
                if(this.data[i].city == "trento"){ tn[j]=this.data[i]; j++; }
                else{ rv[k]=this.data[i]; k++; }
            }
            this.dati[0] = tn;
            this.dati[1] = rv;
            //console.log(this.dati[0] [1]);
        }

    };
    
    var Controller = {
        init: function(){
            Model.init();
        },
        summary: function(){
            View.summary();
        },
        get_length: function(z){
            return Model.dati[z].length;
        },
        get_day: function(z,i){
            return Model.dati[z][i].day;
        },
        get_period: function(z,i){
            return Model.dati[z][i].period;
        },
        get_condition: function(z,i){
            return Model.dati[z][i].condition;
        },
        get_max: function(z,current_day){
            var max=0;
            for(var i =0; i<Model.dati[z].length; i++){
                if(Model.dati[z][i].day == current_day){
                    if(max < Model.dati[z][i].temperature){max = Model.dati[z][i].temperature;}
                }
            }
            return max;
        },
        get_min: function(z,current_day){
            var min=1000;
            for(var i =0; i<Model.dati[z].length; i++){
                if(Model.dati[z][i].day == current_day){
                    if(min > Model.dati[z][i].temperature){min = Model.dati[z][i].temperature;}
                }
            }
            return min;
        }
        
    };
  
    var View = {
        summary: function(){
            $("#btn-filter").click(function(){
                var z;
                if($("select").val() == "trento"){z=0;}
                else if($("select").val() == "rovereto"){z=1;}
                 $("#summary").html("");
                                console.log("z:",z);
                 for(var i =0; i<Controller.get_length(z); i++){
                    if(i==0 || Controller.get_day(z,i-1)!=Controller.get_day(z,i)){
                        //console.log("giorno: ",Controller.get_day(z,i));
                        var tmpl = temp;
                        tmpl = tmpl.replace("IMG", Controller.get_condition(z,i))
                                    .replace("DAY", Controller.get_day(z,i))
                                    .replace("MAX", Controller.get_max(z,Controller.get_day(z,i)))
                                    .replace("MIN", Controller.get_min(z,Controller.get_day(z,i)));
                        $("#summary").append(tmpl);
                    }
                }
            })
        }
    };
    Controller.init();
    Controller.summary();
});







