//1.2
// 2.1
// 3.1
// 4.2
// 5.2
// 6.1
// 7.4
// 8.4
// 9.4
// 10.1
// 11. 3
// 12. 1
// 13. 4
//bai.1 
const array1 = ["a", "b", "c"];
const reversed = array1.reverse();
console.log("reversed:", reversed);
//bai.2
let myArray = [1, 2, 3, 5, 4, 2, 6, 4];

let myArrayWithNoDuplicates = myArray.reduce(function (accumulator, element) {
  if (accumulator.indexOf(element) === -1) {
    accumulator.push(element);
  }
  return accumulator;
}, []);

console.log(myArrayWithNoDuplicates);
//bai3.
/*tạo hàm tìm phần tử xuất hiện nhiều nhất trong mảng JavaScript*/
function array_unique(array) {
  array.sort();

  let max = [0, 0];

  //Sử dụng vòng lặp for để lọc ra các phần tử xuất hiện nhiều hơn 1 lần
  //So sánh số lần xuất hiện và thay đổi max khi cần.
  let count = 1;
  for (let i = array.length - 1; i > 0; --i) {
    if (array[i] == array[i - 1])
      ++count; //Thấy phần tử trùng nhau thì tiếp tục đếm
    else {
      //So sánh số lần xuất hiện với max[1]
      if (max[1] < count) {
        //Nếu tìm thấy phần tử xuất hiện nhiều hơn thì gán phần tử vào max[0]
        //Và gán số lần xuất hiện vào max[1]
        max[0] = array[i];
        max[1] = count;
      }
      count = 1;
    }
  }
  console.log(
    "Phần tử " + max[0] + " xuất hiện nhiều nhất với " + max[1] + " lần"
  );
}

let array = [1, 2, 3, 5, 6, 4, 2, 1, 6, 3, 5, 3];

array_unique(array);

//bai4
const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});