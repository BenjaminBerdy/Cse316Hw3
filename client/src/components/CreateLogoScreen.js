import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor(){
        super();
        this.state={
                text: "GoLogoLo Logo",
                color : "#ff0000",
                fontSize : 24,
                backgroundColor : "#00ff00",
                borderColor : "#0000ff",
                borderRadius : 24,
                borderWidth : 24,
                padding : 24,
                margin : 24
            }
    }

    handleTextChange = (e) => {
        this.setState({text: e.target.value});
    }
    handleColorChange = (e) => {
        this.setState({color: e.target.value});
    }
    handleFontSizeChange = (e) => {
        this.setState({fontSize: e.target.value});
    }
    handleBackgroundColorChange = (e) => {
        this.setState({backgroundColor: e.target.value});
    }
    handleBorderColorChange = (e) => {
        this.setState({borderColor: e.target.value});
    }
    handleBorderRadiusChange = (e) => {
        this.setState({borderRadius: e.target.value});
    }
    handleBorderWidthChange = (e) => {
        this.setState({borderWidth: e.target.value});
    }
    handlePaddingChange = (e) => {
        this.setState({padding: e.target.value}); 
    }
    handleMarginChange = (e) => {
        this.setState({margin: e.target.value});
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="row">
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                        backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
                                        borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderRadius.value = "";
                                    borderWidth.value = "";
                                    padding.value = "";
                                    margin.value = "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" onChange ={this.handleTextChange} ref={node => {
                                            text = node;
                                        }} placeholder="Text" defaultValue={this.state.text} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" onChange ={this.handleColorChange} ref={node => {
                                            color = node;
                                        }} placeholder="Color" defaultValue={this.state.color} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" className="form-control" name="fontSize" onChange ={this.handleFontSizeChange} ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" defaultValue={this.state.fontSize} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                            <input type="color" className="form-control" name="backgroundColor" onChange ={this.handleBackgroundColorChange} ref={node => {
                                                backgroundColor = node;
                                            }} placeholder="Background Color" defaultValue={this.state.backgroundColor} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" onChange ={this.handleBorderColorChange} ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" defaultValue={this.state.borderColor} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="text" className="form-control" name="borderRadius" onChange ={this.handleBorderRadiusChange} ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" defaultValue={this.state.borderRadius} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="text" className="form-control" name="borderWidth" onChange ={this.handleBorderWidthChange} ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" defaultValue={this.state.borderWidth} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="text" className="form-control" name="padding" onChange ={this.handlePaddingChange} ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" defaultValue={this.state.padding} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="text" className="form-control" name="margin" onChange ={this.handleMarginChange} ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" defaultValue={this.state.margin} />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>

                            <div className="col s8" style = {{overflow: "auto"}}>
                                            <div className="logoview"
                                            style={{
                                                color: this.state.color,
                                                fontSize: this.state.fontSize + "pt",
                                                backgroundColor: this.state.backgroundColor,
                                                border: "solid",
                                                borderColor: this.state.borderColor,
                                                borderRadius: this.state.borderRadius + "pt",
                                                borderWidth: this.state.borderWidth + "pt",
                                                padding: this.state.padding + "pt",
                                                margin: this.state.margin + "pt"
                                        } }>
                                            {this.state.text}
                                            </div>
                                        </div>

                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;