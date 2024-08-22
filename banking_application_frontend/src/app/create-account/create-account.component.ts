import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Accounts } from '../accounts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  account:Accounts=new Accounts();
  constructor(private accountService:AccountService, private router:Router){}

  accountCreate=false;

  onSubmit(){
    this.saveAccount();
  }

    saveAccount(){
      this.accountService.createAccount(this.account).subscribe(data=>{

        console.log(data);
        this.accountCreate=true;
        setTimeout(() => {
          this.goToAccount();

        }, 1000);
      })
    }

    goToAccount(){

      this.router.navigate(['/accounts']);
    }



  

}
