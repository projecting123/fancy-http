interface FError{
    readonly data: any;
    readonly statusText: string;
    readonly status: number;
}
export default class FancyError implements FError {
    public readonly data!: string
    public readonly status: number = 400
    public readonly statusText: string = "fail"
    constructor(error: any) {
        this.data = error.message
    }
}

