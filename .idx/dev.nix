{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_22
    pkgs.nodePackages.pnpm
    pkgs.openssl
  ];
  idx.extensions = [
    "bradlc.vscode-tailwindcss"
  ];
  services.docker.enable = true;
}