import { Component, OnInit, Pipe, PipeTransform, Injectable  } from "@angular/core";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})

export class HomeComponent implements OnInit {
  number: any;
  dropdownValue = '1';
  isPrime = ''
  categoriesValue:any;
  searchText:string;
  selectedItem = '1';

  constructor(
    private http : HttpClient
  ) {}
  

  ngOnInit() {
   this.getCategories()
  this.http.get('https://codequiz.azurewebsites.net/data').subscribe(Response => {
    console.log(Response)
  })
  }
  getCategories(){
    this.http.get('https://api.publicapis.org/categories').subscribe(Response => {
      this.categoriesValue = Response
    })
  }
  search(){
    const result = this.categoriesValue.categories.filter((value: string) => value == this.searchText);
    if(result.length > 0){
      this.categoriesValue.categories = result
      this.categoriesValue.count = result.length
    }else{
      alert("Search not found!");
      this.getCategories()
    }
  }

  checkPrimeAndFibonacci (){
    if(this.dropdownValue == '1'){
      console.log('this.checkPrimeNumber()')
      this.checkPrimeNumber()
    }else if (this.dropdownValue == '2'){
      console.log('this.checkFibonacci()')
      this.checkFibonacci()
    }
  }

  checkPrimeNumber() {

    let number = this.number
    console.log('Number'+number)
    let isPrime = true;

    // check if number is equal to 1
    if (number === 1) {
      this.isPrime = 'False'
    }

    // check if number is greater than 1
    else if (number > 1) {
      // looping through 2 to number-1
      for (let i = 2; i < number; i++) {
        if (number % i == 0) {
          isPrime = false;
          break;
        }
      }

      if (isPrime) {
        this.isPrime = 'True'
      } else {
        this.isPrime = 'False'
      }
    }
  }

  checkFibonacci(){
    let num = this.number
      if (this.isPerfectSquare(5*(num*num)-4) || this.isPerfectSquare(5*(num*num)+4)) {
          this.isPrime = 'True'
      } else { 
          this.isPrime = 'False'
      }
  }

  isPerfectSquare(x:number){
    let s = Math.sqrt(x);
    return (s * s == x);
  }

  // https://stackoverflow.com/questions/53642506/filter-table-in-angular
}