export default function registerValidate(values){
    const errors = {}
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) || !values.email) {
        errors.email = 'Please provide a valid email address';
    }
    if(values.password.length < 5 || !values.password){
        errors.password = "Password must be at least 5 characters long";
    }
   
    if(!values.cpassword || values.password !== values.cpassword){
        errors.cpassword = "Passwords do not match"
    }

    return errors
   
}

export function validation(values){
    const errors = {}
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) || !values.email) {
        errors.email = 'Please provide a valid email address';
    }
    if(values.password.length < 5 || !values.password){
        errors.password = "Password must be at least 5 characters long";
    }
    return errors;
   

}