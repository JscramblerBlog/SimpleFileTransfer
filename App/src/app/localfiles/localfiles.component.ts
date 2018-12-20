import { Component, OnInit } from "@angular/core";
import { LocalFileService } from "../services/localfiles.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    styleUrls: ["./localfiles.component.css"],
    templateUrl: "./localfiles.component.html",
})
export class LocalFilesComponent implements OnInit {
    fileArray: any = [];       
    
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private fileSrv: LocalFileService) { 

        
    }

    ngOnInit(): void {

        this.fileSrv.getLocalFiles().then(res => {
            this.fileArray = res;
            console.log(res);
        })             
    }
  
    
}