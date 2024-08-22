import { Component } from '@angular/core';
import { Accounts } from '../accounts';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {

  id:number=0;
  account:Accounts = new Accounts();

  constructor(private accountService:AccountService, private rout:ActivatedRoute, private router:Router){ }

  ngOnInit(){
    this.id=this.rout.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data=> {
      this.account=data;
    })
  }

  successMsg="";
  errorMsg="";


  onSubmit(){

    if(this.isValidAmount(this.account.balance)){
    this.accountService.deposit(this.id,this.account.balance).subscribe(data => {
      this.account=data;

      this.successMsg="Amount deposited successfully...!"
      setTimeout(() => {
        this.router.navigate(['/accounts'])
      }, 1000);

      
    })

  }
  else{
    this.errorMsg="Please enter valid amount...!"
    setTimeout(() => {
      this.errorMsg=""

    }, 1000);
  }

  }


  isValidAmount(amount:number):boolean{
    return amount>0 && amount<10000000
  }

}
