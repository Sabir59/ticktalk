// 1. addFile

addFile = (event) => {
  // grab out image from input
  const file = event.target.files[0];
  // setting file to this image
  if (file !== null) this.setState({ file });
};

// 2 sendFile
sendFile = () => {
  const { file } = this.state;
  if (file !== null) {
    if (this.isAuthorized(file.name)) {
      const metadata = { contentType: mime.lookup(file.name) };
      this.uploadFile(file, metadata);
      this.clearFile();
    }
  }
};

// 3 isAuthorized
isAuthorized = (filename) => {
  this.state.authorized.includes(mime.lookup(filename));
};

// 4 uploadFile
uploadFile = (file, metadata) => {
  console.log(file, metadata);
};

// 5 clearFile
clearFile = () => this.setState({ file: null });


// onClick={this.sendFile}
