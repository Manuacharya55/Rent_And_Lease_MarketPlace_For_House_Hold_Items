class ApiSuccess{
    constructor(statusCode,data,message){
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data
    }
}

export default ApiSuccess;