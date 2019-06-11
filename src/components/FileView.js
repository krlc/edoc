import React from 'react';
import FileContext from "../contexts/FileContext";

export default class FileView extends React.Component {
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const files = this.context || [];
    //     console.log(files);
    // }

    // render() {
    //     const files = this.context || [];
    //     return <ul></ul>;
    // }

    render() {
        return (
            <FileContext.Consumer>
                {({files}) => (
                    // <div>{JSON.stringify(files)}</div>
                    <div></div>
                )}
            </FileContext.Consumer>
        )
    }
}

FileView.contextType = FileContext;