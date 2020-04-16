/*let submit=document.getElementById('submit')
submit.onclick=function(){
    addTask()
}*/
//submit.addEventListener('click',addTask())

/*async function addTask()
{
    console.log("calling function");
   const url = 'https://localhost:3434/tasks';
    
        const title=document.getElementById("title").value;
        const description=document.getElementById("description").value;
        const dueDate=document.getElementById("dueDate").value;
        const status=document.getElementById("status").checked;
        const priority=getPriorityValue()

    
    const fetchData=await fetch(url,{
        method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(title,description,dueDate,status,priority)

    })
    const content=await fetchData.json();
    console.log(content);
}
function getPriorityValue()
{
    var priority=document.getElementsById("priority");
    for(i=0;i<priority.length;i++)
    {
        if(priority[0].checked)
        return "Low"
        else if(priority[1].checked)
        return "Medium"
        else
        return "High"
    
    }
}*/


function addTask(){
      let data={
         title:document.getElementById("title").value,
         description:document.getElementById("description").value,
         date:document.getElementById("dueDate").value,
         status:document.getElementById("status").checked,
         priority:function(){
            if(document.getElementById("high").checked)
               return "high";
            else if(document.getElementById("medium").checked)
               return "medium";
            else 
               return "low";
         }(),
         
         
      }//end of data object
      const url='http://localhost:3434/tasks';
    
      fetch(url,{
    method:"POST",
    headers:{ 'Content-Type':'application/json'},
    body:JSON.stringify(data),
 
    
})
      
      .catch(error=>{console.log(error)})
     
   } 
 
