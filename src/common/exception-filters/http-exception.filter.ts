import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        let ctx = host.switchToHttp();

        let response = ctx.getResponse<Response>();
        let request = ctx.getRequest<Request>();
        let status = exception.getStatus();

        response
            .status(status)
            .json({
                status,
                date: new Date().toISOString(),
                path: request.url
            });
    }

}