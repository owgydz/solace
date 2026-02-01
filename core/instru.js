export class Instruction {
  constructor(op, args, execFn = null) {
    this.op = op.toUpperCase();
    this.args = args;
    this.execFn = execFn;
  }

  execute(cpu) {
    if(this.execFn){
      this.execFn(cpu, ...this.args);
      return;
    }

    const [dest, src] = this.args;

    switch(this.op){
      case "MOV":
      {
        let value = cpu.registers[src] !== undefined ? cpu.registers[src] : Number(src);
        if(dest.startsWith("[")){             // memory write
          const addr = cpu.registers[dest.slice(1,-1)] ?? Number(dest.slice(1,-1));
          cpu.writeMemory(addr, value);       // automatically updates screen
        } else {                              // register write
          cpu.registers[dest] = value;
        }
      }
      break;

      case "ADD":
      {
        const value = cpu.registers[src] !== undefined ? cpu.registers[src] : Number(src);
        cpu.registers[dest] += value;
      }
      break;

      case "SUB":
      {
        const value = cpu.registers[src] !== undefined ? cpu.registers[src] : Number(src);
        cpu.registers[dest] -= value;
      }
      break;

      case "CMP":
      {
        const value = cpu.registers[src] !== undefined ? cpu.registers[src] : Number(src);
        cpu.flags = cpu.flags || {};
        cpu.flags.eq = cpu.registers[dest] === value;
      }
      break;

      case "JMP":
        cpu.pc = Number(dest);
        break;

      case "JL":
        if(!cpu.flags?.eq) cpu.pc = Number(dest);
        break;

      default:
        console.warn(`Unknown instruction: ${this.op}`);
        // show this warning on-screen
        const log = document.getElementById("cpu-warnings");
        if(log){
          const entry = document.createElement("div");
          entry.textContent = `Unknown instruction: ${this.op}`;
          entry.style.color = "#ff5555";
          log.appendChild(entry);
          log.scrollTop = log.scrollHeight;
        }
        break;
    }
  }
}
