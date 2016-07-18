export default class SendWithUsError extends Error
{
    constructor(message: string, private httpStatusCode: number)
    {
        super(message);
    }
}