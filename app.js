async function fetchEmployees() {
  try {
    const response = await fetch("./data.json");
    return await response.json();
  } catch (err) {
    console.error("Failed to fetch employees:", err);
    return [];
  }
}

function createEmployeeCard(employee) {
  const template = document.getElementById("employee-card-template");
  const card = template.content.cloneNode(true);

  card.querySelector(".avatar").src = employee.user_avatar;

  card.querySelector(
    ".emp-name"
  ).textContent = `${employee.first_name} ${employee.last_name}`;

  card.querySelector(".emp-department").textContent = employee.department;
  card.querySelector(".emp-room").textContent = employee.room;

  card.querySelector(".emp-department-info").textContent = employee.department;
  card.querySelector(".emp-room-info").textContent = employee.room;

  // Attach click event to open profile page
  card.querySelector(".employee-card").addEventListener("click", () => {
    //window.location.href = `/employeeInfo.html?id=${employee._id}`;
    window.location.hash = `/users/${employee._id}`;
  });

  return card;
}

function renderEmployees(employees) {
  const container = document.getElementById("employees-container");

  const existingCards = container.querySelectorAll(".employee-card");
  existingCards.forEach((card) => card.remove());

  employees.forEach((employee) => {
    container.appendChild(createEmployeeCard(employee));
  });
}

let allEmployees = [];

async function init() {
  allEmployees = await fetchEmployees();
  renderEmployees(allEmployees);
  setupBasicSearch(allEmployees);

  const headerAvatar = document.getElementById("header-avatar");
  headerAvatar.src = allEmployees[0].user_avatar;

  const headerProfileBtn = document.querySelector(".btn.profile-btn");
  headerProfileBtn.addEventListener("click", () => {
    window.location.hash = `/users/${allEmployees[0]._id}`;
  });
}

//init();

function setupBasicSearch(employees) {
  const form = document.getElementById("basic-search-form");
  const input = document.getElementById("basic-search-input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = input.value.trim().toLowerCase();
    console.log(query);

    if (!query) {
      renderEmployees(employees);
      return;
    }

    const filtered = allEmployees.filter((emp) => {
      const id = (emp._id || "").toLowerCase();
      const firstName = (emp.first_name || "").toLowerCase();
      const lastName = (emp.last_name || "").toLowerCase();
      const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
      const fullNative = [
        emp.first_native_name,
        emp.middle_native_name,
        emp.last_native_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        id.includes(query) ||
        firstName.includes(query) ||
        lastName.includes(query) ||
        fullName.includes(query) ||
        fullNative.includes(query)
      );
    });

    renderEmployees(filtered);
  });
}

// --------------------------------------- employee details --------------------------------------------

function appendInfoItem(listEl, icon, label, value) {
  const template = document.getElementById("employee-info-template");
  const li = template.content.cloneNode(true);

  li.querySelector(".info-icon").src = icon;
  li.querySelector(".info-label").textContent = label;
  li.querySelector(".info-value").textContent = value;

  listEl.appendChild(li);
}

function fillGeneralInfo(employee) {
  const list = document.getElementById("generalInfo");

  appendInfoItem(list, "./assets/case.svg", "Department", employee.department);
  appendInfoItem(list, "./assets/building.svg", "Building", employee.building);
  appendInfoItem(list, "./assets/door.svg", "Room", employee.room);
  appendInfoItem(
    list,
    "./assets/hash.svg",
    "Desk number",
    employee.desk_number
  );
  appendInfoItem(
    list,
    "./assets/calendar-dots.svg",
    "Date of birth",
    `${employee.date_birth.year}-${employee.date_birth.month}-${employee.date_birth.day}`
  );
  appendInfoItem(
    list,
    "./assets/user-round.svg",
    "Manager",
    `${employee.manager.first_name} ${employee.manager.last_name}`
  );
}

function fillContactInfo(employee) {
  const list = document.getElementById("contactInfo");

  appendInfoItem(list, "./assets/mobile.svg", "Mobile phone", employee.phone);
  appendInfoItem(list, "./assets/at-sign.svg", "Email", employee.email);
  appendInfoItem(list, "./assets/telegram.svg", "Telegram", employee.telegram);
  appendInfoItem(list, "./assets/c-letter.svg", "C-number", employee.cnumber);
}

function fillTravelInfo(employee) {
  const list = document.getElementById("travelInfo");

  appendInfoItem(
    list,
    "./assets/earth.svg",
    "Citizenship",
    employee.citizenship
  );

  // VISA handling — array!
  if (employee.visa && employee.visa.length > 0) {
    employee.visa.forEach((visa, index) => {
      appendInfoItem(
        list,
        "./assets/v-letter.svg",
        `Visa ${index + 1}`,
        ` ${visa.type} (${visa.issuing_country})`
      );

      const start = formatDate(new Date(visa.start_date));
      const end = formatDate(new Date(visa.end_date));
      const expired = Date.now() > visa.end_date ? " (expired)" : "";
      const value = `${start} - ${end}`;

      appendInfoItem(
        list,
        "./assets/calendar-dots.svg",
        `Visa ${index + 1} validity period ${expired}`,
        value
      );
    });
  } else {
    appendInfoItem(list, "./assets/v-letter.svg", "Visa", "No active visas");
  }
}

function fillPersonalInfo(employee) {
  const wrapper = document.querySelector(".avatar-wrapper");
  const remoteBadge = wrapper.querySelector(".remote-work");

  // const avatar = wrapper.querySelector(".avatar");
  const avatar = document.getElementById("employee-page-avatar");

  const name = document.getElementById("employee-name");
  const fullName = document.getElementById("employee-fullName");

  avatar.src = employee.user_avatar;
  name.textContent = `${employee.first_name} ${employee.last_name}`;
  fullName.textContent = `${employee.first_native_name} ${employee.middle_native_name} ${employee.last_native_name}`;

  if (employee.isRemoteWork) {
    remoteBadge.style.display = "flex";
  } else {
    remoteBadge.style.display = "none";
  }
}

async function loadEmployee(id) {
  // const params = new URLSearchParams(window.location.search);
  // const id = params.get("id");

  // const employees = await fetchEmployees();
  // const employee = employees.find((e) => e._id === id);
  const employee = allEmployees.find((e) => e._id === id);

  if (!employee) return;

  clearEmployeeDetails();

  fillPersonalInfo(employee);
  fillGeneralInfo(employee);
  fillContactInfo(employee);
  fillTravelInfo(employee);

  // const backBtn = document.querySelector(".btn-back");
  // backBtn.addEventListener("click", () => {
  //   window.location.hash = "#/";
  // });
}

function clearEmployeeDetails() {
  document.getElementById("generalInfo").innerHTML = "";
  document.getElementById("contactInfo").innerHTML = "";
  document.getElementById("travelInfo").innerHTML = "";
}

// -- date formater --
function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// -------------------------- router ------------------------

function router() {
  const hash = window.location.hash;

  const listPage = document.getElementById("employees-page");
  const detailsPage = document.getElementById("employee-details-page");
  const notFoundPage = document.getElementById("user-details-notfound-page");

  if (hash.startsWith("#/users/")) {
    const id = hash.split("/")[2];
    console.log("employees:", allEmployees);
    const employee = allEmployees.find((e) => e._id === id);

    if (employee) {
      loadEmployee(id);
      listPage.style.display = "none";
      detailsPage.style.display = "grid";
      notFoundPage.style.display = "none";
    } else {
      // user not found → show 404
      listPage.style.display = "none";
      detailsPage.style.display = "none";
      notFoundPage.style.display = "block";
    }
  } else {
    listPage.style.display = "grid";
    detailsPage.style.display = "none";
    notFoundPage.style.display = "none";
    //init();
    renderEmployees(allEmployees);
  }
}

window.addEventListener("hashchange", router);
// window.addEventListener("load", router);

window.addEventListener("DOMContentLoaded", async () => {
  await init();

  // attach back button for 404 page
  const backBtn = document.querySelector(".back-homePage-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.hash = "#/";
    });
  }

  const backArrowBtn = document.querySelector(".btn-back");
  if (backArrowBtn) {
    backArrowBtn.addEventListener("click", () => {
      window.location.hash = "#/";
    });
  }

  router();
});

// attach back button handler
// const backBtn = notFoundPage.querySelector(".back-homePage-btn");
// backBtn.addEventListener("click", () => {
//   window.location.hash = "#/";
// });

// if (hash.startsWith("#/users/")) {
//   const id = hash.split("/")[2];

//   loadEmployee(id);
//   listPage.style.display = "none";
//   detailsPage.style.display = "grid";
// } else {
//   listPage.style.display = "grid";
//   detailsPage.style.display = "none";

//   init();
// }

// function setupBasicSearch(employees) {
//   const form = document.getElementById("basic-search-form");
//   const input = document.getElementById("basic-search-input");

//   const notFoundPage = document.querySelector(".not-found-page");
//   const listContainer = document.getElementById(".employee-grid-list");

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const query = input.value.trim().toLowerCase();

//     if (!query) {
//       notFoundPage.style.display = "none";
//       listContainer.style.display = "grid";
//       renderEmployees(employees);
//       return;
//     }

//     const filtered = allEmployees.filter((emp) => {
//       const id = (emp._id || "").toLowerCase();
//       const firstName = (emp.first_name || "").toLowerCase();
//       const lastName = (emp.last_name || "").toLowerCase();
//       const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
//       const fullNative = [
//         emp.first_native_name,
//         emp.middle_native_name,
//         emp.last_native_name,
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();

//       return (
//         id.includes(query) ||
//         firstName.includes(query) ||
//         lastName.includes(query) ||
//         fullName.includes(query) ||
//         fullNative.includes(query)
//       );
//     });

//     if (filtered.length === 0) {
//       // hide employee cards
//       listContainer.style.display = "none";

//       // show not-found block
//       notFoundPage.style.display = "flex";
//     } else {
//       // show employee cards
//       listContainer.style.display = "grid";
//       notFoundPage.style.display = "none";

//       renderEmployees(filtered);
//     }
//   });
// }
