import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  imageList: string[] = [
    'chinchilla',
    'hamster',
    'lapin',
    'souris'
  ];

  playerName!: string;
  currentImage: string = `/assets/images/${this.getRandomImage()}.png`;
  isPlaying: boolean = false;
  score: number = 0;
  time: number = 0;
  clicks: number[] = [];
  clickTimestamp!: number;
  nbClicsMax: number = 7;
  randomTop!: number;
  randomLeft!: number;
  timer!: NodeJS.Timer;

  constructor(private gameService: GameService,
    private userService: UserService,
    private router: Router) { }

  private getRandomImage(): string {
    return this.imageList[Math.round(Math.random() * (this.imageList.length - 1))];
  }

  private displayNewImage(): void {
    this.currentImage = `/assets/images/${this.getRandomImage()}.png`;
    this.randomTop = Math.floor(50 + Math.random() * (window.innerHeight - 100));
    this.randomLeft = Math.floor(50 + Math.random() * (window.innerWidth - 100));
  }

  ngOnInit(): void {
    const login = this.userService.getLogin();
    if (login) {
      this.playerName = login;
      this.gameService.getClickConfig().subscribe((data: any) => {
        this.nbClicsMax = data.click;
        this.displayNewImage();
      });
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  handleImageClick(): void {
    if (this.isPlaying) {
      const newDate = Date.now();
      const delta = (Date.now() - this.clickTimestamp);
      this.clicks.push(delta);
      this.clickTimestamp = newDate;
      this.time = 0;

      const sum = this.clicks.reduce((acc, current) => acc + current, 0);
      const average = Math.round(sum / this.clicks.length);
      const best = Math.min(...this.clicks);
      this.score = average;

      this.displayNewImage();

      if (this.clicks.length == this.nbClicsMax) {
        clearInterval(this.timer);
        this.time = 0;
        this.isPlaying = false;
        this.gameService.uploadGame(this.playerName,best,average)
          .subscribe((gameId: number)=>{
            this.gameService.uploadClicksToGame(gameId,this.clicks.reverse())
              .subscribe((data: any)=>{
                this.router.navigateByUrl(`/record/${gameId}`);
              }
            );
          }
        );
      }

    } else {
      this.isPlaying = true;
      this.displayNewImage();
      this.clickTimestamp = Date.now();
      this.timer = setInterval(()=>{
        this.time += 10;
      },10);
    }
  }

}
