import React from 'react' ;
import DocumentTitle from 'react-document-title';
import axios from 'axios' ;


export default class History extends React.Component {
    constructor (props) {
        super (props) ;
        this.state = {
            userId : "" ,
            errorMessage : "" ,
            images : []
        }
    }

    handleChange = ( event ) =>{
        const name = event.target.name ;
        const value = event.target.value ;
        this.setState( { [name] : value } ) ;
    }

    handleSubmit = ( e ) => {
        e.preventDefault() ;
        this.setState({images:[] , errorMessage : ""})
        let url = "https://textor-app-backend.herokuapp.com/image/extracthistory/";
        //let url = "http://localhost:3001/image/extracthistory/" ;
        url = url+this.state.userId ;
        console.log("making request=",url);        
        axios.get(url).then(result=>this.setState({images : result.data.message})).catch(err=>{
            console.log(err.response);
            if(err.response)
            this.setState({errorMessage : err.response.data.message});
            else
            this.setState({errorMessage : "Please start the backend service!"});
        })
        
    }

    DisplayTable = ( images1 ) => {
        const images = images1 ;
        console.log("result=",images1);        
        return (
            <div className="card" key="table1">
                <table className="table-bordered text-center">
                    <thead>
                        <tr>
                        <th>IMAGE</th>
                        <th>TEXT</th>
                        <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map((im,index)=>{
                            return(
                                <tr key={index}>
                                    <td><img src={im.imageBase64} style={{height:"50px",width:"50px"}} alt="nothing"/></td>
                                    <td>{im.extractedText}</td>
                                    <td>{im.postTime}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
               

            </div>
        )
    }
    render () {
        return (
            <React.Fragment>
                <DocumentTitle title = "Textor | History"/>
                <div className = "container">
                    <div className = "row">
                        <div className = "col-lg-8 offset-lg-2" style={{backgroundColor : "lightgreen" , marginTop : "20px" , borderRadius : "10px" }}>
                            <form autoComplete="off"  onSubmit = {this.handleSubmit}>
                                <div className = "form-group" style={{marginTop : "20px" }} >
                                    <input type="email" name="userId" onChange={this.handleChange} placeholder = "Enter Your Registered Email-id" className = "form-control"/>
                                </div>
                                <button type="submit" disabled={!this.state.userId} className = "btn btn-primary form-group">Submit</button><br/>
                                <span name = "errorMessage" className = "text-danger">{this.state.errorMessage}</span>
                            </form>
                            {this.state.images.length? this.DisplayTable(this.state.images) :<span></span>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}