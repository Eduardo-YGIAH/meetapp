const btnAttend = document.querySelector(".btn-attend-meet");
const modal = document.querySelector(".modal-overlay");
const btnConfirmAttendance = document.querySelector(".btn-confirm-attendance");

btnAttend.addEventListener("click", () => {
  modal.classList.add("modal-on");
});

btnConfirmAttendance.addEventListener("click", () => {
  modal.classList.remove("modal-on");
});
