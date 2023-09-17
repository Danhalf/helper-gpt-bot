import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramService } from './telegram.service';
import { options } from './telegram-config.factory';
import { ChatgptModule } from '@/chatgpt/chatgpt.module';

@Module({
    imports: [TelegrafModule.forRootAsync(options()), ChatgptModule],
    providers: [TelegramService],
})
export class TelegramModule {}
