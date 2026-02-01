export function updateViewer(cpu) {
  const regView = document.getElementById("register-view");
  regView.innerHTML = "";
  for (let r in cpu.registers) {
    const box = document.createElement("div");
    box.className = "register-box";
    box.textContent = `${r}: ${cpu.registers[r]}`;
    if(cpu._changedRegisters?.includes(r)) box.classList.add("changed");

    // Editable
    box.addEventListener("click", () => {
      const newVal = prompt(`Set value for ${r}`, cpu.registers[r]);
      if(newVal !== null) cpu.registers[r] = Number(newVal);
      updateViewer(cpu);
    });

    regView.appendChild(box);
  }

  const memView = document.getElementById("memory-view");
  memView.innerHTML = "";
  for (let i=0;i<cpu.memory.length;i++){
    const cell = document.createElement("div");
    cell.className = "memory-cell";
    cell.textContent = cpu.memory[i];
    if(cpu._changedMemory?.includes(i)) cell.classList.add("changed");

    // Editable
    cell.addEventListener("click", () => {
      const newVal = prompt(`Set memory[${i}]`, cpu.memory[i]);
      if(newVal !== null) cpu.memory[i] = Number(newVal);
      updateViewer(cpu);
    });

    memView.appendChild(cell);
  }

  // Instruction set panel
  const instrView = document.getElementById("instruction-set-view");
  instrView.innerHTML = "";
  const allInstr = { ...cpu.builtinInstructions, ...cpu.customInstructions };
  for (let name in allInstr) {
    const item = document.createElement("div");
    item.className = "instruction-item";
    item.textContent = name;

    // Click to insert
    item.addEventListener("click", () => {
      const editor = document.getElementById("assembly");
      editor.value += `${name}\n`;
    });

    instrView.appendChild(item);
  }
}