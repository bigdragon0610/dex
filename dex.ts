import $ from "https://deno.land/x/dax@0.39.2/mod.ts";

const args = Deno.args;
if (args.length === 0) {
  args.push("bash");
}

const result = await $`docker ps`.text();
const ids: string[] = [];
result.split("\n").forEach((line, i) => {
  if (i === 0) {
    return;
  }
  console.log(`[${i - 1}] ${line}`);
  ids.push(line.split(/\s+/)[0]);
});
const id = prompt("enter container number:");
if (!id) {
  Deno.exit(0);
}

await $`docker exec -it ${ids[parseInt(id)]} ${args}`.noThrow();
