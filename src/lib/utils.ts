export const checkPackageJson = (packageName: string) => {
  try {
    require(packageName)
    console.log('Package is installed')
  } catch (error) {
    console.log('Package is not installed')
  }
}
