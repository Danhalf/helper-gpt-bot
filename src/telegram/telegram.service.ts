import { ConfigService } from '@nestjs/config';
import { ChatgptService } from '@/chatgpt/chatgpt.service';
import { Update, Start, Ctx, On, Message } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
    constructor(private readonly configService: ConfigService, private readonly gpt: ChatgptService) {
        super(configService.get('TELEGRAM_API_KEY'));
    }

    @Start()
    onStart(@Ctx() ctx: Context) {
        ctx.replyWithHTML(`<b>Hello ${ctx.from.first_name} ${ctx.from.last_name}</b> I'm ready to serve.`);
    }

    @On('text')
    onMessage(@Message('text') message: string) {
        return this.gpt.generateResponse(message);
    }
}
