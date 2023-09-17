import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, map, of } from 'rxjs';

interface ChatCompletion {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
    choices: {
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
        index: number;
    }[];
}

@Injectable()
export class ChatgptService {
    private readonly logger = new Logger(ChatgptService.name);
    private chatgptURL;
    private apiKey;

    constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
        this.chatgptURL = 'https://api.openai.com/v1/chat/completions';
        this.apiKey = this.configService.get('CHATGPT_API_KEY');
    }

    generateResponse(content: string): Observable<string> {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
        };

        const data = {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content }],
            temperature: 0.7,
        };

        return this.httpService.post<ChatCompletion>(this.chatgptURL, data, { headers }).pipe(
            map(({ data }) => data.choices[0].message.content.trim()),
            catchError((error) => {
                this.logger.error(error);
                return of('An error happened: ' + error.message);
            }),
        );
    }
}
