const token = localStorage.getItem("token");

if (!token) {

  window.location.href = "/login.html";
}

const payload =
  JSON.parse(atob(token.split(".")[1]));

const role =
  payload.role;
  const userEmail =
  payload.email;

document.getElementById("roleBadge").innerText =

  role;
if (role === "Member") {

  document.getElementById(
    "dashboardTitle"
  ).innerText = userEmail;
}
let users = [];

// LOAD DASHBOARD

async function loadDashboard() {

  try {

    // MEMBER VIEW

    if (role === "Member") {

      document.querySelectorAll(".admin-only")
        .forEach(el => {
          el.style.display = "none";
        });

      document.getElementById("projectsSection")
        .style.display = "none";
    }

    // LOAD USERS

    const usersResponse =
      await fetch("/api/auth/users", {

        headers: {
          Authorization: token,
        },
      });

    users =
      await usersResponse.json();

    // MEMBER DROPDOWN

    const assignedDropdown =
      document.getElementById("taskAssignedUser");

    const memberList =
      document.getElementById("memberList");

    if (assignedDropdown) {

      assignedDropdown.innerHTML = "";
    }

    if (memberList) {

      memberList.innerHTML = "";
    }

    users
    .filter(user => user.role === "Member")
    .forEach(user => {

      // ASSIGN DROPDOWN

      if (assignedDropdown) {

        assignedDropdown.innerHTML += `
          <option value="${user._id}">
            ${user.name}
          </option>
        `;
      }

      // MEMBER CARDS

      if (memberList && role === "Admin") {

        memberList.innerHTML += `

          <div class="bg-white rounded-2xl shadow p-6">

            <div class="flex justify-between items-center mb-4">

              <h3 class="text-2xl font-bold">
                ${user.name}
              </h3>

              <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                ${user.role}
              </span>

            </div>

            <p class="text-gray-600 mb-5">
              ${user.email}
            </p>

            <button
              onclick="viewMemberTasks('${user._id}')"
              class="bg-green-500 text-white px-4 py-2 rounded-lg w-full mb-3"
            >
              View Tasks
            </button>

            <button
              onclick="deleteMember('${user._id}')"
              class="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Delete Member
            </button>

          </div>
        `;
      }
    });

    // LOAD PROJECTS

    const projectResponse =
      await fetch("/api/projects", {

        headers: {
          Authorization: token,
        },
      });

    const projects =
      await projectResponse.json();

    document.getElementById("projectCount").innerText =
      projects.length;

    const projectList =
      document.getElementById("projectList");

    const projectDropdown =
      document.getElementById("taskProject");

    if (projectList) {

      projectList.innerHTML = "";
    }

    if (projectDropdown) {

      projectDropdown.innerHTML = "";
    }

    projects.forEach(project => {

      // PROJECT DROPDOWN

      if (projectDropdown) {

        projectDropdown.innerHTML += `
          <option value="${project._id}">
            ${project.title}
          </option>
        `;
      }

      // ADMIN ONLY PROJECTS

      if (role === "Admin") {

        projectList.innerHTML += `

          <div class="bg-white rounded-2xl shadow p-6">

            <div class="flex justify-between items-center mb-4">

              <h3 class="text-2xl font-bold">
                ${project.title}
              </h3>

              <select
                onchange="updateProjectStatus('${project._id}', this.value)"
                class="border p-2 rounded-lg"
              >

                <option value="Active"
                  ${project.status === "Active" ? "selected" : ""}>
                  Active
                </option>

                <option value="On Hold"
                  ${project.status === "On Hold" ? "selected" : ""}>
                  On Hold
                </option>

                <option value="Completed"
                  ${project.status === "Completed" ? "selected" : ""}>
                  Completed
                </option>

              </select>

            </div>

            <p class="text-gray-600 mb-5">
              ${project.description}
            </p>

            <div class="mb-5">

              <h4 class="font-bold mb-2">
                Team Members
              </h4>

              <div class="flex flex-wrap gap-2 mb-4">

                ${
                  !project.members ||
                  project.members.length === 0

                  ? "<p>No members</p>"

                  : project.members.map(member => `

                      <div class="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full text-sm">

                        <span>
                          ${member.name}
                        </span>

                        <button
                          onclick="removeMember('${project._id}', '${member._id}')"
                          class="text-red-600 font-bold"
                        >
                          ×
                        </button>

                      </div>

                    `).join("")
                }

              </div>

              <select
                id="member-${project._id}"
                class="w-full border p-2 rounded-lg mb-3"
              >

                ${users
                  .filter(user => user.role === "Member")
                  .map(user => `
                    <option value="${user._id}">
                      ${user.name}
                    </option>
                  `).join("")
                }

              </select>

              <button
                onclick="addMember('${project._id}')"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-3"
              >
                Add Member
              </button>

              <button
                onclick="deleteProject('${project._id}')"
                class="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Delete Project
              </button>

            </div>

          </div>
        `;
      }
    });

    // LOAD TASKS

    const taskResponse =
      await fetch("/api/tasks", {

        headers: {
          Authorization: token,
        },
      });

    const tasks =
      await taskResponse.json();

    const filteredTasks =
      role === "Admin"

      ? tasks

      : tasks.filter(
          task =>
            task.assignedTo?._id === payload.id
        );

    document.getElementById("taskCount").innerText =
      filteredTasks.length;

    const completedTasks =
      filteredTasks.filter(
        task => task.status === "Completed"
      );

    document.getElementById("completedCount").innerText =
      completedTasks.length;

    const overdueTasks =
      filteredTasks.filter(task => {

        return (
          new Date(task.dueDate) < new Date() &&
          task.status !== "Completed"
        );
      });

    document.getElementById("overdueCount").innerText =
      overdueTasks.length;

    const taskList =
      document.getElementById("taskList");

    taskList.innerHTML = "";

    filteredTasks.forEach(task => {

      const overdue =
        new Date(task.dueDate) < new Date() &&
        task.status !== "Completed";

      taskList.innerHTML += `

        <div class="bg-white rounded-2xl shadow p-6 border-l-8 ${
          overdue
          ? "border-red-500"
          : "border-green-500"
        }">

          <div class="flex justify-between items-start mb-4">

            <div>

              <h3 class="text-2xl font-bold">
                ${task.title}
              </h3>

              <p class="text-gray-500">
                ${task.description}
              </p>

            </div>

            <div class="flex flex-col gap-2">

              <select
                onchange="updateTaskStatus('${task._id}', this.value)"
                class="border p-2 rounded-lg"
              >

                <option value="Pending"
                  ${task.status === "Pending" ? "selected" : ""}>
                  Pending
                </option>

                <option value="In Progress"
                  ${task.status === "In Progress" ? "selected" : ""}>
                  In Progress
                </option>

                <option value="Completed"
                  ${task.status === "Completed" ? "selected" : ""}>
                  Completed
                </option>

              </select>

              ${
                role === "Admin"
                ? `
                  <button
                    onclick="deleteTask('${task._id}')"
                    class="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                `
                : ""
              }

            </div>

          </div>

          <div class="flex flex-wrap gap-3">

            <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              ${task.priority}
            </span>

            <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              ${task.status}
            </span>

            <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Assigned:
              ${task.assignedTo?.name || "Unknown"}
            </span>

            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              Due:
              ${new Date(task.dueDate).toLocaleDateString()}
            </span>

            ${
              overdue
              ? `
                <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  Overdue
                </span>
              `
              : ""
            }

          </div>

        </div>
      `;
    });

  } catch (error) {

    console.log(error);
  }
}

// LOGOUT

function logout() {

  localStorage.removeItem("token");

  window.location.href = "/login.html";
}

// CREATE PROJECT

async function createProject() {

  const title =
    document.getElementById("projectTitle").value;

  const description =
    document.getElementById("projectDescription").value;

  await fetch("/api/projects", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },

    body: JSON.stringify({
      title,
      description,
    }),
  });

  loadDashboard();
}

// CREATE TASK

async function createTask() {

  const title =
    document.getElementById("taskTitle").value;

  const description =
    document.getElementById("taskDescription").value;

  const assignedTo =
    document.getElementById("taskAssignedUser").value;

  const projectId =
    document.getElementById("taskProject").value;

  const priority =
    document.getElementById("taskPriority").value;

  const dueDate =
    document.getElementById("taskDueDate").value;

  await fetch("/api/tasks", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },

    body: JSON.stringify({
      title,
      description,
      assignedTo,
      projectId,
      priority,
      dueDate,
    }),
  });

  alert("Task Created");

  loadDashboard();
}

// UPDATE TASK

async function updateTaskStatus(taskId, status) {

  await fetch(`/api/tasks/${taskId}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },

    body: JSON.stringify({
      status,
    }),
  });

  loadDashboard();
}

// DELETE TASK

async function deleteTask(taskId) {

  await fetch(`/api/tasks/${taskId}`, {

    method: "DELETE",

    headers: {
      Authorization: token,
    },
  });

  loadDashboard();
}

// DELETE MEMBER

async function deleteMember(userId) {

  await fetch(`/api/auth/users/${userId}`, {

    method: "DELETE",

    headers: {
      Authorization: token,
    },
  });

  loadDashboard();
}

// VIEW MEMBER TASKS

async function viewMemberTasks(userId) {

  try {

    const response =
      await fetch("/api/tasks", {

        headers: {
          Authorization: token,
        },
      });

    const tasks =
      await response.json();

    const memberTasks =
      tasks.filter(
        task =>
          task.assignedTo?._id === userId
      );

    const section =
      document.getElementById(
        "memberTasksSection"
      );

    const container =
      document.getElementById(
        "memberTasksContainer"
      );

    section.classList.remove("hidden");

    container.innerHTML = "";

    if (memberTasks.length === 0) {

      container.innerHTML = `

        <div class="bg-white rounded-2xl shadow p-6">

          <h3 class="text-2xl font-bold text-gray-700">
            No Tasks Assigned
          </h3>

        </div>
      `;

      return;
    }

    memberTasks.forEach(task => {

      const overdue =
        new Date(task.dueDate) < new Date() &&
        task.status !== "Completed";

      container.innerHTML += `

        <div class="bg-white rounded-2xl shadow p-6 border-l-8 ${
          overdue
          ? "border-red-500"
          : "border-green-500"
        }">

          <div class="flex justify-between items-center mb-4">

            <h3 class="text-2xl font-bold">
              ${task.title}
            </h3>

            <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              ${task.status}
            </span>

          </div>

          <p class="text-gray-600 mb-5">
            ${task.description}
          </p>

          <div class="flex flex-wrap gap-3">

            <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              ${task.priority}
            </span>

            <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              ${task.project?.title || "No Project"}
            </span>

            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              Due:
              ${new Date(task.dueDate).toLocaleDateString()}
            </span>

            ${
              overdue
              ? `
                <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  Overdue
                </span>
              `
              : ""
            }

          </div>

        </div>
      `;
    });

  } catch (error) {

    console.log(error);

  }
}
function closeMemberTasks() {

  document
    .getElementById("memberTasksSection")
    .classList.add("hidden");
}

// ADD MEMBER

async function addMember(projectId) {

  const userId =
    document.getElementById(`member-${projectId}`).value;

  await fetch(`/api/projects/${projectId}/add-member`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },

    body: JSON.stringify({
      userId,
    }),
  });

  loadDashboard();
}

// REMOVE MEMBER

async function removeMember(projectId, userId) {

  await fetch(`/api/projects/${projectId}/remove-member`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },

    body: JSON.stringify({
      userId,
    }),
  });

  loadDashboard();
}

// UPDATE PROJECT

async function updateProjectStatus(projectId, status) {

  await fetch(`/api/projects/${projectId}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },

    body: JSON.stringify({
      status,
    }),
  });

  loadDashboard();
}

// DELETE PROJECT

async function deleteProject(projectId) {

  await fetch(`/api/projects/${projectId}`, {

    method: "DELETE",

    headers: {
      Authorization: token,
    },
  });

  loadDashboard();
}

loadDashboard();