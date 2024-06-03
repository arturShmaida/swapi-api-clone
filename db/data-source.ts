import { DataSourceOptions, DataSource, TreeRepository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import {config} from "dotenv";
 
config();
const configService = new ConfigService();


export const dataSourceOptions: DataSourceOptions = {
    
    type: "mysql",
    host:  configService.get("DATABASE_HOST"),
    port: configService.get("DATABASE_PORT"),
    username: configService.get("DATABASE_USER"),
    password:  configService.get("DATABASE_PASSWORD"),
    database:  configService.get("DATABASE_NAME"),
    synchronize: true,
    entities: ['dist/**/*.entity.js'],
    migrations:['dist/db/migrations/*.js'],
    migrationsRun:true
}



const dataSource = new DataSource(dataSourceOptions);
export default dataSource;