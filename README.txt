# Solace
**Solace** is a browser-based CPU emulator and assembly editor inspired by VS Code.  
It allows you to design CPUs, write assembly programs, and test peripherals like a 16×16 pixel screen.

## Features (v1.0.0)
- CPU with registers, memory, and flags.
- ASM editor with **Run**, **Step**, **Reset** controls.
- Instruction Builder and CPU Designer panels.
- Memory and Registers Viewer with live updates.
- Memory-mapped **Screen** and **Keyboard** peripherals.
- VS Code-style UI with top bar, buttons, and GitHub link.
- CPU warnings displayed on-screen.

## Getting Started
1. Open the file `public/index.html` in a modern browser.
2. Write assembly code in the editor.
3. Click **Run** to execute programs, or **Step** to step through instructions.

## Example Program
```asm
MOV A,1
MOV B,2
ADD A,B
```
