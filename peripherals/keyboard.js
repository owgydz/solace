export class Keyboard {
  constructor(cpu, memAddress=0) {
    this.cpu = cpu;
    this.memAddress = memAddress;

    window.addEventListener("keydown", e => {
      cpu.memory[memAddress] = e.key.charCodeAt(0);
    });
  }
}
