/**
 * Generate automatically swagger.json
 * @param routeName Name of route called
 * @returns Return object used in swagger.json
 */
export function generateSwaggerPath(routeName: string, idOrNot: boolean): Object{
    const tag = routeName.charAt(0).toUpperCase() + routeName.slice(1)
    if(!idOrNot){
        return {
            "post": {
                "tags": [
                    tag
                ],
                "summary": `Create new ${routeName} in database`,
                "description": `Create new ${routeName} in database`,
                "parameters": [
                {
                    "name": routeName,
                    "in": "body",
                    "description": `${tag} that we want to create`,
                    "schema": {
                    "$ref": `#/definitions/${tag}`
                    }
                }
                ],
                "produces": [
                    "application/json"
                ],
                "responses": {
                "200": {
                    "description": `New ${routeName} is created`,
                    "schema": {
                        "$ref": `#/definitions/${tag}`
                    }
                }
                }
            },
            "get": {
                "tags": [
                    `${tag}`
                ],
                "summary": `Get all ${routeName}s in system`,
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": `#/definitions/${tag}`
                        }
                    }
                }
            },
        }
    } else {
        return {
            "get": {
                "tags": [
                    `${tag}`
                ],
                "summary": `Get ${routeName} in system`,
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": `#/definitions/${tag}`
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    `${tag}`
                ],
                "summary": `Delete ${routeName} in system`,
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": `#/definitions/${tag}`
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    `${tag}`
                ],
                "summary": `Put ${routeName} in system`,
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": `#/definitions/${tag}`
                        }
                    }
                }
            }
        }
    }
    
};

export function generateSwaggerTags(routeName: string){
    const tag = routeName.charAt(0).toUpperCase() + routeName.slice(1)
    return {
        "name": tag,
        "description": `API for ${routeName}s in the system`
    }
}

// export function generateSwaggerParams(pathModel: string, routeName: string): any {
//     let params : { [key:string]: any } = {};
//     // console.log(pathModel, routeName);
//     return fs.readFile(pathModel, 'utf8', (err, data) => {
//         if(err) {
//             console.log(err)
//         }
//         else {
//             let content = JSON.parse(data)
            
//             // console.log(content)
//             Object.keys(content).forEach((param) => {
//                 params[param] = {
//                     param: {
//                         "type": "string",
//                     },
//                 };
//             })
//         }
//         console.log(params)
//         return params
//     })

// }