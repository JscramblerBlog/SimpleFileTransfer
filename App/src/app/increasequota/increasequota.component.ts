import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserDetailsService } from "../services/userdetails.service";
require( "nativescript-localstorage" );



@Component({
    selector: "ns-items",
    moduleId: module.id,
    styleUrls: ["./increasequota.component.css"],
    templateUrl: "./increasequota.component.html",
})
export class IncreaseQuotaComponent implements OnInit {    
    quota: number;
    currentQuota: number;
    quotaInMB : String;
    

    constructor(private userSrv: UserDetailsService) { }

    ngOnInit(): void {
        this.getUserDetails();
    }

    submit(){
        let data = {
            "quota": this.currentQuota + (this.quota * 1048576)
        }
        this.userSrv.increaseQuota(data).then(res => {
            alert("Quota Increased by "+ this.quota+" MB")
            this.getUserDetails();
        }).catch(err => {
            alert("Error increasing Quota");
        })
    }  

    getUserDetails(){
        this.userSrv.getDetails().then(res => {
            this.currentQuota = res["storageLimit"];
            this.quotaInMB = 'Current User Quota: ' +this.currentQuota/1048576 + ' MB';
        }).catch(err => {

        });
    }
    
}