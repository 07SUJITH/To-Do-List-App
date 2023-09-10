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
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML ="\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

const handleItemClick = e =>{
    if(e.target.tagName ==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName ==="SPAN"){
        e.target.parentElement.remove();
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
inputBox.addEventListener("keydown", (event)=>{
    handleEnterKeyClick(event);
});


const saveData = ()=>{
    localStorage.setItem("data",listContainer.innerHTML);
}
const showTasks = ()=>{
    listContainer.innerHTML = localStorage.getItem("data");
}
showTasks();


