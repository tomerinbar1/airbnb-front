import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { Link } from 'react-router-dom'
import { uploadService } from '../services/upload.service.js'
import { stayServiceLocal } from '../services/stay.service.local.js'

export function StayEdit() {

    const [stayToEdit, setStayToEdit] = useState(stayServiceLocal.getEmptystay())
    const [stayImage, setStayImage] = useState(null)


    const { stayId } = useParams()
    console.log(stayId)
    const navigate = useNavigate()

    useEffect(() => {
       loadStay()
    }, [])



    async function onHandleImg(ev) {
        try {
            const imgUrl = await uploadService.uploadImg(ev)
            setStayToEdit((preStayToEdit) => ({ ...stayToEdit, image: imgUrl }))
        } catch (err) {
            console.log('Cannot upload image right now..', err);
        }
    }


    async function loadStay() {
        try {
            const stay = await stayServiceLocal.getById(stayId)
            setStayToEdit(stay)
        }
        catch (err) {
            console.log('Had issued in stay edit:', err)
            navigate('/stay')
            showErrorMsg('Stay not found!')
        }
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') :
            (target.type === 'checkbox') ? target.checked :
                target.value
        setStayToEdit(prevStayToEdit => ({ ...prevStayToEdit, [field]: value }))
    }

    async function onSaveStay(ev) {
        ev.preventDefault()
        try {
            const savedStay = await stayServiceLocal.save(stayToEdit)
            // saveStay(stayToEdit)
            console.log('stay saved', savedStay);
            navigate('/stay')
            showSuccessMsg(`Stay '${savedStay._id}' saved!`)
        }
        catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot save stay')
        }
    }



    return (
        <section className="stay-edit-container">
            <h2>{stayToEdit._id ? 'Edit this stay' : 'Add a new stay'}</h2>

            <form className="stay-edit-inputs" onSubmit={onSaveStay}>
                <input type="file" accept="image/png/jpeg" onChange={onHandleImg} />

                {stayImage &&
                    <img
                        alt="not found"
                        height={"150px"}
                        src={URL.createObjectURL(stayImage)}
                    />
                }

                <label htmlFor="title">Name:</label>
                <input type="text" required
                    name="title"
                    id="title"
                    placeholder="Enter name"
                    onChange={handleChange}
                    value={stayToEdit.title}
                />

                <label htmlFor="price">Price:</label>
                <input type="number" required
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    onChange={handleChange}
                    value={stayToEdit.price}
                />
                <article>
                    <input type="checkbox" name="inStock" value={stayToEdit.inStock} checked={stayToEdit.inStock} onChange={handleChange} />
                    <label>Stay In Stock</label>
                </article>


                <div className="button-group">
                    <button>{stayToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/">Cancel</Link>
                </div>

                <div className="edit-btn">
                    <button>Edit</button>
                    <Link to="/"/>
                </div>

            </form>
        </section>
    )
}