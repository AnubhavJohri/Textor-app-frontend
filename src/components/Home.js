import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import DocumentTitle from 'react-document-title';
import LoadingBar from 'react-top-loading-bar';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      files: "",
      extractedText: "",
      email : "" ,
      errorMessage: "",
      enable : false
    }
  }

  handleChange = (event) => {
    const name = event.target.name ; 
    const value = event.target.value ;
    this.setState({ [name] : value })
    if ( this.state.email && this.state.files )
    this.setState( {enable : true} ) ;
  }

  handleSubmit = ( e ) => {
    e.preventDefault();
    var url = "https://textor-app-backend.herokuapp.com/image/extractImage/";
    //var url = "http://localhost:3001/image/extractImage/";
    url = url + this.state.email;
    const ob = {};
    ob["image"] = this.state.files;
    this.LoadingBar.continuousStart(5); // START LOADING BAR WHILE WAITING FOR THE RESPONSE FROM SERVER
    axios.post(url, ob).then(result => {
      console.log("text from image=", result.data.message);
      this.LoadingBar.complete() ;       //STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
      this.setState({ extractedText: result.data.message })
    }).catch(err => {
      let msg = "";
      if (err.response)
        msg = err.response.message;
      else
        msg = "Server Not Started , Please Start your Server!";
      this.LoadingBar.complete() ;       //STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
      this.setState({ errorMessage: msg });
    });
  }


  getFiles(files) {
    //console.log("files=",files[0].base64);
    this.setState({ files: "", errorMessage: "", extractedText: "" });
    this.setState({ files: files[0].base64 });
    if ( this.state.email && this.state.files )
    this.setState( {enable : true} ) ;
  }


  render() {
    return (
      <React.Fragment>
        <div className="container">
        <DocumentTitle title = "Textor | Extract Texts from Images"/>
          <div className="row" >
          <LoadingBar height={7} color='grey' onRef={ref => (this.LoadingBar = ref)}/>
            <div className="col-lg-8 offset-lg-2 col-sm-4 offset-sm-2 text-center" style={{ backgroundColor: "lightblue" }}>
              <div className="card">
                <div className="card-title"><h1 className="display-4">Upload the Pic</h1></div>
              </div>
              <div className="card-body">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input type="email" onChange={this.handleChange} placeholder="Please Enter Your Email-Id to Upload" name="email" className="form-control" />
                    <small className="form-text text-muted">This is just to save your results for future reference. Please enter email Id if you wish to extract text</small>
                  </div>

                  <div style={{ width: "60px", height: "60px", marginLeft: "250px" }} className="text-center" >
                    {this.state.files ? <img src={this.state.files} alt="selected" className="img-fluid" /> : <span></span>}
                  </div>
                  <FileBase64
                    multiple={true}
                    onDone={this.getFiles.bind(this)} />
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary" disabled={!this.state.enable} >Upload Image</button>
                    </div>
                </form>
                {this.state.extractedText ? <textarea disabled rows="8" cols="60" value={this.state.extractedText} /> : <span></span>}
                {this.state.errorMessage ? <span className="text-danger"><em>{this.state.errorMessage}</em></span> : <span className="text-success"></span>}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}


