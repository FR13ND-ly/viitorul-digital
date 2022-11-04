import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signOut, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private userUpdated = new BehaviorSubject<any>(undefined)
  readonly APIUrl = environment.apiUrl + 'user/'

  provider = new GoogleAuthProvider();
  private auth = getAuth()

  login() {
    signInWithPopup(this.auth, this.provider)
    .then((result : any) => {
      this.http.post(this.APIUrl + 'login/', result.user).subscribe((res) => {
        if (result.user) this.userUpdated.next({...result.user, ...res})
        else this.userUpdated.next(false)
      })
    });
  }

  initiliaze() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.http.get(`${this.APIUrl}authorization/${user?.uid}/`).subscribe(res => {
          this.userUpdated.next({...user, ...res})
        })
      }
      else this.userUpdated.next(false)
    })
    return this.auth.currentUser
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable()
  }

  logout() {
    signOut(this.auth)
    this.userUpdated.next(false)
  }
}
