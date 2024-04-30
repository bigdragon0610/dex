import $ from "https://deno.land/x/dax@0.39.2/mod.ts";

const args = Deno.args;
if (args.length === 0) {
  args.push("bash");
}

const result = await $`docker ps`.text();
const containers = result.split("\n").slice(1);

if (containers.length === 0) {
  Deno.exit();
}

let selectedContainer = 0;
if (containers.length == 1) {
  const response = await $.confirm({
    message: `${containers[selectedContainer]}\nExec into this container?`,
    default: true,
  });
  if (!response) Deno.exit();
} else {
  selectedContainer = await $.select({
    message: "Select a container",
    options: containers,
  });
}
const selectedContainerId = containers[selectedContainer].split(/\s+/)[0];

await $`docker exec -it ${selectedContainerId} ${args}`.noThrow();
