export class CPU {
  constructor({ registers = ["A","B","C","D"], memorySize = 256, screen = null } = {}) {
    this.registers = {};
    registers.forEach(r => this.registers[r] = 0);
    this.memory = new Array(memorySize).fill(0);
    this.program = [];
    this.pc = 0;
    this.flags = {};
    this.screen = screen; // Screen instance

    this._changedRegisters = [];
    this._changedMemory = [];

    // Built-in instructions
    this.builtinInstructions = {
      MOV: (cpu, args) => {
        if(args[0].startsWith("[")) {
          const addr = args[0].slice(1,-1);
          cpu.writeMemory(cpu.registers[addr], cpu.registers[args[1]] || Number(args[1]));
        } else {
          cpu.registers[args[0]] = cpu.registers[args[1]] || Number(args[1]);
        }
      },
      ADD: (cpu, args) => cpu.registers[args[0]] += cpu.registers[args[1]] || Number(args[1]),
      SUB: (cpu, args) => cpu.registers[args[0]] -= cpu.registers[args[1]] || Number(args[1]),
      CMP: (cpu, args) => {
        cpu.flags = cpu.flags || {};
        cpu.flags.eq = (cpu.registers[args[0]] === (cpu.registers[args[1]] || Number(args[1])));
      },
      JMP: (cpu, args) => cpu.pc = Number(args[0]),
      JL:  (cpu, args) => { if(!cpu.flags?.eq) cpu.pc = Number(args[0]); }
    };
  }

  writeMemory(addr, value) {
    if(addr < 0 || addr >= this.memory.length) return;
    this.memory[addr] = value;

    if(this.screen && addr < this.screen.width * this.screen.height){
      const x = addr % this.screen.width;
      const y = Math.floor(addr / this.screen.width);
      this.screen.setPixel(x, y, value);
    }
  }

  loadProgram(program) {
    this.program = program;
    this.pc = 0;
    this._changedRegisters = [];
    this._changedMemory = [];
    this.flags = {};
    console.log(`Program loaded: ${program.length} instructions`);
  }

  step() {
    if(this.pc >= this.program.length) return false;

    const oldRegs = {...this.registers};
    const oldMem = [...this.memory];

    const instr = this.program[this.pc];

    const fn = this.builtinInstructions[instr.op] || (this.customInstructions && this.customInstructions[instr.op]?.execute);
    if(fn) {
      fn(this, instr.args);
    } else {
      this.warn(`Unknown instruction: ${instr.op}`);
    }

    this.pc++;

    this._changedRegisters = Object.keys(this.registers).filter(r => this.registers[r] !== oldRegs[r]);
    this._changedMemory = this.memory.map((v, i) => v !== oldMem[i] ? i : -1).filter(i => i !== -1);

    return true;
  }

  warn(message) {
    console.warn(message);
    const log = document.getElementById("cpu-warnings");
    if(log) {
      const entry = document.createElement("div");
      entry.textContent = message;
      entry.style.color = "#ff5555";
      log.appendChild(entry);
      log.scrollTop = log.scrollHeight;
    }
  }

  reset() {
    for(let r in this.registers) this.registers[r] = 0;
    this.memory.fill(0);
    this.pc = 0;
    this._changedRegisters = [];
    this._changedMemory = [];
    this.flags = {};
    const log = document.getElementById("cpu-warnings");
    if(log) log.innerHTML = "";
  }
}
