import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetStudentService {

  _url="https://notes-gestor-sofka.herokuapp.com/studentGrades"

  constructor(private http:HttpClient) { }

  getStudentsGrades(idProgram:string){

    let header =new HttpHeaders;
    header.set('Type-Content','aplication/json')
    return this.http.get(`${this._url}/${idProgram}`, {headers:header});
  }
}
