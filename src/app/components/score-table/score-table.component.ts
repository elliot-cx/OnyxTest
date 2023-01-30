import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent implements OnInit {

  @Input() isPaging!: boolean;
  @Input() playerName?: string;
  @Input() currentGame?: Game;
  offset: number = 0;
  games$!: Observable<Game[]>;
  

  constructor(private gameService: GameService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.currentGame) {
      this.gameService.getGameRank(this.currentGame.gameId,this.playerName ?? undefined).subscribe((rank)=>{
        this.offset = rank < 3 ? 0 : rank - 3;

        this.refresh();
      });
    }else{
      this.refresh();
    }
  }

  refresh(): void{
    this.games$ = this.gameService.getGamesFromOffset(this.offset,this.playerName);
  }

  onDetailsClick(gameId: number){
    this.router.navigate(['/record',gameId]);
    // this.router.navigateByUrl(`/record/${gameId}`);
  }

  onPagingLeft(): void {
    if (this.offset > 0) {
      this.gameService.getClickConfig().subscribe((data)=>{
        this.offset -= data["click"];
        this.offset = this.offset < 0 ? 0 : this.offset;
        this.refresh();
      });
    }
  }

  onPagingRight(): void {
    this.gameService.getClickConfig().subscribe((data)=>{
      this.offset += data["click"];
      this.refresh();
    });
  }

}
