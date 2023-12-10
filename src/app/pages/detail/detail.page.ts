import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/places/places.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  AllData:any;
  DataRace:any;
  DataClass:any;
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
  rasa = "";

  class="";
  proficiencies1=[];
  saving_throws = [];
  starting_equipment = [];
  multi_classing=[];
  prerequisites=[];
  multi_proficiencies=[];

  constructor(
    private placeService: PlacesService
    ) { }

  ngOnInit() {
    this.AllData = this.placeService.data;
    this.DataRace = this.placeService.data.race;
    this.DataClass = this.placeService.data.class;

    console.log("All data");
    console.log(this.DataClass);

    this.name = this.DataRace.name;
    this.rasa = this.DataRace.name;
    this.speed = this.DataRace.speed;
    this.age = this.DataRace.age;
    this.alignment = this.DataRace.alignment;
    this.size_description = this.DataRace.size_description;
    this.size= this.DataRace.size;

    this.ability_bonuses = this.DataRace.ability_bonuses;
    this.starting_proficiencies = this.DataRace.starting_proficiencies;
    this.languages = this.DataRace.languages;
    this.traits = this.DataRace.traits;

    this.class = this.DataClass.name;
    this.proficiencies1 = this.DataClass.proficiencies;
    this.saving_throws = this.DataClass.saving_throws;
    this.starting_equipment = this.DataClass.starting_equipment;
    this.multi_classing = this.DataClass.multi_classing;
    this.prerequisites = this.DataClass.multi_classing.prerequisites;
    this.multi_proficiencies = this.DataClass.multi_classing.proficiencies;
  }
  
}
