const addBtn = document.querySelector("#addBtn");
const events = document.querySelector(".events");
const inputEvent = document.querySelector("#inputEvent");
const listGroupEvents = document.querySelector(".events .list-group");

let firstTime = false;
let existingEvents = 0;

addBtn.addEventListener("click", addEvent);

function addEvent() {
  ++existingEvents;
  if (!firstTime && inputEvent.value != "") {
    events.classList.add("drop-events");
    firstTime = true;
  }
  if (inputEvent.value != "") {
    //Create Item
    const newItem = document.createElement("li");
    newItem.classList.add("list-group-item");
    newItem.textContent =
      inputEvent.value.charAt(0).toUpperCase() + inputEvent.value.slice(1); //Capitalized
    listGroupEvents.appendChild(newItem);
    newItem.addEventListener("click", () => {
      newItem.classList.add("line-throught");
    });
    inputEvent.value = null;

    //Create Done Option
    const doneItem = document.createElement("img");
    doneItem.src = "./assets/circle.svg";
    doneItem.classList.add("done-item");
    newItem.appendChild(doneItem);

    //Create remove option
    const removeItem = document.createElement("img");
    removeItem.src = "./assets/trash.png";
    removeItem.classList.add("remove-item");
    newItem.appendChild(removeItem);

    //'removeItem' & 'doneItem' are declared locally so I need to create the function inside this scope.
    doneItem.addEventListener("click", () => {
      doneItem.classList.toggle("fill-circle");
    });
    removeItem.addEventListener("click", () => {
      newItem.classList.add("delete-li");
      setTimeout(() => {
        listGroupEvents.removeChild(newItem);
        --existingEvents;
        if (existingEvents == 0) {
          events.classList.remove("drop-events");
          firstTime = false;
        }
      }, 600);
    });
  }
}

//Add items pressing Enter
inputEvent.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    addEvent();
  }
});
