import {
  ActionFlags,
  Actions,
  BaseKind,
  DduItem,
  PreviewContext,
  Previewer,
} from "https://deno.land/x/ddu_vim@v3.9.0/types.ts";
import { Denops, fn } from "https://deno.land/x/ddu_vim@v3.9.0/deps.ts";

type Params = Record<never, never>;

type ActionData = {
  text: Array<string>;
};

export class Kind extends BaseKind<Params> {
  override actions: Actions<Params> = {
    open: async (args: { denops: Denops; items: DduItem[] }) => {
      const bufnr = await fn.bufadd(args.denops, "fully_understand");
      await fn.bufload(args.denops, bufnr);
      await fn.setbufvar(args.denops, bufnr, "&bufhidden", "hide");
      await fn.setbufvar(args.denops, bufnr, "&buftype", "nofile");
      await fn.setbufvar(args.denops, bufnr, "&buflisted", 1);
      await args.denops.cmd("buffer " + bufnr);
      for (const i of args.items) {
        await fn.setbufline(
          args.denops,
          bufnr,
          1,
          (i.action as ActionData).text,
        );
      }
      return ActionFlags.None;
    },
  };

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
    return {};
  }
}
