import {
  ActionFlags,
  Actions,
  BaseKind,
  DduItem,
  PreviewContext,
  Previewer,
} from "https://deno.land/x/ddu_vim@v3.3.3/types.ts";
import { Denops, fn } from "https://deno.land/x/ddu_vim@v3.3.3/deps.ts";

type Params = Record<never,never>;

type ActionData = {
    text: Array<string>;
}

export class Kind extends BaseKind<Params> {
  override actions: Actions<Params> = {
    open: async (args: { denops: Denops, items: DduItem[] }) => {
        await args.denops.cmd("enew");
        for (const i of args.items ){
            await fn.setline(args.denops, 1, (i.action as ActionData).text)
        }
        return ActionFlags.None;
    },
  }

  override async getPreviewer(
    args: {
      denops: Denops;
      item: DduItem;
      actionParams: unknown;
      previewContext: PreviewContext;
    },
  ): Promise<Previewer | undefined> {
    const action = args.item.action as ActionData;
    if (!action) {
      return await Promise.resolve(undefined);
    }
  
    return await Promise.resolve({
      kind: "nofile",
      contents: action.text,
    });
  }


  override params(): Params {
    return {
    };
  }
}

