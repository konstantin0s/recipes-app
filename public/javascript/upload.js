handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in
    // '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    // handleUpload(uploadData).then(response => {
    //     // console.log('response is: ', response); after the console.log we can see that
    //     // response carries 'secure_url' which we can use to update the state
    //     this.setState({imageUrl: response.secure_url});
    // }).catch(err => {
    //     console.log("Error while uploading the file: ", err);
    // });
}

let uploadingBtn = document.getElementById('addPic');

addPic.addEventListener('change', handleFileUpload);