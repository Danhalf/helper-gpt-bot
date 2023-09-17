import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
    @Start()
    onStart(@Ctx() ctx: Context) {
        ctx.replyWithHTML(`<b>Hello ${ctx.from.first_name} ${ctx.from.last_name}</b> I'm ready to serve.`);
    }

    @On('text')
    onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
        ctx.replyWithHTML(`<i>MESSAGE: ${message}</i>`);
    }
}
