import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
import { Accounts } from '../accounts';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {

  id:number=0;
  account:Accounts=new Accounts();
  constructor(private accountService:AccountService,private route:ActivatedRoute){}

  ngOnInit(){
    this.id=this.route.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data => {
      this.account=data

    })
  }

}
