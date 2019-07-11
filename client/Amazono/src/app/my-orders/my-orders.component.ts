import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orders : any;

  constructor(
    private rest : RestApiService,
    private data : DataService
  ) { }

  async ngOnInit() {
    try{
      const data = await this.rest.get(
        'http://localhost:3030/api/accounts/orders'
      );
      data['success']
      ? ( this.orders = data['orders'] )
      : this.data.error(data['message']);
    }catch(error)
    {
      this.data.error(error['message']);
    }
  } 

}
