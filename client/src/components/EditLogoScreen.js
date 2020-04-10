import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margin: $margin
                ) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    constructor(){
        super();
        this.state={
                text: null,
                color : null,
                fontSize : null,
                backgroundColor : null,
                borderColor : null,
                borderRadius : null,
                borderWidth : null,
                padding : null,
                margin : null
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
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(this.state.text === null){
                        this.setState({
                            text: data.logo.text,
                            color : data.logo.color,
                            fontSize : data.logo.fontSize,
                            backgroundColor : data.logo.backgroundColor,
                            borderColor : data.logo.borderColor,
                            borderRadius : data.logo.borderRadius,
                            borderWidth : data.logo.borderWidth,
                            padding : data.logo.padding,
                            margin : data.logo.margin
                        })
                    }
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                    </div>
                                        <div className="row">
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
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
                                                    }} placeholder="Text" defaultValue={data.logo.text} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" onChange ={this.handleColorChange} ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text" className="form-control" name="fontSize" onChange ={this.handleFontSizeChange} ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" onChange ={this.handleBackgroundColorChange} ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" onChange ={this.handleBorderColorChange} ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Border Color" defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="text" className="form-control" name="borderRadius" onChange ={this.handleBorderRadiusChange} ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="text" className="form-control" name="borderWidth" onChange ={this.handleBorderWidthChange} ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="text" className="form-control" name="padding" onChange ={this.handlePaddingChange} ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" defaultValue={data.logo.padding} />
                                                </div>
                                                <div className="form-group">
                                                <label htmlFor="Margin">Margin:</label>
                                                    <input type="text" className="form-control" name="margin" onChange ={this.handleMarginChange} ref={node => {
                                                        margin = node;
                                                    }} placeholder="Margin" defaultValue={data.logo.margin} />
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
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;