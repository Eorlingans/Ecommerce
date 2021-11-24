import React, {useCallback, useEffect, useRef, useState} from "react";
import {fetcher} from "../../service_tools";
import {Button, Col, Form, Row} from "react-bootstrap"
import {Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import './Edits.css'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const EditCategory = () => {
    const [categoriesId, setCategoriesId] = useState([])
    const [category, setCategory] = useState("")
    const [newCategory, setNewCategory] = useState("")
    const [categoryToEditId, setCategoryToEditId] = useState(0)
    const inpCategoryRef = useRef(null)
    const inputNewCategoryRef = useRef(null)
    const [severity, setSeverity] = useState("warning")
    const [info, setInfo] = useState("")
    const [action, setAction] = useState("edit")
    const [open, setOpen] = useState(false);
    const [newInfo, setNewInfo] = useState("")

    // Agregar nueva categoria
    const handleClickOpen = () => {
        setInfo("")
        setNewCategory("")
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            //Limpio info despues de 500milisegundos
            setSeverity("")
            setNewInfo("")
        }, 500)
    };

    const loadCategories = useCallback(() => {
        setSeverity("")
        setInfo("")
        setNewInfo("")
        fetcher('http://127.0.0.1:8000/api/v1/categorias')
            .then(data => {
                console.log(data)
                setCategoriesId([])
                setCategoryToEditId(0)
                setCategoriesId(data)
            })
            .catch(err => {
                setSeverity("error")
                setInfo(`${err}`)
                console.log("Error listar categoria: ", err)
            })
    }, [setInfo, setSeverity, setCategoriesId, setCategoryToEditId])
    useEffect(() => {
        loadCategories()
    }, [loadCategories])

    const handleDelete = (e) => {
        e.preventDefault()
        setInfo("")
        if (categoryToEditId === 0) {
            setSeverity("error")
            setInfo("Debes seleccionar una categoria")
            return
        }
        fetcher(`http://127.0.0.1:8000/api/v1/editCategorias/${categoryToEditId}/`, "DELETE")
            .then(res => {
                console.log(res)
                setSeverity("success")
                setInfo("Categoria eliminada correctamente!")
                setTimeout(() => {
                    loadCategories()
                }, 1500)
            }).catch(err => {

            setSeverity("error")
            //Convierto el String del error a entero
            const error_nro = parseInt(err.message)

            if(isNaN(error_nro)) { //Si es NaN porque no es un entero
                setSeverity("error")
                setInfo(`${err}`)
                console.log("Error eliminar categoria: ", err)
            }

            console.log(error_nro)

            //Manejo la respuesta segun el numero de error
            switch (error_nro) {
                case 500:
                    setInfo(`No se puede borrar la categoria, hay productos asociados: ${err}`)
                    break
                case 401:
                    setInfo(`Debe volver a iniciar sesion: ${err}`)
                    console.log("ERROR 401")
                    break
            }
        })

    }
    const handleEdit = (e) => {
        e.preventDefault()
        setInfo("")
        const cat_name = inpCategoryRef.current.value
        if (cat_name === "") {
            setSeverity("error")
            setInfo("Debes ingresar una categoria")
            return
        }
        if (cat_name.length > 20) {
            setSeverity("error")
            setInfo("Máximo 20 caracteres")
            return
        }
        fetcher(`http://127.0.0.1:8000/api/v1/editCategorias/${categoryToEditId}/`, "PUT", {cat_name})
            .then(res => {
                console.log(res)
                setSeverity("success")
                setInfo("Categoria modificada correctamente!")
                loadCategories()
            }).catch(err => {
            setSeverity("error")
            setInfo(`Error: ${err}`)
            console.log(err)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("action", action)
        if (action === "edit") {
            handleEdit(e)
            return
        }
        if (action === "delete") {
            handleDelete(e)

        }

    }
    const handleNewCategory = () => {
        const cat_name = inputNewCategoryRef.current.value
        if (cat_name === "") {
            setSeverity("error")
            setNewInfo("Debes ingresar una categoria")
            return
        }
        if (cat_name.length > 20) {
            setSeverity("error")
            setNewInfo("Máximo 20 caracteres")
            return
        }
        setSeverity("")
        setNewInfo("")
        fetcher(`http://127.0.0.1:8000/api/v1/categorias`, "POST", {cat_name})
            .then(res => {
                console.log(res)
                setSeverity("success")
                setNewInfo("Categoria agregada correctamente!")
                setTimeout(() => {
                    loadCategories()
                    handleClose()
                }, 500)
            }).catch(err => {
            setSeverity("error")
            setNewInfo(`${err}`)
            console.log(err)
        })
    }
    return (
        <div className="editCategory">
            <div className="box">
                <Form onSubmit={handleSubmit}>
                    {
                        info &&
                        <Alert variant="filled" severity={severity}>
                            {info}
                        </Alert>
                    }
                    <h2>Editar Categoria</h2>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName" onChange={({target: {value}}) => {
                            setInfo("")
                            setCategoryToEditId(value)
                        }}>
                            <Form.Select>
                                <option key={0} value={0}>Selecciona una categoria</option>
                                {
                                    categoriesId && categoriesId.map((category, index) => <option key={category.id}
                                                                                                  value={category.id}>{category.cat_name}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                ref={inpCategoryRef}
                                placeholder="Enter Category" value={category}
                                onChange={({target: {value}}) => {
                                    setInfo("")
                                    setCategory(value)
                                }}

                            />
                        </Form.Group>
                    </Row>
                    <Button variant='info' type="submit" className="ButtonSubmit" onClick={(e) => {
                        setAction("edit")
                    }} disabled={categoriesId === 0}
                    >
                        Update Category
                    </Button>
                    <Button variant='danger' type="submit" className="ButtonSubmit" onClick={(e) => {
                        setAction("delete")
                    }} disabled={categoriesId === 0}
                    >
                        Delete Category
                    </Button>
                </Form>
                <Button
                    variant='success'
                    type="submit" className="ButtonSubmit"
                    onClick={handleClickOpen}
                >
                    Add Category
                </Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"New Category"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <>
                                {
                                    newInfo &&
                                    <Alert variant="filled" severity={severity}>
                                        {newInfo}
                                    </Alert>
                                }
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            ref={inputNewCategoryRef}
                                            autoFocus
                                            placeholder="Enter Category" value={newCategory}
                                            onChange={({target: {value}}) => {
                                                setNewCategory(value)
                                            }}
                                        />
                                    </Form.Group>
                                </Row>
                            </>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleNewCategory} variant="success">Add</Button>
                        <Button onClick={handleClose} variant="outlined">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}