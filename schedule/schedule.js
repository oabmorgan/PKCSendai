var scheduleDate = new Date();
var teacherID = "";
var teacherName = "";
var area = "";

function scheduleDay(day){
    this.day = day;
    this.dayType = "DAY OFF";
    this.location = "";
    this.fromTime = 0;
    this.toTime = 0;
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
                            var lineSplit = line.trim().split(" ");
                            if(currentDay != null){
                                if(line.includes("PRINTED")){
                                }
                                else if(line.includes("PRINTED")){
                                }
                                else if(line.includes("AREA")){
                                    area = lineSplit[lineSplit.length-1];
                                }
                                else if(line.includes("TEACHER")){
                                    teacherID = lineSplit[1];
                                    teacherName = lineSplit[3] +" "+ lineSplit[4];
                                }
                                else if(line.includes("UPDATE")){
                                }
                                else if(line.includes("MONTH")){
                                    var dateSplit = lineSplit[2].split("/");
                                    scheduleDate.setFullYear(dateSplit[0]);
                                    scheduleDate.setMonth(dateSplit[1]);
                                    scheduleDate.setDate(1);
                                }
                                else if(line.includes(":")){
                                    var timeSplit = lineSplit[0].split(":");
                                    var timeInt = parseInt(timeSplit[0])*100 + parseInt(timeSplit[1]);
                                    if(currentDay.fromTime == 0){
                                        currentDay.fromTime = timeInt;
                                    }
                                    currentDay.toTime = timeInt + 100;
                                    currentDay.lessons.push(lineSplit);
                                    currentDay.hours += 1.25;
                                } else if (currentDay.dayType == "DAY OFF"){
                                    currentDay.dayType = line;
                                } else if(line.length > 1) {
                                    currentDay.location += line;
                                }
                            }
                        }
                    }
                    for(i=0; i<schedule.length; i++){
                        currentDay = schedule[i];
                        scheduleDate.setDate(i);
                        setTable(i+1,0,currentDay.day);
                        setTable(i+1, 1, dayOfWeekAsString(scheduleDate.getDay()));
                        setTable(i+1,6,currentDay.location);
                        if(currentDay.fromTime > 0){
                            setTable(i+1, 3, currentDay.fromTime);
                            setTable(i+1, 4, currentDay.toTime);
                        }
                        if(currentDay.hours > 0){
                            setTable(i+1,2, "OM");
                            setTable(i+1,5,currentDay.hours);
                        } else {
                            setTable(i+1,2, "OFF");
                        }
                    }
                    
                    document.getElementById("EmployeeID").innerHTML = teacherID;
                    document.getElementById("FullName").innerHTML = teacherName;
                    document.getElementById("Area").innerHTML = area;
                    document.getElementById("Date").innerHTML = scheduleDate.getFullYear() + "/" + scheduleDate.getMonth();
                });
            }
        });
    });
});


function setTable(row, column, value){
    if(row<= 16){
        $("#SAS_Left tr:eq("+row+") td:eq("+column+")").html(value)
    } else {
        $("#SAS_Right tr:eq("+(row-16)+") td:eq("+column+")").html(value)
    }
}

function dayOfWeekAsString(dayIndex) {
  return ["MON","TUE","WED","THU","FRI","SAT","SUN"][dayIndex];
}