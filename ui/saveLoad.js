export function initSaveLoad(cpu) {
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save Program";
  document.body.appendChild(saveBtn);

  const loadBtn = document.createElement("button");
  loadBtn.textContent = "Load Program";
  document.body.appendChild(loadBtn);

  saveBtn.addEventListener("click", () => {
    localStorage.setItem("solace-program", JSON.stringify(cpu.program.map(p=>({op:p.op,args:p.args}))));
    alert("Program saved!");
  });

  loadBtn.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("solace-program")||"[]");
    cpu.loadProgram(data.map(d => new cpu.program[0].constructor(d.op,d.args)));
    alert("Program loaded!");
  });
}
