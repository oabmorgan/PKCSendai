function scheduleDay(day){
    this.day = day;
    this.dayType = "DAY OFF";
    this.location = "";
    this.lessons = [];
    this.hours = 0;
}

$('#file').on('change', function($event) {
 var $file = $event.target.files[0];
    JSZip.loadAsync($file)
    .then(function(zip) {
        zip.forEach(function(relativePath, zipEntry){
            //Find the correct file within the zip
            if(zipEntry.name.split("/").pop() == "1.fpage"){
                zipEntry.async("string").then(function (data) {
                    //async and find string values
                   var rawData = data.split("UnicodeString=\"");
                    //loop through strings
                    
                    var schedule = [];                                        
                    for(var i=0; i<rawData.length; i++){
                        var line = rawData[i].split("\"")[0];
                        
                        //split day
                        if(line.length == 4 && parseInt(line) > 0){
                            schedule.push(new scheduleDay(schedule.length+1));
                            line = line.substring(2,4);    
                        }
                        //regular day
                        if(line.length == 2 && parseInt(line) > 0){
                            schedule.push(new scheduleDay(schedule.length+1));
                        }
                        else {
                            var currentDay = schedule[schedule.length-1];
                            if(currentDay != null){
                                if(line.includes("PRINTED")){
                                    break;
                                }
                                else if(line.includes(":")){
                                    var split = line.split(" ");
                                    currentDay.lessons.push(split);
                                    currentDay.hours += 1.25;
                                } else if (currentDay.dayType == "DAY OFF"){
                                    currentDay.dayType = line;
                                } else if(line.length > 1) {
                                    currentDay.location += line;
                                }
                            }
                        }
                    }
                    alert(schedule.length);
                    for(i=0; i<schedule.length; i++){
                        currentDay = schedule[i];
                        setTable(i+1,0,currentDay.day);
                        setTable(i+1,6,currentDay.location);
                        if(currentDay.hours > 0){
                            setTable(i+1,2, "OM");
                            setTable(i+1,5,currentDay.hours);
                        } else {
                            setTable(i+1,2, "OFF");
                        }
                    }
                });
            }
        });
    });
});


function setTable(row, column, value){
    $("#SAS tr:eq("+row+") td:eq("+column+")").html(value)
}