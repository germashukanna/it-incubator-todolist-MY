import {AddBox} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";


export type  AddItemFormHelperType = { setError: (error: string) => void, setTitle: (title: string) => void }
type AddItemFormPropsType = {
    addItem: (title: string, helpers: AddItemFormHelperType) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = async () => {
        if (title.trim() !== "") {
            props.addItem(title.trim(), {setError, setTitle})
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (event.key === "Enter") {
            addItem()
        }
    }

    return <div>
        <TextField variant={'outlined'}
                   size={"small"}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   label={'Title'}
                   helperText={error}
                   disabled={props.disabled}
                   color={'secondary'}
        />
        <IconButton color={'secondary'} size={"small"} disabled={props.disabled}
                    style={{
                        maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',
                        marginLeft: '15x'
                    }}
                    onClick={() => {
                        addItem()
                    }}><AddBox/>
        </IconButton>
    </div>
})