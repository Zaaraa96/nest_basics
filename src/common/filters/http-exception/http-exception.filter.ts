import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx= host.switchToHttp();
    const res= ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse();
    if(exceptionRes!= null && typeof exceptionRes === 'object' )
    {
        if(exceptionRes['message'] != null && Array.isArray(exceptionRes['message']))
        {
          exceptionRes['message'] = exceptionRes['message'].join(',');
        }
    }
    const error = 
      typeof res === 'string'?
      {
        message: exceptionRes
      } :
      (exceptionRes as object);

    res.status(status).json({
      error: {...error},
      type: 'error'
    }).send();  
  }
}
