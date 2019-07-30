var fullName
var rol
var startDate
var monthlyRate

var config = {
    apiKey: "AIzaSyA5kSxmSEXivFwddsX5ynwn6ytx74PsTQ8",
    authDomain: "timesheetform-9ba33.firebaseapp.com",
    databaseURL: "https://timesheetform-9ba33.firebaseio.com",
    projectId: "timesheetform-9ba33",
    storageBucket: "",
    messagingSenderId: "174581867394",
    appId: "1:174581867394:web:483839e78d878eb2"
};
// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database();


$(document).ready(function () {
    $("#addData").on("click", function (evt) {
        evt.preventDefault()

        trainName = $("#tName").val().trim()
        destination = $("#dest").val().trim()
        firstDate = moment($("#fdate").val().trim(), "HH:mm").format("HH:mm");
        frequency = $("#freq").val().trim()
        
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstDate: firstDate,
            frequency: frequency
        });
        $(".form-control").val('');



    })

    database.ref().on("child_added", function (snapshot) {
        var minDiff
        var hourDiff
       //////////////Current time////////
       var nowTimeAll = moment().format('HH:mm')
       var nowTimeH = moment().format('HH')
       var nowTimeM = moment().format('mm')
       //////////////Saved time////////   
       var startTime = snapshot.val().firstDate
       var frequencyTime = snapshot.val().frequency

      
       var momentStartTimeObj = moment(startTime, 'HH:mm')
       var startTimeHours = momentStartTimeObj.format('HH')
       var startTimeMinutes = momentStartTimeObj.format('mm')
       
       var hoursAway =moment(startTime,"hours").diff(moment(nowTimeAll,"hours"),"hours")
       var minutesAway =moment(startTime,":minutes").diff(moment(nowTimeAll,":minutes"),"minutes")
        //console.log(hoursAway)
       if(hoursAway>0 )
        {
            
            var now= startTime
            nowHour = moment(now, 'hh:mm').format('hh')
            convertNowHourToMinutes = nowHour*60
            nowMinute =  moment(now, 'hh:mm').format('mm')
            var minutesAway = convertNowHourToMinutes+nowMinute
        }
        else{
            var now= moment(nowTimeAll, "HH:mm").add(frequencyTime, "minutes").format('HH:mm')
            nowHour = moment(now, 'hh:mm').format('hh')
            convertNowHourToMinutes = nowHour*60
            nowMinute =  moment(now, 'hh:mm').format('mm')
            var minutesAway = convertNowHourToMinutes+nowMinute
        }
       
        var newRow = $("<tr>").append(
            $("<td>").text(snapshot.val().trainName),
            $("<td>").text(snapshot.val().destination),
            $("<td>").text(snapshot.val().frequency),
            $("<td>").text(now),
            $("<td>").text(minutesAway)
        )
        $(".table tbody").append(newRow)
    })
})

