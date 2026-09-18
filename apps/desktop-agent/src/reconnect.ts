export interface ReconnectPolicy { initialDelayMs?:number; maxDelayMs?:number; maxAttempts?:number; }

export class ReconnectController {
  private attempts=0;
  constructor(private readonly policy:ReconnectPolicy={}) {}

  nextDelayMs():number|undefined {
    const maxAttempts=this.policy.maxAttempts??Infinity;
    if(this.attempts>=maxAttempts) return undefined;
    const initial=Math.max(100,this.policy.initialDelayMs??1000);
    const max=Math.max(initial,this.policy.maxDelayMs??30000);
    const delay=Math.min(max,initial*2**this.attempts);
    this.attempts++;
    return delay;
  }

  reset():void { this.attempts=0; }
  get attemptCount():number { return this.attempts; }
}
