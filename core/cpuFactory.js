import { CPU } from "./cpu.js";

export function createCPU({ registers, memorySize }) {
  return new CPU({ registers, memorySize });
}
