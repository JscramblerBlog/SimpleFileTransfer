import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { DetailsComponent } from "./details/details.component";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { LoginService } from "./services/login.service";
import { DownloadService } from "./services/download.sevice";
import { UploadService } from "./services/upload.service";
import { UserDetailsService } from "./services/userdetails.service";
import { IncreaseQuotaComponent } from "./increasequota/increasequota.component";
import { LocalFilesComponent } from "./localfiles/localfiles.component";
import { FileListComponent } from "./filelist/filelist.component";
import { LocalFileService } from "./services/localfiles.service";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        DetailsComponent,
        IncreaseQuotaComponent,
        LocalFilesComponent,
        FileListComponent
    ],
    providers: [
        LoginService,
        DownloadService,
        UploadService,
        UserDetailsService,
        LocalFileService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
