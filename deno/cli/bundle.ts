import { appPath, devHtmlPath, devJsDir, htmlPath } from "./config.ts";

const link = `<link href="${appPath}" rel="preload" as="script"></link>`;
const script = `<script src="${appPath}"></script>`;

Deno.mkdirSync(devJsDir, { recursive: true });

function handleHtml() {
  let html = Deno.readTextFileSync(htmlPath);
  html = html.replace(/(<\/head>)/, link + "$1");
  html = html.replace(/(<\/body>)/, script + "$1");
  Deno.writeTextFileSync(devHtmlPath, html);
}
handleHtml();

export async function watchHtml() {
  const watcher = Deno.watchFs(htmlPath);
  for await (const event of watcher) {
    console.log(event);
    handleHtml();
  }
}
