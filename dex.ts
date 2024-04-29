import $ from "https://deno.land/x/dax@0.39.2/mod.ts";

const args = Deno.args;
if (args.length === 0) {
  args.push("bash");
}

const result = await $`docker ps`.text();
const containers = result.split("\n").slice(1);
const selectedContainer = await $.select({
  message: "Select a container",
  options: containers,
});
const selectedContainerId = containers[selectedContainer].split(/\s+/)[0];

await $`docker exec -it ${selectedContainerId} ${args}`.noThrow();
