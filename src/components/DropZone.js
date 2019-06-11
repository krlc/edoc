import React, {useCallback, useContext} from 'react';
import {useDropzone} from 'react-dropzone';
import classNames from 'classnames/bind';
import FileContext from '../contexts/FileContext';
import * as Processors from "../processors";

import * as styles from './style.css';
const cx = classNames.bind(styles);

export default function DropZone() {
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => addFile(file))
    }, []);

    const {isDragAccept, isDragReject, isDragActive, getRootProps, getInputProps} = useDropzone({
        onDrop,
        multiple: false,
        accept: Object.values(Processors).map(p => p.MIME),
    });

    const {addFile} = useContext(FileContext);

    const dragClass = cx({
        'welcome': true,
        'welcomeActive': isDragActive,
        'welcomeActiveRej': isDragReject,
    });

    return (
        <div {...getRootProps()} className={dragClass}>
            <input {...getInputProps()} />

            {(isDragAccept && !isDragReject) && (<p>Ok, now release mouse</p>)}
            {isDragReject && (<p>This ain't no .edoc</p>)}
            {!isDragActive && (<p>Click here or drop .edoc</p>)}
        </div>
    )
}