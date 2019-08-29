const _ = require(`lodash`)
const path = require(`path`)

/**
 * @typedef {Object} TraversePackagesDepsReturn
 * @property {Object} depTree Lookup table to check dependants for given package.
 * Used to determine which packages need to be published.
 * @example
 * ```
 * {
 *   "gatsby-cli": Set(["gatsby"]),
 *   "gatsby-telemetry": Set(["gatsby", "gatsby-cli"]),
 *   "gatsby-source-filesystem": Set(["gatsby-source-contentful", "gatsby-source-drupal", "gatsby-source-wordpress", etc])
 *   // no package have remark plugin in dependencies - so dependant list is empty
 *   "gatsby-transformer-remark": Set([])
 * }
 * ```
 */

/**
 * Compile final list of packages to watch
 * This will include packages explicitly defined packages and all their dependencies
 * Also creates dependency graph that is used later to determine which packages
 * would need to be published when their dependencies change
 * @param {Object} $0
 * @param {String} $0.root Path to root of Gatsby monorepo repository
 * @param {String[]} $0.packages Initial array of packages to watch
 * This can be extracted from project dependencies or explictely set by `--packages` flag
 * @param {String[]} $0.monoRepoPackages Array of packages in Gatsby monorepo
 * @param {String[]} [$0.seenPackages] Array of packages that were already traversed.
 * This makes sure dependencies are extracted one time for each package and avoid any
 * infinite loops.
 * @param {DepTree} [$0.depTree] Used internally to recursively construct dependency graph.
 * @return {TraversePackagesDepsReturn}
 */
const traversePackagesDeps = ({
  root,
  packages,
  monoRepoPackages,
  seenPackages = [...packages],
  depTree = {},
}) => {
  packages.forEach(p => {
    let pkgJson
    try {
      pkgJson = require(path.join(root, `packages`, p, `package.json`))
    } catch {
      console.error(`"${p}" package doesn't exist in monorepo.`)
      // remove from seenPackages
      seenPackages = seenPackages.filter(seenPkg => seenPkg !== p)
      return
    }

    const fromMonoRepo = _.intersection(
      Object.keys({ ...pkgJson.dependencies }),
      monoRepoPackages
    )

    fromMonoRepo.forEach(pkgName => {
      depTree[pkgName] = (depTree[pkgName] || new Set()).add(p)
    })

    // only traverse not yet seen packages to avoid infinite loops
    const newPackages = _.difference(fromMonoRepo, seenPackages)

    if (newPackages.length) {
      newPackages.forEach(depFromMonorepo => {
        seenPackages.push(depFromMonorepo)
      })

      traversePackagesDeps({
        root,
        packages: fromMonoRepo,
        monoRepoPackages,
        seenPackages,
        depTree,
      })
    }
  })
  return { seenPackages, depTree }
}

exports.traversePackagesDeps = traversePackagesDeps
