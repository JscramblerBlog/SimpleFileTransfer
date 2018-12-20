import { Injectable } from "@angular/core";
import { Config } from "./config";
import * as bgHttp from 'nativescript-background-http';

@Injectable()
export class UploadService {
    constructor() {  }

   upload(path) {
       
       return new Promise((resolve, reject) => {
           let session = bgHttp.session("image-upload");
           let request: bgHttp.Request = {
               url: Config.apiUrl  + '/users/' + localStorage.getItem('uid') + '/upload'   ,
               method: "POST",
               headers: {
                   "Content-Type": "multipart/form-data"
               },
               description: 'FileName'
           };
           let params = [{
               name: 'file',
               filename: path
           }];
           let task: bgHttp.Task = session.multipartUpload(params, request);
           task.on("error", (e) => {
               reject(e);
           });
           task.on("complete", (e) => {
               resolve(e);
           });
       });
   }

   }