import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { DetailsComponent } from "./details/details.component";
import { LocalFilesComponent } from "./localfiles/localfiles.component";
import { FileListComponent } from "./filelist/filelist.component";
import { IncreaseQuotaComponent } from "./increasequota/increasequota.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "details", component: DetailsComponent },
    { path: "localfiles", component: LocalFilesComponent },
    { path: "filelist", component: FileListComponent },
    { path: "increasequota", component: IncreaseQuotaComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }