import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/shared/models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersRegistered: User[] = [
    {
      name: 'María',
      surname: 'López',
      email: 'maria@correo.com',
      gender: 'Mujer',
      date: new Date(),
      subjects: ['Matemáticas', 'Inglés']
    },
    {
      name: 'Vanessa',
      surname: 'Sánchez',
      email: 'vane@correo.com',
      gender: 'Mujer',
      date: new Date(),
      subjects: ['Inglés']
    },
    {
      name: 'Laura',
      surname: 'Martínez',
      email: 'lau@correo.com',
      gender: 'Mujer',
      date: new Date(),
      subjects: ['Matemáticas']
    },
    {
      name: 'Pablo',
      surname: 'López',
      email: 'pa@correo.com',
      gender: 'Hombre',
      date: new Date(),
      subjects: ['Matemáticas']
    },
    {
      name: 'Paqui',
      surname: 'López',
      email: 'paqui@correo.com',
      gender: 'Mujer',
      date: new Date(),
      subjects: ['Matemáticas', 'Inglés']
    }
  ];

  constructor(private http: HttpClient) { }

  getUsersRegisteredInfo(): User[] {
    return this.usersRegistered;
  }

  setNewUser(user: User): void {
    this.usersRegistered.push(user);
    console.log('users en el servicio', this.usersRegistered)
  }

  setGender(name: string): Observable<any> {
    return this.http.get('https://api.genderize.io?name=' + `${name}`)
  }



}
