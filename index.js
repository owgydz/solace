import { CPU } from "./core/cpu.js";
import { assemble } from "./core/assembler.js";
import { Instruction } from "./core/instru.js";
import { createCPU } from "./core/cpuFactory.js";
import { updateViewer } from "./ui/viewer.js";
import { initInstructionBuilder } from "./ui/instructionBuilder.js";
import { initCPUDesigner } from "./ui/cpuDesigner.js"; // <-- import designer
import { Screen } from "./peripherals/screen.js";
import { Keyboard } from "./peripherals/keyboard.js";

document.addEventListener("DOMContentLoaded", () => {

  // Initialize CPU
  let cpu = new CPU();
  updateViewer(cpu);
  initInstructionBuilder(cpu);


  // Initialize CPU Designer
  initCPUDesigner((newCPU) => {
    cpu = newCPU; // replace the current CPU with the newly created one
    initInstructionBuilder(cpu); // re-initialize instruction builder for new CPU
  });

  // Top bar buttons
  document.getElementById("run").addEventListener("click", () => {
    const program = assemble(document.getElementById("assembly").value);
    cpu.loadProgram(program);
    while (cpu.step()) {
      updateViewer(cpu); // show highlights on each step during run
    }
    updateViewer(cpu);
  });

  document.getElementById("step").addEventListener("click", () => {
    if(cpu.program.length===0){
      const program = assemble(document.getElementById("assembly").value);
      cpu.loadProgram(program);
    }
    cpu.step();
    updateViewer(cpu);
  });

  document.getElementById("reset").addEventListener("click", () => {
    cpu.reset();
    updateViewer(cpu);
  });

  // peripherals
  const screen = new Screen(16,16,"screen");
  const keyboard = new Keyboard(cpu,0);
});