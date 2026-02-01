import { assemble } from "../core/assembler.js";

export function initEditor(cpu, updateViewer) {
  const runBtn = document.getElementById("run");
  const stepBtn = document.getElementById("step");
  const resetBtn = document.getElementById("reset");
  const assemblyArea = document.getElementById("assembly");

  let currentInterval = null;

  function loadProgram() {
    const program = assemble(assemblyArea.value);
    cpu.loadProgram(program);
    updateViewer(cpu);
  }

  runBtn.addEventListener("click", () => {
    loadProgram();

    // Stop any existing interval
    if(currentInterval) clearInterval(currentInterval);

    // Step CPU asynchronously
    currentInterval = setInterval(() => {
      const alive = cpu.step();
      updateViewer(cpu);

      if(!alive) { // program finished
        clearInterval(currentInterval);
        currentInterval = null;
      }
    }, 10); // 10ms delay between steps (adjust speed here)
  });

  stepBtn.addEventListener("click", () => {
    if(cpu.program.length === 0) loadProgram();
    cpu.step();
    updateViewer(cpu);
  });

  resetBtn.addEventListener("click", () => {
    if(currentInterval) clearInterval(currentInterval); // stop async run
    currentInterval = null;
    cpu.reset();
    updateViewer(cpu);
  });
}
