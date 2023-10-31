

class error {
    static errorHandler = (statusCode,message)=>{
        const error = new Error();
        error.statusCode = statusCode;
        error.message = message;
        return error;
    }   
}


module.exports = error.errorHandler ; 