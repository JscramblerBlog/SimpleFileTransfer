import { Injectable } from "@angular/core";
import * as fs from "tns-core-modules/file-system";
import { isAndroid, isIOS } from "platform";
require( "nativescript-localstorage" );
import * as permissions from 'nativescript-permissions';

@Injectable()
export class LocalFileService {
    constructor() {        }

    getLocalFiles(){  
        let folderPath;
        let listArray = [];
        return new Promise((resolve, reject) => {
            permissions.requestPermissions([android.Manifest.permission.READ_EXTERNAL_STORAGE, android.Manifest.permission.WRITE_EXTERNAL_STORAGE]).then(res => { 
                if (isAndroid) {
                    const androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
                    folderPath = fs.path.join(androidDownloadsPath, "SimpleFileTransfer");
                    const Folder = fs.Folder.fromPath(folderPath);                
        
                } else {
                    folderPath = fs.knownFolders.documents().path
                }
                let internalFolder = fs.Folder.fromPath(folderPath);
                internalFolder.getEntities()
                    .then((entities) => {                
                        entities.forEach((entity) => {
                            let fileSize = fs.File.fromPath(entity.path).size;
                            listArray.push({
                                name: entity.name,
                                path: entity.path,
                                lastModified: entity.lastModified.toString(),
                                size: fileSize
                            });
                            
                        });  
                        resolve(listArray);
                    }).catch((err) => {
                        reject(err);                        
                    });
            }).catch(err => {
                reject(err);
            });
        });

    }

    getFileSize(path){
        let file = fs.File.fromPath(path);
        return file.size;
    }

}