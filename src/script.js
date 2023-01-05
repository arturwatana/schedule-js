/*
*   Criar agenda que, ao trocar o mes em questao, mostre as tasks do mes. - ok
    Seja possivel tambem criar uma task - ok
    Consulta de tasks por dia - ok
*/

const months = document.getElementById("months");
const taskName = document.getElementById("taskName");
const monthToAdd = document.getElementById("monthToAdd");
const addTaskButton = document.getElementById("addTaskButton");
const daysTasks = document.getElementById("daysTasks");
const dataSchedule = document.getElementById("schedule");
const dayQuery = document.getElementById("dayQuery");
const monthsQuery = document.getElementById("monthsQuery");
const taskQueryButton = document.getElementById("taskQueryButton");
const taskList = document.getElementById("taskList");

const nameMonths =
  "January,February,March,April,May,June,July,August,September,October,November,December";

for (let i = 1; i <= 31; i++) {
  let option = document.createElement("option");
  let option2 = document.createElement("option");
  option.setAttribute("value", i);
  option2.setAttribute("value", i);
  option.innerText = i;
  option2.innerText = i;
  daysTasks.appendChild(option);
  dayQuery.appendChild(option2);
}

class Schedule {
  constructor(months) {
    this.months = [];
    let monthIndex = 0;
    months.split(",").forEach((e) => {
      this.months.push({
        name: e,
        days: [],
      });
      if (monthIndex <= 12) {
        if (monthIndex == 1) {
          for (let i = 1; i <= 28; i++) {
            this.months[monthIndex].days.push({
              day: i,
              tasks: [],
            });
          }
        }
        if ((monthIndex % 2 != 0 && monthIndex != 1) || monthIndex == 0) {
          for (let i = 1; i <= 31; i++) {
            this.months[monthIndex].days.push({
              day: i,
              tasks: [],
            });
          }
        }
        if (monthIndex % 2 == 0 && monthIndex != 0) {
          for (let i = 1; i <= 30; i++) {
            this.months[monthIndex].days.push({
              day: i,
              tasks: [],
            });
          }
        }
      }
      monthIndex++;
    });
  }
  searchMonth(month) {
    let findedMonth = this.months.find(
      (e) => e.name.toLowerCase() === month.toLowerCase()
    );
    return findedMonth;
  }
  addEvent(taskName, days, month) {
    let findedMonth = this.searchMonth(month);
    let day = findedMonth.days.find((d) => d.day == days);
    if (!taskName) {
      alert("Por favor, digite uma descricao para a task!");
      return;
    }
    day.tasks.push(taskName);
    this.showEvents();
  }
  addDigit(dayInput, month) {
    let findedMonth = this.searchMonth(month);
    if (dayInput.childNodes.length > 0) {
      this.clear(dayInput);
    }
    for (let i = 1; i <= findedMonth.days.length; i++) {
      let option = document.createElement("option");
      option.setAttribute("value", i);
      option.innerText = i;
      dayInput.appendChild(option);
    }
  }

  searchEventsByDay(days, month) {
    let findedMonth = this.searchMonth(month);
    let day = findedMonth.days[days - 1];
    let ul = document.createElement("ul");
    day.tasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerText = task;
      ul.appendChild(li);
    });

    taskList.innerText = `Voce possui ${day.tasks.length} ${
      day.tasks.length == 1 ? "task" : "tasks"
    } hoje${day.tasks.length == 0 ? ", Parabéns!" : ", sendo: "}
   

 `;
    taskList.appendChild(ul);
  }

  showEvents() {
    let month = months.value;
    let currentMonth = this.months.find(
      (e) => e.name.toLowerCase() === month.toLowerCase()
    );
    if (dataSchedule.childNodes.length > 0) {
      this.clear(dataSchedule);
    }
    dataSchedule.classList.add("scheduleBorderOn");
    currentMonth.days.forEach((day) => {
      let card = document.createElement("div");
      card.setAttribute("class", "task");
      card.innerText = `Dia ${day.day}
                         Tasks: ${
                           day.tasks.length <= 1
                             ? day.tasks
                             : `${day.tasks[0]}, ${day.tasks[1]} ...`
                         }
                         Nº de tasks: ${day.tasks.length}`;
      dataSchedule.appendChild(card);
    });
  }
  clear(data) {
    let screenlength = data.childNodes.length;
    for (let i = 0; i < screenlength; i++) {
      data.childNodes[0].remove();
    }
  }
}

const schedule = new Schedule(nameMonths);

addTaskButton.addEventListener("click", () => {
  schedule.addEvent(taskName.value, daysTasks.value, monthToAdd.value);
});

months.addEventListener("change", () => {
  schedule.showEvents();
});

monthToAdd.addEventListener("click", () => {
  schedule.addDigit(daysTasks, monthToAdd.value);
});

monthsQuery.addEventListener("click", () => {
  schedule.addDigit(dayQuery, monthsQuery.value);
});

taskQueryButton.addEventListener("click", () => {
  schedule.searchEventsByDay(dayQuery.value, monthsQuery.value);
});

schedule.showEvents();
