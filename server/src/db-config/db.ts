import { DataSource } from "typeorm";


var myAppDtataSource = new DataSource({
    type:"postgres",
    host: "localhost",
    port: 5432,
    username: "house",
    password: "1#k!ngl0S",
    database: "housein",
    logging: true,
    synchronize: true,
    entities: [  
        "src/entities/*.ts"
      ],
})


export default myAppDtataSource