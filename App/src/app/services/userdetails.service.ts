import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "./config";
require( "nativescript-localstorage" );

@Injectable()
export class UserDetailsService {
    
    constructor(private http: HttpClient) {  
              
          }

    getDetails(){       
        let apiUrl = Config.apiUrl  + '/users/' + localStorage.getItem('uid'); 
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return new Promise((resolve, reject) => {
            this.http.get(apiUrl+'/details', {headers: headers}).subscribe((data) => {      
              
              resolve(data);
            }, (err)=> {
              reject(err);
            });
          });
    }

    increaseQuota(data){
        let apiUrl = Config.apiUrl  + '/users/' + localStorage.getItem('uid');
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return new Promise((resolve, reject) => {
            this.http.post(apiUrl+'/increasequota',data, {headers: headers}).subscribe(data => {             
              resolve(data);
            }, (err)=> {
              reject(err);
            });
          });
    }
 

  

  
}