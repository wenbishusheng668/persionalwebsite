const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const friendDialog = document.querySelector("#friend-dialog");
const friendDialogTitle = document.querySelector("#friend-dialog-title");
const friendDialogStage = document.querySelector("#friend-dialog-stage");
const friendEvaluation = document.querySelector("#friend-evaluation");
const friendSaveStatus = document.querySelector("#friend-save-status");
const friendSave = document.querySelector("#friend-save");
const friendClear = document.querySelector("#friend-clear");
const friendClose = document.querySelector("#friend-dialog-close");
const friendButtons = Array.from(document.querySelectorAll(".friend-button"));

let activeFriendKey = "";

const getFriendKey = (button) => {
  return `friend-evaluation:${button.dataset.stage}:${button.dataset.friend}`;
};

const refreshFriendStates = () => {
  friendButtons.forEach((button) => {
    const value = localStorage.getItem(getFriendKey(button));
    button.classList.toggle("has-evaluation", Boolean(value));
  });
};

const openFriendDialog = (button) => {
  activeFriendKey = getFriendKey(button);
  friendDialogTitle.textContent = `${button.dataset.friend}的自我评价`;
  friendDialogStage.textContent = button.dataset.stage;
  friendEvaluation.value = localStorage.getItem(activeFriendKey) || "";
  friendSaveStatus.textContent = "内容保存在当前浏览器本地。";

  if (typeof friendDialog.showModal === "function") {
    friendDialog.showModal();
  } else {
    friendDialog.setAttribute("open", "");
  }

  friendEvaluation.focus();
};

friendButtons.forEach((button) => {
  button.addEventListener("click", () => openFriendDialog(button));
});

if (friendSave) {
  friendSave.addEventListener("click", () => {
    const value = friendEvaluation.value.trim();

    if (value) {
      localStorage.setItem(activeFriendKey, value);
      friendSaveStatus.textContent = "已保存。";
    } else {
      localStorage.removeItem(activeFriendKey);
      friendSaveStatus.textContent = "内容为空，已清空。";
    }

    refreshFriendStates();
  });
}

if (friendClear) {
  friendClear.addEventListener("click", () => {
    friendEvaluation.value = "";
    localStorage.removeItem(activeFriendKey);
    friendSaveStatus.textContent = "已清空。";
    refreshFriendStates();
  });
}

if (friendClose) {
  friendClose.addEventListener("click", () => {
    friendDialog.close();
  });
}

if (friendDialog) {
  friendDialog.addEventListener("click", (event) => {
    if (event.target === friendDialog) {
      friendDialog.close();
    }
  });
}

refreshFriendStates();
