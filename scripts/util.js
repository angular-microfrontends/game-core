const fs = require('fs');

class FsWrapper {
  constructor(fd) {
    this.fd = fd;
  }
  write(data) {
    fs.writeSync(this.fd, data);
  }
}

const stderr = new FsWrapper(2);
const stdout = new FsWrapper(1);

module.exports = {
  stderr,
  stdout,
}
