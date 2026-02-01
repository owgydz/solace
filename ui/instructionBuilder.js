import { Instruction } from "../core/instru.js";
import { updateViewer } from "./viewer.js";

export function initInstructionBuilder(cpu) {
  const container = document.getElementById("instruction-builder");
  container.innerHTML = `
    <input id="inst-name" placeholder="Instruction Name" />
    <select id="inst-template">
      <option value="">--Template--</option>
      <option value="MOV">MOV dest, src</option>
      <option value="ADD">ADD dest, src</option>
      <option value="SUB">SUB dest, src</option>
      <option value="JMP">JMP addr</option>
    </select>
    <textarea id="inst-code" placeholder="JS code: function(cpu, args) { ... }"></textarea>
    <button id="add-inst">Add Instruction</button>
  `;

  // Fill textarea when template selected
  document.getElementById("inst-template").addEventListener("change", e => {
    const val = e.target.value;
    let code = "";
    switch(val){
      case "MOV":
        code = "cpu.registers[args[0]] = cpu.registers[args[1]];";
        break;
      case "ADD":
        code = "cpu.registers[args[0]] += cpu.registers[args[1]];";
        break;
      case "SUB":
        code = "cpu.registers[args[0]] -= cpu.registers[args[1]];";
        break;
      case "JMP":
        code = "cpu.pc = args[0];";
        break;
    }
    document.getElementById("inst-code").value = code;
  });

    // Add instruction
    document.getElementById("add-inst").addEventListener("click", () => {
      const name = document.getElementById("inst-name").value.trim().toUpperCase();
      const code = document.getElementById("inst-code").value.trim();
      if(!name || !code) return alert("Enter name and code!");
      
      const execFn = new Function("cpu", "...args", code);
      cpu.customInstructions = cpu.customInstructions || {};
      cpu.customInstructions[name] = new Instruction(name, [], execFn);
  
      updateViewer(cpu);
      alert(`Instruction ${name} added!`);
    });
  }