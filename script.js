const taskForm=document.getElementById("taskForm");
const taskInput=document.getElementById("taskInput");
const priority=document.getElementById("priority");
const taskList=document.getElementById("taskList");
const empty=document.getElementById("empty");
let tasks=JSON.parse(localStorage.getItem("lifeDashboardTasks")||"[]");

document.getElementById("today").textContent=new Intl.DateTimeFormat("id-ID",{dateStyle:"full"}).format(new Date());

function save(){localStorage.setItem("lifeDashboardTasks",JSON.stringify(tasks));}
function render(){
  taskList.innerHTML="";
  empty.style.display=tasks.length?"none":"block";
  tasks.forEach((task,index)=>{
    const li=document.createElement("li");
    li.className=`task ${task.done?"done":""} ${task.priority}`;
    li.innerHTML=`<input class="check" type="checkbox" ${task.done?"checked":""} aria-label="Tandai selesai">
      <span class="task-name"></span><span class="badge">${task.priority==="high"?"Tinggi":task.priority==="medium"?"Sedang":"Rendah"}</span>
      <button class="delete" aria-label="Hapus tugas">×</button>`;
    li.querySelector(".task-name").textContent=task.name;
    li.querySelector(".check").addEventListener("change",()=>{tasks[index].done=!tasks[index].done;save();render()});
    li.querySelector(".delete").addEventListener("click",()=>{tasks.splice(index,1);save();render()});
    taskList.appendChild(li);
  });
  const total=tasks.length,done=tasks.filter(t=>t.done).length,remaining=total-done;
  const percent=total?Math.round(done/total*100):0;
  document.getElementById("total").textContent=total;
  document.getElementById("done").textContent=done;
  document.getElementById("remaining").textContent=remaining;
  document.getElementById("progressText").textContent=percent+"%";
  document.getElementById("progressBar").style.width=percent+"%";
  document.getElementById("progressDetail").textContent=`${done} dari ${total} tugas selesai`;
}
taskForm.addEventListener("submit",e=>{
  e.preventDefault();
  const name=taskInput.value.trim();
  if(!name)return;
  tasks.push({name,priority:priority.value,done:false});
  save();taskInput.value="";render();taskInput.focus();
});
document.getElementById("clearDone").addEventListener("click",()=>{tasks=tasks.filter(t=>!t.done);save();render()});
render();
