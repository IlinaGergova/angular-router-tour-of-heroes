import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { catchError, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero$?: Observable<Hero>;

  constructor(private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router) { }

  ngOnInit(): void {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.heroService.getHero(params.get('id')!))
    );
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

}
