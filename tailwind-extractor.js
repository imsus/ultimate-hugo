module.exports = class {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}
