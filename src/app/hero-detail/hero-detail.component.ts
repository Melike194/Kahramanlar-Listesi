import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FirestoreServiceService } from '../firestore-service.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.scss' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private firestore:FirestoreServiceService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getHeroFromFirestore();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
  hilmi:any
  getHeroFromFirestore(){
    this.firestore.getHeroFromId(this.route.snapshot.params['id']).subscribe((res:any)=>{
      console.log(res)
      this.hilmi=res
    })
  }
  update(){
    this.firestore.update(this.route.snapshot.params['id'],this.hilmi)
  }
  delete(){
    this.firestore.delete(this.route.snapshot.params['id'],this.hilmi)
  }
  create(){
    this.firestore.create(this.route.snapshot.params['id'])
  }
}