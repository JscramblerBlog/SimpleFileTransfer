import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";
require( "nativescript-localstorage" );



@Component({
    selector: "ns-items",
    moduleId: module.id,
    styleUrls: ["./login.component.css"],
    templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

    user: any;
    
    

    constructor(private loginService: LoginService, private router: Router ) {

       
     }

    ngOnInit(): void {
        this.user = {
            username:"",
            password: ""
        };        
    }
    login(){
        this.loginService.login(this.user).then(res => {
            console.log(res);
            if(res["status"] == true){
                localStorage.setItem("uid", res["uid"]);            
            this.router.navigate(["/details"]);
            } else {
                alert(res["msg"]);
            }
            
        }).catch(err=> {
            alert(err);
        });
    }
    signup(){
        this.loginService.signup(this.user).then(res => {
            console.log(res);
            if(res["status"] == true){
                localStorage.setItem("uid", res["uid"]);
            alert('New User Created')
            this.router.navigate(["/details"]);
            } else {
                alert('Error creating user');
            }
            
        }).catch(err=> {
            alert(err);
        });
    }
}