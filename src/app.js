import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DropZone from "./components/DropZone";
import FileProvider from "./providers/FileProvider"
import FileView from "./components/FileView";

const App = () => (
    <FileProvider>
        <FileView/>
        <DropZone/>
    </FileProvider>
);

ReactDOM.render(
    <App />, document.getElementById('root')
);