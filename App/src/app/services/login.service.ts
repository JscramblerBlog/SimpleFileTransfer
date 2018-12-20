import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "./config";

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {        }

    login(data){
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return new Promise((resolve, reject) => {
            this.http.post(Config.apiUrl+'/login',data, {headers: headers}).subscribe(data => {             
              resolve(data);
            }, (err)=> {
              reject(err);
            });
          });
    }

    signup(data){
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return new Promise((resolve, reject) => {
            this.http.post(Config.apiUrl+'/signup',data, {headers: headers}).subscribe(data => {             
              resolve(data);
            }, (err)=> {
              reject(err);
            });
          });
    }
}