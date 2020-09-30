import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
export class AppComponent {
  title = 'ClickerGame';

  money: number = 0;

  buyWhat: string = "";

  clicked: boolean = false; 

  count: number = 10;

  shop = {
    Worker: {
      num: 0,
      cost: 100,
      moneyUp: 50
    },
  
    ClickUpgrade: {
      num: 1,
      cost: 150,
      moneyUp: 250
    },
  
    Shop: {
      num: 0,
      cost: 2000,
      moneyUp: 500
    },
  
    Laboratory: {
      num: 0,
      cost: 7000,
      moneyUp: 1500
    },
  
    Warehouse: {
      num: 0,
      cost: 10000,
      moneyUp: 3500
    },
  
    Factory: {
      num: 0,
      cost: 50000,
      moneyUp: 7000
    }
  };
  
  rocketParts = {
    "RocketFuel": false,
    "FuelCanisters": false,
    "RocketEngines": false,
    "Cockpit": false,
    "PlatformForRocket": false,
    "ControlRoom": false
  };

  MPS: number = this.shop.Worker.num * 5 + this.shop.Shop.num * 50 + this.shop.Laboratory.num * 150 + this.shop.Warehouse.num * 500 + this.shop.Factory.num * 1250;  

  buy() {
    const cost = this.shop[this.buyWhat].cost;
    if (this.money >= cost) {
      const item = this.shop[this.buyWhat];
      this.money -= item.cost;
      item.cost += item.moneyUp;
      item.num += 1;
      this.MPS = this.shop.Worker.num * 5 + this.shop.Shop.num * 50 + this.shop.Laboratory.num * 150 + this.shop.Warehouse.num * 500 + this.shop.Factory.num * 1250;
    } else {
      alert("You don't have enough money");
    }
  }

  add() {
    this.money += this.shop.ClickUpgrade.num;
  }

  moneyAddShop() {
    const res = this.money += this.MPS;
    return res;
  }

  buyPart(tag: string, price: number) {
    if (this.money >= price && this.rocketParts[tag] !== true){
      if(tag == "PlatformForRocket" || this.rocketParts["PlatformForRocket"]){
        this.money -= price;
        this.rocketParts[tag] = true;
        document.getElementById(tag).className = "built";
      }else{
        alert("You must build the platform for the rocket first!");
      }
  }else if(this.rocketParts[tag]){
      alert("This has already been bought");
  }else{
      alert("You don't have enough money");
  }
  }

  launch(){
    if (this.rocketParts["RocketFuel"]            && this.rocketParts["FuelCanisters"]
        && this.rocketParts["RocketEngines"]      && this.rocketParts["Cockpit"]
        && this.rocketParts["PlatformForRocket"]  && this.rocketParts["ControlRoom"]
        && this.clicked !== true) {
      
      let launchCountdown = document.getElementById("launchCountdown");
      
      launchCountdown.style.display = "grid";
      
      this.clicked = true;
      
      let Int1 = setInterval(() => { launchCountdown.scrollIntoView(); }, 1)
      
      let Int2 = setInterval(() => {
        if (this.count > 0) {
          this.count--;
        } else if (this.count <= 0) {
          launchCountdown.innerHTML = "ROCKET LAUNCHED! CONGRATILATIONS! YOU WIN!";
          clearInterval(Int1);
          clearInterval(Int2);
        }
      }, 1000);

    }else if(this.clicked){
      alert("You already started the launch!");
    }else{
      alert("You aren't ready to launch!");
    }
  }

  Int3 = setInterval(() => { this.money = this.moneyAddShop() }, 1000);
  Int4 = setInterval(() => { 
    if (this.rocketParts["RocketFuel"] && this.rocketParts["FuelCanisters"]
      && this.rocketParts["RocketEngines"] && this.rocketParts["Cockpit"]
      && this.rocketParts["PlatformForRocket"] && this.rocketParts["ControlRoom"]
      && this.clicked !== true) { 
      document.getElementById("launchButton").style.display = "grid";
      clearInterval(this.Int4);
      }
  }, 1)

}
