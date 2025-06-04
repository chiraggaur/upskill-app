import * as yup from "yup";
const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Course title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Course description is required")
    .min(10, "Description must be at least 10 characters"),
  cost: yup
    .number()
    .typeError("Cost must be a valid number")
    .required("Cost is required")
    .min(0, "Cost must be at least 0"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "End date must be after start date"),
  image: yup.string().required("Course image is required"),
});

export default schema;
