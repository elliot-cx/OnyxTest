import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, shareReplay, tap } from 'rxjs';
import { Click } from 'src/app/models/click.model';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css']
})
export class RecordPageComponent implements OnInit {

  game$!: Observable<Game>;
  clicks$!: Observable<Click[]>;

  constructor(private route: ActivatedRoute,
    private gameService: GameService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = +params['gameId'];
      this.game$ = this.gameService.getGameById(gameId).pipe(shareReplay(1));
      this.clicks$ = this.gameService.getClicksByGameId(gameId);
    });
  }

}
