import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";


type EditadleSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
    disabled?: boolean
}


export const EditadleSpan = React.memo((props: EditadleSpanPropsType) => {
    let [editeMode, setEditeMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditeMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditeMode(false);
        props.onChange(title)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    return editeMode
        ? <TextField variant={'outlined'}
            value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

})