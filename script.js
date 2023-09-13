const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById("list-container");
const button = document.getElementById("button");

const audio = new Audio();
audio.src = './assets/audio/click.mp3'
const playAudio = ()=> {
    audio.play();
}


const  addTask = ()=>{
    playAudio();
    if(inputBox.value === ''){
        alert("You must write task..");
    }else{
        let li = document.createElement('li');
        
        let completeIcon = document.createElement('span');
        completeIcon.classList.add("completeIcon");
        li.appendChild(completeIcon);

        let p =  document.createElement('p');
        p.classList.add("task");

        let completionTime=  calculateCompletionTime()
        let task = inputBox.value +"<br>"+ " deadline : "  + completionTime.toString();
        p.innerHTML= task;
        li.appendChild(p);

        let removeIcon = document.createElement('span');
        removeIcon.classList.add("removeIcon");
        removeIcon.innerHTML ="<i class='fa fa-close red-color'></i>";
        li.appendChild(removeIcon);
        listContainer.appendChild(li);
    }
    inputBox.value = '';
    saveData();
}


const handleItemClick = e =>{
    if(e.target.tagName==="I"){
        const parent = e.target.parentElement;
        const grandparentElement = parent.parentElement;
        grandparentElement.remove();
        saveData();
        checkAndResetTime();
    }else if(e.target.classList.contains("completeIcon")){
        e.target.classList.toggle("checked");
        e.target.parentElement.classList.toggle("cross-line"); 
        saveData();
    }
}


const handleEnterKeyClick = event =>{
    if(event.key === "Enter"){
        playAudio();
        button.click();
        button.classList.add("button-active","hover-effect");
        setTimeout(()=>{
        button.classList.remove("button-active","hover-effect");
        },600);
    }
}


listContainer.addEventListener("click",(e)=>{
    handleItemClick(e);
    audio.play();
});
const inputField = document.querySelector(".inputField");
inputField.addEventListener("keydown", (event)=>{
    handleEnterKeyClick(event);
});


let previousCompletionTime = new Date();
function calculateCompletionTime() {
    const hoursRequired = parseFloat(document.getElementById("timeRequired").value);
    if (isNaN(hoursRequired) || hoursRequired <= 0) {
                alert("Please enter valid task details.");
                return;
    }
    const completionTime = new Date(previousCompletionTime.getTime() + (hoursRequired ) * 60 * 60 * 1000);
    previousCompletionTime = completionTime;
    savePrevCompletionTime();

    const options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
    };

    const formattedCompletionTime = completionTime.toLocaleTimeString(undefined, options);
    document.getElementById("timeRequired").value = "";
    return formattedCompletionTime;
    
}

const saveData = ()=>{
    localStorage.setItem("data",listContainer.innerHTML);
}
const showTasks = ()=>{
    listContainer.innerHTML = localStorage.getItem("data");
}
const savePrevCompletionTime = () => {
    // Convert the Date object to a string before saving it
    localStorage.setItem("prevCompletionTime", JSON.stringify(previousCompletionTime));
}
const showPrevCompletionTime = () => {
    // Retrieve the saved string and parse it back to a Date object
    const savedCompletionTime = localStorage.getItem("prevCompletionTime");
    if (savedCompletionTime) {
        previousCompletionTime = new Date(JSON.parse(savedCompletionTime));
    }
}
showPrevCompletionTime();
showTasks();


function checkAndResetTime() {
    const taskList = document.getElementById("list-container");
    if (taskList.children.length === 0) {
        previousCompletionTime = new Date();
    }
}
checkAndResetTime();


// ......date and time display............
function updateDateTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
        hours -= 12;
    }
    if (hours === 0) {
        hours = 12;
    }
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    
    document.getElementById("date").textContent = `${formattedDate}`;
    document.getElementById("time").textContent = `${formattedTime}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

