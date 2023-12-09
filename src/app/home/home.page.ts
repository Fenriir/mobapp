import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CountriesModalComponent } from './countries-modal/countries-modal.component';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../services/places/places.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  countriesDataArray: any[] = [];

  constructor(
    public modalCtrl: ModalController, 
    public httpClient: HttpClient,

    private placesService: PlacesService
    ) {
      
    const getCountryData = async () =>{
      const {value} = await Preferences.get({
        key: "homeFetchData"
      });

      if(value){
        const fetchedItems = JSON.parse(value);
        this.countriesDataArray = fetchedItems;
      }
    }
    getCountryData();
    }

  async openModal(){

    const modal = await this.modalCtrl.create({
      component: CountriesModalComponent
    });

    await modal.present();
    const {data, role} = await modal.onWillDismiss();

    if (role === "location"){
      this.fetchData(data);
    }
  }

  sendData(data:any){
    this.placesService.data = data;
  }

  fetchData(input:any){
    //console.log(input.map((c: {label: any;}) => c.label));
    console.log(input);
    this.countriesDataArray=[];

    console.log(input)
    for(var c of input){
      const url_races=`https://www.dnd5eapi.co/api/races/${c.race.toLowerCase()}`;
      //const url_classes=`https://www.dnd5eapi.co/api/classes${c.class.toLowerCase()}`;
     // this.curr_name = c.name;

      var race_data;
      var class_data;

      this.httpClient.get(url_races).subscribe(res => {
        console.log(res);
        this.countriesDataArray.push({
         // name:   this.curr_name,
          race:   res,
        });
      });

      const saveStoredItems = async() =>{
        await Preferences.set({
          key: "homeFetchData",
          value: JSON.stringify(this.countriesDataArray)
        });
      }

      saveStoredItems();

      // // this.httpClient.get(url_classes).subscribe(res => {
      // //   console.log(res);
      // //   class_data = res;
      // // });

      // this.countriesDataArray.push({
      //   race:   race_data,
      // //  class:  class_data,
      // });

      // const saveStoredItems = async() =>{
      //   await Preferences.set({
      //     key: "homeFetchData",
      //     value: JSON.stringify(this.countriesDataArray)
      //   });
      // }
    
      // saveStoredItems();

      // this.httpClient.get(url_races).subscribe(res => {
      //   console.log(res);
      //   this.countriesDataArray.push(res);

      //   const saveStoredItems = async() =>{
      //     await Preferences.set({
      //       key: "homeFetchData",
      //       value: JSON.stringify(this.countriesDataArray)
      //     });
      //   }
      
      //   saveStoredItems();

      // });
      // this.httpClient.get(url_classes).subscribe(res => {
      //   console.log(res);
      //   this.countriesDataArray.push(res);

      //   const saveStoredItems = async() =>{
      //     await Preferences.set({
      //       key: "homeFetchData",
      //       value: JSON.stringify(this.countriesDataArray)
      //     });
      //   }
      
      //   saveStoredItems();

      // });
      console.warn(this.countriesDataArray);
    }
     console.log("Load data from API");
  }
}
