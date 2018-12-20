import { Injectable } from "@angular/core";
import { Config } from "./config";
import { getFile } from "tns-core-modules/http";
import * as fs from "tns-core-modules/file-system";
import { isAndroid, isIOS } from "platform";
require( "nativescript-localstorage" );
import * as permissions from 'nativescript-permissions';

@Injectable()
export class DownloadService {
    downloadUrl : String = Config.apiUrl  + '/users/' + localStorage.getItem('uid') + '/download/';
    constructor() {        
                
       }

   download(file) {
           return new Promise((resolve, reject) => {
               let folderPath;
               permissions.requestPermissions([android.Manifest.permission.READ_EXTERNAL_STORAGE, android.Manifest.permission.WRITE_EXTERNAL_STORAGE]).then(res => {
                if (isAndroid) {
                    const androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
                    folderPath = fs.path.join(androidDownloadsPath, "SimpleFileTransfer");
                    const Folder = fs.Folder.fromPath(folderPath);                  
 
                } else {
                    folderPath = fs.knownFolders.documents().path
                }
                const filePath: string = fs.path.join(folderPath, file);
                console.log(folderPath, filePath);;
                getFile(this.downloadUrl + file, filePath).then((resultFile) => {
                    resolve(resultFile);
                }).catch(e => {
                    console.log(e);
                    reject(e);
                });
                   
               }).catch(err => {
                   reject(err);
               });
              
        
    })
}
   }