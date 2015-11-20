/*
Group 7: Andrew Kordecki
         Jonathan Schrader
         Michael Reyes
         Nicoli William
  
GroupProject:Project Tracking Software  
11/20/2015
*/
//version 1.5

//these are some of the variable that we will need to 
//generate for our project. Please add any needed variable


var currentMem;
  var i, j;
var numUsers = 0;
var user = {firstName, lastName, userName, email, password, userID, profile, project};
var Project = {teamNum:0, memberName, memberRole,
               projectName, projectStatus, projectDescription, estCompletion, projectDeliverables,
               numDeliverables:0, hoursGoal, numIssues:0, issue, issueDescription, deliverable,
               deliverableDescription, teamHours, slicePercent, incompleteHours, weeklyHours, 
               numCommits, commit
                };
var commit = {commitNum, date:getDate(), teamMem:currentMem, hours, revision,
          problemDetected, problemDescription, numProblems:0, finishedRequirment, 
          fixedProblems
          };
var profile = {firstName, lastName, userID, about, profilePic,
            currentProjects, currentRoles, weeklyPersonalHours,
            numProjects
            }; 

//This section is for the project form page            
//********************************************************************            

Project.projectName = document.getElementById("projectName").value;
Project.estCompletion = document.getElementById("estCompletion").value;
Project.hoursGoal = document.getElementById("hoursGoal").value;
Project.projectDescription = document.getElementById("projectDescription").value;

function addDeliverable(){
    Project.deliverable [numDeliverables] = document.getElementById("").value;
    Project.deliverableDescription [numDeliverables] = document.getElementById("").value;
    Project.numDeliverables++;
}

function addTeamMembers(){
    Project.memberName [teamNum] = document.getElementById("memberName").value;
    Project.memberRole [teamNum] = document.getElementById("memberRole").value;
    Project.teamNum++;
}
//create actual project and projectHome page
function createProject(){
//to be filled
}
//***********************************************************************

//commit form section
//***********************************************************************
commit.hours = document.getElementById("hours").value;
commit.revision = document.getElementById("revision").value;

function addIssue(){
    commit.problemDetected [numProblems] = document.getElementById("problemDetected").value;
    commit.problemDescription [numProblems] = document.getElementById("problemDescription").value;
    commit.numProblems++;
}
function completeRequirement(){
//fufill ticket
}
function fixIssue(){
//fufill ticket
}
function commitToProject(){}
function uploadFiles(){}
//***********************************************************************

//profile creation section
//***********************************************************************
user.firstName = document.getElementById("firstName").value;
user.lastName = document.getElementById("lastName").value;

user.email = document.getElementById("email").value;
user.userName = document.getElementById("userName").value;
user.password = document.getElementById("password").value;
var checkPass = document.getElementById("password2").value;
 
function checkAccount(){
 if(checkPass != user.password)
    return wrongPassword();
 else
    return createAccount();
} 
function createAccount(){
    numUsers++;
//add variables to server and admit to the rest of the site, creating user pages
}
function wrongPassword(){
    window.alert("Passwords Do Not Match, please re-enter");
}   
//***********************************************************************

//section for project Front page
//***********************************************************************
var enterUsername = document.getElementById("enterUsername").value;
var enterPassword = document.getElementById("enterPassword").value;
function checkLogin(){  
    for(i=0; i<numUsers; i++){
        if(enterUsername == user[i].userName)
            if(enterPassword == user[i].password)
                return admitUser(user[i]);
            else 
                window.alert("Username to Password mismatch");                
    }
    window.alert("Incorrect Usrname or Password");
}
function admitUser(user[i]){
    //log into the user account for user[i]
}
//***********************************************************************

//section for projectHome page
//***********************************************************************
document.getElementById("projectName").style.display = Project.projectName;
document.getElementById("projectName2").style.display = Project.projectName;
document.getElementById("projectName3").style.display = Project.projectName;

document.getElementById("projectDescription").style.display = Project.projectDescription;
document.getElementById("estCompletion").style.display = Project.estCompletion;

for(i=0; i<Project.teamNum; i++){
    document.getElementById("teamMem").style.display = Project.memberName[i] + " - " Project.memberRole[i];
}
for(i=0; i<Project.numDeliverables; i++){
    document.getElementById("LoadDeliverables").style.display = Project.deliverable[i];
}
for(i=0; i<Project.numIssues; i++){
    document.getElementById("LoadIssues").style.display = Project.issue[i];
}

for(i=0; i<Project.numCommits; i++){
    document.getElementById("commitName").style.display = "Commit " + i + commit[i].date;
    document.getElementById("revision").style.display = commit[i].revision;
    for(j=0; j<commit.numProblems; j++)
        document.getElementById("issues").style.display = commit[i].issue[j];
}
//***********************************************************************

            
google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      google.setOnLoadCallback(drawBasic);
      
      
        $(".btn btn-default").click(function() {
        // Instead of directly editing CSS, toggle a class
        $(this).toggleClass("clicked");
        });
      
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Weekly Goal: 20hrs',  9],
          ['Person1: 2hrs', 2],
          ['Person2: 4hrs',  4],
          ['Person3: 2hrs', 2],
          ['Person4: 3hrs', 3]
        ]);

        var options = {
          title: 'Employee Contribution',
          chartArea: {width: '80%'},
          pieHole: 0.3,
          //slices: {
            //0: { color: '#3369E8' },
            //1: { color: '#AEC2FF' },
            //2: { color: '#5C85FF' },
            //3: { color: '#B6C4D4' },
            //4: { color: '#7AA3CC' }
          //}
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }
      
      function drawBasic() {

      var data = google.visualization.arrayToDataTable([
        ['Weeks', 'Hours Committed Per Week',],
        ['Week 1', 21],
        ['Week 2', 33],
        ['Week 3', 11],
        ['Week 4', 21],
      ]);

      var options = {
        title: 'Hours Committed Per Week',
        chartArea: {width: '60%'},
        hAxis: {
          title: 'Total Hours',
          minValue: 0
        },     
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }

/*struct users{
  String userName;
    String password;
    int userID;
    struct profile;
    struct projects;
}*/
/*struct Project{
    int teamNum; //number of team members
    String memberName [teamNum];
    String memberRole [teamNum];
    
    String projectName;
    int projectStatus = 0;
    String projectDescription;
    String estCompletion;
    String projectDeliverables [];
    int numDeliverables;
    int hoursGoal;
    
    projectInc = 100/numDeliverables;
    
    int numIssues;
    String issue [numIssues];
    String issueDescription [numIssues];
    String deliverable [numDeliverables]; 
    String deliverableDescription [numDeliverables];
    
    
    //chart section 1. pie, 
    int teamHours [teamNum]; 
    int slicePercent [teamNum] = hoursGoal/teamHours[teamNum];
    int incompleteHours = 100 - (all) slicePercent;   
    
    //2. bar
    int weeklyHours[1000];
    
    int numCommits [];
    struct commit [];
}*/ //when someone logs in, currentMem is linked to them
/*struct commit{
    project.commitNum;
    int time;
    int date;
    
    String teamMem = memberName;
    int hours;
    String revision;
    String problemsDetected [];

    String finishedRequirment [];
    String fixedProblems [];    
}*/
/*struct profile{
    String firstName;
    String lastName;
    int userID;
    String about;
    
    img profilePic;
    
    String currentProjects [3];
    String currentRoles [3];
    
    int weeklyPersonalHours [];
    
    int numProjects; //number of all personal projects worked on
}*/

//String currentProjects[struct Project.projectName];
//String completedProjects[struct Project.projectName];
//String comments [numProjects] = {empty};

</script>


