import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreServiceService } from '../firestore-service.service';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService,private mahmut:FirestoreServiceService) { }

  ngOnInit(): void {

    this.getHeroes();
    this.getHeroesFromFirestoreService()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  hilmi:any
getHeroesFromFirestoreService(){
  return this.mahmut.listHeroFromFirestore().subscribe(res=>{
    console.log(res)
    this.hilmi=res
  })
}

} 