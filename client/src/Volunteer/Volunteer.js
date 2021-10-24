import React from 'react';
// import ImageUploader from 'react-images-upload';

import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";


class Volunteer extends React.Component {

    //     constructor(props) {
    //         super(props);
    //          this.state = { pictures: [] };
    //          this.onDrop = this.onDrop.bind(this);
    //     }

    //     onDrop(picture) {
    //         this.setState({
    //             pictures: this.state.pictures.concat(picture),
    //         });
    //     }

    //     render() {
    //         return (
    //             <ImageUploader
    //                 withIcon={true}
    //                 buttonText='Choose image'
    //                 onChange={this.onDrop}
    //                 imgExtension={['.jpg', '.gif', '.png', '.gif']}
    //                 maxFileSize={5242880}
    //             />
    //         );
    //     }
    // }

    state = {
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        axios.post("");
    }

    render() {
        return (
            <>
                <div><h1>Become a Volunnteer</h1></div>

                <div className="App" style={{ padding: "120px", margin: "120px 120px 0px" }}>
                    <input className="form-control" type="file" onChange={this.fileSelectedHandler} />
                    <button onClick={this.fileUploadHandler}>Upload</button>
                </div>
            </>
        );
    }
}

export default Volunteer;