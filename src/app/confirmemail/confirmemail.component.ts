import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.css']
})
export class ConfirmemailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService) {

  }
  userId: string;
  code: string;

  ngOnInit() {

    this.route.queryParams.subscribe((queryParams: any) => {
      console.log('----queryParams----', queryParams);
      this.userId = queryParams.userId;
      this.code = queryParams.code;
     });
  }

  onConfirmEmail() {

    this.apiService.confirmUserEmail(this.userId, this.code)
      .subscribe(
      data => {
        this.router.navigate(['list-user']);
      },
      badReasponse => {
        // this.error = badReasponse.error;
        console.log('----error-----', badReasponse);
      }
    );
  }

}
