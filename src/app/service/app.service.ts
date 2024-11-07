import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:5000/api/users'; // Update the URL based on your backend
  private adminUrl = 'http://localhost:5000/api/admins'

  constructor(private http: HttpClient) {}

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAdminDetails(adminDetails: any): Observable<any> {
    return this.http.post<any[]>(this.adminUrl, adminDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error as needed
    let errorMessage = 'Unknown error!';
    if (error.error) {
      // Client-side error
      errorMessage = `${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    // Use of() to return an observable with a user-facing error message
    return of({ error: true, message: errorMessage, isNumberExists: error.error.isNumberExists, errorDetails: error, isloggedAsAdmin: error.error.isLoggedAsAdmin });
  }
}
