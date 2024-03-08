import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
interface FormDatas {
  fullName: string;
  age: number;
  dob: string;
  image: FileList;
}

const FormFields = () => {
  const { register, handleSubmit, reset } = useForm<FormDatas>();

  const formSubmit: SubmitHandler<FormDatas> = (data) => {
    console.log(data);
    const formdatas = new FormData();
    formdatas.append("fullName", data.fullName);
    formdatas.append("age", data.age.toString());
    formdatas.append("dob", data.dob);
    if (data.image && data.image.length > 0) {
      formdatas.append("image", data.image[0]);
    }
    axios
      .post("http://localhost:1218/upload", formdatas)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // alert("form submitted");
    reset();
  };
  return (
    <div className="mx-auto max-w-xl">
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="flex flex-col gap-2 ">
          <label htmlFor="fullName">Name</label>
          <input
            type="text"
            placeholder="fullName"
            className="bg-pink-200"
            {...register("fullName", { required: true, maxLength: 20 })}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            placeholder="age"
            className="bg-pink-200"
            {...register("age", { required: true, maxLength: 2 })}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="dob">DOB</label>
          <input
            type="date"
            placeholder="dob"
            className="bg-pink-200"
            {...register("dob", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            placeholder="image"
            {...register("image", { required: true })}
          />
        </div>
        <div>
          <button type="submit" className="px-5 py-1 bg-green-800">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormFields;
