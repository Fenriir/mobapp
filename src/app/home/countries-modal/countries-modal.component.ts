import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-countries-modal',
  templateUrl: './countries-modal.component.html',
  styleUrls: ['./countries-modal.component.scss'],
})


export class CountriesModalComponent {
  race = this.getRaces();
  class = this.getClasses();
  inputed_word: string = "";
  apiChoice: string = "";

  rasa: string = "Human";
  classa: string = "Fighter";
  
//,private placeService: PlacesService
  constructor(private modalCTRL: ModalController, private alertCTRL: AlertController) {
    this.race = [
    { label: "Dragonborn", checked: false},
    { label: "Dwarf", checked: false},
    { label: "Elf", checked: false},
    { label: "Half-Elf", checked: false},
    { label: "Gnome", checked: false},
    { label: "Half-Orc", checked: false},
    { label: "Halfling", checked: false},
    { label: "Human", checked: false},
    { label: "Tiefling", checked: false}
    ];
    this.race = this.getRaces();
    this.class = [
    { label: "Barbarian", checked: false},
    { label: "Bard", checked: false},
    { label: "Cleric", checked: false},
    { label: "Druid", checked: false},
    { label: "Fighter", checked: false},
    { label: "Monk", checked: false},
    { label: "Paladin", checked: false},
    { label: "Ranger", checked: false},
    { label: "Rogue", checked: false},
    { label: "Sorcerer", checked: false},
    { label: "Warlock", checked: false},
    { label: "Wizard", checked: false}
  ]
    this.class = this.getClasses();

    const getStoredItems = async () =>{
      const {value} = await Preferences.get({
        key: "jsonData"
      });
  
      if (value){
        const raceItems = JSON.parse(value);
        this.race.forEach(item => {
          item.checked = raceItems.some((raceItem: 
            { label: string; }) => 
            raceItem.label ===  item.label);
        });
      }
  
      if (value){
        const classItems = JSON.parse(value);
        this.class.forEach(item => {
          item.checked = classItems.some((classItem: 
            { class: string; }) => 
            classItem.class ===  item.label);
        })
      }
      console.log(value);
    };
    getStoredItems();
  }

  dismissModal(){
    this.modalCTRL.dismiss(null, "cancel");
  }

  async submit(){

    if(this.inputed_word.trim().length < 1) {
      const alert = await this.alertCTRL.create({
        header: 'Error',
        message: 'You must input a name',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const raceItems = this.race.filter((item)=>item.checked);
    const classItems = this.class.filter((item)=>item.checked);

    const saveStoredItems = async() =>{
      await Preferences.set({
        key: "jsonData",
        value: JSON.stringify(raceItems)
      });
    }

    saveStoredItems();
    
    var inputed = {
      name: this.inputed_word,
      race: this.rasa, 
      class: this.classa,
    }

   if (inputed.name.trim() !="")
      this.modalCTRL.dismiss([inputed], "location");
    else
    this.modalCTRL.dismiss([inputed], "error");
  }



  getRaces(){
     return [
       { label: "Dragonborn", checked: false},
       { label: "Dwarf", checked: false},
       { label: "Elf", checked: false},
       { label: "Half-Elf", checked: false},
       { label: "Gnome", checked: false},
       { label: "Half-Orc", checked: false},
       { label: "Halfling", checked: false},
       { label: "Human", checked: false},
       { label: "Tiefling", checked: false}
     ];
   }

   getClasses(){
      return [
        { label: "Barbarian", checked: false},
        { label: "Bard", checked: false},
        { label: "Cleric", checked: false},
        { label: "Druid", checked: false},
        { label: "Fighter", checked: false},
        { label: "Monk", checked: false},
        { label: "Paladin", checked: false},
        { label: "Ranger", checked: false},
        { label: "Rogue", checked: false},
        { label: "Sorcerer", checked: false},
        { label: "Warlock", checked: false},
        { label: "Wizard", checked: false}
      ];
    }

}
