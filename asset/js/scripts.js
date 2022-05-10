today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + "<br>" + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cell.classList.add("none-day");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);

                cellInfo = document.createElement("span");
                cellInfo.setAttribute("id", "date" + date);
                cellInfo.classList.add("date");
                cellInfoText = document.createTextNode(daysInMonth(month - 1, year) - firstDay + 1 + j);
                cellInfo.appendChild(cellInfoText);

                cell.appendChild(cellInfo);
                row.appendChild(cell);
            }
            
            else if (date > daysInMonth(month, year)) {
                break;
            }
            
            else {
                cell = document.createElement("td");
                cell.setAttribute("id", date);

                cellText = document.createTextNode("");

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("current-day");
                } // color today's date
                cell.appendChild(cellText);

                cellInfo = document.createElement("span");
                cellInfo.setAttribute("id", "date" + date);
                cellInfo.classList.add("date");
                cellInfoText = document.createTextNode(date);
                cellInfo.appendChild(cellInfoText);

                //SECTION -- Add Event
                if (date == 3) {
                    cellEventul = document.createElement("ul");

                    cellEventli = document.createElement("li");
                    cellEventli.classList.add("reminder");

                    cellEventdiv = document.createElement("div");
                    cellEventdiv.classList.add("memo");

                    cellEventTime = document.createElement("span");
                    cellEventTime.classList.add("time");
                    cellEventTimeText = document.createTextNode("13:00pm-17:00pm");
                    cellEventTime.appendChild(cellEventTimeText);

                    cellEventName = document.createElement("div");
                    cellEventName.classList.add("event");
                    cellEventNameText = document.createTextNode("Chung kết cuộc thi Phong cách Cán asdsa dasda daasd sads adds.");
                    cellEventName.appendChild(cellEventNameText);

                    cellEventPerson = document.createElement("div");
                    cellEventPerson.classList.add("person");
                    cellEventPersonText = document.createTextNode("Bùi Xuân Dũng");
                    cellEventPerson.appendChild(cellEventPersonText);

                    cellEventdiv.appendChild(cellEventTime);
                    cellEventdiv.appendChild(cellEventName);
                    cellEventdiv.appendChild(cellEventPerson);
                    cellEventli.appendChild(cellEventdiv);
                    cellEventul.appendChild(cellEventli);
                    cellInfo.appendChild(cellEventul);
                };
                //!SECTION -- Add Event

                cell.appendChild(cellInfo);
                
                row.appendChild(cell);
                date++;
            }

        }
        tbl.appendChild(row); // appending each row into calendar body.
    }

}


// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}