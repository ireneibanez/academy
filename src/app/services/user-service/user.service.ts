import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
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
      gender: 'mujer',
      date: new Date(),
      subjects: ['matematicas', 'ingles']
    },
    {
      name: 'Vanessa',
      surname: 'Sánchez',
      email: 'vane@correo.com',
      gender: 'mujer',
      date: new Date(),
      subjects: ['ingles']
    },
    {
      name: 'Laura',
      surname: 'Martínez',
      email: 'lau@correo.com',
      gender: 'mujer',
      date: new Date(),
      subjects: ['matematicas']
    },
    {
      name: 'Pablo',
      surname: 'López',
      email: 'pa@correo.com',
      gender: 'hombre',
      date: new Date(),
      subjects: ['matematicas', 'ingles']
    },
    {
      name: 'Paqui',
      surname: 'López',
      email: 'paqui@correo.com',
      gender: 'mujer',
      date: new Date(),
      subjects: ['matematicas', 'ingles']
    }
  ];

  constructor() {}

  getUsersRegisteredInfo(): User[] {
    return this.usersRegistered;
  }

  setNewUser(user: User): void {
    this.usersRegistered.push(user);
    console.log('users en el servicio', this.usersRegistered)
  }

}
