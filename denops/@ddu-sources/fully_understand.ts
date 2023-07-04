import {
  BaseSource,
  Item,
  SourceOptions,
} from "https://deno.land/x/ddu_vim@v3.3.3/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.3.3/deps.ts";

type Params = Record<never,never>;

const fullyUnderstand = [
"            _     _             _                     ",
"         __| | __| |_   ___   _(_)_ __ ___            ",
"        / _` |/ _` | | | \\ \\ / / | '_ ` _ \\           ",
"       | (_| | (_| | |_| |\\ V /| | | | | | |          ",
"        \\__,_|\\__,_|\\__,_(_)_/ |_|_| |_| |_|          ",
"                __       _ _                          ",
"               / _|_   _| | |_   _                    ",
"              | |_| | | | | | | | |                   ",
"              |  _| |_| | | | |_| |                   ",
"              |_|  \\__,_|_|_|\\__, |                   ",
"                             |___/                    ",
"                 _               _                  _ ",
" _   _ _ __   __| | ___ _ __ ___| |_ __ _ _ __   __| |",
"| | | | '_ \\ / _` |/ _ \\ '__/ __| __/ _` | '_ \\ / _` |",
"| |_| | | | | (_| |  __/ |  \\__ \\ || (_| | | | | (_| |",
" \\__,_|_| |_|\\__,_|\\___|_|  |___/\\__\\__,_|_| |_|\\__,_|"]


export class Source extends BaseSource<Params> {
  override kind = "fully_understand";
  override gather(_args: {
    denops: Denops;
    sourceOptions: SourceOptions;
    sourceParams: Params;
  }): ReadableStream<Item[]> {
    return new ReadableStream<Item[]>({
      async start(controller) {
        // initialize
        const items: Item[] = [];

        items.push({
          word: "ddu.vim fully understand",
          action: {
            text: fullyUnderstand,
          },
        });
        controller.enqueue(items);
        controller.close();
      },
    });
  }

  override params(): Params {
    return {
    };
  }
}
