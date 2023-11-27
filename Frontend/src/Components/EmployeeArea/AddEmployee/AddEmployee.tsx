import { useForm } from "react-hook-form";
import EmployeeModel from "../../../Models/EmployeeModel";
import "./AddEmployee.css";
import employeesService from "../../../Service/EmployeesService";
import { useEffect, useState } from "react";
import useImagePreview from "../../../Utils/UseImagePreview";
import notificationService from "../../../Service/NotificationService";

function AddEmployee(): JSX.Element {

    const { register, handleSubmit } = useForm<EmployeeModel>();

    const [imageFile, setImageFile] = useState<File | null>();

    const imageSrc = useImagePreview(imageFile);

    function handleFileChange(event: any) {
        const files = event.target.files;
        console.log(files);
        if (!files || !files.item(0)) return;

        setImageFile(files.item(0));
    }


    // 1. file is loaded -> onChange event -> call handleFileChange -> pass File to File reader.
    // file reader needs to pass url to img src


    async function send(employee: EmployeeModel) {
        try {
            employee.image = (employee.image as unknown as FileList)?.item(0);
            const beEmployee = await employeesService.addEmployee(employee);
            notificationService.success(`Employee ${beEmployee.id} added successfully`);
        } catch (err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="AddEmployee">
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>First Name:</label>
                <input type="text" {...register("firstName")} />

                <label>Last Name:</label>
                <input type="text" {...register("lastName")} />

                <label>Title:</label>
                <input type="text" {...register("title")} />

                <label>City:</label>
                <input type="text" {...register("city")} />

                <label>Country:</label>
                <input type="text" {...register("country")} />

                <label>Birthday</label>
                <input type="date" {...register("birthDate")} />

                <div className="image-upload">
                    <label>Image</label>
                    <input type="file" accept="images/*" {...register("image")} onChange={handleFileChange} required />
                    <img src={imageSrc} />
                </div>
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddEmployee;
