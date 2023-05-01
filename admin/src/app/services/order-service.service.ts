import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { map, Observable, throwError,  } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IOrder } from '../models/iorder';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  baseUri: string = 'http://localhost:3001/orders';
  //headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  private httpOptions={};


  constructor(private httpClient: HttpClient, private userService:UserAuthService) {   
this.httpOptions={
  headers:new HttpHeaders(
    {
      'Content-Type':'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJhZG1pbklkIjoiNjQ0YWYwYjU0ZTFmYTMwZTdmZDNmOGVhIiwiaWF0IjoxNjgyODAzNDQ4LCJleHAiOjE2ODI4ODk4NDh9.snYtoyTYnARUWlt0sIeCC16PQHA08mBlCG8NvmzrVHM'
    }
  )
};

}

getAllOrders():Observable<IOrder[]>{
  // return this.httpClient.get<IOrder[]>(`${this.baseUri}`);
  return this.httpClient.get<IOrder[]>(`http://localhost:3001/orders`, this.httpOptions);
  }

 

  //return this.httpClient.get<IOrder[]>(`http://localhost:3001/orders`, { headers: this.headers, responseType: 'json' });




  









getOrderByID(oid:number):Observable<IOrder>{
  return this.httpClient.get<IOrder>(`http://localhost:3001/orders/${oid}`,this.httpOptions);
  }

  addNewOrder(order:IOrder):Observable<IOrder>{
    return this.httpClient.post<IOrder>(`http://localhost:3001/orders`,JSON.stringify(order),this.httpOptions)

  }

  deleteOrder(oid:number):Observable<IOrder>{
    return this.httpClient.delete<IOrder>(`http://localhost:3001/orders/${oid}`,this.httpOptions)
  }

  getUpdateOrder(oid:string):Observable<IOrder>{
    return this.httpClient.get<IOrder>(`http://localhost:3001/orders/${oid}`,this.httpOptions)
  }

  updateOrder(order:IOrder):Observable<IOrder>{
    return this.httpClient.patch<IOrder>(`http://localhost:3001/orders/update/${order._id}`,order ,this.httpOptions).pipe(
      map(()=>order)
    )
  }




  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


}










  


