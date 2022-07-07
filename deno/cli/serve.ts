import { devAppPath, devDir, devJsDir, mainPath } from "./config.ts";
import { watchHtml } from "./bundle.ts";
watchHtml();

Deno.mkdirSync(devJsDir, { recursive: true });

[
  {
    cmd: [
      "deno",
      "bundle",
      "--watch",
      "--unstable",
      "--config",
      "tsconfig.json",
      mainPath,
      devAppPath,
    ],
  },

  {
    cmd: [
      "deno",
      "run",
      "--allow-read",
      "--allow-net",
      "https://deno.land/std/http/file_server.ts",
      devDir,
    ],
  },
].forEach(async (opt: Deno.RunOptions) => {
  const p = Deno.run(opt);

  const { code } = await p.status();
  if (code === 0) {
    const rawOutput = await p.output();
    console.log(rawOutput);
  } else {
    const rawError = await p.stderrOutput();
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
  }

  Deno.exit(code);
});
