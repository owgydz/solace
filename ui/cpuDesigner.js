// kill me please
import { createCPU } from "../core/cpuFactory.js";
import { updateViewer } from "./viewer.js";

export function initCPUDesigner(onCreate) {
  const container = document.getElementById("registers-designer");
  let registers = ["A","B","C","D"];

  function render() {
    container.innerHTML = "";

    // CPU Name
    const cpuNameInput = document.createElement("input");
    cpuNameInput.placeholder = "CPU Name";
    cpuNameInput.value = "MyCPU";
    container.appendChild(cpuNameInput);

    // Registers Section
    const regTitle = document.createElement("h4");
    regTitle.textContent = "Registers:";
    container.appendChild(regTitle);

    registers.forEach((r,i)=>{
      const box = document.createElement("div");
      box.className = "register-box";
      box.textContent = r;
      box.title = "Click to remove";
      box.style.cursor = "pointer";
      box.addEventListener("click", ()=>{registers.splice(i,1); render();});
      container.appendChild(box);
    });

    const addRegBtn = document.createElement("button");
    addRegBtn.textContent = "+ Add Register";
    addRegBtn.addEventListener("click", ()=>{
      const newReg = prompt("Enter register name");
      if(newReg) { registers.push(newReg.toUpperCase()); render(); }
    });
    container.appendChild(addRegBtn);

    // Memory Section
    const memTitle = document.createElement("h4");
    memTitle.textContent = "Memory:";
    container.appendChild(memTitle);

    const memInput = document.createElement("input");
    memInput.type = "number";
    memInput.value = 64;
    memInput.min = 8;
    memInput.step = 8;
    memInput.title = "Memory size (bytes)";
    container.appendChild(memInput);

    // Memory visualization bar
    const memBar = document.createElement("div");
    memBar.style.height = "20px";
    memBar.style.width = "100%";
    memBar.style.background = "#333";
    memBar.style.marginTop = "5px";
    const fill = document.createElement("div");
    fill.style.height = "100%";
    fill.style.width = Math.min(100, (memInput.value/1024*100))+"%";
    fill.style.background = "#0f0";
    memBar.appendChild(fill);
    container.appendChild(memBar);

    memInput.addEventListener("input", ()=>{ fill.style.width = Math.min(100, (memInput.value/1024*100))+"%"; });

    // Create CPU button
    const createBtn = document.createElement("button");
    createBtn.textContent = "Create CPU";
    createBtn.addEventListener("click", ()=>{
      const cpu = createCPU({ registers, memorySize: Number(memInput.value) });
      cpu.builtinInstructions = {}; // placeholder
      onCreate(cpu);
      updateViewer(cpu);
      alert(`CPU "${cpuNameInput.value}" created!`);
    });
    container.appendChild(createBtn);
  }

  render();
}
