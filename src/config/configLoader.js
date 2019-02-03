import { CONTENT_TYPE, HTTP } from '../platform/constants';

export default class ConfigLoader {

    constructor() {
        this.jsonFile = "rico.json";
    }

    constructor(jsonFile) {
        this.jsonFile = jsonFile;
    }

    loadJSON() {   
        this.loadPromise = new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.overrideMimeType(CONTENT_TYPE.APPLICATION_JSON);
            request.open(HTTP.METHOD.GET, jsonFile, true); 
            request.onreadystatechange = function () {
              if (request.readyState == HTTP.XMLHTTPREQUEST_READYSTATE.DONE && request.status == HTTP.STATUS.OK) {
                try {
                    var rawText = request.responseText;
                    var configuration = JSON.parse(rawText);
                    resolve(configuration);
                } catch (e) {
                    reject(e);
                }
              } else {
                reject("ERROR");
              }
            };
            request.send(null);  
        });
        return this.loadPromise;
     }

}