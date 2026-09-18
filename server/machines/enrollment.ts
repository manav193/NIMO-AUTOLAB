import type {Machine} from "../../packages/types/src/index.js";
import {InMemoryMachineRegistry} from "./registry.js";
export class MachineEnrollmentService {
 constructor(private readonly registry:InMemoryMachineRegistry){}
 enroll(machine:Machine):Machine { if(this.registry.get(machine.machineId)) throw new Error("MACHINE_ALREADY_ENROLLED"); this.registry.register(machine); return machine; }
}