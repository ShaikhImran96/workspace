import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from './accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient:HttpClient) { }


  private baseUrl="http://localhost:9091/api/accounts"

  getAllAccounts():Observable<Accounts[]>{

    return this.httpClient.get<Accounts[]>(`${this.baseUrl}`);
  }

  createAccount(account:Accounts):Observable<Accounts>{

    return this.httpClient.post<Accounts>(`${this.baseUrl}`,account)
  }

  getAccountById(id:number):Observable<Accounts>{

    return this.httpClient.get<Accounts>(`${this.baseUrl}/${id}`)
  }

  deposit(id:number, amount:number):Observable<Accounts>{

    const request={amount}

    return this.httpClient.put<Accounts>(`${this.baseUrl}/${id}/deposit`,request);
  }


  Withdraw(id:number,amount:number):Observable<Accounts>{

    const request={amount}

    return this.httpClient.put<Accounts>(`${this.baseUrl}/${id}/withdraw`,request)

  }

  delete(id:number):Observable<Accounts>{
    return this.httpClient.delete<Accounts>(`${this.baseUrl}/${id}`)
  }


 


}
