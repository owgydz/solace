import { Instruction } from "./instru.js";

export function assemble(code) {
  const lines = code
    .split("\n")
    .map(l => l.trim())
    .filter(l => l && !l.startsWith(";")); // ignore empty lines & comments

  const program = [];
  const labels = {}; // labelName -> program index

  // First pass: record labels
  lines.forEach((line, index) => {
    if (line.endsWith(":")) {
      const label = line.slice(0, -1);
      labels[label] = program.length; // point to next instruction
    } else {
      program.push(line);
    }
  });

  // Second pass: convert to Instruction objects
  return program.map(line => {
    const [op, rest] = line.split(" ", 2);
    const args = rest
      ? rest.split(",").map(a => a.trim())  // split by comma
      : [];

    // Replace label args with program indices
    const resolvedArgs = args.map(a => {
      if (labels[a] !== undefined) return labels[a];
      return a;
    });

    return new Instruction(op, resolvedArgs);
  });
}
