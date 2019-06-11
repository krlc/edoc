import React from "react";
import FileContext from "../contexts/FileContext";
import * as JSZip from "jszip";

export default class FileProvider extends React.Component {
    constructor(props) {
        super(props);

        this.onAddFile = this.onAddFile.bind(this);
    }

    state = {
        files: {}
    };

    async getZip(file, buffer) {
        const zip = new JSZip();
        await zip.loadAsync(buffer);
        const files = zip.file(/.+\.(docx|doc|odt|pdf|rtf|txt|xps)/);

        for (const f of files) {
            const content = await f.async("string");
            // const processed = processSlide(content);
            // await zip.file(f.name, processed);
            // console.log(f);
            const elem = window.document.createElement('a');
            const bl = new File([await new Response(content).arrayBuffer()], f.name);
            elem.href = window.URL.createObjectURL(bl);
            elem.download = f.name;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);

            this.state.files[file.name].files = {
                file: f.name,
                href: window.URL.createObjectURL(bl),
            };
        }
    }

    onAddFile(file) {
        this.setState({
            // files: this.state.files.concat(Object.assign(file, {stage: "processing..."}))
            files: Object.assign(this.state.files, {[file.name]: Object.assign(file, {stage: "processing..."})})
        });

        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = async () => {
            const buf = reader.result;
            console.log("processing...");
            await this.getZip(file, buf);

            this.setState({
                files: Object.assign(this.state.files, {[file.name]: Object.assign(file, {stage: "done"})})
            });
        };

        reader.readAsBinaryString(file);
    }

    render() {
        return (
            <FileContext.Provider
                value={{
                    files: this.state.files,
                    addFile: this.onAddFile,
                }}
            >
                {this.props.children}
            </FileContext.Provider>
        )
    }
}