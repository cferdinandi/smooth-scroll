workflow "Release" {
  on = "release"
  resolves = ["Publish to NPM"]
}

action "Publish to NPM" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "npm publish"
}
