var dayofweek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var April = [1,1,1,1,1,1,1,
             2,2,2,2,2,2,2,
             3,3,3,3,3,3,3,
             4,4,4,4,4,4,4,
             0,0];

var May = [0,0,0,0,0,
           1,2,1,1,1,1,1,
           2,2,2,2,2,2,2,
           3,3,3,3,3,3,3,
           4,4,4,4,4];

var June = [4,4,
            1,1,1,1,1,1,1,
            2,2,2,2,2,2,2,
            0,3,3,3,3,3,3,
            3,4,4,4,4,4,4];

var July = [4,1,1,1,1,1,1,
            1,2,2,2,2,2,2,
            2,0,3,3,3,3,3,
            3,3,5,5,5,5,5,
            5,5,5];

var August = [5,5,5,5,
              4,4,4,4,4,4,4,
              0,0,0,0,1,1,1,
              1,1,1,1,2,2,2,
              2,2,2,2,3,3];

var September = [3,
                 3,3,3,3,4,4,4,
                 4,4,4,4,1,1,1,
                 1,1,1,1,2,2,2,
                 2,2,2,2,3,3,3,
                 3];

var October = [3,3,3,4,4,4,
               4,4,4,4,0,1,1,
               1,1,1,1,1,2,2,
               6,6,6,6,6,6,6,
               2,2,2,2];

var November = [2,3,3,
                3,3,3,3,3,4,4,
                4,4,4,4,4,1,1,
                0,1,1,1,1,0,2,
                1,2,2,2,2,2];

var December = [3,
               2,3,3,3,3,3,4,
               3,4,4,4,4,4,0,
               4,7,7,7,7,7,7,
               7,0,0,0,0,0,0,
               0,0];

var January = [0,0,0,0,1,
              1,1,1,1,1,1,2,
              2,2,2,2,2,2,3,
              3,3,3,3,3,3,4,
              4,4,4,4,4];

var February = [4,1,
               1,1,1,1,1,1,2,
               2,2,2,2,2,2,3,
               3,3,3,3,3,3,0,
               4,4,4,4,4];

var March = [4,4,
            1,1,1,1,1,1,1,
            2,2,2,2,2,2,2,
             3,3,3,3,3,3,3,
             4,4,4,4,4,4,4,
             0
            ];


function GetWorkDay(){
    var n =  new Date();
        
    var weekNumber = 0;
    
    var comment = "";    

    if(n.getYear() != 118) //not 2018
        return n.getMonth()+1+"/"+n.getDate();
    
    switch(n.getMonth()){
        case 0:
            weekNumber = January[n.getDate()-1];
            break;
        case 1:
            weekNumber = February[n.getDate()-1];
            break;
        case 2:
            weekNumber = March[n.getDate()-1];
            break;
        case 3: //april
            weekNumber = April[n.getDate()-1];
            break;
        case 4:
            weekNumber = May[n.getDate()-1];
            break;
        case 5:
            weekNumber = June[n.getDate()-1];
            break;
        case 6:
            weekNumber = July[n.getDate()-1]
            break;
        case 7:
            weekNumber = August[n.getDate()-1];
            break;
        case 8:
            weekNumber = September[n.getDate()-1];
            break;
        case 9:
            weekNumber = October[n.getDate()-1];
            break;
        case 10:
            weekNumber = November[n.getDate()-1];
            break;
        case 11:
            weekNumber = December[n.getDate()-1];
            break;
            
        
    }
    
    if(weekNumber == 0)
        comment = "Holiday!";
    else if(weekNumber == 5)
        comment =  "Summer School";
    else if(weekNumber == 6)
        comment =  "Halloween!";
    else if(weekNumber == 7)
        comment =  "Christmas!";
    else
        comment = "Week "+weekNumber;
    
    return dayofweek[n.getDay()] + " " + (n.getMonth()+1)+"/"+n.getDate()+ ": "+ comment;
}

if(Notification.permission != "granted"){
    Notification.requestPermission();
}

var notify = new Notification("Notify Test", {"body":"This is a notification test", "icon":"7106348.png");

document.getElementById("date").innerHTML = GetWorkDay();

