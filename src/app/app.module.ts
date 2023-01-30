import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { HeaderComponent } from './components/header/header.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LeaderboardPageComponent } from './components/leaderboard-page/leaderboard-page.component';
import { RecordPageComponent } from './components/record-page/record-page.component';
import { ScoreTableComponent } from './components/score-table/score-table.component';
import { MyRecordsPageComponent } from './components/my-records-page/my-records-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    NewGameComponent,
    HeaderComponent,
    GamePageComponent,
    LeaderboardPageComponent,
    RecordPageComponent,
    ScoreTableComponent,
    MyRecordsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
