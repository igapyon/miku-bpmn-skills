import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const version = manifest.version;
if (typeof version !== "string" || !/^\d+\.\d+\.\d+$/.test(version)) {
  throw new Error(`package.json version must be stable SemVer (x.y.z); received ${String(version)}`);
}

const skill = "skills/igapyon-miku-bpmn";
const skillRoot = path.join(root, skill);
const output = path.join(root, "bundle");
const zipName = `igapyon-miku-bpmn-skills-${version}.zip`;
const excluded = new Set([".DS_Store", ".git", "node_modules"]);
const skillScratch = new Set([".codex", "tmp", "output", "state"]);

for (const required of ["README.md", "LICENSE", `${skill}/SKILL.md`]) {
  const fullPath = path.join(root, required);
  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    throw new Error(`Required bundle input is missing: ${required}`);
  }
}

fs.mkdirSync(output, { recursive: true });
const temporary = fs.mkdtempSync(path.join(output, ".build-"));
try {
  const contents = path.join(temporary, "contents");
  fs.mkdirSync(path.join(contents, "skills"), { recursive: true });
  for (const file of ["README.md", "LICENSE"]) {
    fs.copyFileSync(path.join(root, file), path.join(contents, file));
  }

  fs.cpSync(skillRoot, path.join(contents, skill), {
    recursive: true,
    filter: (source) => {
      const name = path.basename(source);
      if (excluded.has(name)) return false;
      const relative = path.relative(skillRoot, source).split(path.sep).join("/");
      return ![...skillScratch].some((entry) => relative === entry || relative.startsWith(`${entry}/`));
    },
  });

  const zipPath = path.join(temporary, zipName);
  execFileSync("zip", ["-X", "-qr", zipPath, "README.md", "LICENSE", "skills"], {
    cwd: contents,
    stdio: "inherit",
  });
  if (!fs.existsSync(zipPath) || fs.statSync(zipPath).size === 0) {
    throw new Error("ZIP command did not produce a non-empty archive");
  }
  fs.renameSync(zipPath, path.join(output, zipName));
  console.log(`Generated bundle/${zipName}`);
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
