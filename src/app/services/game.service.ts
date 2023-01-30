import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Game } from "../models/game.model";
import { Click } from "../models/click.model";

@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor (private http: HttpClient) {}

    getClickConfig(): Observable<any>{
        return this.http.get<any>(`${environment.baseApiUrl}config`);
    }

    uploadGame(playerName: string, bestTime: number, averageTime: number): Observable<number>{
        return this.http.post<number>(`${environment.baseApiUrl}Game`,
            {
                'playerName':playerName,
                'bestTime':bestTime,
                'averageTime':averageTime
            }
        );
    }

    uploadClicksToGame(gameId: number, clickTimes: number[]): Observable<boolean>{
        return this.http.post<any>(`${environment.baseApiUrl}Clicks`,{
            'gameId':gameId,
            'clickTimes':clickTimes
        });
    }

    getGameById(gameId: number): Observable<Game>{
        return this.http.get<Game>(`${environment.baseApiUrl}Game/${gameId}`);
    }

    getClicksByGameId(gameId: number): Observable<Click[]>{
        return this.http.get<Click[]>(`${environment.baseApiUrl}Clicks/${gameId}`);
    }

    getGamesFromOffset(offset?: number, playerName?: string): Observable<Game[]>{
        const url = `${environment.baseApiUrl}Games/${offset??0}${playerName?`/${playerName}`:''}`;
        return this.http.get<Game[]>(url);
    }

    getGameRank(gameId: number, playerName?: string): Observable<number>{
        const url = `${environment.baseApiUrl}Rank/${gameId}${playerName?`/${playerName}`:''}`;
        return this.http.get<number>(url);
    }
}