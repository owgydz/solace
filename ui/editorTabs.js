export function initTabs(editorContainer) {
  const tabsDiv = document.getElementById("tabs");
  const addBtn = tabsDiv.querySelector(".add-tab");

  addBtn.addEventListener("click", () => {
    const newIndex = editorContainer.children.length;
    const newTab = document.createElement("button");
    newTab.className = "tab";
    newTab.dataset.tab = newIndex;
    newTab.textContent = `Program${newIndex+1}.asm`;
    tabsDiv.insertBefore(newTab, addBtn);

    const newEditor = document.createElement("textarea");
    newEditor.className = "editor";
    newEditor.dataset.tab = newIndex;
    newEditor.value = "";
    newEditor.style.display = "none";
    editorContainer.appendChild(newEditor);

    newTab.addEventListener("click", () => {
      document.querySelectorAll(".editor").forEach(e=>e.style.display="none");
      newEditor.style.display = "block";
      document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
      newTab.classList.add("active");
    });
  });

  // Activate first tab
  tabsDiv.querySelector(".tab").addEventListener("click", () => {
    document.querySelectorAll(".editor").forEach(e=>e.style.display="none");
    editorContainer.querySelector(".editor").style.display = "block";
  });
}
