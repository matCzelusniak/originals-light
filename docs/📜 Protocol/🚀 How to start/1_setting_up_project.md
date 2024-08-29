# Set up Project

## Project

Just clone repo:
[GitHub Repository for Originals Light](https://github.com/matCzelusniak/originals-light)

## Instal libs

Run command 'chr intall' in root directory.

## Other libraries

```yaml
  ft4:
    registry: https://gitlab.com/chromaway/ft4-lib.git
    path: rell/src/lib/ft4
    tagOrBranch: v1.0.0r
    rid: x"FA487D75E63B6B58381F8D71E0700E69BEDEAD3A57D1E6C1A9ABB149FAC9E65F"
    insecure: false
  iccf:
    registry: https://gitlab.com/chromaway/core/directory-chain
    path: src/iccf
    tagOrBranch: 1.32.2
    rid: x"1D567580C717B91D2F188A4D786DB1D41501086B155A68303661D25364314A4D"
    insecure: false
  pagination:
    registry: git@bitbucket.org:chromawallet/lib-pagination-utils.git
    path: rell/src/core/pagination
    tagOrBranch: master
    insecure: true