import { ConfigService } from "@nestjs/config";
import { TypeKeys} from "./constants";
import {config} from "dotenv";

config()
const configService = new ConfigService();

export function getEntityUrl(entityType: TypeKeys, entityId: number){
    const baseUrl = configService.get("API_BASE_URL");
    return baseUrl + entityType + "/" + entityId;
}
