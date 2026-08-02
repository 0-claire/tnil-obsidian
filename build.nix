{
  pkgs,
  lib,
  importNpmLock,
  buildNpmPackage,
  nodejs,
  tsx,
  typescript,
  esbuild,
  ...
}: let
  npmDeps = importNpmLock {
    npmRoot = ./.;
  };
in {
  package = buildNpmPackage {
    pname = "tnil-obsidian";
    version = "latest";
    src = ./.;
    inherit npmDeps;
    npmConfigHook = importNpmLock.npmConfigHook;
    nativeBuildInputs = [esbuild nodejs tsx typescript];
    dontNpmBuild = true;
    dontNpmInstall = true;

    installPhase = ''
      mkdir -p $out
      cp -rp * $out
    '';
  };
  # packages to be required by the shell
  packages = [tsx typescript nodejs];
  inherit npmDeps;
}
