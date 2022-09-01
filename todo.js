const storeItems = [];
const getUserInputValue = () => {
  
  const userInput = document.querySelector("#todo");

  
  let id = Number(Math.random().toString().slice(2, 5));
    const itemData = {
    schedule: userInput.value,
    id,
  };

 
  storeItems.push(itemData);

  try {
    if (localStorage.getItem("todoItems") === null) {
      
      localStorage.setItem("todoItems", JSON.stringify(storeItems));
    } else {
      let storage = JSON.parse(localStorage.getItem("todoItems"));

      storage = [...storage, itemData];
      
      localStorage.setItem("todoItems", JSON.stringify(storage));

      
      readUserItemFromStorage();
    }
  } catch (error) {
    console.error(error);
  }
};

const readUserItemFromStorage = () => {
 const lists = document.querySelector("#lists");

  lists.innerHTML = ``;

  
  const storage = JSON.parse(localStorage.getItem("todoItems"));

  
  storage.length > 0 &&
    storage.forEach(({ schedule }) => {
      let liElement = document.createElement("li");
      let divElement = document.createElement("div");
      let iconWrapperElement = document.createElement("div");
      let delSpanIconElement = document.createElement("span");
      let trashSpanIconElement = document.createElement("span");
      let delIconElement = document.createElement("i");
      let trashIconElement = document.createElement("i");

      delSpanIconElement.setAttribute("class", "icon-wrapper-edit");
      delIconElement.setAttribute("class", "fas fa-edit");
      trashIconElement.setAttribute("class", "fas fa-trash");
      iconWrapperElement.setAttribute("class", "list-icon-wrapper");

      
      delSpanIconElement.setAttribute("id", "edit-icon");
      trashSpanIconElement.setAttribute("id", "delete-icon");

      let textNode = document.createTextNode(schedule);

      delSpanIconElement.appendChild(delIconElement);
      trashSpanIconElement.appendChild(trashIconElement);

      
      liElement.appendChild(textNode);
      
      iconWrapperElement.appendChild(delSpanIconElement);
     
      iconWrapperElement.appendChild(trashSpanIconElement);

      
      divElement.appendChild(liElement);
      
      divElement.appendChild(iconWrapperElement);

      
      lists.appendChild(divElement);

      trashIconElement.onclick = () =>
        deleteUserItemFromStorage({ index, storage });
    });
};

document.addEventListener("DOMContentLoaded", readUserItemFromStorage);

const noDataInDStorage = () => {
  const storage = JSON.parse(localStorage.getItem("todoItems"));
  console.log("storage", storage);
  const formWrapper = document.querySelector("#formWrapper");
  const divElement = document.createElement("div");

  if (storage.length > 0) {
    console.log("have data");
    divElement.classList.remove("no-data-text");
  } else if (storage.length < 1) {
    divElement.style.display = "flex";
    console.log("no data");
    divElement.style.display = "flex";
    divElement.classList.add("no-data-text");
    const pElement = document.createElement("p");
    let showCaseText = "Sorry, you have no items to display.";
    const textNode = document.createTextNode(showCaseText);

    pElement.appendChild(textNode);
    divElement.appendChild(pElement);
    formWrapper.appendChild(divElement);
  }
};

/**
 * It checks if the input value is already in the data array. If it is, it returns true.
 * @param data - the array of objects
 * @param inputValue - The value of the input field
 * @returns True or False
 */
const checkDuplicates = (data, inputValue) => {
  let resolveDuplicate =
    data.length > 0 && data.find((val) => val?.schedule === inputValue);

  if (resolveDuplicate) return true;
};

/**
 * It takes in the index of the item, the value of the item, and the id of the item, and then it
 * prompts the user to edit the item, and then it updates the item in localStorage.
 * @param index - The index of the item in the array.
 * @param value - The value of the todo item.
 * @param id - The id of the todo item.
 * @returns the value of the prompt.
 */
const editTodo = (index, value, id) => {
  let promptValue = window.prompt("Edit Todo", value);

  if (promptValue === "") return window.alert("Please enter a value.");

  let storage = JSON.parse(localStorage.getItem("todoItems"));

  storage.length > 0 && storage.splice(index, 1, { schedule: promptValue, id });

  localStorage.setItem("todoItems", JSON.stringify(storage));

  readUserItemFromStorage();
};

// const editTodo = ({ value, liElement, textNode, id }) => {
//   liElement.setAttribute("contentEditable", "true");
//   liElement.setAttribute("id", "targetList");
//   liElement.focus();

//   console.log("textNode :>> ", textNode);
//   // console.log("liNodeElemnt :>> ", liNodeElement.childNodes[0]);
//   console.log("liNodeElement :>> ", liElement.textContent);

//   console.log("liNodeElement :>> ", liElement.innerText);

//   textNode.addEventListener("keydown", watchKeyDown);
// };

// const watchKeyDown = (e) => {
//   console.log("e.childNodes :>> ", e.target.childNodes[0]);
//   if (e.keyCode === 13) {
//     console.log("e.target.te :>> ", e.target.innerText);
//     console.log("e.target.content :>> ", e.target.textContent);
//   }
//   // console.log("e :>> ", e);
// };