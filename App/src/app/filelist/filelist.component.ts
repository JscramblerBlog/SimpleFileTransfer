import { Component, OnInit } from "@angular/core";
import { UserDetailsService } from "../services/userdetails.service";
import { DownloadService } from "../services/download.sevice";
import { UploadService } from "../services/upload.service";
import { confirm } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    styleUrls: ["./filelist.component.css"],
    templateUrl: "./filelist.component.html",
})
export class FileListComponent implements OnInit {
    fileArray: any = [];
    
    
    
    constructor(private detailsSrv: UserDetailsService, private downloadSrv: DownloadService , public uploadServ: UploadService) { 

        
    }

    ngOnInit(): void {
        this.detailsSrv.getDetails().then(res => {           
            this.fileArray = res["fileNames"];
        }).catch(err => {
            console.log(err);
        })      
    }
    download(file){     
        
        let options = {
            title: "Download File",
            message: "Are you sure you want to download " + file,
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
        };
        
       confirm(options).then((result: boolean) => {
           if(result){
            this.downloadSrv.download(file).then(res => {
                console.log(res);
                alert("File Downloaded")
    
            }).catch(err => {
                alert("Error Downloading FIle")
            }); 
           } else {
               alert('Download Cancelled');
           }
        
            
        });
           
    }
    confirmAlert(){
        
        
       
    }

    
}