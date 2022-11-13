import { Component, Input, OnInit } from '@angular/core';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { catchError, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  crisis$?: Observable<Crisis>;

  constructor(private route: ActivatedRoute,
    private crisisService: CrisisService,
    private router: Router) { }

  ngOnInit(): void {
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.crisisService.getCrisis(params.get('id')!))
    );
    // const id = this.route.snapshot.paramMap.get('id')!;
    // this.hero$ = this.heroService.getHero(id);

  }

  gotoCrises(crisis: Crisis) {
    const crisisId = crisis ? crisis.id : null;

    //absolute path (that begins with a slash)
    // this.router.navigate(['/crisis-center', { id: crisisId, foo: 'foo' }]);

    // relative path:
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

}
