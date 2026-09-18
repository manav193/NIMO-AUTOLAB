import type { Machine } from "../../packages/types/src/index.js";
export interface MachineRegistry { get(machineId:string):Machine|undefined; register(machine:Machine):void; }
export class InMemoryMachineRegistry implements MachineRegistry {
 private readonly machines=new Map<string,Machine>();
 get(machineId:string){return this.machines.get(machineId);}
 register(machine:Machine){this.machines.set(machine.machineId,machine);}
}