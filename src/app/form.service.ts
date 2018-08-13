import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class FormService {
  
  private datasUrl = 'api/allData';
 
  constructor(private http: HttpClient) { }

  addData (data: User): Observable<User> {
    return this.http.post<User>(this.datasUrl, data, httpOptions).pipe(
      tap((data: User) =>  console.log(data)),
      catchError(this.handleError<User>('addHero'))
    );
  }

  getdata (): Observable<User[]> {
    return this.http.get<User[]>(this.datasUrl)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError('getdatas', []))
      );
  }

  getdataId(id): Observable<User> {
    const url = `${this.datasUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(data=>data.id==id),
      catchError(this.handleError<User>(`getHero id=${id}`))
    );
  }
  updateHero (user: User): Observable<any> {
    console.log(user)
    return this.http.put(this.datasUrl, user, httpOptions).pipe(
      tap(_ =>  console.log(`updated with${user.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // getHero(id: number): Observable<User> {
  //   return of(this.allData.find(data => data.id === id));
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: bett
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

