export class BaseRmqEvent {
    public constructor(
        public pattern: string,

        public payload: any
    ) {}
}
