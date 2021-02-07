import { Component , OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  fakeArray = new Array(80);                  //  List To print 80 Seats
  seatsAlreadyBooked = 0;                     //  Count The Number Of Seats Already booked 
  numberOfSeatToBook = [1, 2, 3, 4, 5, 6, 7]; // Option To Selecct Number of Seats To book
  newSeatBooked =0;                           // To count How Many New Seats are Booked
  hide = true;                // Just TO provide a Page Change effect and display result of seat booking
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

  // http://onlineexam.pninfosys.com/api/seats
  // http://onlineexam.pninfosys.com/api/seats/book

  // To Fetch All The Already Booked Seats From Database

  getAllSeats(){
    this.htttpClient.get('http://127.0.0.1:8000/api/seats').subscribe(res => {
      if(res[0].Seat_Count == null){
        this.seatsAlreadyBooked = 0;
      }else{
        this.seatsAlreadyBooked = res[0].Seat_Count;
      }
    });
  }

  // To Submit All newely added Seats To database
  onSubmit() {
  //  Check Number of Seats in not Greater Than 80
    if(this.seatsAlreadyBooked + parseInt(this.bookseatform.value.seat) > 80){
      this.error= true;  
    }else{
      this.htttpClient.post('http://127.0.0.1:8000/api/seats/book',this.bookseatform.value).subscribe(res => {
            if(res['status'] == 200){
              this.hide = false;
              this.error = false;
              this.newSeatBooked = parseInt(res['New_Seats_Booked']) + parseInt(res['SeatAlreadyBooked']);
              this.bookseatform.reset();
            }
        });
    }
  }

  // Move Back To Booking UI and refresh count of Seat Book on It.
  goBack(){
    this.hide = true;
    this.getAllSeats();
  }
}
