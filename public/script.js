var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var tomday = tomorrow.getDate();
var tommonth = tomorrow.getMonth() + 1;
var tomyear = tomorrow.getFullYear();

if(tomday<10){tomday='0'+tomday} if(tommonth<10){tommonth='0'+tommonth} tomorrow = tommonth+'/'+tomday+'/'+tomyear;

$('#dueDate').attr('value', tomorrow);

alert($('#dueDate').attr('value'));

function showNotes() {
  console.log("calling show notes");
  const newNote = document.getElementById("newNotes").value;
  const notesValue = document.createElement('li');
  notesValue.setAttribute("class", "abc");
  notesValue.textContent = newNote;
  document.getElementById("notes").appendChild(notesValue);
}


async function getTodos() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3434/todos", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      let data = xhttp.response;
      data = JSON.parse(data);

      let showTaskList = document.getElementById("taskList");
      for (let d of data) {
        let element = document.createElement('li');
        element.textContent = d.title
        showTaskList.appendChild(element);
      }
    }
  }
}    
  async function addTask() {
    console.log(getTodos());
    let data = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      date: document.getElementById("dueDate").value,
      status: document.getElementById("status").checked,
      priority: function () {
        if (document.getElementById("high").checked)
          return "high";
        else if (document.getElementById("medium").checked)
          return "medium";
        else
          return "low";
      }(),
      notes: function () {
        let arr = [];
        var task = document.getElementsByClassName("abc");
  
        for (let i = 0; i < task.length; i++) {

          arr.push(task[i].textContent);
        }
        console.log(arr.toString());
        return arr.toString()
      }()
    }//end of data object
    const url = 'http://localhost:3434/todos';

    fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),


    }).catch(error => { console.log(error) })
  }




