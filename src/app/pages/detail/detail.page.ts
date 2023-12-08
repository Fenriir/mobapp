import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/places/places.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  allData:any;
  imageURL:string = "empty";
  myDomain = "";
  ability_bonuses = [];
  alignment ="";
  age = "";
  size_description = "";
  size = "";
  starting_proficiencies = [];
  speed = "";
  name = "";
  languages = [];
  traits = [];

  constructor(
    private placeService: PlacesService
    ) { }

  ngOnInit() {
    this.allData = this.placeService.data.races;

    console.log("All data");
    console.log(this.allData);

    //const url = this.allData.coatOfArms.png;
    //this.imageURL = url;
    //this.myDomain = this.allData.tld[0];

    this.name = this.allData.name;
    this.speed = this.allData.speed;
    this.age = this.allData.age;
    this.alignment = this.allData.alignment;
    this.size_description = this.allData.size_description;
    this.size= this.allData.size;

    this.ability_bonuses = this.allData.ability_bonuses;
    this.starting_proficiencies = this.allData.starting_proficiencies;
    this.languages = this.allData.languages;
    this.traits = this.allData.traits;
    
   // console.log(this.ability_bonuses);
   // this.starting_proficiencies = this.allData.starting_proficiencies[0].name;
   // this.languages = this.allData.languages[0].name;
   // this.traits = this.allData.traits[0].name;

   // console.log(url);
  }
  
}
