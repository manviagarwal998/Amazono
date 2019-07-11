import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderId : any;
  order : any;

  constructor(
    private rest : RestApiService,
    private data : DataService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res =>{
      this.orderId = res['id'];
      this.getOrder();
    });
  }

  async getOrder(event?:any){
    if(event){
      this.order = null;
    }
    try{
      const data = await this.rest.get(
        `http://localhost:3030/api/accounts/orders/${this.orderId}`
      );
      data['success']
      ? ( this.order = data['order'])
      : this.data.error(data['message']);

    }catch(error)
    {
      this.data.error(error['message']);
    }
  }


}
