import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorator";



@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const roles = this.reflector.get(Roles,context.getHandler());
        if(!roles || roles.includes("login")){
            return true;
        }
        console.log(roles)
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return matchRoles(roles, user.roles);
    }

}

function matchRoles(roles: string[], userRoles: string[] ): boolean | Promise<boolean> | Observable<boolean> {
    for(let role of roles){
        for(let userRole of userRoles){
            if(role === userRole){
                return true;
            }
        } 
    }
    return false;
}
