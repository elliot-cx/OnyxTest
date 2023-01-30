import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './components/game-page/game-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LeaderboardPageComponent } from './components/leaderboard-page/leaderboard-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MyRecordsPageComponent } from './components/my-records-page/my-records-page.component';
import { RecordPageComponent } from './components/record-page/record-page.component';

const routes: Routes = [
  {path: '',component: LandingPageComponent,pathMatch: 'full'},
  {path: 'login',component: LoginPageComponent},
  {path: 'game', component: GamePageComponent},
  {path: 'leaderboard', component: LeaderboardPageComponent},
  {path: 'record/:gameId',component: RecordPageComponent},
  {path: 'my-records', component: MyRecordsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
