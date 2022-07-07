import * as esbuild from "https://deno.land/x/esbuild@v0.11.18/mod.js";
import { createHash } from "https://deno.land/std@0.95.0/hash/mod.ts";
import "./bundle.ts";

import {
  appPath,
  buildAppPath,
  buildHtmlPath,
  buildJsDir,
  devAppPath,
  devHtmlPath,
  devJsDir,
  mainPath,
} from "./config.ts";

try {
  Deno.removeSync(buildJsDir, { recursive: true });
} catch (_err) {
  // console.log(err)
}

Deno.mkdirSync(devJsDir, { recursive: true });
Deno.mkdirSync(buildJsDir, { recursive: true });

const p = Deno.run({
  cmd: [
    "deno",
    "bundle",
    "--unstable",
    "--config",
    "tsconfig.json",
    mainPath,
    devAppPath,
  ],
  stderr: "piped",
  stdout: "piped",
});
await Promise.all([
  p.status(),
  p.output(),
  p.stderrOutput(),
]);
p.close();

let html = Deno.readTextFileSync(devHtmlPath);
const appjs = Deno.readTextFileSync(devAppPath);

const out = await esbuild.transform(appjs, {
  minify: true,
  format: "iife",
});

esbuild.stop();

const hash = createHash("md5");
hash.update(out.code);
const hashValue = hash.toString();

Deno.writeTextFileSync(
  buildAppPath.replace(/js$/, hashValue + ".js"),
  out.code,
);

html = html
  .replaceAll(
    `="${appPath}"`,
    `="${appPath.replace(/js$/, hashValue + ".js")}"`,
  )
  .replace(/(>)(\n|\r|\s)+(<)/g, "$1$3");

Deno.writeTextFileSync(buildHtmlPath, html);
