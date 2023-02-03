import {AddBox} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = async () => {
        if (title.trim() !== "") {
            try {
                await props.addItem(title.trim())
                setTitle("")
            } catch (error) {
                // @ts-ignore
                setError(error.message)
            }
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