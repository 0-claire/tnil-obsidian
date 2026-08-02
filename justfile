build:
  tsc -noEmit -skipLibCheck ; node esbuild.config.mjs production && npm run css && npm run copy

update-deps:
  nix-build -A build.node_modules
