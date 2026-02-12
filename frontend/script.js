const API = "http://127.0.0.1:8000/api";

/* ===============================
   LOAD EMPLOYEES
================================ */
function loadEmployees() {
  fetch(`${API}/employees/`)
    .then(res => res.json())
    .then(data => {
      let table = `
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      `;

      data.forEach(emp => {
        table += `
          <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>
              <button onclick="deleteEmp(${emp.id})">Delete</button>
            </td>
          </tr>
        `;
      });

      document.getElementById("table").innerHTML = table;
    })
    .catch(err => console.error("Load employees error:", err));
}

/* ===============================
   ADD EMPLOYEE
================================ */
function addEmployee() {
  const data = {
    employee_id: document.getElementById("emp_id").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    department: document.getElementById("dept").value
  };

  fetch(`${API}/employees/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) throw new Error("Failed to add employee");
    return res.json();
  })
  .then(() => {
    alert("Employee added successfully");
    loadEmployees();
  })
  .catch(err => alert(err.message));
}

/* ===============================
   DELETE EMPLOYEE
================================ */
function deleteEmp(id) {
  fetch(`${API}/employees/${id}/`, {
    method: "DELETE"
  })
  .then(() => loadEmployees())
  .catch(err => console.error("Delete error:", err));
}

/* ===============================
   MARK ATTENDANCE
================================ */
function markAttendance() {
  const data = {
    employee: document.getElementById("emp_att_id").value,
    date: document.getElementById("att_date").value,
    status: document.getElementById("att_status").value
  };

  fetch(`${API}/attendance/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) throw new Error("Invalid Employee ID");
    return res.json();
  })
  .then(() => {
    alert("Attendance marked");
    loadAttendance();
  })
  .catch(err => alert(err.message));
}

/* ===============================
   LOAD ATTENDANCE BY EMPLOYEE
================================ */
function loadAttendance() {
  const empId = document.getElementById("view_emp_id").value;

  if (!empId) {
    alert("Please enter employee ID first");
    return;
  }

  fetch(`http://127.0.0.1:8000/api/attendance/${empId}/`)
    .then(res => {
      if (!res.ok) throw new Error("No attendance found");
      return res.json();
    })
    .then(data => {
      let table = `
        <tr>
          <th>Date</th>
          <th>Status</th>
        </tr>`;

      data.forEach(att => {
        table += `
          <tr>
            <td>${att.date}</td>
            <td>${att.status}</td>
          </tr>`;
      });

      document.getElementById("attendanceTable").innerHTML = table;
    })
    .catch(() => alert("Invalid Employee ID or no attendance"));
}

// function loadAttendance() {
//   const empId = document.getElementById("emp_att_id").value;

//   if (!empId) {
//     alert("Enter Employee ID first");
//     return;
//   }

//   fetch(`${API}/attendance/${empId}/`)
//     .then(res => res.json())
//     .then(data => {
//       let table = `
//         <tr>
//           <th>Date</th>
//           <th>Status</th>
//         </tr>
//       `;

//       data.forEach(a => {
//         table += `
//           <tr>
//             <td>${a.date}</td>
//             <td>${a.status}</td>
//           </tr>
//         `;
//       });

//       document.getElementById("attendanceTable").innerHTML = table;
//     })
//     .catch(err => console.error("Attendance load error:", err));
// }

/* ===============================
   AUTO LOAD ON PAGE OPEN
================================ */
document.addEventListener("DOMContentLoaded", loadEmployees);
























// const API = "http://127.0.0.1:8000/api";

// /* LOAD EMPLOYEES */
// function loadEmployees() {
//   fetch(`${API}/employees/`)
//     .then(res => res.json())
//     .then(data => {
//       let table = `
//         <tr>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Department</th>
//           <th>Action</th>
//         </tr>`;

//       data.forEach(emp => {
//         table += `
//           <tr>
//             <td>${emp.name}</td>
//             <td>${emp.email}</td>
//             <td>${emp.department}</td>
//             <td>
//               <button onclick="deleteEmp(${emp.id})">Delete</button>
//             </td>
//           </tr>`;
//       });

//       document.getElementById("table").innerHTML = table;
//     })
//     .catch(err => console.error("LOAD EMP ERROR:", err));
// }

// /* ADD EMPLOYEE */
// function addEmployee() {
//   fetch(`${API}/employees/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       employee_id: emp_id.value,
//       name: name.value,
//       email: email.value,
//       department: dept.value
//     })
//   })
//   .then(res => {
//     if (!res.ok) throw new Error("Failed");
//     return res.json();
//   })
//   .then(() => {
//     alert("Employee added");
//     loadEmployees();
//   })
//   .catch(() => alert("Error adding employee"));
// }

// /* DELETE EMPLOYEE */
// function deleteEmp(id) {
//   fetch(`${API}/employees/${id}/`, {
//     method: "DELETE"
//   }).then(() => loadEmployees());
// }

// /* LOAD ATTENDANCE */
// function loadAttendance() {
//   fetch(`${API}/attendance/1/`)  // example emp_id = 1
//     .then(res => res.json())
//     .then(data => {
//       let table = `
//         <tr>
//           <th>Employee</th>
//           <th>Date</th>
//           <th>Status</th>
//         </tr>`;

//       data.forEach(a => {
//         table += `
//           <tr>
//             <td>${a.employee}</td>
//             <td>${a.date}</td>
//             <td>${a.status}</td>
//           </tr>`;
//       });

//       document.getElementById("attendanceTable").innerHTML = table;
//     });
// }

// /* MARK ATTENDANCE */
// function markAttendance() {
//   fetch(`${API}/attendance/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       employee: emp_att_id.value,
//       date: att_date.value,
//       status: att_status.value
//     })
//   })
//   .then(res => {
//     if (!res.ok) throw new Error("Failed");
//     return res.json();
//   })
//   .then(() => {
//     alert("Attendance marked");
//     loadAttendance();
//   })
//   .catch(() => alert("Invalid Employee ID"));
// }

// /* AUTO LOAD */
// document.addEventListener("DOMContentLoaded", loadEmployees);
































// const API = "http://127.0.0.1:8000/api";

// function loadEmployees() {
//   fetch("http://127.0.0.1:8000/employees")
//     .then(res => res.json())
//     .then(data => {

//       let table = `
//       <tr>
//         <th>Name</th>
//         <th>Email</th>
//         <th>Department</th>
//         <th>Action</th>
//       </tr>`;

//       data.forEach(emp => {
//         table += `
//         <tr>
//           <td>${emp.name}</td>
//           <td>${emp.email}</td>
//           <td>${emp.department}</td>
//           <td>
//             <button onclick="deleteEmployee(${emp.id})">Delete</button>
//           </td>
//         </tr>`;
//       });

//       document.getElementById("table").innerHTML = table;
//     });
// }

// function addEmployee() {
//   const empId = document.getElementById("emp_id").value;
//   const nameVal = document.getElementById("name").value;
//   const emailVal = document.getElementById("email").value;
//   const deptVal = document.getElementById("dept").value;

//   fetch(`${API}/employees/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       employee_id: empId,
//       name: nameVal,
//       email: emailVal,
//       department: deptVal
//     })
//   })
//   .then(res => res.json())
//   .then(() => {
//     loadEmployees();
//     alert("Employee added");
//   })
//   .catch(err => console.error(err));
// }


// function loadAttendance() {
//   fetch("http://127.0.0.1:8000/attendance")
//     .then(res => res.json())
//     .then(data => {

//       let table = `
//       <tr>
//         <th>Employee ID</th>
//         <th>Date</th>
//         <th>Status</th>
//       </tr>`;

//       data.forEach(att => {
//         table += `
//         <tr>
//           <td>${att.employee_id}</td>
//           <td>${att.date}</td>
//           <td>${att.status}</td>
//         </tr>`;
//       });

//       document.getElementById("attendanceTable").innerHTML = table;
//     });
// }




// function deleteEmp(id) {
//   fetch(`${API}/employees/${id}/`, {
//     method: "DELETE"
//   })
//   .then(() => loadEmployees());
// }
// loadEmployees();
// function markAttendance() {
//   fetch(`${API}/attendance/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       employee: document.getElementById("emp_att_id").value,
//       date: document.getElementById("att_date").value,
//       status: document.getElementById("att_status").value
//     })
//   })
//   .then(res => res.json())
//   .then(() => alert("Attendance marked"))
//   .catch(err => console.error(err));
// }
