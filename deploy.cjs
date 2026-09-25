const { execSync, spawnSync } = require("child_process");
const path = require("path");

// Use surge's internal API directly
const surgePath = path.join(process.env.LOCALAPPDATA, "npm-cache", "_npx");

// Try running surge with piped input
const result = spawnSync(
  process.execPath,
  [require.resolve("surge/lib/cli")],
  {
    input: "akshaysambhu07@gmail.com\nAkshay@9947\n",
    env: { ...process.env },
    cwd: "E:\\wed_app\\dist",
    encoding: "utf8",
    argv0: "surge",
    stdio: ["pipe", "pipe", "pipe"],
    args: ["E:\\wed_app\\dist", "plan-my-moments.surge.sh"]
  }
);
console.log("STDOUT:", result.stdout);
console.log("STDERR:", result.stderr);
console.log("STATUS:", result.status);
