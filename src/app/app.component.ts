import { Component , OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  row1; row2; row3; row4; row5; row6; row7; row8; row9; row10; row11; row12;
  seatsAlreadyBooked = 0;                     //  Count The Number Of Seats Already booked 
  numberOfSeatToBook = [1, 2, 3, 4, 5, 6, 7]; // Option To Selecct Number of Seats To book
  error = false;              // If limit Excede Then To stop user from Submission and display error

  // Reactive Form To Collect How Much Seat To Book Input
  bookseatform = new FormGroup({
    seat: new FormControl(null)
  });

  constructor(private htttpClient: HttpClient) {}

  // Intialize Elemets when Component is rendered
  ngOnInit(): void {
      this.getAllSeats();
  }

  // To Fetch All The Already Booked Seats From Database
  getAllSeats(){
    this.htttpClient.get('http://onlineexam.pninfosys.com/api/seats').subscribe(res => {
        
        let arr = [];  
        for(let key in res){    
            arr.push(res[key]);
        };

        this.seatsAlreadyBooked = arr[2];
        this.row1 = arr[1][0];
        this.row2 = arr[1][1];
        this.row3 = arr[1][2];
        this.row4 = arr[1][3];
        this.row5 = arr[1][4];
        this.row6 = arr[1][5];
        this.row7 = arr[1][6];
        this.row8 = arr[1][7];
        this.row9 = arr[1][8];
        this.row10 = arr[1][9];
        this.row11 = arr[1][10];
        this.row12 = arr[1][11];
        //this.seatsAlreadyBooked = res.seat_count;


      //if(res[0].Seat_Count == null){
      // this.seatsAlreadyBooked = 0;
      //}else{
      //  this.seatsAlreadyBooked = parseInt(res[0].Seat_Count);
      // }
    });
  }

  //  'http://onlineexam.pninfosys.com/api/seats/book 
  //  http://127.0.0.1:8000/api/seats

  // To Submit All newely added Seats To database
  onSubmit() {
    //  Check Number of Seats in not Greater Than 80
    const a =  this.seatsAlreadyBooked - 80;
    if(a + parseInt(this.bookseatform.value.seat)  > 80){
      this.error= true;  
    }else{
      this.htttpClient.post('http://onlineexam.pninfosys.com/api/seats/book',this.bookseatform.value).subscribe(res => {
            if(res['status'] == 2001){
              this.goBack();
            }
        });
    }
  }

  // Move Back To Booking UI and refresh count of Seat Book on It.
  goBack(){
    this.getAllSeats();
  }

  reset(){
    this.htttpClient.get('http://onlineexam.pninfosys.com/api/seats/reset').subscribe(res => {
        if(res['status'] == 2003){
          this.goBack();
        }
    });
  }
}
